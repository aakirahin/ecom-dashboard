import OrdersContextProvider from '@/app/_context/OrdersContextProvider'
import React from 'react'
import OrdersTable from './OrdersTable'
import { DashboardFilters } from '@/lib/types/dashboard'
import { borderClass } from '@/lib/styles/tailwindClasses'

type Props = {
    dashboardFilters: DashboardFilters
}

const OrderHistory = ({
    dashboardFilters
}: Props) => {
  return (
    <OrdersContextProvider>
        <div className={`bg-white ${borderClass} rounded-lg w-1/2 h-full p-4 gap-4 flex flex-col overflow-y-scroll`}>
            <OrdersTable dashboardFilters={dashboardFilters}/>
        </div>
    </OrdersContextProvider>
  )
}

export default OrderHistory