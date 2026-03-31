import { Calendar, DollarSign, Globe, Hash, ShoppingBag, User } from 'lucide-react';
import { Order } from '../types/orders';
import { Column } from '@/app/_components/Table/DataTable';
import { Customer } from '../types/customers';
import { Product } from '../types/products';

export const orderColumns: Column<Order>[] = [
    {
        key: "order_id",
        icon: <Hash size={14}/>,
        label: "Order ID",
        sortable: true,
        render: (value) => `# ${value}`,
    },
    {
        key: "date",
        icon: <Calendar size={14}/>,
        label: "Date",
        sortable: true,
    },
    {
        key: "revenue",
        icon: <DollarSign size={14}/>,
        label: "Revenue",
        sortable: true,
        render: (value) => `£${value}`,
    },
    {
        key: "product_category",
        icon: <ShoppingBag size={14}/>,
        label: "Product",
        sortable: true,
    },
    {
        key: "region",
        icon: <Globe size={14}/>,
        label: "Region",
        sortable: true,
    }
];

export const customerColumns: Column<Customer>[] = [
    {
        key: "customer_id",
        icon: <Hash size={14}/>,
        label: "Customer ID",
        sortable: true,
        render: (value) => `# ${value}`,
    },
    {
        key: "country",
        icon: <Globe size={14}/>,
        label: "Country",
        sortable: true,
    },
    {
        key: "signup_date",
        icon: <Calendar size={14}/>,
        label: "Signup Date",
        sortable: true,
    },
    {
        key: "segment",
        icon: <User size={14}/>,
        label: "Segment",
        sortable: true,
    },
]

export const productColumns: Column<Product>[] = [
    {
        key: "product_id",
        icon: <Hash size={14}/>,
        label: "Product ID",
        sortable: true,
        render: (value) => `# ${value}`,
    },
    {
        key: "category",
        icon: <ShoppingBag size={14}/>,
        label: "Category",
        sortable: true,
    },
    {
        key: "price",
        icon: <DollarSign size={14}/>,
        label: "Price",
        sortable: true,
        render: (value) => `£${value}`,
    },
]