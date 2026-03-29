import React from 'react'
import PieChart from '../Charts/PieChart'
import { BreakdownDatum } from '@/lib/types/dashboard'
import PieLoading from '../SkeletonLoading/PieLoading'
import { cardClass, titleClass } from '@/lib/styles/tailwindClasses'

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
    <div className={` ${cardClass} w-full h-full`}>
      <span className={titleClass}>{title} Breakdown</span>
      {
        isLoading ? 
        <PieLoading/> :
        <PieChart data={data} />
      }
    </div>
  )
}

export default Breakdown