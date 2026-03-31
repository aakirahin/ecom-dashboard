"use client"

import React, { useState } from 'react'
import LineChart from '../Charts/LineChart'
import InsightsButton from './InsightsButton'
import { useFetchInsightsQuery } from '@/lib/queries/chat'
import { BotMessageSquare } from 'lucide-react'
import ChartLoading from '../SkeletonLoading/ChartLoading'
import { DashboardResponse, RevenueTrendPoint } from '@/lib/types/dashboard'
import { cardClass, titleClass } from '@/lib/styles/tailwindClasses'

type Props = {
  data: RevenueTrendPoint[]
  dashboard: DashboardResponse | undefined
  isLoading: boolean
  dashboardError: Error | null
}

const RevenueTrend = ({
  data,
  dashboard,
  isLoading,
  dashboardError
}: Props) => {
  const [showInsights, setShowInsights] = useState(false)

  const { insights, isFetching, error, refetch } = useFetchInsightsQuery(dashboard);
  const insightsVisible = showInsights && insights && !isFetching

  const handleInsightsToggle = async () => {
    setShowInsights(prev => !prev)
    if (!insights && dashboard) await refetch()
  }

  return (
    <div className={` ${cardClass} w-full xl:w-2/3`}>
      <div className='flex justify-between'>
        <span className={titleClass}>Revenue Trend</span>
        <InsightsButton
          handleInsightsToggle={handleInsightsToggle}
          isLoading={isFetching}
          label={showInsights ? 'Hide insights' : 'View insights'}
          error={dashboardError}
        />
      </div>
      {dashboardError && <p className='p-2 text-sm text-red-600'>Error loading revenue trend.</p>}
      <div className='flex h-full flex-col md:flex-row'>
        {
          isLoading ? 
          <ChartLoading/> :
          <div className={`${insightsVisible ? "md:w-5/8" : "w-full flex-1"} p-2 md:p-4`}>
            <LineChart<RevenueTrendPoint>
              data={data}
              xAxis="date"
              yAxis="revenue"
            />
          </div>
        }
        {
          showInsights &&
          <div className='flex flex-col gap-4 p-3 md:p-4 w-full md:w-3/8 border-t md:border-t-0 md:border-l border-gray-200'>
            {isFetching && 
              <span className='flex items-center gap-1.5 mt-0 m-2'>
                <BotMessageSquare size={16} color='#C8C8C8'/>
                <p className='animate-pulse'>
                  Generating insights...
                </p>
              </span>
            }
            {error && <p className='p-2 text-sm text-red-600'>{(error as Error).message}</p>}
            {insightsVisible && (
              <>
                <span className='flex gap-1 items-center'>
                  <BotMessageSquare size={16} color='#B57DFF'/>
                  <span
                    className="bg-clip-text font-medium leading-[normal] text-transparent whitespace-nowrap"
                    style={{ backgroundImage: "linear-gradient(112.068deg, rgb(181, 125, 255) 0%, rgb(78, 155, 255) 100%)" }}
                  >
                    Key Insights
                  </span>
                </span>
                <ul className='flex flex-col gap-2'>
                  {insights.split('\n').filter(line => line.trim()).map((line, i) => (
                    <li key={i}>{line.trim()}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        }
      </div>
    </div>
  )
}

export default RevenueTrend