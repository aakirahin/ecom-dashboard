import { endDate, startDate } from '@/lib/utils/date'
import React from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {}

const buttonStyle = 'flex gap-1 items-center font-medium bg-white border border-gray-300 py-0.5 px-2 shadow-sm shadow-gray-100 text-[13px] hover:shadow-gray-200 hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all duration-300 cursor-pointer'

const DateFilter = (props: Props) => {
  return (
    <div className='flex gap-0'>
        <DatePicker
            selected={new Date(startDate)}
            className={buttonStyle + ' rounded-bl-lg rounded-tl-lg'}
        />
        <select
            className={buttonStyle + ' rounded-br-lg rounded-tr-lg'}
        >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="custom">Custom</option>
        </select>
    </div>
  )
}

export default DateFilter