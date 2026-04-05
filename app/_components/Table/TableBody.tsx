import React from 'react'
import { Column } from './DataTable';

type Props<T> = {
    data: T[];
    columns: Column<T>[];
}

const TableBody = <T extends Record<string, any>>({
    data,
    columns
}: Props<T>) => {
    return (
        <tbody className='divide-y divide-gray-200'>
            {data?.map((row) => (
                <tr key={Object.values(row)[0]} className='flex px-2 py-4'>
                    {
                        columns.map((col) => {
                            const value = row[col.key];
                            return (
                                <td key={String(col.key)} className='flex-1'>
                                    {col.render ? col.render(value, row) : String(value)}
                                </td>
                            );
                        })
                    }
                </tr>
            ))}
        </tbody>
    )
}

export default TableBody