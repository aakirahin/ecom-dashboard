"use client"

import React, { useState } from 'react'
import { cardClass } from '@/lib/styles/tailwindClasses'
import Card from './_components/Card'
import RevenueTrendWidget from './_components/Widgets/RevenueTrendWidget'
import PieChartWidget from './_components/Widgets/PieChartWidget'
import BarChartWidget from './_components/Widgets/BarChartWidget'
import { useFetchOrdersQuery } from '@/lib/queries/queries'

type Props = {}

// How do we make the dashboard customisable? 
// - Drag + drop
// - Removable widgets

// Where to store layout information?

const Page = (props: Props) => {
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
        <div className={`${cardClass} w-full m-4 mb-6 gap-6 p-6 flex flex-col flex-1 overflow-hidden`}>
            <div className='gap-2'>
                <h1 className='text-2xl text-[#626366] font-medium'>
                    Available Widgets
                </h1>
                <p>Widgets you can customise your dashboard with.</p>
            </div>
            <div className='flex flex-col gap-4 h-full w-full'>
                <div className='w-full h-1/2 flex gap-4'>
                    <BarChartWidget 
                        data={ordersResponse?.data ?? []}
                        loading={ordersLoading}
                        error={ordersError}
                    />
                    <RevenueTrendWidget 
                        data={ordersResponse?.data ?? []}
                        loading={ordersLoading}
                        error={ordersError}
                    />
                    <PieChartWidget 
                        data={ordersResponse?.data ?? []}
                        loading={ordersLoading}
                        error={ordersError}
                    />
                </div>
                {/* <div className='w-full h-1/2 flex gap-4'>
                    <TableWidget
                        ordersResponse={ordersResponse}
                        error={ordersError}
                        isLoading={ordersLoading}
                    />
                    <Card/>
                </div> */}
            </div>
        </div>
    )
}

export default Page