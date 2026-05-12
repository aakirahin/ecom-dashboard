# E-Commerce Dashboard

**[Live Demo](https://aesthetic-phoenix-0027ae.netlify.app/widgets)**

An interactive analytics dashboard for e-commerce data, built with Next.js App Router, React Query, and Recharts. The project focuses on scalable data architecture: a seeded mock data generator producing 15,000+ consistent records, a custom aggregation engine with period-over-period KPI comparison, and a fully generic, type-safe table system.

## Technical Highlights

**Deterministic data generation** — All mock data is generated at startup using `faker.seed(12345)`, producing the same 12,000 orders, 3,000 customers, and 60 products on every run. This makes demos and development consistent without a database. Product popularity models real-world sales patterns where a small number of products dominate volume. Order dates are always generated after the customer's signup date to maintain temporal coherence.

**Aggregation engine with period-over-period comparison** — The `/api/dashboard` route computes KPIs (total revenue, average order value, returning customer rate) and automatically derives the equivalent prior period for % change comparison. Generic utility functions (`buildTrend`, `buildBreakdown`, `sumSeries`) are typed with `keyof T` constraints so they work across any entity type.

**Type-safe generic table system** — `DataTable<T>` is a fully generic orchestrator that takes typed columns, a reducer-based state handler, and row data. All table concerns (search, sort, pagination) are managed through a `useReducer` + split context pattern (`TableStateContext` / `TableActionsContext`) to prevent unnecessary re-renders. Pagination renders smart ellipsis ranges using a `Set`-based deduplication approach.

**React Query with correct cache keying** — All query hooks include the full filter/sort/pagination state in their query keys, so any state change automatically triggers a re-fetch. `staleTime: Infinity` prevents redundant network calls against stable mock data.

**AI insights integration** — An optional `POST /api/chat` route constructs a structured prompt from live dashboard state (top categories, top regions, 7-day trend, all KPIs) and proxies it to OpenRouter. The React Query hook is `enabled: false` by default and only fires when explicitly triggered.

## Architecture

```
app/
  page.tsx              # Dashboard page — KPIs, trend chart, breakdown charts, order table
  widgets/              # Composable widget experiments
  _components/
    Charts/             # LineChart, PieChart, BarChart (Recharts wrappers)
    Table/              # Generic DataTable, Search, Pagination, TableHeader, TableBody
    Content/            # KPI cards, chart sections
    SkeletonLoading/    # Loading state UI
  _context/
    TableContextProvider  # Split state/actions context with useReducer
  api/
    dashboard/          # Aggregation endpoint (KPIs + chart data + period comparison)
    orders/             # Paginated, sortable, filterable order list
    customers/          # Customer list with segment filtering
    products/           # Product list with category filtering
    chat/               # OpenRouter proxy for AI insights
lib/
  data/mockData.ts      # Seeded deterministic data generation (Faker)
  queries/              # React Query hooks + query param builders
  reducer/              # Table state reducer
  types/                # Shared TypeScript types
  utils/                # buildTrend, buildBreakdown, sumSeries aggregation utilities
```

## Tech Stack

- **Next.js 15** (App Router) + TypeScript
- **TanStack React Query** — server state, caching, request deduplication
- **Recharts** — chart rendering
- **Tailwind CSS** — styling
- **Faker.js** — seeded mock data generation
- **OpenRouter API** — optional AI insights

## Getting Started

```bash
npm install
npm run dev
# → http://localhost:3000
```

For AI insights, create `.env.local`:

```env
API_KEY=your_openrouter_api_key
```

## API Reference

| Endpoint | Method | Description |
|---|---|---|
| `/api/dashboard` | GET | KPIs + chart data + period-over-period comparison |
| `/api/orders` | GET | Paginated orders with search, sort, date/region/category filters |
| `/api/customers` | GET | Paginated customers with segment/country filters |
| `/api/products` | GET | Paginated products with category filter |
| `/api/chat` | POST | OpenRouter proxy for AI-generated dashboard insights |

All list endpoints return `{ page, pageSize, total, totalPages, data }`.

## Available Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # Run ESLint
```


