import { EntityType } from "../types/data";

export const paginate = <T>(
    items: T[], 
    page: number, 
    pageSize: number
) => {
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

export const sortData = <T>(
  items: T[],
  sortKey: keyof T | null,
  order: "asc" | "desc" = "asc"
): T[] => {
    if (!sortKey) return items;

    return [...items].sort((a, b) => {
        const x = a[sortKey];
        const y = b[sortKey];

        if (typeof x === "number" && typeof y === "number") {
            return order === "asc" ? x - y : y - x;
        }

        return order === "asc"
            ? String(x).localeCompare(String(y))
            : String(y).localeCompare(String(x));
    });
}

export const filter = <T extends Record<string, any>>(type: EntityType, data: T[], params: any) => {
    switch (type) {
        case 'orders':
            const { search: orderSearch, startDate, endDate, regions, categories: orderCategories } = params;
            return data.filter((d) => {
                if (
                    (orderSearch && !d.order_id.toLowerCase().includes(orderSearch.toLowerCase())) ||
                    (regions.length && !regions.includes(d.region)) ||
                    (orderCategories.length && !orderCategories.includes(d.product_category)) ||
                    (startDate && new Date(d.date) < new Date(startDate)) ||
                    (endDate && new Date(d.date) > new Date(endDate))
                ) return false;
                return true;
            });
        case 'products':
            const { categories: productCategories } = params;
            if (productCategories.length) return data.filter((d) => (productCategories.includes(d.category)));
            return data
        case 'customers':
            const { search: customerSearch, segments, countries } = params;
            return data.filter((d) => {
                if (
                    (customerSearch && !d.customer_id.toLowerCase().includes(customerSearch.toLowerCase())) ||
                    (segments.length && !segments.includes(d.segment)) ||
                    (countries.length && !countries.includes(d.country))
                ) return false;
                return true;
            });
        default:
            return data;
    }
}