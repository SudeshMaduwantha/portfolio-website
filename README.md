# Sudesh Kumarasiri — Portfolio Website

> Personal portfolio of **Sudesh Kumarasiri** — Full-Stack & AI Engineer, Founder & CEO of DKTECH PVT LTD, Software Systems Engineering undergraduate at the University of Kelaniya, and ICT Teacher.

🌐 **Live:** [portfolio-website on Vercel](https://portfolio-website-sudesh.vercel.app)
🐙 **GitHub:** [SudeshMaduwantha/portfolio-website](https://github.com/SudeshMaduwantha/portfolio-website)

---

## ✨ Features

- **Bento Grid Home Page** — Modern card-based layout with neural network animated background
- **Dynamic Projects** — Auto-synced from GitHub + manually managed via Admin Panel
- **Services Page** — Showcase of professional services with live client site previews
- **Teaching Page** — DKTech PVT LTD YouTube channel & ICT tutorial showcase
- **Admin Panel** — Full CRUD: projects, client sites, profile/CV, security settings
- **JWT Authentication** — Secure login with bcrypt-hashed passwords
- **Contact Form** — Saves to DB + sends styled email notification via Gmail SMTP
- **Light & Dark Theme** — Fully styled for both modes including neural background
- **Smooth Animations** — Framer Motion scroll reveals, stagger animations, bento card entrances
- **Mobile Responsive** — Optimised for all screen sizes

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS + `next-themes` (dark/light) |
| Animations | Framer Motion |
| Database ORM | Prisma 5 |
| Database | PostgreSQL via Supabase |
| Auth | `jose` (JWT) + `bcryptjs` |
| Email | Nodemailer (Gmail SMTP) |
| Deployment | Vercel |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Home (Bento Grid)
│   ├── projects/                 # Public projects list + case studies
│   ├── services/                 # Services page
│   ├── teaching/                 # Teaching & YouTube content
│   ├── admin/                    # Protected admin panel
│   │   ├── login/                # Admin login
│   │   ├── projects/             # Manage projects (CRUD)
│   │   ├── clients/              # Manage client sites
│   │   ├── profile/              # Update profile & CV
│   │   └── security/             # Change username/password
│   └── api/                      # REST API routes
├── components/
│   ├── NeuralBackground.tsx      # Animated canvas neural network
│   ├── HomeClient.tsx            # Bento grid home layout
│   ├── AnimatedSection.tsx       # Scroll-triggered reveal wrapper
│   ├── Navigation.tsx            # Top nav with theme toggle
│   ├── Footer.tsx                # Footer with social links
│   ├── ContactForm.tsx           # Contact form (DB + email)
│   ├── ProjectCard.tsx           # Project card component
│   └── ServicesClient.tsx        # Services page client component
├── lib/
│   ├── actions.ts                # Server actions (projects, contact, etc.)
│   ├── auth.ts                   # JWT session helpers
│   ├── github-sync.ts            # GitHub API auto-sync
│   └── prisma.ts                 # Prisma client singleton
└── middleware.ts                  # Protect /admin/* routes
```

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/SudeshMaduwantha/portfolio-website.git
cd portfolio-website
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file:

```env
# Supabase PostgreSQL
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

# JWT (use a long random string)
JWT_SECRET="your-secret-key-here"

# Gmail SMTP (for contact form emails)
SMTP_USER="your-gmail@gmail.com"
SMTP_PASS="your-16-char-app-password"
```

> **Gmail App Password setup:** Google Account → Security → 2-Step Verification → App passwords → Create for "Mail"

### 3. Push Database Schema

```bash
npx prisma db push
```

### 4. Seed the Database

```bash
node prisma/seed.js
```

### 5. Run Dev Server

```bash
npm run dev
```

Open: [http://localhost:3000](http://localhost:3000)

---

## 🔒 Admin Panel

Access at `/admin/login`

| Default Credential | Value |
|---|---|
| Username | `admin` |
| Password | `admin123` |

> ⚠️ Change these immediately after first login via **Admin → Security**.

### Admin Features
- ✅ Add / Edit / Delete projects
- ✅ Manage client sites (with browser-chrome previews on Services page)
- ✅ Update profile information & CV link
- ✅ Change admin username & password

---

## 🌐 Routes

| Route | Description |
|---|---|
| `/` | Home — Bento Grid layout |
| `/projects` | All projects (sorted: featured first, newest first) |
| `/projects/[slug]` | Project case study detail page |
| `/services` | Professional services + client site previews |
| `/teaching` | Teaching & DKTech YouTube content |
| `/admin` | Admin dashboard |
| `/admin/login` | Admin login |
| `/admin/projects` | Manage projects |
| `/admin/clients` | Manage client sites |
| `/admin/profile` | Update profile & CV |
| `/admin/security` | Change credentials |

---

## 🗃 Database Commands

```bash
npx prisma db push       # Push schema changes to DB
npx prisma studio        # Open Prisma Studio GUI
npx prisma generate      # Regenerate Prisma client
node prisma/seed.js      # Seed initial data
```

---

## ☁️ Deploy to Vercel

1. Push code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) → Import the repo
3. Add these **Environment Variables** in Vercel:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `SMTP_USER`
   - `SMTP_PASS`
4. Click **Deploy** — auto-deploys on every `git push`

---

## 👨‍💻 Built By

**Sudesh Kumarasiri**
- 🏢 Founder & CEO — [DKTECH PVT LTD](https://youtube.com/@dktechpvtltd2131)
- 🎓 BSc Software Systems Engineering — University of Kelaniya
- 📺 YouTube: [DKTech PVT LTD](https://youtube.com/@dktechpvtltd2131?si=aY_Bf_qH_tGg9egF)
- 💼 GitHub: [SudeshMaduwantha](https://github.com/SudeshMaduwantha)
- 💬 WhatsApp: [+94 71 317 2922](https://wa.me/94713172922)


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
