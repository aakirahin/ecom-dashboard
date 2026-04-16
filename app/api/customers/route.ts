import { NextResponse } from "next/server";
import { staticData } from "@/lib/data/mockData";
import { isNumber, filter, paginate, sortData } from "@/lib/utils/utils";
import { Customer } from "@/lib/types/customers";
import { PaginatedResponse } from "@/lib/types/data";

export function GET(req: Request): NextResponse<PaginatedResponse<Customer> | { error: string }> {
    const { customers } = staticData;
    const { searchParams } = new URL(req.url);
    const {
        search,
        page = 1,
        pageSize = 50,
        sort,
        order = "asc"
    } = Object.fromEntries(searchParams.entries());    
    const segments = searchParams.getAll("segment");
    const countries = searchParams.getAll("country");

    if (!isNumber(page) || !isNumber(pageSize)) return NextResponse.json({ error: 'Check pagination is numerical.' }, { status: 400 })

    const filtered = filter("customers", customers, { search, segments, countries });
    const sorted = sortData(
        filtered, 
        sort as keyof Customer | null, 
        order as "asc" | "desc"
    );

    return NextResponse.json(paginate(sorted, +page, +pageSize));
}
