import React from 'react'
import { DashboardQueryState } from '@/lib/types/dashboard'
import { borderClass } from '@/lib/styles/tailwindClasses'
import OrdersTable from '../Table/_types/OrdersTable'

type Props = {
    filters: DashboardQueryState
}

const OrderHistory = ({
    filters
}: Props) => {
    return (
        <div className={`bg-white ${borderClass} rounded-lg w-1/2 h-full p-4 gap-4 flex flex-col overflow-y-scroll`}>
            <OrdersTable filters={filters}/>
        </div>
    )
}

export default OrderHistory