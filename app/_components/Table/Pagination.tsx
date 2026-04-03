import { useTableActions, useTableState } from "@/app/_context/TableContextProvider"
import { Pagination as PaginationType } from "@/lib/reducer/tableReducer"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useMemo } from "react"

type Props = {
    totalItems: number
    totalPages: number
}

type PageNumberProps = {
    handlePageChange: (key: "page", page: number) => void;
    currentPage: number;
    totalPages: number;
}

type PaginationItem =
    | { type: "page"; value: number }
    | { type: "ellipsis" }

const activePageClass = "w-10 h-10 font-semibold bg-blue-50 rounded-full"
const inactivePageClass = "w-10 h-10 cursor-pointer hover:bg-gray-100 rounded-full duration-300 transition-colors"
const navButtonClass = "flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed duration-300 transition-colors cursor-pointer"

const getPaginationItems = (pageNumbers: number[]): PaginationItem[] => {
    const items: PaginationItem[] = []

    pageNumbers.forEach((n, index) => {
        if (index === 0) {
            items.push({ type: "page", value: n })
            return
        }

        const previousPage = pageNumbers[index - 1]
        if ((n - previousPage) > 1) items.push({ type: "ellipsis" }) // Any number that is not +/- 1 of the number in the set should be ...

        items.push({ type: "page", value: n })
    })

    return items
}

const PageNumbers = ({
    handlePageChange,
    currentPage,
    totalPages
}: PageNumberProps) => {
    // Page numbers to display
    const pageNumbers = useMemo(() => {
        if (totalPages < 1) return []

        const pageNumbers = new Set<number>([
            1,
            totalPages,
            currentPage - 1,
            currentPage,
            currentPage + 1,
        ])

        return Array.from(pageNumbers)
            .filter((pageNumber) => pageNumber >= 1 && pageNumber <= totalPages)
            .sort((a, b) => a - b)
    }, [totalPages, currentPage])

    return (
        <nav aria-label='Pagination'>
            <ul className='flex gap-2 items-center'>
                <li>
                    <button
                        type='button'
                        className={navButtonClass}
                        onClick={() => handlePageChange("page", currentPage - 1)}
                        disabled={currentPage <= 1}
                        aria-label='Go to previous page'
                    >
                        <ChevronLeft/>
                    </button>
                </li>
                {
                    getPaginationItems(pageNumbers).map((item, index) => {
                        if (item.type === "ellipsis") {
                            return (
                                <li
                                    key={`ellipsis-${index}`}
                                    className='w-10 h-10 flex items-center justify-center text-gray-500'
                                    aria-hidden='true'
                                >
                                    ...
                                </li>
                            )
                        }
                        return (
                            <li key={`Page ${item.value} button`}>
                                <button
                                    type='button'
                                    aria-label={`Go to page ${item.value}`}
                                    aria-current={currentPage === item.value ? "page" : undefined}
                                    className={currentPage === item.value ? activePageClass : inactivePageClass}
                                    onClick={() => handlePageChange("page", item.value)}
                                >
                                    {item.value}
                                </button>
                            </li>
                        )
                    })
                }
                <li>
                    <button
                        type='button'
                        className={navButtonClass}
                        onClick={() => handlePageChange("page", currentPage + 1)}
                        disabled={currentPage >= totalPages}
                        aria-label='Go to next page'
                    >
                        <ChevronRight/>
                    </button>
                </li>
            </ul>
        </nav>
    )
}

const Pagination = ({
    totalItems,
    totalPages,
}: Props) => {
    const { state } = useTableState()
    const { handlePagination } = useTableActions()
    const currentPage = state.pagination.page
    const rowsPerPage = state.pagination.perPage
    
    const handlePaginationChange = (key: keyof PaginationType, value: number) => {
        if (key === "perPage" && value === rowsPerPage) return
        else if (key === "page" && (value === currentPage  || value < 1 || value > totalPages)) return
        handlePagination({ ...state.pagination, [key]: value })
    }

    return (
        <div className='flex flex-row justify-between items-center'>
            <span className='text-sm'>Showing {totalItems} order(s)</span>
            <PageNumbers
                handlePageChange={handlePaginationChange}
                currentPage={currentPage}
                totalPages={totalPages}
            />
            <div className='flex gap-2 items-center'>
                <select
                    className='w-fit px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all duration-300 cursor-pointer'
                    onChange={(e) => handlePaginationChange("perPage", +e.target.value)}
                    value={state.pagination.perPage}
                    aria-label='View rows per page'
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
                <span className='text-sm'>Rows per page</span>
            </div> 
        </div>
    )
}

export default Pagination