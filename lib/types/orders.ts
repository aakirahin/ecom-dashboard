export type Order = {
    order_id: string;
    date: string;
    revenue: number;
    product_category: string;
    region: string;
    customer_id: string;
}

export type OrderFilter = {
    region?: string;
    category?: string;
    startDate?: string;
    endDate?: string;
}