import { skeletonClass } from '@/lib/styles/tailwindClasses'
import React from 'react'

const TableRowLoading = () => (
    <div className='flex justify-between items-center p-4'>
        <div className={`h-4 w-24 ${skeletonClass}`} />
        <div className={`h-4 w-16 ${skeletonClass}`} />
        <div className={`h-4 w-20 ${skeletonClass}`} />
        <div className={`h-4 w-12 ${skeletonClass}`} />
    </div>
)

const TableLoading = () => {
    return (
        <div className='flex flex-col divide-y divide-gray-200 w-full h-full'>
            <TableRowLoading/>
            <TableRowLoading/>
            <TableRowLoading/>
            <TableRowLoading/>
            <TableRowLoading/>
        </div>
    )
}

export default TableLoading