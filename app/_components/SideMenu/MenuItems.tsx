"use client";

import { LayoutDashboard, Link, Puzzle } from 'lucide-react'
import { usePathname } from 'next/dist/client/components/navigation';
import React from 'react'

type Props = {}

type MenuItem = {
  label: string;
  link: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    link: '/',
    icon: <LayoutDashboard size={16} color='#7F7F7F'/>
  },
  {
    label: 'Widgets',
    link: '/widgets',
    icon: <Puzzle size={16} color='#7F7F7F'/>
  },
]

const MenuItems = (props: Props) => {
  const pathname = usePathname();

  return (
    <div className='flex flex-col gap-2'>
      {
        menuItems.map((item) => (
          <a
            key={item.link}
            href={item.link}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-300 font-medium ${pathname === item.link ? 'bg-blue-50 border-l-6 border-blue-500' : 'hover:bg-blue-50'}`}
          >
            {item.icon}
            <span className='text-[#7F7F7F]'>{item.label}</span>
          </a>
        ))
      }
    </div>
  )
}

export default MenuItems