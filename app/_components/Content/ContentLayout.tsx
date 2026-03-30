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

type Props = {}

const ContentLayout = (props: Props) => {
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
    <div className='flex flex-col gap-4 m-4 mb-6 flex-1 overflow-hidden'>
      <FilterBar
        filters={dashboardFilters}
        setFilters={setDashboardFilters}
      />
      <div className='flex flex-1 gap-4 h-1/2'>
        <KPIMetrics
          dashboard={dashboardData}
          isLoading={isDashboardLoading}
          error={dashboardError}
        />
        <RevenueTrend 
          data={dashboardData?.revenueTrend ?? []}
          dashboard={dashboardData}
          isLoading={isDashboardLoading}
          dashboardError={dashboardError}
        />
      </div>
      <div className='flex flex-1 overflow-auto gap-4 h-1/2'>
        <OrderHistory filters={dashboardFilters}/>
        <div className='flex gap-4 w-1/2'>
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