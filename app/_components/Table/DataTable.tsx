import React from 'react'
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Pagination from './Pagination';
import Search from './Search';
import TableLoading from '../SkeletonLoading/TableLoading';
import TableContextProvider, { TableActionsContext, TableStateContext } from '@/app/_context/TableContextProvider';

type Props<T extends Record<string, any>> = {
  title?: string
  columns: Column<T>[];
  error: Error | null
  isLoading: boolean
  rows: T[]
  total: number
  totalPages: number
  reducer: TableStateContext<T> & TableActionsContext<T>
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
  reducer
}: Props<T>) => {
  return (
    <TableContextProvider<T> reducer={reducer}>
      <div className='flex flex-col gap-2 overflow-x-scroll xl:overflow-x-auto'>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-[16px] text-[#626366] font-medium'>{title}</span>
          <Search error={error}/>
        </div>
        {
          error ? 
          <p className='text-red-600'>Error loading rows.</p> :
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
    </TableContextProvider>
  );
}

export default DataTable