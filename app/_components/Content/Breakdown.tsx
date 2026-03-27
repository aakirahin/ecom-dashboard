"use client"

import React from 'react'
import PieChart from '../Charts/PieChart'
import { BreakdownDatum } from '@/lib/types/data'
import PieLoading from '../SkeletonLoading/PieLoading'

type Props = {
  title: string
  data: BreakdownDatum[]
  isLoading: boolean
}

const Breakdown = ({ 
  title, 
  data, 
  isLoading 
}: Props) => {
  return (
    <div className='bg-white border border-gray-200 rounded-lg w-full h-full p-4'>
      <span className='text-[16px] text-[#626366] font-medium'>{title} Breakdown</span>
      {
        isLoading ? 
        <PieLoading/> :
        <PieChart data={data} />
      }
    </div>
  )
}

export default Breakdown