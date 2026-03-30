import { borderClass, cardClass, titleClass } from '@/lib/styles/tailwindClasses'
import React from 'react'

type Props = {
  className?: string
  children?: React.ReactNode
}

const Card = ({
  className,
  children
}: Props) => {
  return (
    <div className={`${cardClass} ${className} flex-1 h-full`}>
      {children}
    </div>
  )
}

export default Card