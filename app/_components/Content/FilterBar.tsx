"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Download, ListFilter, Pencil } from 'lucide-react'
import SmallButton from './SmallButton'
import Link from 'next/link'
import DateFilter from './DateFilter'
import FilterDropdown from './FilterDropdown'
import { useHandleExport } from '@/lib/utils/exportCSV'
import { DashboardQueryState } from '@/lib/types/dashboard'
import { TableState } from '@/lib/reducer/tableReducer'
import { Order } from '@/lib/types/orders'
import { getEndDate, getStartDate } from '@/lib/utils/date'

type Props = {
  filters: DashboardQueryState
  setFilters: (f: DashboardQueryState) => void
}

// INITIAL FETCH QUERY
const initOrdersState = (startDate: string, endDate: string): TableState<Order> => ({
    search: "",
    sort: { sortKey: "date", sortOrder: "desc" },
    pagination: { page: 1, perPage: Infinity },
    filters: { startDate, endDate }
})

const FilterBar = ({ 
  filters, 
  setFilters 
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const exportQueryState = useMemo(() => ({
    ...initOrdersState(getStartDate(), getEndDate()),
    filters
  }), [filters])
  const handleExport = useHandleExport<"orders">({ type: "orders", exportQueryState })

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIsOpen(false)
    }
  
    if (isOpen) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  return (
    <div className='flex md:flex-row flex-col gap-2 md:justify-between md:items-center justify-start'>
      <Link href="/coming-soon">
        <SmallButton
          icon={<Pencil size={12} color='#7F7F7F'/>}
          label='Customise'
        />
      </Link>
      <div className='flex items-center gap-2'>
        <DateFilter
          filters={filters}
          setFilters={setFilters}
        />
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