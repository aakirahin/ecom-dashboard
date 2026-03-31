"use client"

import { useCallback } from "react";
import { Order } from "../types/orders";
import { TableState } from "../reducer/tableReducer";
import { buildQueryParams } from "../queries/builders";

const convertToCSV = <T>(data: T[]) => {
    const array = typeof data !== 'object' ? JSON.parse(data) : data;
    let str = '';

    for (let i = 0; i < array.length; i++) {
        let line = '';
        for (let index in array[i]) {
        if (line !== '') line += ',';

        line += array[i][index];
        }
        str += line + '\r\n';
    }
    return str;
};

const exportCSV = <T>(data: T[], fileName: string) => {
    const csvData = new Blob([convertToCSV(data)], { type: 'text/csv' });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement('a');
    link.href = csvURL;
    link.download = `${fileName}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const useHandleExport = (exportQueryState: TableState<Order>) => {
    const handleExport = useCallback(async () => {
        const exportState = {
            ...exportQueryState,
            pagination: { page: 1, perPage: 20000 },
        }

        // GET FILTERED ORDERS
        // TODO: MAKE REUSABLE
        const response = await fetch(`/api/orders?${buildQueryParams({ type: "orders", state: exportState }).toString()}`)
        if (!response.ok) throw new Error('Failed to export orders.')
        
        const payload = await response.json() as { data: Order[] }
        exportCSV(payload.data, `orders_${new Date().toISOString()}`)
    }, [exportQueryState])

    return handleExport
}