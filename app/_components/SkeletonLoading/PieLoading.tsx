import { skeletonClass } from '@/lib/styles/tailwindClasses'
import React from 'react'

const PieLoading = () => {
  return (
    <div className='h-full w-full flex flex-col items-center justify-center gap-6'>
      <div className='w-48 h-48 rounded-full border-24 border-gray-100 animate-pulse' />
      <div className='flex flex-col gap-2'>
        <div className={`h-4 w-32 ${skeletonClass}`} />
        <div className={`h-4 w-24 ${skeletonClass}`} />
      </div>
    </div>
  )
}

export default PieLoading