# Khata

Khata is a full-stack personal finance and ledger management application for tracking income, expenses, account balances, budgets, and transfers in one place.

## Overview

The application gives users a practical view of their financial activity through a dashboard, account-level ledgers, searchable transactions, budget monitoring, and interactive reports. It is designed for personal use and supports Indian Rupee formatting and Indian financial-year reporting.

## Features

- Dashboard with net worth, account balances, daily expenses, monthly income, monthly expenses, and financial-year expenses
- Income and expense tracking with notes, categories, payment methods, and account associations
- Multiple bank and cash accounts with opening balances and calculated current balances
- Account detail pages with opening balance, closing balance, net change, and transaction history
- Internal account transfers and family-related transfers
- Refundable payment tracking with refund, write-off, refund date, amount, account, and notes
- Liability tracking with funds received, spending history, additional funds, and settlement status
- Custom expense and income categories with icons, colors, and monthly budgets
- Budget-overrun alerts on the dashboard
- Analytics for category totals, payment methods, spending trends, top expenses, and average daily spending
- Filters for today, month, year, financial year, specific month, and custom date ranges
- Transaction search, sorting, editing, deletion, and CSV export
- CSV import/export for transactions and transfers
- JSON backup and restore for application data
- Local JSON API persistence with localStorage fallback

## Tech Stack

- React 18
- Vite
- Node.js and Express
- Recharts
- Lucide React
- JSON file-based local storage

## Architecture

The React application is loaded from `src/main.jsx` and the primary interface is implemented in `khata-expense-tracker.jsx`. The Express server in `server.js` exposes storage endpoints under `/api/storage/:key` and persists application data as JSON files.

Vite proxies `/api` requests to the local Express server on port `5001`. The frontend falls back to browser localStorage if the API is unavailable.

## Getting Started

### Install dependencies

```bash
npm install
```

### Start the application

Run the backend and frontend in separate terminals:

```bash
node server.js
```

```bash
npm run dev
```

Alternatively, use the helper script:

```bash
python3 run.py
```

The frontend is usually available at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

## Data Privacy

Personal records are stored locally and the `data/` directory is excluded by `.gitignore`. This prevents account, expense, transfer, category, and family-member data from being committed to a public repository. The repository contains only the application source and sample-free configuration files.

## Portfolio Summary

Khata demonstrates practical full-stack development through a responsive React interface, reusable modal workflows, derived financial calculations, interactive data visualization, REST API persistence, import/export functionality, and careful handling of multiple transaction types.
