"use client"

import { Pagination, Sort, TableFilters, TableState, useTableReducer } from '@/lib/reducer/tableReducer'
import React, { createContext, useContext } from 'react'

type Props<T> = {
    reducer: TableStateContext<T> & TableActionsContext<T>
    children: React.ReactNode
}

export type TableStateContext<T> = {
    state: TableState<T>
}

export type TableActionsContext<T> = {
    handleSearch: (value: string) => void
    handleSort: (sort: Sort<T>) => void
    handlePagination: (pagination: Pagination) => void
    // handleFilter: (filters: TableFilters<T>) => void
}

const TableStateContext = createContext<TableStateContext<T> | null>(null)
const TableActionsContext = createContext<TableActionsContext<T> | null>(null)

export const useTableState = () => {
    const context = useContext(TableStateContext)

    if (!context) throw new Error("useTableContext can only be used within TableContext.")
    return context
}

export const useTableActions = () => {
    const context = useContext(TableActionsContext)

    if (!context) throw new Error("useTableContext can only be used within TableContext.")
    return context
}

const TableContextProvider = <T extends Record <string, any>>({
    reducer,
    children
}: Props<T>) => {
    const { state, ...actions } = reducer

    return (
        <TableStateContext.Provider value={{ state }}>
            <TableActionsContext.Provider value={actions}>
                {children}
            </TableActionsContext.Provider>
        </TableStateContext.Provider>
    )
}

export default TableContextProvider