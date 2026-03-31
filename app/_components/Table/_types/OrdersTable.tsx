"use client"

import React, { useMemo } from 'react'
import { Order } from '@/lib/types/orders';
import { useDebounce } from '@/lib/utils/hooks';
import { useFetchOrdersQuery } from '@/lib/queries/queries';
import { orderColumns } from '@/lib/utils/columns';
import { TableFilters, useTableReducer } from '@/lib/reducer/tableReducer';
import DataTable from '../DataTable';

type Props = {
  filters: TableFilters
}

const OrdersTable = ({ filters }: Props) => {
  const reducer = useTableReducer<Order>()
  const { state, ...actions } = reducer

  const debouncedSearch = useDebounce(state.search, 1000)
  const queryState = useMemo(() => ({
    ...state,
    search: debouncedSearch,
    filters
  }), [state, debouncedSearch, filters])

  const { data: ordersResponse, isLoading, error } = useFetchOrdersQuery(queryState);
  const rows = (ordersResponse?.data ?? []) as Order[]
  const total = ordersResponse?.total ?? 0
  const totalPages = ordersResponse?.totalPages ?? 0

  return (
    <DataTable<Order> 
      title="Order History" 
      {...{ 
        columns: orderColumns, 
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

export default OrdersTable