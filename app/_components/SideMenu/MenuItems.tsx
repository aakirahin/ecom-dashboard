"use client";

import { Puzzle, Home, Pencil } from 'lucide-react'
import { usePathname } from 'next/dist/client/components/navigation';
import React from 'react'

type Props = {
  mobile?: boolean
}

type MenuItem = {
  label: string;
  link: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    link: '/',
    icon: <Home size={16} />
  },
  {
    label: 'Widgets',
    link: '/widgets',
    icon: <Puzzle size={16} />
  },
]

const MenuItems = ({ mobile = false }: Props) => {
  const pathname = usePathname();

  return (
    <div className={mobile ? 'flex items-center gap-2' : 'flex flex-col gap-2'}>
      {
        menuItems.map((item) => (
          <a
            key={`${item.label}-${item.link}`}
            href={item.link}
            className={mobile
              ? `flex items-center justify-center h-8 w-36 rounded-md transition-colors duration-300 ${pathname === item.link ? 'bg-white/20 text-white' : 'text-white hover:bg-white/15'}`
              : `flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-300 font-medium ${pathname === item.link ? 'bg-blue-50 border-l-6 border-blue-500' : 'hover:bg-blue-50'}`
            }
            aria-label={item.label}
          >
            {item.icon}
            {!mobile && <span className='text-[#7F7F7F]'>{item.label}</span>}
          </a>
        ))
      }
    </div>
  )
}

export default MenuItems