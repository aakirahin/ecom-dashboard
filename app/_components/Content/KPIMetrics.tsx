"use client"

import { DollarSign, MoveDownRight, MoveUpRight, ShoppingBag, Store, Users } from 'lucide-react'
import React from 'react'
import KPILoading from '../SkeletonLoading/KPILoading'
import { DashboardResponse } from '@/lib/types/dashboard'
import { borderClass } from '@/lib/styles/tailwindClasses'

type Props = {
  dashboard: DashboardResponse | undefined
  isLoading: boolean
  error: Error | null
}

type CardProps = {
  title: string
  value: string
  icon: React.ReactNode
  changePct: number
}

const iconClassName = `${borderClass} rounded-full p-3 w-auto h-auto`

const formatCurrency = (value: number) => `£${value.toLocaleString('en-GB', { maximumFractionDigits: 0 })}`

const emptyMetrics = {
  totalRevenue: 0,
  totalOrders: 0,
  averageOrderTotal: 0,
  returningCustomersPct: 0,
}

const emptyChanges = {
  revenue: 0,
  orders: 0,
  averageOrderTotal: 0,
  returningCustomersPct: 0,
}

const Card = ({
  title,
  value,
  icon,
  changePct,
}: CardProps) => {
  const isIncrease = changePct >= 0
  const trendColor = isIncrease ? 'text-green-600' : 'text-red-600'

  return (
    <div className='flex flex-col md:w-1/2 sm:w-full p-4 items-baseline justify-between'>
      {icon}
      <div className='flex flex-col gap-1'>
        <span>{title}</span>
        <span className='text-4xl text-[#626366] font-sofia'>{value}</span>
        <span className={`flex gap-0.5 items-center text-[12px] font-normal ${trendColor}`}>
          {isIncrease ? <MoveUpRight size={14} /> : <MoveDownRight size={14} />}
          {`${isIncrease ? '+' : ''}${Math.abs(changePct).toFixed(1)}% vs last month`}
        </span>
      </div>
    </div>
  )
}

const RowCard = ({
  left,
  right
}: { left: CardProps; right: CardProps }) => {
  return (
    <div className='flex flex-col sm:flex-row sm:h-1/2 divide-y sm:divide-y-0 sm:divide-x divide-gray-200'>
      <Card
        title={left.title}
        value={left.value}
        icon={left.icon}
        changePct={left.changePct}
      />
      <Card
        title={right.title}
        value={right.value}
        icon={right.icon}
        changePct={right.changePct}
      />
    </div>
  )
}

const KPIMetrics = ({
  dashboard,
  isLoading,
  error,
}: Props) => {
  if (isLoading) return <KPILoading />

  const hasError = !!error || !dashboard
  const current = dashboard?.kpis.current ?? emptyMetrics
  const changes = dashboard?.kpis.changes ?? emptyChanges

  return (
    <div className={`flex flex-col bg-white ${borderClass} divide-y divide-gray-200 rounded-lg w-auto xl:w-1/3 p-4 font-medium`}>
      <RowCard
        left={{
          title: 'Total Revenue',
          value: hasError ? 'N/A' : formatCurrency(current.totalRevenue),
          icon: <Store size={18} color='#2081FF' className={iconClassName}/>,
          changePct: hasError ? 0 : changes.revenue,
        }}
        right={{
          title: 'Total Orders',
          value: hasError ? 'N/A' : current.totalOrders.toLocaleString('en-GB'),
          icon: <ShoppingBag size={18} color='#2081FF' className={iconClassName}/>,
          changePct: hasError ? 0 : changes.orders,
        }}
      />
      <RowCard
        left={{
          title: 'Average Order Total',
          value: hasError ? 'N/A' : formatCurrency(current.averageOrderTotal),
          icon: <DollarSign size={18} color='#2081FF' className={iconClassName}/>,
          changePct: hasError ? 0 : changes.averageOrderTotal,
        }}
        right={{
          title: 'Returning Customers',
          value: hasError ? 'N/A' : `${Math.round(current.returningCustomersPct)}%`,
          icon: <Users size={18} color='#2081FF' className={iconClassName}/>,
          changePct: hasError ? 0 : changes.returningCustomersPct,
        }}
      />
    </div>
  )
}

export default KPIMetrics