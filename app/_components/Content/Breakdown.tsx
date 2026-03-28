import React from 'react'
import PieChart from '../Charts/PieChart'
import { BreakdownDatum } from '@/lib/types/dashboard'
import PieLoading from '../SkeletonLoading/PieLoading'
import { borderClass } from '@/lib/styles/tailwindClasses'

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
    <div className={`bg-white rounded-lg w-full h-full p-4 ${borderClass}`}>
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