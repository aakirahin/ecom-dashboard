"use client"

import React, { useMemo } from 'react'
import { Order } from '@/lib/types/orders';
import DataTable from '../Table/DataTable';
import { useTableState } from '@/app/_context/OrdersContextProvider';
import { useDebounce } from '@/lib/utils/hooks';
import { useFetchOrdersQuery } from '@/lib/queries/queries';
import { DashboardQueryState } from '@/lib/types/dashboard';
import { orderColumns } from '@/lib/utils/columns';

type Props = {
  filters: DashboardQueryState
}

const OrdersTable = ({ filters }: Props) => {
  const { state } = useTableState();
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
      }} 
    />
  )
}

export default OrdersTable