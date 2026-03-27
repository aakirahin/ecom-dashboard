import React from 'react'

type Props = {
    icon: React.ReactNode
    label: string
    onClick?: () => void
}

const SmallButton = ({
    icon,
    label,
    onClick
}: Props) => {
    return (
        <button 
            className='flex gap-1 items-center font-medium bg-white border border-gray-300 rounded-lg py-0.5 px-2 shadow-sm shadow-gray-100 text-[13px] hover:shadow-gray-200 hover:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all duration-300 cursor-pointer'
            aria-label={label}
            onClick={onClick}
        >
            {icon}
            {label}
        </button>
    )
}

export default SmallButton