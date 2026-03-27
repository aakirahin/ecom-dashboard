import { NextResponse } from "next/server";
import { staticData } from "@/lib/data/mockData";
import { DashboardQueryState, DashboardResponse } from "@/lib/types/data";
import { Order } from "@/lib/types/orders";
import { previousEndDate, previousStartDate } from "@/lib/utils/date";
import { buildDashboardResponse } from "@/lib/utils/dashboard";

export const filterOrders = (
    orders: Order[],
    params: DashboardQueryState
) => {
    const { startDate, endDate, regions, categories } = params;

    return orders.filter((order) => {
        if (regions.length && !regions.includes(order.region)) return false;
        if (categories.length && !categories.includes(order.product_category)) return false;
        if (startDate && new Date(order.date) < new Date(startDate)) return false;
        if (endDate && new Date(order.date) > new Date(endDate)) return false;
        return true;
    });
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

    const currentOrders = filterOrders(orders, { startDate, endDate, regions, categories });
    const previousOrders = filterOrders(orders, {
        startDate: previousStartDate,
        endDate: previousEndDate,
        regions,
        categories,
    });

    return NextResponse.json(buildDashboardResponse(currentOrders, previousOrders));
}