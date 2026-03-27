import { faker } from "@faker-js/faker";
import { Customer, Order, Product } from "./types";

// -------------------------
// Config
// -------------------------
const NUM_PRODUCTS = 60;
const NUM_CUSTOMERS = 3000;
const NUM_ORDERS = 12000;

const PRODUCT_CATEGORIES = [
    "Electronics",
    "Home & Kitchen",
    "Fashion",
    "Sports",
    "Beauty",
    "Toys",
    "Books",
    "Groceries"
] as const;

const REGION_WEIGHTS = {
    Europe: 0.4,
    "North America": 0.3,
    Asia: 0.15,
    "South America": 0.07,
    Oceania: 0.05,
    Africa: 0.03
};

const COUNTRIES_BY_REGION: Record<string, string[]> = {
    Europe: ["United Kingdom", "Germany", "France", "Spain", "Italy", "Netherlands", "Sweden"],
    "North America": ["United States", "Canada", "Mexico"],
    Asia: ["India", "China", "Japan", "Singapore"],
    "South America": ["Brazil", "Argentina", "Chile"],
    Oceania: ["Australia", "New Zealand"],
    Africa: ["South Africa", "Nigeria", "Kenya"]
};

const SEGMENT_WEIGHTS = {
    new: 0.35,
    returning: 0.5,
    VIP: 0.15
};

const CATEGORY_PRICE_RANGES: Record<string, [number, number]> = {
    Electronics: [50, 1500],
    "Home & Kitchen": [15, 300],
    Fashion: [10, 250],
    Sports: [20, 400],
    Beauty: [5, 120],
    Toys: [5, 150],
    Books: [5, 60],
    Groceries: [2, 80]
};

// -------------------------
// Helpers
// -------------------------
const weightedRandom = <T extends string>(
    weights: Record<T, number>
): T  => {
    const entries = Object.entries(weights) as [T, number][];
    const total = entries.reduce((sum, [, w]) => sum + w, 0);
    let r = Math.random() * total;

    for (const [key, weight] of entries) {
        if (r < weight) return key;
        r -= weight;
    }

    return entries[entries.length - 1][0];
}

const randomPrice = ([min, max]: [number, number]): number => {
    return faker.number.float({ min, max, fractionDigits: 2 });
}

// -------------------------
// Generate Products
// -------------------------
export const generateProducts = (): {
  products: Product[];
  popularity: number[];
} => {
    const products: Product[] = [];
    const popularity: number[] = [];

    for (let i = 1; i <= NUM_PRODUCTS; i++) {
        const category = faker.helpers.arrayElement(PRODUCT_CATEGORIES);
        const price = randomPrice(CATEGORY_PRICE_RANGES[category]);

        products.push({
            product_id: `P${String(i).padStart(3, "0")}`,
            category,
            price
        });

        popularity.push(Math.random() ** 2);
    }

    const total = popularity.reduce((a, b) => a + b, 0);
    const normalized = popularity.map((p) => p / total);

    return { products, popularity: normalized };
}

// -------------------------
// Generate Customers
// -------------------------
export const generateCustomers = (): Customer[] => {
    const customers: Customer[] = [];

    for (let i = 1; i <= NUM_CUSTOMERS; i++) {
        const region = weightedRandom(REGION_WEIGHTS);
        const country = faker.helpers.arrayElement(COUNTRIES_BY_REGION[region]);
        const segment = weightedRandom(SEGMENT_WEIGHTS);

        const signup_date =
        Math.random() < 0.6
            ? faker.date.recent({ days: 365 })
            : faker.date.past({ years: 5 });

        customers.push({
            customer_id: `C${String(i).padStart(5, "0")}`,
            country,
            signup_date: signup_date.toISOString().split("T")[0],
            segment
        });
    }

    return customers;
}

// -------------------------
// Generate Orders
// -------------------------
export const generateOrders = (
  products: Product[],
  popularity: number[],
  customers: Customer[]
): Order[] => {
    const orders: Order[] = [];

    for (let i = 1; i <= NUM_ORDERS; i++) {
        const customer = faker.helpers.arrayElement(customers);
        const { customer_id, segment, country, signup_date } = customer;

        const region = Object.keys(COUNTRIES_BY_REGION).find((r) =>
            COUNTRIES_BY_REGION[r].includes(country)
        ) as string;

        // Product selection based on popularity
        const r = Math.random();
        let sum = 0;
        let productIndex = 0;

        for (let j = 0; j < popularity.length; j++) {
            sum += popularity[j];
            if (r <= sum) {
                productIndex = j;
                break;
            }
        }

        const product = products[productIndex];
        let { price, category } = product;

        // VIPs buy more
        let quantity = 1;
        if (segment === "VIP") quantity = faker.helpers.arrayElement([1, 2, 3, 4]);
        else if (segment === "returning") quantity = faker.helpers.arrayElement([1, 2, 3]);

        // Add noise to price
        const effectivePrice = +(price * (0.9 + Math.random() * 0.2)).toFixed(2);
        const revenue = +(effectivePrice * quantity).toFixed(2);

        // Order date after signup
        const orderDate = faker.date.between({
            from: signup_date,
            to: new Date()
        });

        orders.push({
            order_id: `O${String(i).padStart(7, "0")}`,
            date: orderDate.toISOString().split("T")[0],
            revenue,
            product_category: category,
            region,
            customer_id
        });
    }

    return orders;
}

// -------------------------
// Generate All Data
// -------------------------
export const generateAllData = () => {
    const { products, popularity } = generateProducts();
    const customers = generateCustomers();
    const orders = generateOrders(products, popularity, customers);

    return { products, customers, orders };
}

export const staticData = generateAllData();