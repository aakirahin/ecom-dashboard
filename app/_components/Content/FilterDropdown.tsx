import { DashboardFilters } from '@/lib/types/data'
import React from 'react'

type Props = {
    filters: DashboardFilters
    setFilters: (f: DashboardFilters) => void
}

type FilterSection = {
    type: keyof DashboardFilters
    section: string
    filters: DashboardFilters
    toggle: (value: string) => void
    values: string[]
}

const subtitleClass = 'text-xs font-semibold text-[#626366] uppercase tracking-wide mb-2'

const CATEGORIES = ["Electronics", "Home & Kitchen", "Fashion", "Sports", "Beauty", "Toys", "Books", "Groceries"]
const REGIONS = ["Europe", "North America", "Asia", "South America", "Oceania", "Africa"]

const FilterSection = ({ 
    type,
    section, 
    filters, 
    toggle,
    values 
}: FilterSection) => (
    <div>
        <p className={subtitleClass}>{section}</p>
        <div className='flex flex-col gap-1'>
            {values.map(value => (
                <label key={value} className='flex items-center gap-4 text-sm cursor-pointer select-none'>
                    <input
                        type='checkbox'
                        checked={filters[type].length === 0 || filters[type].includes(value)}
                        onChange={() => toggle(value)}
                        className='accent-blue-500'
                    />
                    {value}
                </label>
            ))}
        </div>
    </div>
)

const FilterDropdown = ({
    filters,
    setFilters,
}: Props) => {
    const showAll = filters.categories.length === 0 && filters.regions.length === 0

    const toggleCategory = (cat: string) => {
        const { categories } = filters
        let next: string[]

        if (categories.length === 0) next = CATEGORIES.filter(c => c !== cat)
        else if (categories.includes(cat)) next = categories.filter(c => c !== cat)
        else {
            next = [...categories, cat]
            if (next.length === CATEGORIES.length) next = []
        }

        setFilters({ ...filters, categories: next })
    }

    const toggleRegion = (region: string) => {
        const { regions } = filters
        let next: string[]

        if (regions.length === 0) next = REGIONS.filter(r => r !== region)
        else if (regions.includes(region)) next = regions.filter(r => r !== region)
        else {
            next = [...regions, region]
            if (next.length === REGIONS.length) next = []
        }

        setFilters({ ...filters, regions: next })
    }

    return (
        <div className='absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-sm shadow-gray-100 z-50 p-3 flex flex-col gap-3 max-h-[70vh] overflow-y-auto'>
            <label className='flex items-center gap-2 text-sm font-medium cursor-pointer select-none'>
                <input
                    type='checkbox'
                    checked={showAll}
                    onChange={() => setFilters({ categories: [], regions: [] })}
                    className='accent-blue-500'
                />
                Show all
            </label>
            <FilterSection 
                type='categories'
                section='Product Category' 
                filters={filters} 
                toggle={toggleCategory}
                values={CATEGORIES}
            />
            <FilterSection
                type='regions'
                section='Region'
                filters={filters}
                toggle={toggleRegion}
                values={REGIONS}
            />
        </div>
    )
}

export default FilterDropdown