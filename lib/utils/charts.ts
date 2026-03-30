import { BreakdownDatum } from "../types/dashboard";

export const COLOURS = [
    '#2081FF',
    '#F97316',
    '#22C55E',
    '#A855F7',
    '#EF4444',
    '#14B8A6',
    '#EAB308',
    '#6366F1',
]

// GET DAILY TOTAL OF CHOSEN VALUE FOR LINE CHART
export const buildTrend = <T extends Record<string, any>>(
    data: T[], 
    value: keyof T,
    group?: keyof T,
) => {
    if (!group) {
        const grouped = data.reduce<Record<string, number>>((acc, d) => {
            acc[d.date] = (acc[d.date] ?? 0) + d[value];
            return acc;
        }, {});
    
        return Object.entries(grouped)
            .map(([date, yValue]) => ({ date, [value]: +yValue.toFixed(2) }))
            .sort((a, b) => a.date.localeCompare(b.date));
    }

    const groupedByDate = data.reduce<Record<string, Record<string, number>>>((acc, d) => {
        const dateKey = String(d.date);
        const groupKey = String(d[group]);
        const yValue = Number(d[value]) || 0;

        if (!acc[dateKey]) acc[dateKey] = {};

        acc[dateKey][groupKey] = (acc[dateKey][groupKey] ?? 0) + yValue;
        return acc;
    }, {});

    const series = Array.from(
        new Set(data.map((d) => String(d[group])))
    ).sort((a, b) => a.localeCompare(b));

    const trend = Object.entries(groupedByDate)
        .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
        .map(([date, valuesByGroup]) => {
            const point: Record<string, string | number> = { date };

            series.forEach((seriesKey) => {
                point[seriesKey] = +((valuesByGroup[seriesKey] ?? 0).toFixed(2));
            });

            return point;
        });

    return {
        data: trend,
        series,
    };
}

// GET TOTAL ITEMS PER CATEGORY OF CHOSEN GROUP FOR PIE CHART
export const buildBreakdown = <T extends Record<string, any>>(
    data: T[], 
    group: keyof T
): BreakdownDatum[] => {
    const grouped = data.reduce<Record<string, number>>((acc, d) => {
        const groupKey = d[group];
        acc[groupKey] = (acc[groupKey] ?? 0) + 1;
        return acc;
    }, {});

    return Object.entries(grouped).map(([name, value]) => ({ name, value }))
};

// GET SUM OF CHOSEN VALUE PER CATEGORY FOR CHOSEN GROUP FOR BAR CHART
export const sumSeries = <T extends Record<string, any>>(
    data: T[], 
    group: keyof T,
    value: keyof T
) => {
    const series = data.reduce<Record<string, number>>((acc, d) => {
        const groupKey = String(d[group])
        const revenue = Number(d[value]) || 0;
        
        if (!acc[groupKey]) acc[groupKey] = 0
        acc[groupKey] = (acc[groupKey] ?? 0) + revenue
        
        return acc
    }, {})

    return Object.entries(series).map(([category, value]) => ({ category, value: +value.toFixed(2) }))
}