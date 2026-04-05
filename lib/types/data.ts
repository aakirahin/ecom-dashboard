import { Customer } from "./customers";
import { Order } from "./orders";
import { Product } from "./products";

export type PaginatedResponse<T> = {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    data: T[];
}

export type EntityMap = {
  orders: Order;
  customers: Customer;
  products: Product;
};

export type EntityType = keyof EntityMap;