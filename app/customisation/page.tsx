import { Construction } from 'lucide-react'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
  return (
    <div className='flex flex-col gap-2 flex-1 h-full justify-center items-center'>
        <h1 className='flex gap-2 items-center font-sofia text-4xl text-[#626366] font-medium'>
            Coming soon
            <Construction size={32} color='#2081FF'/>
        </h1>
        <p className='font-medium'>This page is still under construction.</p>
    </div>
  )
}

export default Page