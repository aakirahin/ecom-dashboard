import { NextResponse } from "next/server";
import { staticData } from "@/lib/data/mockData";
import { DashboardQueryState, DashboardResponse } from "@/lib/types/dashboard";
import { Order } from "@/lib/types/orders";
import { previousEndDate, previousStartDate } from "@/lib/utils/date";
import { buildDashboardResponse } from "@/lib/utils/dashboard";
import { filterOrders } from "@/lib/utils/utils";

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