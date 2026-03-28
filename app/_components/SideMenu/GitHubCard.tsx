import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const GitHubCard = (props: Props) => {
    return (
        <div 
            className='relative flex flex-col gap-3 h-auto w-full border-2 border-[#96c3ff] border-solid rounded-lg p-4 text-white' 
            style={{ backgroundImage: "linear-gradient(105.772deg, rgb(28, 116, 232) 0%, rgb(132, 186, 255) 103.65%)" }}
        >
            <div className='flex flex-col gap-0.5'>
                <p>E-Comm Dashboard</p>
                <p className='text-sm'>by @aakirahin</p>
            </div>
            <Link 
                href="https://github.com/aakirahin/ecom-dashboard" 
                target="_blank" 
                rel="noopener noreferrer"
            >
                <button 
                    className='flex gap-1.5 items-center justify-center text-sm bg-[#ffffff45] text-white hover:bg-[#ffffff60] py-2 w-full rounded-md transition-colors duration-300 border-2 border-[#ffffff40] hover:border-[#ffffff60] cursor-pointer'
                    aria-label='View project on GitHub'
                >
                    <Image
                        src={'/github.svg'}
                        alt="GitHub Logo"
                        width={18}
                        height={18}
                    />
                    View on GitHub
                </button>
            </Link>
            <Image
                src={'/white_logo.svg'}
                alt="Logo"
                width={160}
                height={160}
                className="absolute bottom-[-45px] right-[-0px] opacity-15 pointer-events-none select-none"
                loading="eager"
            />
        </div>
    )
}

export default GitHubCard