import React from 'react'
import { useTableActions, useTableState } from '@/app/_context/OrdersContextProvider';

type Props = {}

const Search = (props: Props) => {
    const { state } = useTableState();
    const { handleSearch } = useTableActions();

    return (
        <input
            type='text'
            aria-label='Search orders'
            value={state.search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder='Search orders'
            className='py-2 px-4 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent duration-300 transition-all'
        />
    )
}

export default Search