"use client"

import { useCallback, useReducer } from "react"
import { getEndDate, getStartDate } from "../utils/date"

type FilterKey<T> = Exclude<Extract<keyof T, string>, "startDate" | "endDate">

type FilterValue = string | number | boolean | string[] | number[] | boolean[]

export type TableFilters<T extends Record<string, any> = Record<string, any>> = {
    startDate?: string
    endDate?: string
} & Partial<Record<FilterKey<T>, FilterValue>>

export type TableState<T extends Record<string, any>> = {
    search: string
    sort: Sort<T>
    pagination: Pagination
    filters?: TableFilters<T>
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

type TableAction<T extends Record<string, any>> = 
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
                pagination: { ...state.pagination, page: 1 },
                sort: { sortKey: "", sortOrder: "" }
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

const createInitialTableState = <T extends Record<string, unknown>>(): TableState<T> => ({
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
        startDate: getStartDate(),
        endDate: getEndDate(),
    } as TableFilters<T>
})

export const useTableReducer = <T extends Record<string, any>>() => {
    const [state, dispatch] = useReducer(tableReducer<T>, createInitialTableState<T>())

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