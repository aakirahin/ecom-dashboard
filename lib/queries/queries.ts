"use client"

import { useQuery } from "@tanstack/react-query"
import { DashboardQueryState, DashboardResponse } from "@/lib/types/dashboard"
import { Order } from "@/lib/types/orders"
import { TableState } from "@/lib/reducer/tableReducer"
import { buildDashboardQueryParams, buildQueryParams } from "./builders"
import { PaginatedResponse } from "../types/data"
import { Customer } from "../types/customers"
import { Product } from "../types/products"

// FETCH

const fetchOrders = async (state: TableState<Order>): Promise<PaginatedResponse<Order>> => {
    const queryParams = buildQueryParams({ type: "orders", state })

    const response = await fetch(`/api/orders?${queryParams.toString()}`)

    if (!response.ok) throw new Error('Something went wrong.')
    return response.json() as Promise<PaginatedResponse<Order>>
}

const fetchCustomers = async (state: TableState<Customer>): Promise<PaginatedResponse<Customer>> => {
    const queryParams = buildQueryParams({ type: "customers", state })

    const response = await fetch(`/api/customers?${queryParams.toString()}`)

    if (!response.ok) throw new Error('Something went wrong.')
    return response.json()
}

const fetchProducts = async (state: TableState<Product>): Promise<PaginatedResponse<Product>> => {
    const queryParams = buildQueryParams({ type: "products", state })

    const response = await fetch(`/api/products?${queryParams.toString()}`)

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

export const useFetchCustomersQuery = (state: TableState<Customer>) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['customers', state],
        queryFn: () => fetchCustomers(state),
        retry: false,
        staleTime: 1000 * 60 * 60, // 1 hour
    })

    return { data, isLoading, error }
}

export const useFetchProductsQuery = (state: TableState<Product>) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['products', state],
        queryFn: () => fetchProducts(state),
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