import React, { useMemo } from 'react'
import Card from '../Card'
import DataTable from '@/app/_components/Table/DataTable'
import { Order } from '@/lib/types/orders'
import { orderColumns } from '@/lib/utils/columns'
import { PaginatedResponse } from '@/lib/types/data'

type Props = {
    ordersResponse: PaginatedResponse<Order> | undefined
    error: Error | null
    isLoading: boolean
}

const TableWidget = ({
    ordersResponse,
    error,
    isLoading
}: Props) => {
    const rows = (ordersResponse?.data ?? []) as Order[]
    const total = ordersResponse?.total ?? 0
    const totalPages = ordersResponse?.totalPages ?? 0

    return (
        <Card className='overflow-y-scroll'>
            <DataTable<Order>
                title="Table"
                {...{ 
                    columns: orderColumns, 
                    error, 
                    isLoading,
                    rows,
                    total,
                    totalPages,
                }} 
            />
        </Card>
    )
}

export default TableWidget