import { COLOURS } from '@/lib/utils/charts';
import React from 'react'
import { BarChart as Chart, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from 'recharts';

type CategoryValuePoint = {
    category: string
    value: number
}

type Props = {
    data: CategoryValuePoint[]
    category?: keyof CategoryValuePoint | string
    value?: keyof CategoryValuePoint | string
    valueLabel: string
}
const BarChart = ({
    data,
    category = 'category',
    value = 'value',
    valueLabel,
}: Props) => {
    return (
        <Chart 
            style={{ width: '100%', height: '100%' }} 
            responsive 
            data={data}
        >
            <CartesianGrid strokeDasharray="3 3" stroke="#E6E6E6"/>
            <XAxis dataKey={category} stroke="#7F7F7F"/>
            <YAxis width="auto" stroke="#7F7F7F"/>
            <Tooltip />
            <Bar
                dataKey={value}
                name={valueLabel}
                fill={COLOURS[0]}
                isAnimationActive={true}
                barSize={40}
            />
        </Chart>
    )
}

export default BarChart