import React from 'react'

type Props = {}

const ChartLoading = (props: Props) => {
    return (
        <div className='h-full w-full rounded-lg border border-gray-100 p-4 flex flex-col justify-end gap-2'>
            <div className='h-3 w-20 bg-gray-100 rounded animate-pulse' />
            <div className='flex items-end gap-2 h-40'>
                <div className='w-6 h-16 bg-gray-100 rounded animate-pulse' />
                <div className='w-6 h-24 bg-gray-100 rounded animate-pulse' />
                <div className='w-6 h-20 bg-gray-100 rounded animate-pulse' />
                <div className='w-6 h-32 bg-gray-100 rounded animate-pulse' />
                <div className='w-6 h-28 bg-gray-100 rounded animate-pulse' />
                <div className='w-6 h-36 bg-gray-100 rounded animate-pulse' />
            </div>
        </div>
    )
}

export default ChartLoading