export const formatDate = (date: Date) => date.toISOString().split('T')[0]

export const toISODate = (date: Date) => formatDate(date)

export const getEndDate = () => {
    const today = new Date()
    return formatDate(today)
}

export const getStartDate = () => {
    const today = new Date()
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
    return formatDate(lastMonth)
}