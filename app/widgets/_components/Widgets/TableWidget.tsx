import React, { useMemo, useState } from 'react'
import Card from '../Card'
import { TableFilters } from '@/lib/reducer/tableReducer'
import { selectClass, titleClass } from '@/lib/styles/tailwindClasses'
import OrdersTable from '@/app/_components/Table/_types/OrdersTable'
import CustomersTable from '@/app/_components/Table/_types/CustomersTable'
import ProductsTable from '@/app/_components/Table/_types/ProductsTable'
import { getEndDate, getStartDate } from '@/lib/utils/date'

const TableWidget = () => {
    const [filters] = useState<TableFilters>({
        startDate: getStartDate(),
        endDate: getEndDate(),
    })
    const [data, setData] = useState<"orders" | "products" | "customers">("orders")

    const renderTable = () => {
        switch(data) {
            case "orders":
                return <OrdersTable filters={filters}/>
            case "products":
                return <ProductsTable filters={filters}/>
            case "customers":
                return <CustomersTable filters={filters}/>
        }
    }

    return (
        <Card>
            <div className='flex w-full justify-between'>
                <span className={titleClass}>Table</span>
                <select
                    value={data}
                    onChange={(e) => setData(e.target.value as "orders" | "products" | "customers")}
                    className={`${selectClass}`}
                >
                    <option value="orders">Orders</option>
                    <option value="products">Products</option>
                    <option value="customers">Customers</option>
                </select>
            </div>
            {renderTable()}
        </Card>
    )
}

export default TableWidget