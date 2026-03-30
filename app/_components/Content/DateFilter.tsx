"use client"

import React, { useState } from 'react'
import { focusRingClass, shadowClass } from '@/lib/styles/tailwindClasses';
import { endDate, startDate } from '@/lib/utils/date'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DashboardQueryState } from '@/lib/types/dashboard';

type Props = {
    filters: DashboardQueryState
    setFilters: (f: DashboardQueryState) => void
}

type DateRange = {
    startDate: Date | null
    endDate: Date | null
}

const DateFilter = ({
    filters,
    setFilters
}: Props) => {
    const [dateRange, setDateRange] = useState<DateRange>({
        startDate: new Date(startDate),
        endDate: new Date(endDate)
    })

    const handleDateChange = (update: (Date | null)[]) => {
        setDateRange({ startDate: update[0] , endDate: update[1] })
        
        if (update[0] && update[1]) {
            setFilters({ ...filters,
                startDate: update[0]?.toISOString().split('T')[0],
                endDate: update[1]?.toISOString().split('T')[0],
            })
        }
    }

    return (
        <DatePicker
            className={`flex gap-1 items-center font-medium bg-white border border-gray-300 py-0.5 px-2 ${shadowClass} text-xs hover:shadow-gray-200 hover:border-gray-400 ${focusRingClass} focus:ring-gray-400 rounded-lg`}
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onChange={handleDateChange}
            selectsRange
        />
    )
}

export default DateFilter