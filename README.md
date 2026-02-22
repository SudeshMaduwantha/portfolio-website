# Sudesh Kumarasiri Portfolio

Next-level personal portfolio built with **Next.js 14**, **Prisma 5**, **PostgreSQL (Supabase)**, **Framer Motion**, and **Tailwind CSS**.

## Tech Stack
| Layer | Technology |
|---|---|
| Frontend | Next.js 14 App Router + TypeScript |
| Styling | Tailwind CSS + Dark Mode (next-themes) |
| Animations | Framer Motion |
| ORM | Prisma 5 |
| Database | PostgreSQL via Supabase |
| Deployment | Vercel |

## Quick Start

### 1. Install
```bash
npm install
```

### 2. Setup Database (Supabase)
- Create free project at https://supabase.com
- Go to: Project Settings > Database > Connection String > URI
- Copy the connection string

### 3. Configure .env
```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

### 4. Push schema to DB
```bash
npm run db:push
```

### 5. Start dev server
```bash
npm run dev
```

Open: http://localhost:3000

## Routes
| Route | Description |
|---|---|
| `/` | Home - Bento Grid |
| `/projects` | All projects |
| `/projects/[slug]` | Project case study |
| `/teaching` | Teaching & DKTech content |
| `/admin` | Admin dashboard |
| `/admin/projects/new` | Add new project |

## Admin Panel
Go to `/admin` to manage projects from any device - no rebuild needed.

## Database Commands
```bash
npm run db:push      # Push schema
npm run db:studio    # Prisma Studio UI
```

## Deploy
Set `DATABASE_URL` in Vercel environment variables, then deploy.

Built by Sudesh Kumarasiri - DKTech
