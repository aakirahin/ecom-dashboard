import { DashboardMetricSummary, DashboardResponse, BreakdownDatum, RevenueTrendPoint } from "@/lib/types/data";
import { Order } from "@/lib/types/orders";
import { TableState } from "../reducer/tableReducer";

export const initOrdersState = (startDate: string, endDate: string): TableState<Order> => ({
    search: "",
    sort: { sortKey: "date", sortOrder: "desc" },
    pagination: { page: 1, perPage: 20000 },
    filters: { startDate, endDate }
})

// CALCULATE KPI
const calculateMetrics = (orders: Order[]): DashboardMetricSummary => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.revenue, 0);
    const averageOrderTotal = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const orderCountByCustomer = orders.reduce<Record<string, number>>((acc, order) => {
        acc[order.customer_id] = (acc[order.customer_id] ?? 0) + 1;
        return acc;
    }, {});

    const uniqueCustomers = Object.keys(orderCountByCustomer).length;
    const returningCustomers = Object.values(orderCountByCustomer).filter((count) => count > 1).length;
    const returningCustomersPct = uniqueCustomers > 0 ? (returningCustomers / uniqueCustomers) * 100 : 0;

    return {
        totalRevenue,
        totalOrders,
        averageOrderTotal,
        returningCustomersPct,
    };
};


// CALCULATE KPI % CHANGE OVER PERIOD
const calculateChangePct = (current: number, previous: number) => {
    if (previous === 0) return current === 0 ? 0 : 100;
    return ((current - previous) / previous) * 100;
};

export const buildRevenueTrend = (orders: Order[]): RevenueTrendPoint[] => {
    const grouped = orders.reduce<Record<string, number>>((acc, order) => {
        acc[order.date] = (acc[order.date] ?? 0) + order.revenue;
        return acc;
    }, {});

    return Object.entries(grouped)
        .map(([date, revenue]) => ({ date, revenue: +revenue.toFixed(2) }))
        .sort((a, b) => a.date.localeCompare(b.date));
};


// BUILD CATEGORY AND REGION BREAKDOWNS # TODO: MAKE REUSABLE
export const buildBreakdown = (orders: Order[], key: "product_category" | "region"): BreakdownDatum[] => {
    const grouped = orders.reduce<Record<string, number>>((acc, order) => {
        const groupKey = order[key];
        acc[groupKey] = (acc[groupKey] ?? 0) + 1;
        return acc;
    }, {});

    return Object.entries(grouped)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);
};

// DERIVED DATA FOR DASHBOARD
export const buildDashboardResponse = (currentOrders: Order[], previousOrders: Order[]): DashboardResponse => {
    const current = calculateMetrics(currentOrders);
    const previous = calculateMetrics(previousOrders);

    return {
        filteredOrderCount: currentOrders.length,
        kpis: {
            current,
            previous,
            changes: {
                revenue: calculateChangePct(current.totalRevenue, previous.totalRevenue),
                orders: calculateChangePct(current.totalOrders, previous.totalOrders),
                averageOrderTotal: calculateChangePct(current.averageOrderTotal, previous.averageOrderTotal),
                returningCustomersPct: calculateChangePct(current.returningCustomersPct, previous.returningCustomersPct),
            },
        },
        revenueTrend: buildRevenueTrend(currentOrders),
        categoryBreakdown: buildBreakdown(currentOrders, "product_category"),
        regionBreakdown: buildBreakdown(currentOrders, "region"),
    };
};