"use client"

import { useCallback, useReducer } from "react"
import { endDate, startDate } from "../utils/date"

export type TableFilterValue = string | string[]
export type TableFilters<T> = Partial<Record<keyof T | "startDate" | "endDate", TableFilterValue>>

export type TableState<T> = {
    search: string
    sort: Sort<T>
    pagination: Pagination
    filters: TableFilters<T>
}

export type Pagination = {
    page: number
    perPage: number
}

export type Sort<T> = {
    sortKey: keyof T | ""
    sortOrder: "asc" | "desc" | ""
}

enum ACTION {
    SEARCH = "SET_SEARCH",
    SORT = "SET_SORT",
    PAGINATION = "SET_PAGINATION",
    // FILTER = "SET_FILTERS"
}

type TableAction<T> = 
    { type: ACTION.SEARCH, payload: string } |
    { type: ACTION.SORT, payload: Sort<T> } |
    { type: ACTION.PAGINATION, payload: Pagination }
    // { type: ACTION.FILTER, payload: TableFilters<T> }

const tableReducer = <T extends Record<string, any>>(state: TableState<T>, action: TableAction<T>): TableState<T> => {
    switch (action.type) {
        case ACTION.SEARCH: 
            return { 
                ...state, 
                search: action.payload, 
                pagination: { ...state.pagination, page: 1 } 
            }
        case ACTION.SORT: 
            return { 
                ...state, 
                sort: action.payload 
            }
        case ACTION.PAGINATION: 
            return { 
                ...state, 
                pagination: action.payload 
            }
        // case ACTION.FILTER:
        //     return {
        //         ...state,
        //         filters: {
        //             ...state.filters,
        //             ...action.payload
        //         },
        //         pagination: { ...state.pagination, page: 1 }
        //     }
        default:
            return state
    }
}

const initialTableState: TableState<any> = {
    search: "",
    sort: {
        sortKey: "",
        sortOrder: ""
    },
    pagination: {
        page: 1,
        perPage: 5
    },
    filters: {
        startDate: startDate,
        endDate: endDate
    }
}

export const useTableReducer = <T extends Record<string, any>>() => {
    const [state, dispatch] = useReducer(tableReducer<T>, initialTableState)

    const handleSearch = useCallback((value: string) => (
        dispatch({
            type: ACTION.SEARCH,
            payload: value
        })
    ), [dispatch])

    const handleSort = useCallback((sort: Sort<T>) => (
        dispatch({
            type: ACTION.SORT,
            payload: sort
        })
    ), [])

    const handlePagination = useCallback((pagination: Pagination) => (
        dispatch({
            type: ACTION.PAGINATION,
            payload: pagination
        })
    ), [])

    // const handleFilter = useCallback((filters: TableFilters<T>) => (
    //     dispatch({
    //         type: ACTION.FILTER,
    //         payload: filters
    //     })
    // ), [])

    return { state, handleSearch, handleSort, handlePagination }
}