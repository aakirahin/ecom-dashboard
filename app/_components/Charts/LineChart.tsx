import React from 'react'
import { LineChart as Chart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';

type Props<T> = {
    data: T[]
    xAxis: keyof T
    yAxis: keyof T
}

const LineChart = <T,>({
    data,
    xAxis,
    yAxis
}: Props<T>) => {
    const x = xAxis as string;
    const y = yAxis as string;

    return (
        <Chart
            style={{ width: '100%', height: '100%' }}
            responsive
            data={data}
        >
            <CartesianGrid strokeDasharray="3 3" stroke="#E6E6E6"/>
            <XAxis dataKey={x} stroke="#7F7F7F"/>
            <YAxis width="auto" dataKey={y} stroke="#7F7F7F"/>
            <Tooltip />
            <Line type="monotone" dataKey={y} stroke="#2081FF" isAnimationActive={true} />
        </Chart>
    )
}

export default LineChart