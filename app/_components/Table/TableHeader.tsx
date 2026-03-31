import React from 'react'
import { Column } from './DataTable';
import { useTableActions, useTableState } from '@/app/_context/TableContextProvider';

type Props<T> = {
    columns: Column<T>[];
}

const TableHeader = <T extends Record<string, any>>({
    columns,
}: Props<T>) => {
    const { state } = useTableState();
    const { handleSort } = useTableActions();
    const { sortKey, sortOrder } = state.sort;

    const getSortIndicator = (columnKey: string) => {
        if (sortKey !== columnKey) return null
        return sortOrder === "asc" ? " ▲" : " ▼"
    }

    return (
        <thead>
            <tr className='flex p-2 bg-gray-50 text-gray-500'>
                {
                    columns.map((col) => (
                        <th
                            key={String(col.key)}
                            scope='col'
                            className='flex flex-1 justify-between items-center mr-6 font-medium'
                        >
                            {
                                col.sortable ? (
                                    <button
                                        type='button'
                                        onClick={() => {
                                            const nextSortOrder = sortKey === col.key && sortOrder === "asc" ? "desc" : "asc";
                                            handleSort({
                                                sortKey: col.key,
                                                sortOrder: nextSortOrder
                                            });
                                        }}
                                        className='flex w-full justify-between items-center text-left cursor-pointer'
                                        aria-label={`Sort by ${col.label}`}
                                    >
                                        <span className='flex gap-1.5 items-center'>
                                            {col.icon}
                                            {col.label}
                                        </span>
                                        {getSortIndicator(String(col.key))}
                                    </button>
                                ) : (
                                    <span className='flex gap-1.5 items-center'>
                                        {col.icon}
                                        {col.label}
                                    </span>
                                )
                            }
                        </th>
                    ))
                }
            </tr>
        </thead>
    )
}

export default TableHeader