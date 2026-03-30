import { selectClass, titleClass } from '@/lib/styles/tailwindClasses'
import { buildTrend } from '@/lib/utils/charts'
import React, { useState } from 'react'
import Card from '../Card'
import ChartLoading from '@/app/_components/SkeletonLoading/ChartLoading'
import Toggle from '../Toggle'
import LineChart from '@/app/_components/Charts/LineChart'

type Props = {
    data: any
    loading: boolean
    error: Error | null
}

const RevenueTrendWidget = ({
    data,
    loading,
    error
}: Props) => {
    const [revenueBy, setRevenueBy] = useState<'total' | 'region' | 'product_category' | 'segment'>('total')
    const [showSeries, setShowSeries] = useState<boolean>(true)

    const trendByTotal = buildTrend(data ?? [], 'revenue')
    const { data: trendData, series } = revenueBy === 'total' ? 
        { data: trendByTotal, series: ['revenue'] } : 
        buildTrend(data ?? [], 'revenue', revenueBy)

    const handleToggle = (newState: boolean) => {
        setShowSeries(newState)
        if (!newState) setRevenueBy('total')
    }

    return (
        <Card>
            <span className={titleClass}>Revenue Trend</span>
            {
                loading ? 
                <ChartLoading/> :
                <LineChart data={trendData} xAxis="date" yAxis={series}/>
            }
            {error && <div className='text-red-600'>Error loading line chart.</div>}
            <div className='flex gap-4'>
                <div className='flex flex-col gap-1'>
                    <label>Revenue by</label>
                    <select
                        value={revenueBy}
                        onChange={(e) => setRevenueBy(e.target.value as 'total' | 'region' | 'product_category' | 'segment')}
                        className={`${selectClass} ${(!showSeries || loading || !!error) && 'opacity-50 cursor-not-allowed'}`}
                        disabled={!showSeries || loading || !!error}
                    >
                        <option value="total">Total</option>
                        <option value="region">Region</option>
                        <option value="product_category">Category</option>
                        {/* <option value="segment">User Segment</option> */}
                    </select>
                </div>
                <Toggle 
                    label='Show series' 
                    initial={showSeries} 
                    onToggle={handleToggle} 
                    error={error}
                />
            </div>
        </Card>
    )
}

export default RevenueTrendWidget