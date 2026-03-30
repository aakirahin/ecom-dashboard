"use client"

import { Pagination, Sort, TableFilters, TableState, useTableReducer } from '@/lib/reducer/tableReducer'
import { Order } from '@/lib/types/orders'
import React, { createContext, useContext } from 'react'

type Props = {
    children: React.ReactNode
}

type TableStateContext<Order> = {
    state: TableState<Order>
}

type TableActionsContext<Order> = {
    handleSearch: (value: string) => void
    handleSort: (sort: Sort<Order>) => void
    handlePagination: (pagination: Pagination) => void
    // handleFilter: (filters: TableFilters<Order>) => void
}

const TableStateContext = createContext<TableStateContext<Order> | null>(null)
const TableActionsContext = createContext<TableActionsContext<Order> | null>(null)

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

const OrdersContextProvider = ({
    children
}: Props) => {
    const { state, ...actions } = useTableReducer<Order>()

    return (
        <TableStateContext.Provider value={{ state }}>
            <TableActionsContext.Provider value={actions}>
                {children}
            </TableActionsContext.Provider>
        </TableStateContext.Provider>
    )
}

export default OrdersContextProvider