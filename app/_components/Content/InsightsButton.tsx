import { Sparkles } from 'lucide-react'
import React from 'react'

type Props = {
    handleInsightsToggle: () => void
    isLoading: boolean
    label: string
}

const InsightsButton = ({ 
    handleInsightsToggle, 
    isLoading, 
    label 
}: Props) => {
    return (
        <button
            className='group relative overflow-hidden flex gap-1 items-center bg-white border border-[#A383FF] rounded-lg py-0.5 px-2 shadow-md shadow-purple-100 text-[13px] hover:border-[#C9B2FD] transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'
            aria-label="View key insights"
            disabled={isLoading}
            onClick={handleInsightsToggle}
        >
            <span
                className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
                style={{ backgroundImage: "linear-gradient(112.068deg, rgb(181, 125, 255) 0%, rgb(78, 155, 255) 100%)" }}
            />
            <Sparkles size={12} className='relative z-10 text-[#B57DFF] transition-colors duration-300 group-hover:text-white'/>
            <span className='relative z-10 whitespace-nowrap font-medium leading-[normal]'>
                <span
                    className='absolute inset-0 opacity-100 transition-opacity duration-300 group-hover:opacity-0'
                    style={{
                        backgroundImage: "linear-gradient(112.068deg, rgb(181, 125, 255) 0%, rgb(78, 155, 255) 100%)",
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                    }}
                >
                    {label}
                </span>
                <span className='opacity-0 text-white transition-opacity duration-300 group-hover:opacity-100'>
                    {label}
                </span>
            </span>
        </button>
    )
}

export default InsightsButton