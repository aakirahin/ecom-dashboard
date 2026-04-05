"use client"

import { useCallback } from "react";
import { TableState } from "../reducer/tableReducer";
import { buildQueryParams } from "../queries/builders";
import { EntityMap, EntityType } from "../types/data";
import { orderColumns } from "./columns";

const convertToCSV = <T>(data: T[]) => {
    let str = '';

    for (let i = 0; i < data.length; i++) {
        let line = '';
        for (let index in data[i]) {
            if (line !== '') line += ',';
            line += data[i][index];
        }
        str += line + '\r\n';
    }

    return str;
};

const exportCSV = <T extends Record<string, any>>(data: T[], fileName: string) => {
    const csvString = [
        orderColumns.map((col) => (col.key)).toString(),
        convertToCSV(data)
    ]
    .join("\n")

    const csvData = new Blob([csvString], { type: 'text/csv' });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement('a');
    link.href = csvURL;
    link.download = `${fileName}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

type ExportProps<T extends EntityType> = {
  type: T;
  exportQueryState: TableState<EntityMap[T]>;
};

export const useHandleExport = <T extends EntityType>({ type, exportQueryState }: ExportProps<T>) => {
    const handleExport = useCallback(async () => {
        const response = await fetch(`/api/${type}?${buildQueryParams<T>({ type, state: exportQueryState }).toString()}`)
        if (!response.ok) throw new Error('Failed to export.')
        
        const payload = await response.json() as { data: EntityMap[T][] }
        exportCSV(payload.data, `${type}_${new Date().toISOString()}`)
    }, [type, exportQueryState])

    return handleExport
}