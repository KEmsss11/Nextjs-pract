# ScanPDF

ScanPDF is a Next.js application with Supabase authentication and a PostgreSQL user-profile database managed through Prisma. Authenticated users can register, sign in, view a dashboard and profile, and navigate to PDF scan and history areas.

> The PDF upload, scanning, and history-display interfaces are currently scaffolded; the end-to-end scan workflow has not yet been implemented.

## Tech stack

- Next.js 16, React 19, TypeScript, and Tailwind CSS
- Supabase Auth for registration, login, sessions, and email confirmation
- PostgreSQL and Prisma 7 for application data
- shadcn/ui and Lucide icons for the interface

## Prerequisites

- Node.js 20.19 or later
- pnpm (enable it with `corepack enable` if needed)
- A PostgreSQL database, either local or hosted
- A Supabase project

## Get started

```bash
git clone <your-repository-url>
cd pract-nextjs
corepack enable
pnpm install
```

### 1. Configure environment variables

Create a root `.env` file. It is ignored by Git. Prisma's configuration reads this file when running migrations or generating the client.

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="your-supabase-publishable-key"
```

In Supabase, copy the project URL and publishable key from the project's API settings. Then add the following redirect URL in **Authentication → URL Configuration**:

```text
http://localhost:3000/auth/callback
```

Also add the equivalent production callback URL before deploying.

### 2. Set up PostgreSQL

The repository includes a local PostgreSQL service in `docker-compose.yml`. With Docker running, start it with:

```bash
docker compose up -d
```

For that local service, use this connection string in `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/pract_nextjs?schema=public"
```

You can instead use any reachable PostgreSQL database and set `DATABASE_URL` accordingly.

### 3. Apply migrations and generate Prisma Client

```bash
pnpm prisma migrate deploy
pnpm prisma generate
```

For an in-development schema change, create a new migration instead:

```bash
pnpm prisma migrate dev --name <migration-name>
```

Run `pnpm prisma generate` again after editing `prisma/schema.prisma`.

### 4. Start the app

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000). The root route redirects to the login page.

## Available areas

| Route | Purpose |
| --- | --- |
| `/auth/register` | Creates a Supabase account and stores its application profile. |
| `/auth/login` | Signs in with email and password. |
| `/dashboard` | Displays a user dashboard; administrators receive an admin status panel. |
| `/profile` | Shows the saved profile and location details. |
| `/scan` | Placeholder for PDF upload and scanning. |
| `/history` | Placeholder for a user's scanned-PDF history. |

Registration collects the user's name, phone number, and Philippine address. Region, province, city/municipality, and barangay lists are retrieved from the public PSGC API.

## Project structure

```text
src/app/               Routes, pages, and API endpoints
src/components/        Authentication, navigation, and UI components
src/lib/prisma.ts      Shared Prisma client using the PostgreSQL driver adapter
src/lib/supabase/      Browser and server Supabase clients
prisma/schema.prisma   Database schema
prisma/migrations/     Versioned database migrations
docker-compose.yml     Optional local PostgreSQL service
```

## Database model

Prisma stores an application `User` record linked to the Supabase user ID. It includes profile and address fields, a `USER`/`ADMIN` role, and related `PdfHistory` records for the planned scan-history feature.

## Commands

```bash
pnpm dev           # Start the development server
pnpm lint          # Run ESLint
pnpm lint:fix      # Fix lint issues where possible
pnpm build         # Create a production build
pnpm start         # Run the production server
pnpm prisma studio # Open Prisma Studio
```

## Notes

- Use pnpm to preserve the dependency versions in `pnpm-lock.yaml`.
- Never commit `.env` files or database credentials.
- The current registration endpoint creates the application profile after Supabase sign-up, so the database must be migrated and reachable before registering users.
