export type DashboardFilters = {
    categories: string[];
    regions: string[];
}

export type DashboardQueryState = {
    startDate: string;
    endDate: string;
} & DashboardFilters

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
    date: string;
    revenue: number;
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
    revenueTrend: RevenueTrendPoint[];
    categoryBreakdown: BreakdownDatum[];
    regionBreakdown: BreakdownDatum[];
}