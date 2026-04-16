# Saleor Store Template

A full-stack e-commerce store template built with [Saleor](https://saleor.io/). This project bundles together all three components needed to run a complete Saleor store out of the box.

## What's included

| Folder | Description |
|---|---|
| `saleor-platform` | Backend — Django API, PostgreSQL, Redis, and all supporting services via Docker Compose |
| `saleor-dashboard` | Admin dashboard — manage products, orders, customers, and settings |
| `storefront` | Customer-facing storefront built with Next.js |

## Getting started

1. Make sure you have [Docker](https://docs.docker.com/get-docker/) and [pnpm](https://pnpm.io/installation) installed
2. Start the backend:
   ```bash
   cd saleor-platform
   docker compose up
   ```
3. Install and run the storefront:
   ```bash
   cd storefront
   pnpm install
   pnpm dev
   ```
4. Install and run the dashboard:
   ```bash
   cd saleor-dashboard
   pnpm install
   pnpm start
   ```

## Built with

- [Saleor](https://saleor.io/) — headless e-commerce platform
- [Next.js](https://nextjs.org/) — storefront framework
- [Docker Compose](https://docs.docker.com/compose/) — local infrastructure
