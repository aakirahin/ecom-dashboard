import React from 'react'

type Props = {}

const PieLoading = (props: Props) => {
  return (
    <div className='h-[90%] w-full flex items-center justify-center gap-6'>
      <div className='w-32 h-32 rounded-full border-14 border-gray-100 animate-pulse' />
      <div className='flex flex-col gap-2'>
        <div className='h-3 w-20 bg-gray-100 rounded animate-pulse' />
        <div className='h-3 w-16 bg-gray-100 rounded animate-pulse' />
        <div className='h-3 w-24 bg-gray-100 rounded animate-pulse' />
        <div className='h-3 w-14 bg-gray-100 rounded animate-pulse' />
      </div>
    </div>
  )
}

export default PieLoading