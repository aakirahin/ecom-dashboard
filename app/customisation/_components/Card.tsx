import { borderClass, cardClass, titleClass } from '@/lib/styles/tailwindClasses'
import React from 'react'

type Props = {
    title: string
}

const Card = ({
    title
}: Props) => {
  return (
    <div className={`${cardClass} w-1/3 h-full`}>
        <span className={titleClass}>{title}</span>
    </div>
  )
}

export default Card