"use client"

import React, { useState } from 'react'
import KPIMetrics from './KPIMetrics'
import RevenueTrend from './RevenueTrend'
import Breakdown from './Breakdown'
import FilterBar from './FilterBar'
import { startDate, endDate } from '@/lib/utils/date'
import { useFetchDashboardQuery } from '@/lib/queries/queries'
import { DashboardQueryState } from '@/lib/types/dashboard'
import OrderHistory from './OrderHistory'

const ContentLayout = () => {
  const [dashboardFilters, setDashboardFilters] = useState<DashboardQueryState>({ 
    startDate,
    endDate,
    product_category: [], 
    region: [] 
  })

  const { 
    data: dashboardData, 
    isLoading: isDashboardLoading, 
    error: dashboardError 
  } = useFetchDashboardQuery(dashboardFilters)

  return (
    <div className='flex flex-col gap-4 px-4 pt-16 lg:pt-4 pb-24 lg:pb-6 flex-1 overflow-y-auto'>
      <FilterBar
        filters={dashboardFilters}
        setFilters={setDashboardFilters}
      />
      <div className='flex flex-col xl:flex-row gap-4'>
        <KPIMetrics
          dashboard={dashboardData}
          isLoading={isDashboardLoading}
          error={dashboardError}
        />
        <RevenueTrend 
          data={dashboardData?.revenueTrend ?? { data: [], series: [] }}
          dashboard={dashboardData}
          isLoading={isDashboardLoading}
          dashboardError={dashboardError}
        />
      </div>
      <div className='flex flex-col xl:flex-row gap-4'>
        <OrderHistory filters={dashboardFilters}/>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full xl:w-1/2'>
          <Breakdown
            title='Orders by Product Category'
            data={dashboardData?.categoryBreakdown ?? []}
            isLoading={isDashboardLoading}
            error={dashboardError}
          />
          <Breakdown
            title='Orders by Region'
            data={dashboardData?.regionBreakdown ?? []}
            isLoading={isDashboardLoading}
            error={dashboardError}
          />
        </div>
      </div>
    </div>
  )
}

export default ContentLayout