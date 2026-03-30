import { borderClass, cardClass, titleClass } from '@/lib/styles/tailwindClasses'
import React from 'react'

type Props = {
  children?: React.ReactNode
}

const Card = ({
  children
}: Props) => {
  return (
    <div className={`${cardClass} flex-1 h-full`}>
      {children}
    </div>
  )
}

export default Card