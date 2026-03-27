export type Customer = {
    customer_id: string;
    country: string;
    signup_date: string;
    segment: "new" | "returning" | "VIP";
}

export type CustomerFilter = {
    segment?: "new" | "returning" | "VIP";
    country?: string;
}