import React from 'react'

type Props = {}

const KPILoading = (props: Props) => {
  return (
        <div className='flex flex-col bg-white border border-gray-200 divide-y divide-gray-200 rounded-lg w-1/3 p-4'>
            <div className='flex h-1/2 divide-x divide-gray-200'>
                <div className='flex flex-col w-1/2 p-4 gap-3'>
                    <div className='w-11 h-11 rounded-full bg-gray-100 animate-pulse' />
                    <div className='h-3 w-24 bg-gray-100 rounded animate-pulse' />
                    <div className='h-8 w-28 bg-gray-100 rounded animate-pulse' />
                    <div className='h-3 w-32 bg-gray-100 rounded animate-pulse' />
                </div>
                <div className='flex flex-col w-1/2 p-4 gap-3'>
                    <div className='w-11 h-11 rounded-full bg-gray-100 animate-pulse' />
                    <div className='h-3 w-24 bg-gray-100 rounded animate-pulse' />
                    <div className='h-8 w-28 bg-gray-100 rounded animate-pulse' />
                    <div className='h-3 w-32 bg-gray-100 rounded animate-pulse' />
                </div>
            </div>
            <div className='flex h-1/2 divide-x divide-gray-200'>
                <div className='flex flex-col w-1/2 p-4 gap-3'>
                    <div className='w-11 h-11 rounded-full bg-gray-100 animate-pulse' />
                    <div className='h-3 w-24 bg-gray-100 rounded animate-pulse' />
                    <div className='h-8 w-28 bg-gray-100 rounded animate-pulse' />
                    <div className='h-3 w-32 bg-gray-100 rounded animate-pulse' />
                </div>
                <div className='flex flex-col w-1/2 p-4 gap-3'>
                    <div className='w-11 h-11 rounded-full bg-gray-100 animate-pulse' />
                    <div className='h-3 w-24 bg-gray-100 rounded animate-pulse' />
                    <div className='h-8 w-28 bg-gray-100 rounded animate-pulse' />
                    <div className='h-3 w-32 bg-gray-100 rounded animate-pulse' />
                </div>
            </div>
        </div>
    )
}

export default KPILoading