"use client"

import { useQuery } from "@tanstack/react-query"
import { DashboardQueryState, DashboardResponse } from "@/lib/types/dashboard"
import { Order } from "@/lib/types/orders"
import { TableState } from "@/lib/reducer/tableReducer"
import { buildDashboardQueryParams, buildOrderQueryParams } from "./builders"
import { PaginatedResponse } from "../types/data"

// FETCH

const fetchOrders = async (state: TableState<Order>): Promise<PaginatedResponse<Order>> => {
    const queryParams = buildOrderQueryParams(state)

    const response = await fetch(`/api/orders?${queryParams.toString()}`)

    if (!response.ok) throw new Error('Something went wrong.')
    return response.json() as Promise<PaginatedResponse<Order>>
}

const fetchCustomers = async () => {
    const response = await fetch('/api/customers')

    if (!response.ok) throw new Error('Something went wrong.')
    return response.json()
}

const fetchProducts = async () => {
    const response = await fetch('/api/products')

    if (!response.ok) throw new Error('Something went wrong.')
    return response.json()
}

const fetchDashboard = async (params: DashboardQueryState): Promise<DashboardResponse> => {
    const queryParams = buildDashboardQueryParams(params)
    
    const response = await fetch(`/api/dashboard?${queryParams.toString()}`)

    if (!response.ok) throw new Error('Something went wrong.')
    return response.json() as Promise<DashboardResponse>
}

// QUERIES

export const useFetchOrdersQuery = (state: TableState<Order>) => {
    const { data, isLoading, error } = useQuery<PaginatedResponse<Order>>({
        queryKey: ['orders', state],
        queryFn: () => fetchOrders(state),
        retry: false,
        staleTime: 1000 * 60 * 60, // 1 hour
    })

    return { data, isLoading, error }
}

export const useFetchCustomersQuery = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['customers'],
        queryFn: fetchCustomers,
        retry: false,
        staleTime: 1000 * 60 * 60, // 1 hour
    })

    return { data, isLoading, error }
}

export const useFetchProductsQuery = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        retry: false,
        staleTime: 1000 * 60 * 60, // 1 hour
    })

    return { data, isLoading, error }
}

export const useFetchDashboardQuery = (params: DashboardQueryState) => {
    const { data, isLoading, error } = useQuery<DashboardResponse>({
        queryKey: ['dashboard', params],
        queryFn: () => fetchDashboard(params),
        retry: false,
        staleTime: 1000 * 60 * 60, // 1 hour
    })

    return { data, isLoading, error }
}