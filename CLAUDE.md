# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About this project

Starter project for the [Claude Code course on codewithmosh.com](https://codewithmosh.com/p/claude-code). It intentionally ships with a bug, poor UI, and messy code — these are fixed as exercises throughout the course.

## Commands

```bash
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build
npm run lint     # run ESLint
npm run preview  # preview production build
```

## Architecture

The entire app lives in a single file: `src/App.jsx`. There is no routing, no context, no custom hooks, and no external state library — just one React component with `useState`.

**State shape:**
- `transactions` — array of `{ id, description, amount, type, category, date }`. `amount` is stored as a **string** (this is the intentional bug: arithmetic on string amounts produces string concatenation instead of numeric sums).
- `description`, `amount`, `type`, `category` — controlled form inputs for adding a transaction.
- `filterType`, `filterCategory` — filter selectors; filtering is applied inline on each render (no `useMemo`).

**Derived values** (`totalIncome`, `totalExpenses`, `balance`) are computed directly in the render function from the `transactions` array.

Styles are in `src/App.css`. `.income-amount` / `.expense-amount` / `.balance-amount` classes control the color-coded amounts throughout the UI.
