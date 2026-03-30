import React, { useState } from 'react'
import Card from '../Card'
import { selectClass, titleClass } from '@/lib/styles/tailwindClasses'
import BarChart from '@/app/_components/Charts/BarChart'
import { sumSeries } from '@/lib/utils/charts'
import ChartLoading from '@/app/_components/SkeletonLoading/ChartLoading'

type Props = {
    data: any
    loading: boolean
    error: Error | null
}

type ViewOptions = {
    data: 'orders'
    value: 'revenue'
    group: 'region' | 'product_category' | 'segment'
} | {
    data: 'customers'
    value: 'count' | 'spend'
    group: 'segment'
}

const BarChartWidget = ({
    data,
    loading,
    error,
}: Props) => {
    const [view, setView] = useState<ViewOptions>({
        data: 'orders',
        value: 'revenue',
        group: 'region'
    })

    const barData = sumSeries(data ?? [], view.group, view.value)

    const handleSelect = (key: keyof ViewOptions, value: string) => {
        setView({ ...view, [key]: value })
    }

    return (
        <Card>
            <span className={titleClass}>Bar Chart</span>
            {
                loading ? 
                <ChartLoading/> :
                <BarChart
                    data={barData}
                    category={'category'}
                    value={'value'}
                    valueLabel={view.value}
                />
            }
            {error && <div className='text-red-600'>Error loading bar chart.</div>}
            <div className='flex gap-4'>
                <div className='flex flex-col gap-1'>
                    <label>Data</label>
                    <select
                        value={view.data}
                        onChange={(e) => handleSelect("data", e.target.value)}
                        className={`${selectClass} ${loading || !!error && 'opacity-50 cursor-not-allowed'}`}
                        disabled={loading || !!error}
                    >
                        <option value="orders">Orders</option>
                        <option value="customers" disabled>Customers</option>
                    </select>
                </div>
                <div className='flex flex-col gap-1'>
                    <label>Value</label>
                    <select
                        value={view.value}
                        onChange={(e) => handleSelect("value", e.target.value)}
                        className={`${selectClass} ${loading || !!error && 'opacity-50 cursor-not-allowed'}`}
                        disabled={loading || !!error}
                    >
                        {
                            view.data === "orders" ?
                            <option value="revenue">Revenue</option> :
                            <>
                                <option value="count">Count</option>
                                <option value="spend">Spend</option>
                            </>
                        }
                    </select>
                </div>
                <div className='flex flex-col gap-1'>
                    <label>Group by</label>
                    <select
                        value={view.group}
                        onChange={(e) => handleSelect("group", e.target.value)}
                        className={`${selectClass} ${loading || !!error && 'opacity-50 cursor-not-allowed'}`}
                        disabled={loading || !!error}
                    >
                        {
                            view.data === "orders" ?
                            <>
                                <option value="region">Region</option>
                                <option value="product_category">Product category</option>
                            </> :
                            <option value="segment">Segment</option>
                        }
                    </select>
                </div>
            </div>
        </Card>
    )
}

export default BarChartWidget