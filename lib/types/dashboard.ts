export type DashboardQueryState = {
    startDate: string;
    endDate: string;
    product_category: string[];
    region: string[];
}

export type DashboardMetricSummary = {
    totalRevenue: number;
    totalOrders: number;
    averageOrderTotal: number;
    returningCustomersPct: number;
}

export type DashboardMetricChanges = {
    revenue: number;
    orders: number;
    averageOrderTotal: number;
    returningCustomersPct: number;
}

export type RevenueTrendPoint = {
    data: Record<string, string | number>[];
    series: string[];
}

export type BreakdownDatum = {
    name: string;
    value: number;
}

export type DashboardResponse = {
    filteredOrderCount: number;
    kpis: {
        current: DashboardMetricSummary;
        previous: DashboardMetricSummary;
        changes: DashboardMetricChanges;
    };
    revenueTrend: RevenueTrendPoint;
    categoryBreakdown: BreakdownDatum[];
    regionBreakdown: BreakdownDatum[];
}