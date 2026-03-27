export type Product = {
    product_id: string;
    category: string;
    price: number;
}

export type ProductFilter = {
    category?: string;
}