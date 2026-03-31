import { useFetchProductsQuery } from '@/lib/queries/queries'
import { TableFilters, useTableReducer } from '@/lib/reducer/tableReducer'
import { Product } from '@/lib/types/products'
import { useDebounce } from '@/lib/utils/hooks'
import React, { useMemo } from 'react'
import DataTable from '../DataTable'
import { productColumns } from '@/lib/utils/columns'

type Props = {
    filters: TableFilters
}

const ProductsTable = ({ filters }: Props) => {
    const reducer = useTableReducer<Product>()
    const { state, ...actions } = reducer

    const debouncedSearch = useDebounce(state.search, 1000)
    const queryState = useMemo(() => ({
        ...state,
        search: debouncedSearch,
        filters
    }), [state, debouncedSearch, filters])

    const { data: productsResponse, isLoading, error } = useFetchProductsQuery(queryState);
    const rows = (productsResponse?.data ?? []) as Product[]
    const total = productsResponse?.total ?? 0
    const totalPages = productsResponse?.totalPages ?? 0

    return (
        <DataTable<Product> 
            title="Products" 
            {...{ 
                columns: productColumns, 
                error, 
                isLoading,
                rows,
                total,
                totalPages,
                reducer
            }} 
        />
    )
}

export default ProductsTable