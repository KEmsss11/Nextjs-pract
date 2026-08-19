# pract-nextjs

A Next.js application using Supabase authentication, PostgreSQL, and Prisma.

## Prerequisites

- Node.js 20 or later
- pnpm 9 or later (`corepack enable` can install the bundled pnpm version)
- A PostgreSQL database
- A Supabase project

## Clone and install

```bash
git clone <your-repository-url>
cd pract-nextjs
corepack enable
pnpm install
```

## Configure environment variables

Create a `.env.local` file in the project root. Do not commit this file.

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require"
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="your-supabase-publishable-key"
```

Get the Supabase URL and publishable key from your Supabase project settings. Set `DATABASE_URL` to the PostgreSQL connection string for the database used by Prisma.

## Set up the database

Apply the committed Prisma migrations and generate the Prisma client:

```bash
pnpm prisma migrate deploy
pnpm prisma generate
```

For local schema changes during development, use:

```bash
pnpm prisma migrate dev --name <migration-name>
```

## Run the app

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful commands

```bash
pnpm lint       # Run ESLint
pnpm build      # Create a production build
pnpm start      # Run the production build
```

## Notes

- The Prisma schema is at `prisma/schema.prisma`.
- Supabase is used for authentication; configure its allowed redirect URLs to include your local and production application URLs.
- This project uses the `pnpm-lock.yaml` lockfile. Use pnpm to keep dependency versions consistent.
