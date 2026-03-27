import { NextResponse } from "next/server";
import { staticData } from "@/lib/data/mockData";
import { paginate, sortData } from "@/lib/utils/utils";
import { Customer } from "@/lib/types/customers";
import { PaginatedResponse } from "@/lib/types/data";

export function GET(req: Request): NextResponse<PaginatedResponse<Customer>> {
    const { customers } = staticData;
    const { searchParams } = new URL(req.url);
    const {
        segment,
        country,
        page = 1,
        pageSize = 50,
        sort,
        order = "asc"
    } = Object.fromEntries(searchParams.entries());

    let filtered = customers;

    if (segment) filtered = filtered.filter((c) => c.segment === segment);
    if (country) filtered = filtered.filter((c) => c.country === country);

    const sorted = sortData(
        filtered, 
        sort as keyof Customer | null, 
        order as "asc" | "desc"
    );

    return NextResponse.json(paginate(sorted, +page, +pageSize));
}
