# Offroad NLA Parts Sourcing Europe

A simple B2B RFQ website for a Germany-based sourcing company specializing in hard-to-find offroad and military vehicle parts.

## Features

- Next.js App Router with TypeScript and Tailwind CSS
- English and German pages
- SEO titles and descriptions for each public page
- Vehicle landing pages for:
  - HMMWV / Humvee NLA parts
  - Willys Jeep parts
  - Mercedes / Puch G W460 NLA parts
- RFQ form with buyer, vehicle, part, quantity, target price, photo placeholder, and notes fields
- Version 1 local JSON storage; no database required
- Password-protected admin page for viewing RFQs and changing status to `new`, `reviewing`, `quoted`, `won`, or `lost`

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The home page redirects to `/en`.

## Environment variables

Create `.env.local` for local development or configure the same variables in your hosting provider.

```bash
ADMIN_PASSWORD=replace-with-a-strong-password
RFQ_STORAGE_PATH=.rfq-data/rfqs.json
NEXT_PUBLIC_SITE_URL=https://example.com
```

- `ADMIN_PASSWORD` protects `/admin` and the admin API routes.
- `RFQ_STORAGE_PATH` controls where local JSON RFQ submissions are stored.
- `NEXT_PUBLIC_SITE_URL` is used for metadata base URLs.

## RFQ storage

Submissions are stored as JSON at `.rfq-data/rfqs.json` by default. This path is ignored by Git.

Local JSON storage is intentionally simple for version 1. On serverless platforms, the filesystem may be ephemeral or read-only, so use a persistent Node.js host, a mounted volume, or move to a database in a later version before production scale.

## Admin workflow

1. Visit `/admin`.
2. Enter the password configured in `ADMIN_PASSWORD`.
3. Review RFQs from local JSON storage.
4. Update each RFQ status as work progresses:
   - `new`
   - `reviewing`
   - `quoted`
   - `won`
   - `lost`

## Useful scripts

```bash
npm run dev        # start local development server
npm run build      # create production build
npm run start      # run production server after build
npm run typecheck  # run TypeScript checks
npm run lint       # run Next.js ESLint checks
```

## Deployment

### Node.js server or VPS

1. Install Node.js 20+.
2. Clone the repository.
3. Run `npm ci`.
4. Configure `.env.local` or production environment variables.
5. Run `npm run build`.
6. Start with `npm run start` behind a reverse proxy.
7. Ensure the directory configured by `RFQ_STORAGE_PATH` is writable and backed up.

### Vercel or other serverless hosts

The app can build on serverless hosts, but local JSON writes are not durable in many serverless environments. For a real production deployment on serverless infrastructure, replace local JSON storage with durable storage in version 2.
