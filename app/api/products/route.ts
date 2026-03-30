import { NextResponse } from "next/server";
import { staticData } from "@/lib/data/mockData";
import { filter, paginate, sortData } from "@/lib/utils/utils";
import { Product } from "@/lib/types/products";
import { PaginatedResponse } from "@/lib/types/data";

export function GET(req: Request): NextResponse<PaginatedResponse<Product>> {
    const { products } = staticData;
    const { searchParams } = new URL(req.url);
    const {
        category,
        page = 1,
        pageSize = 50,
        sort,
        order = "asc"
    } = Object.fromEntries(searchParams.entries());

    let filtered = filter("products", products, { category });
    const sorted = sortData(
        filtered, 
        sort as keyof Product | null, 
        order as "asc" | "desc"
    );

    return NextResponse.json(paginate(sorted, +page, +pageSize));
}