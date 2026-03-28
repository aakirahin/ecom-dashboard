import { DashboardQueryState } from "../types/dashboard";
import { Order } from "../types/orders";

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

export const filterOrders = (
    orders: Order[],
    params: DashboardQueryState
) => {
    const { startDate, endDate, regions, categories } = params;

    return orders.filter((order) => {
        if (regions.length && !regions.includes(order.region)) return false;
        if (categories.length && !categories.includes(order.product_category)) return false;
        if (startDate && new Date(order.date) < new Date(startDate)) return false;
        if (endDate && new Date(order.date) > new Date(endDate)) return false;
        return true;
    });
};