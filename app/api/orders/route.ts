import { NextResponse } from "next/server";
import { staticData } from "@/lib/data/mockData";
import { Order } from "@/lib/types/orders";
import { PaginatedResponse } from "@/lib/types/data";
import { filter, isNumber, paginate, sortData } from "@/lib/utils/utils";

export function GET(req: Request): NextResponse<PaginatedResponse<Order> | { error: string }> {
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

    if (!isNumber(page) || !isNumber(pageSize)) return NextResponse.json({ error: 'Check pagination is numerical.' }, { status: 400 })

    const filtered = filter("orders", orders, { search, startDate, endDate, regions, categories });
    const sorted = sortData(
        filtered, 
        sort as keyof Order | null, 
        order  as "asc" | "desc"
    );
    
    return NextResponse.json(paginate(sorted, +page, +pageSize));
}