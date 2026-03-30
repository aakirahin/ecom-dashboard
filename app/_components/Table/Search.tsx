import React from 'react'
import { useTableActions, useTableState } from '@/app/_context/OrdersContextProvider';
import { borderClass, focusRingClass } from '@/lib/styles/tailwindClasses';

type Props = {
    error: Error | null
}

const Search = ({
    error
}: Props) => {
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
            disabled={!!error}
        />
    )
}

export default Search