"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Download, ListFilter, Puzzle } from 'lucide-react'
import SmallButton from './SmallButton'
import Link from 'next/link'
import DateFilter from './DateFilter'
import { DashboardFilters } from '@/lib/types/data'
import FilterDropdown from './FilterDropdown'
import { useHandleExport } from '@/lib/utils/exportCSV'
import { endDate, startDate } from '@/lib/utils/date'
import { initOrdersState } from '@/lib/utils/dashboard'

type Props = {
  filters: DashboardFilters
  setFilters: (f: DashboardFilters) => void
}

const FilterBar = ({ 
  filters, 
  setFilters 
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const exportQueryState = useMemo(() => ({
    ...initOrdersState(startDate, endDate),
    filters: {
      startDate,
      endDate,
      ...(filters.categories.length ? { product_category: filters.categories } : {}),
      ...(filters.regions.length ? { region: filters.regions } : {}),
    }
  }), [filters])
  const handleExport = useHandleExport(exportQueryState)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIsOpen(false)
    }
  
    if (isOpen) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  return (
    <div className='flex justify-between items-center'>
      <Link href="/customisation">
        <SmallButton
          icon={<Puzzle size={12} color='#7F7F7F'/>}
          label='Customise'
        />
      </Link>
      <div className='flex items-center gap-2'>
        {/* <DateFilter/> */}
        <div className='relative' ref={dropdownRef}>
          <SmallButton
            icon={<ListFilter size={12} color='#7F7F7F'/>}
            label='Filter'
            onClick={() => setIsOpen(prev => !prev)}
          />
          {isOpen && <FilterDropdown filters={filters} setFilters={setFilters}/>}
        </div>
        <SmallButton
          icon={<Download size={12} color='#7F7F7F'/>}
          label='Export'
          onClick={handleExport}
        />
      </div>
    </div>
  )
}

export default FilterBar