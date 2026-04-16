import { useFetchCustomersQuery } from '@/lib/queries/queries'
import { TableFilters, useTableReducer } from '@/lib/reducer/tableReducer'
import { Customer } from '@/lib/types/customers'
import { useDebounce } from '@/lib/utils/hooks'
import React, { useMemo } from 'react'
import DataTable from '../DataTable'
import { customerColumns } from '@/lib/utils/columns'

type Props = {
    filters: TableFilters
}

const CustomersTable = ({ filters }: Props) => {
    const reducer = useTableReducer<Customer>()
    const { state, ...actions } = reducer

    const debouncedSearch = useDebounce(state.search, 1000)
    const queryState = useMemo(() => ({
        ...state,
        search: debouncedSearch,
        filters
    }), [state, debouncedSearch, filters])

    const { data: customersResponse, isLoading, error } = useFetchCustomersQuery(queryState);
    const rows = (customersResponse?.data ?? []) as Customer[]
    const total = customersResponse?.total ?? 0
    const totalPages = customersResponse?.totalPages ?? 0

    return (
        <DataTable<Customer> 
            title="Customers" 
            rowKey="customer_id"
            {...{ 
                columns: customerColumns, 
                error, 
                isLoading,
                rows,
                total,
                totalPages,
                reducer
            }} 
        />
    )
}

export default CustomersTable