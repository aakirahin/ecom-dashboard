import React, { useState } from 'react'
import Card from '../Card'
import { selectClass, titleClass } from '@/lib/styles/tailwindClasses'
import PieChart from '@/app/_components/Charts/PieChart'
import { buildBreakdown } from '@/lib/utils/charts'
import PieLoading from '@/app/_components/SkeletonLoading/PieLoading'

type Props = {
    data: any
    loading: boolean
    error: Error | null
}

const PieChartWidget = ({
    data,
    loading,
    error
}: Props) => {
    const [breakdownBy, setBreakdownBy] = useState<'region' | 'product_category' | 'segment'>('region')
    const pieData = buildBreakdown(data || [], breakdownBy)

    return (
        <Card>
            <span className={titleClass}>Orders Breakdown</span>
            {
                loading ? 
                <PieLoading/> :
                <PieChart data={pieData}/>
            }
            {error && <div className='text-red-600'>Error loading pie chart.</div>}
            <div className='flex flex-col gap-1 w-fit'>
                <label>Revenue by</label>
                <select
                    value={breakdownBy}
                    onChange={(e) => setBreakdownBy(e.target.value as 'region' | 'product_category' | 'segment')}
                    className={`${selectClass} ${loading || !!error && 'opacity-50 cursor-not-allowed'}`}
                    disabled={loading || !!error}
                >
                    <option value="region">Region</option>
                    <option value="product_category">Category</option>
                    {/* <option value="segment">User Segment</option> */}
                </select>
            </div>
        </Card>
    )
}

export default PieChartWidget