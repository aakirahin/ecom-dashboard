import { NextResponse } from "next/server";
import { staticData } from "@/lib/data/mockData";
import { paginate, sortData } from "@/lib/utils/utils";
import { Order } from "@/lib/types/orders";
import { PaginatedResponse } from "@/lib/types/data";
import { filterOrders } from "../dashboard/route";

export function GET(req: Request): NextResponse<PaginatedResponse<Order>> {
    const { orders } = staticData;
    const { searchParams } = new URL(req.url);
    const {
        search,
        startDate,
        endDate,
        page = 1,
        pageSize = 10,
        sort,
        order = "asc"
    } = Object.fromEntries(searchParams.entries());

    const regions = searchParams.getAll("region");
    const categories = searchParams.getAll("category");

    let filtered = orders;

    if (search) filtered = filtered.filter((o) => o.order_id.toLowerCase().includes(search.toLowerCase()));
    filtered = filterOrders(filtered, { startDate, endDate, regions, categories });
    
    const sorted = sortData(
        filtered, 
        sort as keyof Order | null, 
        order  as "asc" | "desc"
    );
    
    return NextResponse.json(paginate(sorted, +page, +pageSize));
}