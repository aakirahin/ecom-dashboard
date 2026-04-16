import { TableState } from "../reducer/tableReducer"
import { DashboardQueryState } from "../types/dashboard"
import { EntityMap, EntityType } from "../types/data";
import { getEndDate, getStartDate } from "../utils/date";

type Props<T extends EntityType> = {
  type: T;
  state: TableState<EntityMap[T]>;
};

export const buildQueryParams = <T extends EntityType>({ type, state }: Props<T>) => {
    const { search, sort, pagination, filters = {} } = state
    const queryParams = new URLSearchParams()

    if (search.trim()) queryParams.set("search", search.trim())
    if (sort.sortKey) queryParams.set("sort", String(sort.sortKey))
    if (sort.sortOrder) queryParams.set("order", sort.sortOrder)

    queryParams.set("page", String(pagination.page))
    queryParams.set("pageSize", String(pagination.perPage))

    switch(type) {
        case "orders": {
            const ordersFilters = filters as Record<string, any>
            const { 
                startDate = getStartDate(), 
                endDate = getEndDate(), 
                region = [], 
                product_category = [] 
            } = ordersFilters

            if (startDate) queryParams.set("startDate", String(startDate))
            if (endDate) queryParams.set("endDate", String(endDate))

            if (region && region.length) region.forEach((region: string) => queryParams.append("region", region))
            if (product_category && product_category.length) product_category.forEach((category: string) => queryParams.append("category", category))
            break
        }
        case "customers": {
            const customersFilters = filters as Record<string, any>
            const { segment = [], country = [] } = customersFilters

            if (segment && segment.length) segment.forEach((segment: string) => queryParams.append("segment", segment))
            if (country && country.length) country.forEach((country: string) => queryParams.append("country", country))
            break
        }
        case "products": {
            const productsFilters = filters as Record<string, any>
            const { category = [] } = productsFilters
            
            if (category && category.length) category.forEach((category: string) => queryParams.append("category", category))
            break
        }
    }

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