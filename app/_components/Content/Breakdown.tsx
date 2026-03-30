import React from 'react'
import PieChart from '../Charts/PieChart'
import { BreakdownDatum } from '@/lib/types/dashboard'
import PieLoading from '../SkeletonLoading/PieLoading'
import { cardClass, titleClass } from '@/lib/styles/tailwindClasses'

type Props = {
  title: string
  data: BreakdownDatum[]
  isLoading: boolean
  error: Error | null
}

const Breakdown = ({ 
  title, 
  data, 
  isLoading,
  error
}: Props) => {
  return (
    <div className={` ${cardClass} w-full h-full`}>
      <span className={titleClass}>{title}</span>
      {error && <p className='p-2 text-sm text-red-600'>Error loading pie chart.</p>}
      {
        isLoading ? 
        <PieLoading/> :
        <PieChart data={data} />
      }
    </div>
  )
}

export default Breakdown