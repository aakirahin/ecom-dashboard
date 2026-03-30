import { borderClass, shadowClass } from '@/lib/styles/tailwindClasses'
import { DashboardQueryState } from '@/lib/types/dashboard'
import React from 'react'

type Props = {
    filters: DashboardQueryState
    setFilters: (f: DashboardQueryState) => void
}

type FilterSection = {
    type: keyof DashboardQueryState
    section: string
    filters: DashboardQueryState
    toggle: (value: string) => void
    values: string[]
}

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
        <p className='text-xs font-semibold text-[#626366] uppercase tracking-wide mb-2'>{section}</p>
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
    const showAll = filters.product_category.length === 0 && filters.region.length === 0

    const toggleFilter = (type: keyof DashboardQueryState, value: string) => {
        const valuesArray = type === 'product_category' ? CATEGORIES : REGIONS
        const currentValues = filters[type]
        let updatedValues: string[]

        if (currentValues.length === 0) updatedValues = valuesArray.filter((v) => v !== value)
        else if (currentValues.includes(value)) updatedValues = currentValues.filter((v) => v !== value)
        else {
            updatedValues = [...currentValues, value]
            if (updatedValues.length === valuesArray.length) updatedValues = [] // If all values are selected, reset to show all
        }

        setFilters({ ...filters, [type]: updatedValues })
    }

    return (
        <div className={`absolute right-0 top-full mt-1 w-56 bg-white rounded-lg z-50 p-3 flex flex-col gap-3 max-h-[70vh] overflow-y-auto ${borderClass} ${shadowClass}`}>
            <label className='flex items-center gap-2 text-sm font-medium cursor-pointer select-none'>
                <input
                    type='checkbox'
                    checked={showAll}
                    onChange={() => setFilters({ ...filters, product_category: [], region: [] })}
                    className='accent-blue-500'
                />
                Show all
            </label>
            <FilterSection 
                type='product_category'
                section='Product Category' 
                filters={filters} 
                toggle={(value) => toggleFilter('product_category', value)}
                values={CATEGORIES}
            />
            <FilterSection
                type='region'
                section='Region'
                filters={filters}
                toggle={(value) => toggleFilter('region', value)}
                values={REGIONS}
            />
        </div>
    )
}

export default FilterDropdown