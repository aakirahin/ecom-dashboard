import { COLOURS } from '@/lib/utils/charts';
import React from 'react'
import { LineChart as Chart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';

type Props<T> = {
    data: T[]
    xAxis: keyof T
    yAxis: keyof T | Array<keyof T | string>
}

const LineChart = <T extends Record<string, any>>({
    data,
    xAxis,
    yAxis
}: Props<T>) => {
    const x = xAxis as string;
    const ySeries = (Array.isArray(yAxis) ? yAxis : [yAxis]).map((series) => series as string);

    return (
        <Chart
            style={{ width: '100%', height: '100%' }}
            responsive
            data={data}
        >
            <CartesianGrid strokeDasharray="3 3" stroke="#E6E6E6"/>
            <XAxis dataKey={x} stroke="#7F7F7F"/>
            <YAxis width="auto" stroke="#7F7F7F"/>
            <Tooltip />
            {ySeries.length > 1 && <Legend />}
            {ySeries.map((series, index) => (
                <Line
                    key={series}
                    type="monotone"
                    dataKey={series}
                    name={series}
                    stroke={COLOURS[index % COLOURS.length]}
                    isAnimationActive={true}
                />
            ))}
        </Chart>
    )
}

export default LineChart