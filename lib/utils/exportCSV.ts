"use client"

import { useCallback } from "react";
import { TableState } from "../reducer/tableReducer";
import { buildQueryParams } from "../queries/builders";
import { EntityMap, EntityType } from "../types/data";

const convertToCSV = <T>(data: T[]) => {
    let str = '';

    for (let i = 0; i < data.length; i++) {
        let line = '';
        for (let index in data[i]) {
            if (line !== '') line += ',';
            // Wrap every cell in quotes and escape internal quotes
            line += `"${String(data[i][index]).replace(/"/g, '""')}"`;
        }
        str += line + '\r\n';
    }

    return str;
};

const exportCSV = <T extends Record<string, any>>(data: T[], fileName: string) => {
    const csvString = [
        Object.keys(data[0]).map((key) => `"${key}"`).join(","),,
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
    URL.revokeObjectURL(csvURL) // Prevent memory leak
};

type ExportProps<T extends EntityType> = {
  type: T;
  exportQueryState: TableState<EntityMap[T]>;
};

export const useHandleExport = <T extends EntityType>({ type, exportQueryState }: ExportProps<T>) => {
    const handleExport = useCallback(async () => {
        try {
            const response = await fetch(`/api/${type}?${buildQueryParams<T>({ type, state: exportQueryState }).toString()}`)
            
            if (!response.ok) throw new Error('Failed to export.')
            
                const payload = await response.json() as { data: EntityMap[T][] }
            exportCSV(payload.data, `${type}_${new Date().toISOString()}`)
        } catch {
            alert('Export failed. Please try again.')
        }
    }, [type, exportQueryState])

    return handleExport
}