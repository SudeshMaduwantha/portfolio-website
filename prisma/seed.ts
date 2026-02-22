import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.project.deleteMany();

  const projects = [
    {
      title: "Car Rental Management System",
      slug: "car-rental-management-system",
      description:
        "A full-stack car rental platform with real-time availability, booking management, and an admin dashboard for fleet control.",
      longDesc: `<p>A comprehensive <strong>Car Rental Management System</strong> built to digitize the manual booking and fleet management process for car rental businesses in Sri Lanka.</p>
<h3>Key Features</h3>
<ul>
  <li>Real-time car availability calendar</li>
  <li>Customer booking and payment management</li>
  <li>Admin dashboard for fleet, revenue & bookings</li>
  <li>PDF invoice generation</li>
  <li>Role-based access control</li>
</ul>`,
      techStack: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS", "TypeScript", "NextAuth"],
      imageUrl: null,
      images: [],
      githubUrl: "https://github.com/sudeshkumarasiri/car-rental-system",
      liveUrl: null,
      featured: true,
      category: "fullstack",
      status: "completed",
      problem: `Car rental businesses in Sri Lanka were managing bookings manually with spreadsheets and phone calls, leading to double-bookings, revenue loss, and poor customer experience. There was no centralized system to track car availability, customer history, or revenue analytics.`,
      solution: `Built a full-stack web application using Next.js 14 with App Router and Prisma ORM connected to a PostgreSQL (Supabase) database. Implemented real-time availability checking using server-side rendering, a comprehensive admin dashboard, and automated invoice generation. Authentication was handled with NextAuth.js with role-based access control.`,
      architecture: `- Next.js App Router with Server Components for data fetching\n- Prisma schema with relations: Car → Bookings → Customer\n- RESTful API routes via Next.js Route Handlers\n- Server Actions for form mutations (create/update/delete bookings)\n- Supabase PostgreSQL for production database\n- Repository pattern for data access layer\n- JWT-based auth with NextAuth.js`,
    },
    {
      title: "Web POS System",
      slug: "web-pos-system",
      description:
        "A browser-based Point of Sale system with inventory management, sales reporting, and real-time stock tracking.",
      longDesc: `<p>A modern <strong>Web-based POS (Point of Sale) System</strong> designed for small to medium-sized retail businesses, replacing traditional cash registers with a powerful browser app.</p>`,
      techStack: ["PHP", "MySQL", "JavaScript", "Bootstrap", "AJAX", "Chart.js"],
      imageUrl: null,
      images: [],
      githubUrl: "https://github.com/sudeshkumarasiri/web-pos",
      liveUrl: null,
      featured: true,
      category: "fullstack",
      status: "completed",
      problem: `Small retail shops in Sri Lanka relied on manual billing and paper-based inventory tracking. This led to calculation errors, stock discrepancies, and no visibility into sales trends or best-selling products.`,
      solution: `Developed a PHP-based Web POS with MySQL database, featuring real-time inventory updates via AJAX, sales analytics with Chart.js, and receipt printing. The system supports multiple users with role-based permissions.`,
      architecture: `- MVC architecture with PHP\n- PDO for type-safe MySQL queries\n- AJAX for real-time product search and cart updates\n- Chart.js for sales dashboard visualizations\n- Custom session-based authentication\n- Responsive UI with Bootstrap 5`,
    },
    {
      title: "DKTech AI Assistant",
      slug: "dktech-ai-assistant",
      description:
        "An AI-powered programming assistant integrated with the DKTech platform to help students debug code and learn concepts.",
      longDesc: `<p>An intelligent <strong>AI coding assistant</strong> built specifically for programming students, integrated into the DKTech learning platform.</p>`,
      techStack: ["Next.js", "Python", "FastAPI", "OpenAI API", "Prisma", "PostgreSQL", "Tailwind CSS"],
      imageUrl: null,
      images: [],
      githubUrl: "https://github.com/sudeshkumarasiri/dktech-ai",
      liveUrl: null,
      featured: true,
      category: "ai",
      status: "in-progress",
      problem: `Programming students — especially beginners in Sri Lanka — struggle to get immediate help when stuck. Stack Overflow and ChatGPT answers are often too advanced or lack context for local curriculum requirements.`,
      solution: `Built a specialized AI assistant using OpenAI's API with a custom system prompt tuned for ICT/programming education. The backend is a Python FastAPI service that processes queries with context about the student's current topic, and the frontend is a Next.js chat interface.`,
      architecture: `- Next.js frontend with streaming responses via SSE\n- Python FastAPI microservice for AI processing\n- OpenAI GPT-4 with custom education-focused prompts\n- Prisma + PostgreSQL for conversation history\n- Rate limiting and token management\n- Markdown rendering for code blocks`,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
    console.log(`✅ Seeded: ${project.title}`);
  }

  console.log("✅ Seeding complete!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
