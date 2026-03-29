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
    categories: [], 
    regions: [] 
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
          error={dashboardError as Error | null}
        />
        <RevenueTrend 
          data={dashboardData?.revenueTrend ?? []}
          dashboard={dashboardData}
          isLoading={isDashboardLoading}
        />
      </div>
      <div className='flex flex-1 overflow-auto gap-4 h-1/2'>
        <OrderHistory dashboardFilters={dashboardFilters}/>
        <div className='flex gap-4 w-1/2'>
          <Breakdown
            title='Category'
            data={dashboardData?.categoryBreakdown ?? []}
            isLoading={isDashboardLoading}
          />
          <Breakdown
            title='Region'
            data={dashboardData?.regionBreakdown ?? []}
            isLoading={isDashboardLoading}
          />
        </div>
      </div>
    </div>
  )
}

export default ContentLayout