import { useQuery } from "@tanstack/react-query";
import { DashboardResponse } from "../types/data";

export const getChatbotResponse = async (question: string): Promise<string> => {
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question })
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error ?? 'Failed to fetch chatbot response.');
    return data.message;
}

const INSIGHTS_PROMPT = `You are a data analyst for an e-commerce business.

Analyse the data and return exactly 3 key insights. Each insight must:
- Be one sentence, max 15 words
- Highlight a trend, pattern, or notable relationship between orders, revenue, categories, or regions
- Be immediately actionable or noteworthy for a business owner

Return only the 3 bullet points. No preamble, no explanation, no markdown headers.`

const buildInsightsPrompt = (dashboard: DashboardResponse) => {
    const topCategories = dashboard.categoryBreakdown.slice(0, 3);
    const topRegions = dashboard.regionBreakdown.slice(0, 3);
    const recentTrend = dashboard.revenueTrend.slice(-7);

    return `${INSIGHTS_PROMPT}

    Summary:
    - Filtered order count: ${dashboard.filteredOrderCount}
    - Current revenue: ${dashboard.kpis.current.totalRevenue.toFixed(2)}
    - Current orders: ${dashboard.kpis.current.totalOrders}
    - Average order total: ${dashboard.kpis.current.averageOrderTotal.toFixed(2)}
    - Returning customers: ${dashboard.kpis.current.returningCustomersPct.toFixed(1)}%
    - Revenue change vs previous period: ${dashboard.kpis.changes.revenue.toFixed(1)}%
    - Orders change vs previous period: ${dashboard.kpis.changes.orders.toFixed(1)}%
    - Average order change vs previous period: ${dashboard.kpis.changes.averageOrderTotal.toFixed(1)}%
    - Returning customer change vs previous period: ${dashboard.kpis.changes.returningCustomersPct.toFixed(1)}%

    Revenue trend:
    ${JSON.stringify(recentTrend)}

    Category breakdown:
    ${JSON.stringify(topCategories)}

    Region breakdown:
    ${JSON.stringify(topRegions)}`;
}

export const useFetchInsightsQuery = (dashboard: DashboardResponse | undefined) => {
    const { data: insights, isFetching, error, refetch } = useQuery({
        queryKey: ['insights', dashboard],
        queryFn: () => getChatbotResponse(buildInsightsPrompt(dashboard as DashboardResponse)),
        enabled: false,
        retry: false,
        staleTime: Infinity,
    })

    return { insights, isFetching, error, refetch }
}