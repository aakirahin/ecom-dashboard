import { EntityType } from "../types/data";

export const isNumber = (value: any) => {
    const int = parseInt(value)
    return !isNaN(int)
}

export const paginate = <T>(
    items: T[], 
    page: number, 
    pageSize: number
) => {
    if (
        !Array.isArray(items) ||
        !Number.isInteger(page) || page < 1 ||
        !Number.isInteger(pageSize) || pageSize < 1
    ) {
        throw new Error("Check pagination again.");
    }

    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return {
        page,
        pageSize,
        total: items.length,
        totalPages: Math.ceil(items.length / pageSize),
        data: items.slice(start, end)
    };
}

export const sortData = <T extends Record<string, any>>(
  items: T[],
  sortKey: keyof T | null,
  order: "asc" | "desc" = "asc"
): T[] => {
    if (!sortKey) return items

    if (
        (!Array.isArray(items)) ||
        (order !== "asc" && order !== "desc") ||
        (items.length > 0 && sortKey && !(sortKey in items[0]))
    ) {
        throw new Error("Check sorting again.");
    }

    return [...items].sort((a, b) => {
        const x = a[sortKey];
        const y = b[sortKey];

        // Handle null/undefined values
        if (x == null && y == null) return 0;
        if (x == null) return order === "asc" ? 1 : -1;
        if (y == null) return order === "asc" ? -1 : 1;

        if (typeof x === "number" && typeof y === "number") {
            return order === "asc" ? x - y : y - x;
        }

        return order === "asc"
            ? String(x).localeCompare(String(y))
            : String(y).localeCompare(String(x));
    });
}

export const filter = <T extends Record<string, any>>(type: EntityType, data: T[], params: any) => {
    if (!Array.isArray(data)) throw new Error("Data must be an array");
    if (!params || typeof params !== "object") return data;

    switch (type) {
        case 'orders':
            const { 
                search: orderSearch = "", 
                startDate = null, 
                endDate = null, 
                regions = [], 
                categories: orderCategories = [] 
            } = params;
            
            if (typeof orderSearch !== "string") throw new Error("Order search parameter must be a string");
            if (!Array.isArray(regions) || !Array.isArray(orderCategories)) throw new Error("Regions and categories must be arrays");

            return data.filter((d) => {
                if (
                    (orderSearch && d.order_id && !d.order_id.toLowerCase().includes(orderSearch.toLowerCase())) ||
                    (regions.length && !regions.includes(d.region)) ||
                    (orderCategories.length && !orderCategories.includes(d.product_category)) ||
                    (startDate && d.date && new Date(d.date) < new Date(startDate)) ||
                    (endDate && d.date && new Date(d.date) > new Date(endDate))
                ) return false;
                return true;
            });
        case 'products':
            const { categories: productCategories = [] } = params;
            
            if (!Array.isArray(productCategories)) throw new Error("Categories must be an array");
            if (productCategories.length) return data.filter((d) => (productCategories.includes(d.category)));
            
            return data
        case 'customers':
            const { search: customerSearch = "", segments = [], countries = [] } = params;
            
            if (typeof customerSearch !== "string") throw new Error("Customer search parameter must be a string");
            if (!Array.isArray(segments) || !Array.isArray(countries)) throw new Error("Segments and countries must be arrays");

            return data.filter((d) => {
                if (
                    (customerSearch && d.customer_id && !d.customer_id.toLowerCase().includes(customerSearch.toLowerCase())) ||
                    (segments.length && !segments.includes(d.segment)) ||
                    (countries.length && !countries.includes(d.country))
                ) return false;
                return true;
            });
        default:
            console.warn(`Unknown filter type: ${type}, returning all data`);
            return data;
    }
}