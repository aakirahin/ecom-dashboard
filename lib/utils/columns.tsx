import { Calendar, DollarSign, Globe, Hash, ShoppingBag } from 'lucide-react';
import { Order } from '../types/orders';
import { Column } from '@/app/_components/Table/DataTable';

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