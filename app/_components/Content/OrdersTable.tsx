"use client"

import React, { useMemo } from 'react'
import { Order } from '@/lib/types/orders';
import DataTable, { Column } from '../Table/DataTable';
import { Calendar, DollarSign, Globe, Hash, ShoppingBag } from 'lucide-react';
import { useTableState } from '@/app/_context/OrdersContextProvider';
import { DashboardFilters } from '@/lib/types/data';
import { useDebounce } from '@/lib/utils/hooks';
import { useFetchOrdersQuery } from '@/lib/queries/queries';

type Props = {
  dashboardFilters: DashboardFilters
}

const columns: Column<Order>[] = [
  {
    key: "order_id",
    icon: <Hash size={14}/>,
    label: "Order ID",
    sortable: true,
    render: (value) => `# ${value}`,
  },
  {
    key: "date",
    icon: <Calendar size={14}/>,
    label: "Date",
    sortable: true,
  },
  {
    key: "revenue",
    icon: <DollarSign size={14}/>,
    label: "Revenue",
    sortable: true,
    render: (value) => `£${value}`,
  },
  {
    key: "product_category",
    icon: <ShoppingBag size={14}/>,
    label: "Product",
    sortable: true,
  },
  {
    key: "region",
    icon: <Globe size={14}/>,
    label: "Region",
    sortable: true,
  }
];

const OrdersTable = ({ dashboardFilters }: Props) => {
  const { state } = useTableState();
  const debouncedSearch = useDebounce(state.search, 1000)

  const queryState = useMemo(() => ({
    ...state,
    search: debouncedSearch,
    filters: {
      ...state.filters,
      ...(dashboardFilters.categories.length ? { product_category: dashboardFilters.categories } : {}),
      ...(dashboardFilters.regions.length ? { region: dashboardFilters.regions } : {}),
    }
  }), [state, debouncedSearch, dashboardFilters])

  const { data: ordersResponse, isLoading, error } = useFetchOrdersQuery(queryState);
  const rows = (ordersResponse?.data ?? []) as Order[]
  const total = ordersResponse?.total ?? 0
  const totalPages = ordersResponse?.totalPages ?? 0
  
  return (
    <DataTable<Order> 
      title="Order History" 
      {...{ 
        columns, 
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