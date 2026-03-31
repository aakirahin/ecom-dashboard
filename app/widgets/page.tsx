"use client"

import React, { useState } from 'react'
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
        <div className={`${cardClass} w-full m-4 mb-6 gap-6 p-6 flex flex-col flex-1`}>
            <div className='gap-2'>
                <h1 className='text-2xl text-[#626366] font-medium'>
                    Available Widgets
                </h1>
                <p>Widgets you can customise your dashboard with.</p>
            </div>
            <div className='flex flex-col gap-4 w-full h-full overflow-hidden'>
                <div className='w-full h-1/2 flex gap-4'>
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
                <div className='w-full h-1/2 flex gap-4 flex-1 overflow-auto'>
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
        </div>
    )
}

export default Page