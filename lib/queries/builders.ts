import { TableState } from "../reducer/tableReducer"
import { DashboardQueryState } from "../types/dashboard"
import { Order } from "../types/orders"
import { startDate as start, endDate as end } from "../utils/date"

export const buildOrderQueryParams = (state: TableState<Order>) => {
    const { search, sort, pagination, filters = {} } = state
    const { 
        startDate = start, 
        endDate = end, 
        region = [], 
        product_category = [] 
    } = filters
    const queryParams = new URLSearchParams()

    if (search.trim()) queryParams.set("search", search.trim())
    if (sort.sortKey) queryParams.set("sort", String(sort.sortKey))
    if (sort.sortOrder) queryParams.set("order", sort.sortOrder)
        
    if (startDate) queryParams.set("startDate", String(startDate))
    if (endDate) queryParams.set("endDate", String(endDate))

    if (region && region.length) region.forEach((region) => queryParams.append("region", region))
    if (product_category && product_category.length) product_category.forEach((category) => queryParams.append("category", category))
                
    queryParams.set("page", String(pagination.page))
    queryParams.set("pageSize", String(pagination.perPage))

    return queryParams
}

export const buildDashboardQueryParams = (params: DashboardQueryState) => {
    const { startDate, endDate, region, product_category } = params
    const queryParams = new URLSearchParams()

    if (startDate) queryParams.set("startDate", startDate)
    if (endDate) queryParams.set("endDate", endDate)
    
    if (region.length) region.forEach((region) => queryParams.append("region", region))
    if (product_category.length) product_category.forEach((category) => queryParams.append("category", category))

    return queryParams
}