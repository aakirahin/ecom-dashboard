"use client"

import React, { useState } from 'react'
import LineChart from '../Charts/LineChart'
import InsightsButton from './InsightsButton'
import { useFetchInsightsQuery } from '@/lib/queries/chat'
import { BotMessageSquare } from 'lucide-react'
import ChartLoading from '../SkeletonLoading/ChartLoading'
import { DashboardResponse, RevenueTrendPoint } from '@/lib/types/data'

type Props = {
  data: RevenueTrendPoint[]
  dashboard: DashboardResponse | undefined
  isLoading: boolean
}

const RevenueTrend = ({
  data,
  dashboard,
  isLoading
}: Props) => {
  const [showInsights, setShowInsights] = useState(false)

  const { insights, isFetching, error, refetch } = useFetchInsightsQuery(dashboard);

  const handleInsightsToggle = async () => {
    setShowInsights(!showInsights)
    if (!insights && dashboard) await refetch()
  }

  return (
    <div className='bg-white border border-gray-200 rounded-lg w-2/3 p-4 flex flex-col'>
      <div className='flex justify-between'>
        <span className='text-[16px] text-[#626366] font-medium'>Revenue Trend</span>
        <InsightsButton
          onFetch={handleInsightsToggle}
          isLoading={isFetching}
          label={showInsights ? 'Hide insights' : 'View insights'}
        />
      </div>
      <div className='w-full flex-1 p-4'>
        {
          isLoading ? 
          <ChartLoading/> :
          <LineChart<RevenueTrendPoint>
            data={data}
            xAxis="date"
            yAxis="revenue"
          />
        }
      </div>
      {showInsights && isFetching && 
        <span className='flex items-center gap-1.5 mt-0 m-2'>
          <BotMessageSquare size={16} color='#C8C8C8'/>
          <p className='animate-pulse'>
            Generating insights...
          </p>
        </span>
      }
      {showInsights && error && !isFetching && <p className='px-2 pb-2 text-sm text-red-600'>{(error as Error).message}</p>}
      {showInsights && insights && !isFetching && (
        <div className='flex flex-col gap-2 p-4 border border-gray-200 rounded-lg'>
          <span className='flex gap-1 items-center'>
            <BotMessageSquare size={16} color='#B57DFF'/>
            <span
              className="bg-clip-text font-medium leading-[normal] text-transparent whitespace-nowrap"
              style={{ backgroundImage: "linear-gradient(112.068deg, rgb(181, 125, 255) 0%, rgb(78, 155, 255) 100%)" }}
            >
              Key Insights
            </span>
          </span>
          <ul className='flex flex-col gap-1'>
            {insights.split('\n').filter(line => line.trim()).map((line, i) => (
              <li key={i}>{line.trim()}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default RevenueTrend