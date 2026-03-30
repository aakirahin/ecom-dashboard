import OrdersContextProvider from '@/app/_context/OrdersContextProvider'
import React from 'react'
import OrdersTable from './OrdersTable'
import { DashboardQueryState } from '@/lib/types/dashboard'
import { borderClass } from '@/lib/styles/tailwindClasses'

type Props = {
    filters: DashboardQueryState
}

const OrderHistory = ({
    filters
}: Props) => {
  return (
    <OrdersContextProvider>
        <div className={`bg-white ${borderClass} rounded-lg w-1/2 h-full p-4 gap-4 flex flex-col overflow-y-scroll`}>
            <OrdersTable filters={filters}/>
        </div>
    </OrdersContextProvider>
  )
}

export default OrderHistory