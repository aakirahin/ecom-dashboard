import { skeletonClass } from '@/lib/styles/tailwindClasses'
import React from 'react'

type Props = {}

const barClassName = `flex-1 ${skeletonClass}`

const SkeletonBars = () => (
    <>
        <div className={`${barClassName} h-24`} />
        <div className={`${barClassName} h-36`} />
        <div className={`${barClassName} h-28`} />
        <div className={`${barClassName} h-48`} />
        <div className={`${barClassName} h-32`} />
        <div className={`${barClassName} h-56`} />
    </>
)

const ChartLoading = (props: Props) => {
    return (
        <div className='flex items-end gap-4 h-full w-full p-4'>
            <SkeletonBars/>
            <SkeletonBars/>
        </div>
    )
}

export default ChartLoading