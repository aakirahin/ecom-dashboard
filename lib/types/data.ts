export type PaginatedResponse<T> = {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    data: T[];
}