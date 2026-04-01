# E-Commerce Dashboard

Deployed site: https://aesthetic-phoenix-0027ae.netlify.app/widgets 

An interactive e-commerce analytics dashboard built with Next.js, React Query, and Recharts.

The app visualizes mock commerce data (orders, products, customers) and includes:

- KPI summaries and period-over-period comparisons
- Revenue trend and breakdown charts
- Search, sort, and pagination for order history
- Optional chat endpoint for generated insights
- Configurable widget-based dashboard experiments (COMING SOON)

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- TanStack React Query
- Recharts
- Faker (mock data generation)

## Project Goals

- Provide a realistic analytics UI for e-commerce reporting
- Keep data logic and chart utilities reusable
- Experiment with customizable dashboard widgets
- Practice scalable frontend architecture patterns

## Features

- Dashboard page with:
	- KPI cards
	- Revenue line trend
	- Category/region pie breakdowns
	- Order history table
- Widgets page for modular chart/table widgets
- Date and category/region filtering
- API routes for orders, products, customers, and dashboard aggregates
- Mock data generation at startup

## API Endpoints

- `GET /api/orders`
	- Search, sort, filter, paginate orders
- `GET /api/customers`
	- Search, sort, filter, paginate customers
- `GET /api/products`
	- Filter, sort, paginate products
- `GET /api/dashboard`
	- Returns aggregated dashboard payload (KPIs + chart data)
- `POST /api/chat`
	- Proxy endpoint for chat responses via OpenRouter

## Environment Variables

Create a `.env.local` file in the project root:

```bash
API_KEY=your_openrouter_api_key
```

`API_KEY` is required only for `POST /api/chat`.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Add environment variables (optional if you are not using chat).

3. Start development server:

```bash
npm run dev
```

4. Open:

```text
http://localhost:3000
```

## Available Scripts

- `npm run dev` - start development server
- `npm run build` - build for production
- `npm run start` - run production build
- `npm run lint` - run ESLint

## Data Model Snapshot

Generated mock dataset includes:

- ~12,000 orders
- ~3,000 customers
- ~60 products

Orders include fields such as date, revenue, product category, region, and customer id.

## Architecture Notes

- React Query handles server-state fetching and caching
- UI state (search/sort/pagination/filter controls) is managed in reducer/context patterns
- Shared utility functions build chart-friendly data from raw entities
- Widget components are intended to be composable and extensible

## Roadmap Ideas

- Drag-and-drop widget layout customization
- Persisted dashboard layout/preferences
- Dedicated chart aggregation endpoints for heavier datasets
- Broader test coverage for query builders and chart utilities
