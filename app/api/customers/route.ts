import { NextResponse } from "next/server";
import { staticData } from "@/lib/data/mockData";
import { filter, paginate, sortData } from "@/lib/utils/utils";
import { Customer } from "@/lib/types/customers";
import { PaginatedResponse } from "@/lib/types/data";

export function GET(req: Request): NextResponse<PaginatedResponse<Customer>> {
    const { customers } = staticData;
    const { searchParams } = new URL(req.url);
    const {
        search,
        segment,
        country,
        page = 1,
        pageSize = 50,
        sort,
        order = "asc"
    } = Object.fromEntries(searchParams.entries());

    let filtered = filter("customers", customers, { search, segment, country });
    const sorted = sortData(
        filtered, 
        sort as keyof Customer | null, 
        order as "asc" | "desc"
    );

    return NextResponse.json(paginate(sorted, +page, +pageSize));
}
