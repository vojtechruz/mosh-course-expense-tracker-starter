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

There is no routing, no context, no custom hooks, and no external state library. The app is split into four components:

- **`App`** — root component. Owns `transactions` state and `handleAdd`. Passes data down via props. `categories` is a module-level constant defined in `App.jsx`.
- **`Summary`** — receives `transactions`, computes `totalIncome`, `totalExpenses`, and `balance` internally.
- **`TransactionForm`** — owns its own form state (`description`, `amount`, `type`, `category`). Calls `onAdd(transaction)` prop on submit.
- **`TransactionList`** — receives `transactions` and `categories`. Owns its own `filterType` / `filterCategory` state and applies filtering internally.

Styles are in `src/App.css`. `.income-amount` / `.expense-amount` / `.balance-amount` classes control the color-coded amounts throughout the UI.
