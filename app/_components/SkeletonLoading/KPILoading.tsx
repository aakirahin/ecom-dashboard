import { borderClass } from '@/lib/styles/tailwindClasses'
import React from 'react'

const skeletonClassName = 'bg-gray-100 rounded animate-pulse'

const LoadingCard = () => (
    <div className='flex flex-col md:w-1/2 sm:w-full p-4 items-baseline gap-3'>
        <div className={`w-11 h-11 rounded-full ${skeletonClassName}`} />
        <div className={`h-3 w-24 ${skeletonClassName}`} />
        <div className={`h-8 w-28 ${skeletonClassName}`} />
        <div className={`h-3 w-32 ${skeletonClassName}`} />
    </div>
)

const LoadingCardRow = () => (
    <div className='flex flex-col sm:flex-row sm:h-1/2 divide-y sm:divide-y-0 sm:divide-x divide-gray-200'>
        <LoadingCard/>
        <LoadingCard/>
    </div>
)

const KPILoading = () => {
  return (
        <div className={`flex flex-col bg-white ${borderClass} divide-y divide-gray-200 rounded-lg xl:w-1/3 sm:w-full p-4`}>
            <LoadingCardRow/>
            <LoadingCardRow/>
        </div>
    )
}

export default KPILoading