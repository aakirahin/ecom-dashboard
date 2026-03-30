const formatDate = (date: Date) => date.toISOString().split('T')[0]

export const toISODate = (date: Date) => formatDate(date)

const today = new Date()
const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())

export const startDate = formatDate(lastMonth)
export const endDate = formatDate(today)

const previousEnd = new Date(lastMonth)
previousEnd.setDate(previousEnd.getDate() - 1)

const previousStart = new Date(previousEnd)
previousStart.setMonth(previousStart.getMonth() - 1)

export const previousStartDate = formatDate(previousStart)
export const previousEndDate = formatDate(previousEnd)