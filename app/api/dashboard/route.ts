import { NextResponse } from "next/server";
import { staticData } from "@/lib/data/mockData";
import { DashboardResponse } from "@/lib/types/dashboard";
import { previousEndDate, previousStartDate } from "@/lib/utils/date";
import { buildDashboardResponse, filterOrders } from "@/lib/utils/dashboard";

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