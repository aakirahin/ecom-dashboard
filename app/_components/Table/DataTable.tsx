import React, { useMemo } from 'react'
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Pagination from './Pagination';
import Search from './Search';
import TableLoading from '../SkeletonLoading/TableLoading';

type Props<T> = {
  title?: string
  columns: Column<T>[];
  error: Error | null
  isLoading: boolean
  rows: T[]
  total: number
  totalPages: number
}

export type Column<T> = {
  key: keyof T;
  icon: React.ReactNode;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

const DataTable = <T extends Record<string, any>>({
  title,
  columns,
  error,
  isLoading,
  rows,
  total,
  totalPages,
}: Props<T>) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex justify-between items-center mb-2'>
        <span className='text-[16px] text-[#626366] font-medium'>{title}</span>
        <Search error={error}/>
      </div>
      {
        error ? 
        <p className='text-red-600'>Error loading orders.</p> :
        <>
          {isLoading && <TableLoading/>}
          {rows && !isLoading &&
            <>
              <table className='divide-y divide-gray-200 w-full'>
                <TableHeader<T> columns={columns}/>
                <TableBody<T> data={rows} columns={columns}/>
              </table>
              <Pagination totalItems={total} totalPages={totalPages}/>
            </>
          }
        </>
      }
    </div>
  );
}

export default DataTable