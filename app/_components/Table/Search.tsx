import React from 'react'
import { useTableActions, useTableState } from '@/app/_context/OrdersContextProvider';
import { borderClass, focusRingClass } from '@/lib/styles/tailwindClasses';

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
            className={`py-2 px-4 rounded-md ${borderClass} ${focusRingClass}`}
        />
    )
}

export default Search