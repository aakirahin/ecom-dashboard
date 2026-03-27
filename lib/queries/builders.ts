import { TableState } from "../reducer/tableReducer"
import { DashboardQueryState } from "../types/data"
import { Order } from "../types/orders"

export const buildOrderQueryParams = (state: TableState<Order>) => {
    const { search, sort, pagination, filters } = state
    const queryParams = new URLSearchParams()

    if (search.trim()) queryParams.set("search", search.trim())
    if (sort.sortKey) queryParams.set("sort", String(sort.sortKey))
    if (sort.sortOrder) queryParams.set("order", sort.sortOrder)

    queryParams.set("page", String(pagination.page))
    queryParams.set("pageSize", String(pagination.perPage))

    queryParams.set("startDate", String(filters.startDate))
    queryParams.set("endDate", String(filters.endDate))

    return queryParams
}

export const buildDashboardQueryParams = (params: DashboardQueryState) => {
    const { startDate, endDate, regions, categories } = params
    const queryParams = new URLSearchParams()

    queryParams.set("startDate", startDate)
    queryParams.set("endDate", endDate)
    
    if (regions.length) regions.forEach((region) => queryParams.append("region", region))
    if (categories.length) categories.forEach((category) => queryParams.append("category", category))

    return queryParams
}