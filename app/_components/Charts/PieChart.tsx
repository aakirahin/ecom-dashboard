import { BreakdownDatum } from "@/lib/types/dashboard";
import { COLOURS } from "@/lib/utils/charts";
import React from "react";
import {
    PieChart as Chart,
    Tooltip,
    Pie,
    Legend,
    Cell,
} from "recharts";

type Props = {
    data: BreakdownDatum[];
};

const PieChart = ({ data }: Props) => {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    const renderLabel = ({ value }: { value?: number }) => value != null ? `${((value / total) * 100).toFixed(0)}%` : '';

    return (
        <Chart
            style={{ width: '100%', height: '90%' }}
            responsive
        >
            <Tooltip formatter={(value) => [value, 'Orders']} />
            <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ fontSize: "12px" }}
            />
            <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={"50%"}
                outerRadius={"75%"}
                label={renderLabel}
            >
                {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLOURS[index % COLOURS.length]} />
                ))}
            </Pie>
        </Chart>
    );
}

export default PieChart