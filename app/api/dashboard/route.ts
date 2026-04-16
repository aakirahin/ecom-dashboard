import { NextResponse } from "next/server";
import { staticData } from "@/lib/data/mockData";
import { DashboardMetricSummary, DashboardResponse } from "@/lib/types/dashboard";
import { Order } from "@/lib/types/orders";
import { buildBreakdown, buildTrend } from "@/lib/utils/charts";
import { filter } from "@/lib/utils/utils";
import { formatDate } from "@/lib/utils/date";

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

// DERIVED DATA FOR DASHBOARD
export const buildDashboardResponse = (currentOrders: Order[], previousOrders: Order[]): DashboardResponse => {
    const current = calculateMetrics(currentOrders);
    const previous = calculateMetrics(previousOrders);

    // TODO: MAKE DYNAMIC TO ALLOW CUSTOMISATION
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
        revenueTrend: buildTrend(currentOrders, "revenue"),
        categoryBreakdown: buildBreakdown(currentOrders, "product_category"),
        regionBreakdown: buildBreakdown(currentOrders, "region"),
    };
};

export function GET(req: Request): NextResponse<DashboardResponse> {
    const { orders } = staticData;
    const { searchParams } = new URL(req.url);
    const {
        startDate,
        endDate,
    } = Object.fromEntries(searchParams.entries());
    const regions = searchParams.getAll("region");
    const categories = searchParams.getAll("category");

    const previousEnd = new Date(startDate)
    previousEnd.setDate(previousEnd.getDate() - 1)

    const previousStart = new Date(previousEnd)
    previousStart.setMonth(previousStart.getMonth() - 1)

    const currentOrders = filter("orders", orders, { startDate, endDate, regions, categories });
    const previousOrders = filter("orders", orders, {
        startDate: formatDate(previousStart),
        endDate: formatDate(previousEnd),
        regions,
        categories,
    });

    return NextResponse.json(buildDashboardResponse(currentOrders, previousOrders));
}