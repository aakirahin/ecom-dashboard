"use client"

import React from 'react'
import { cardClass, titleClass } from '@/lib/styles/tailwindClasses'
import Card from './_components/Card'
import RevenueTrendWidget from './_components/Widgets/RevenueTrendWidget'
import PieChartWidget from './_components/Widgets/PieChartWidget'
import BarChartWidget from './_components/Widgets/BarChartWidget'
import { useFetchOrdersQuery } from '@/lib/queries/queries'
import { Hammer } from 'lucide-react'
import TableWidget from './_components/Widgets/TableWidget'

// How do we make the dashboard customisable? 
// - Drag + drop
// - Removable widgets

// Where to store layout information?

const Page = () => {
    const { 
        data: ordersResponse, 
        isLoading: ordersLoading, 
        error: ordersError
    } = useFetchOrdersQuery({
        search: "",
        sort: {
            sortKey: "",
            sortOrder: ""
        },
        pagination: {
            page: 1,
            perPage: 10
        },
    });

    return (
        <div className={`gap-4 md:p-6 sm:p-2 flex flex-col flex-1 px-4 pt-20 xl:pt-4 pb-24 xl:pb-6 min-w-0 overflow-y-auto xl:overflow-hidden`}>
            <div className='gap-2'>
                <h1 className='text-2xl text-[#626366] font-medium'>
                    Available Widgets
                </h1>
                <p>Widgets you can customise your dashboard with.</p>
            </div>
            <div className='xl:h-1/2 flex xl:flex-row flex-col gap-4'>
                <BarChartWidget 
                    title="Bar Chart"
                    data={ordersResponse?.data ?? []}
                    loading={ordersLoading}
                    error={ordersError}
                    showOptions={true}
                />
                <RevenueTrendWidget 
                    title="Revenue Trend"
                    data={ordersResponse?.data ?? []}
                    loading={ordersLoading}
                    error={ordersError}
                    showOptions={true}
                />
                <PieChartWidget 
                    title="Orders Breakdown"
                    data={ordersResponse?.data ?? []}
                    loading={ordersLoading}
                    error={ordersError}
                    showOptions={true}
                />
            </div>
            <div className='xl:h-1/2 flex xl:flex-row flex-col gap-4 flex-1 xl:overflow-auto'>
                <TableWidget/>
                <Card>
                    <span className={titleClass}>KPI Metrics</span>
                    <p className='text-[#2081FF] font-medium flex gap-1 items-center'>
                        <Hammer size={14} color='#2081FF'/>
                        Coming soon
                    </p>
                </Card>
            </div>
        </div>
    )
}

export default Page