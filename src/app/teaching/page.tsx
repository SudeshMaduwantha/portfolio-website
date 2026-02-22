import { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Youtube, BookOpen, Users, Clock, ExternalLink, PlayCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Teaching & Content",
  description:
    "ICT tutorials, programming masterclasses, and educational content by Sudesh Kumarasiri on DKTech YouTube channel for Sri Lankan students.",
};

const content = [
  {
    type: "masterclass",
    title: "Next.js Full-Stack Masterclass",
    description:
      "Complete guide to building production-ready Next.js 14 apps with App Router, Prisma, PostgreSQL, and Tailwind CSS. From setup to deployment on Vercel.",
    students: 120,
    duration: "8 hours",
    tags: ["Next.js 14", "Prisma", "PostgreSQL", "Tailwind", "Vercel"],
    color: "from-indigo-950 to-violet-950",
    iconColor: "text-indigo-400",
    url: "https://youtube.com/@dktechpvtltd2131?si=aY_Bf_qH_tGg9egF",
  },
  {
    type: "tutorial",
    title: "PHP & MySQL Web Development",
    description:
      "Practical web development with PHP, covering OOP principles, PDO database connections, and building real-world CRUD applications step by step.",
    students: 200,
    duration: "5 hours",
    tags: ["PHP", "MySQL", "PDO", "CRUD", "OOP"],
    color: "from-violet-950 to-purple-950",
    iconColor: "text-violet-400",
    url: "https://youtube.com/@dktechpvtltd2131?si=aY_Bf_qH_tGg9egF",
  },
  {
    type: "tutorial",
    title: "Python for Beginners",
    description:
      "Python fundamentals for Sri Lankan ICT students â€” variables, functions, OOP, file I/O, and practical projects aligned with the A/L curriculum.",
    students: 180,
    duration: "4 hours",
    tags: ["Python", "OOP", "A/L ICT", "Sinhala"],
    color: "from-yellow-950 to-orange-950",
    iconColor: "text-yellow-400",
    url: "https://youtube.com/@dktechpvtltd2131?si=aY_Bf_qH_tGg9egF",
  },
  {
    type: "workshop",
    title: "React Crash Course",
    description:
      "Hands-on React workshop â€” hooks, state management, component patterns, and building a mini project from scratch. Perfect for beginners.",
    students: 95,
    duration: "3 hours",
    tags: ["React", "Hooks", "State", "Components"],
    color: "from-sky-950 to-cyan-950",
    iconColor: "text-sky-400",
    url: "https://youtube.com/@dktechpvtltd2131?si=aY_Bf_qH_tGg9egF",
  },
  {
    type: "masterclass",
    title: "Database Design with Prisma",
    description:
      "Deep dive into database design principles, Prisma schema modeling, migrations, relations, and type-safe queries for production apps.",
    students: 75,
    duration: "4 hours",
    tags: ["Prisma", "PostgreSQL", "Database Design", "ORM"],
    color: "from-teal-950 to-emerald-950",
    iconColor: "text-teal-400",
    url: "https://youtube.com/@dktechpvtltd2131?si=aY_Bf_qH_tGg9egF",
  },
  {
    type: "tutorial",
    title: "ICT A/L Revision â€” Systems Analysis",
    description:
      "Comprehensive revision of Systems Analysis & Design for A/L ICT exam â€” Data Flow Diagrams, Use Cases, and ER Diagrams with Sinhala explanations.",
    students: 350,
    duration: "3 hours",
    tags: ["A/L ICT", "DFD", "Use Case", "ER Diagram", "Sinhala"],
    color: "from-rose-950 to-pink-950",
    iconColor: "text-rose-400",
    url: "https://youtube.com/@dktechpvtltd2131?si=aY_Bf_qH_tGg9egF",
  },
];

const typeLabel: Record<string, string> = {
  masterclass: "Masterclass",
  tutorial: "Tutorial",
  workshop: "Workshop",
};

const typeBadge: Record<string, string> = {
  masterclass:
    "border-indigo-500/30 bg-indigo-500/10 text-indigo-300",
  tutorial: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  workshop: "border-amber-500/30 bg-amber-500/10 text-amber-300",
};

export default function TeachingPage() {
  const totalStudents = content.reduce((s, c) => s + c.students, 0);

  return (
    <div className="min-h-screen px-4 py-12 max-w-6xl mx-auto">
      {/* Header */}
      <AnimatedSection>
        <div className="rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-rose-950 to-orange-950 p-10 mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Youtube size={32} className="text-rose-400" />
            <span className="font-bold text-lg text-white">DKTech Â· YouTube Channel</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Teaching &amp; Content Creation
          </h1>
          <p className="text-neutral-300 max-w-2xl leading-relaxed">
            Helping Sri Lankan students master programming through practical
            tutorials, masterclasses, and exam revision content â€” all in
            Sinhala &amp; English. This is what makes my portfolio unique.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-6">
            <div>
              <p className="text-3xl font-bold text-white">{totalStudents}+</p>
              <p className="text-xs text-rose-300/70 mt-1 flex items-center gap-1">
                <Users size={12} /> Students Reached
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{content.length}</p>
              <p className="text-xs text-rose-300/70 mt-1 flex items-center gap-1">
                <BookOpen size={12} /> Courses/Tutorials
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">4+</p>
              <p className="text-xs text-rose-300/70 mt-1 flex items-center gap-1">
                <Clock size={12} /> Years Teaching
              </p>
            </div>
          </div>

          <a
            href="https://youtube.com/@dktechpvtltd2131?si=aY_Bf_qH_tGg9egF"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors"
          >
            <Youtube size={16} /> Visit DKTech Channel <ExternalLink size={14} />
          </a>
        </div>
      </AnimatedSection>

      {/* Teaching Role */}
      <AnimatedSection delay={0.1} className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950">
                <BookOpen size={18} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="font-bold text-neutral-900 dark:text-white">ICT Teacher</p>
                <p className="text-xs text-neutral-500">School-level Teaching</p>
              </div>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Teaching ICT at school level â€” covering Systems Analysis, Networking,
              Programming, and Database subjects. Helping students prepare for
              A/L and O/L examinations with practical examples.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-950">
                <Youtube size={18} className="text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <p className="font-bold text-neutral-900 dark:text-white">Content Creator</p>
                <p className="text-xs text-neutral-500">YouTube Â· DKTech</p>
              </div>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Creating in-depth programming tutorials and masterclasses in Sinhala
              for Sri Lankan developers. Topics range from web development to AI,
              making quality education accessible.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Content Grid */}
      <AnimatedSection delay={0.15}>
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
          Courses &amp; Tutorials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {content.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.08}>
              <div className="group h-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden flex flex-col hover:shadow-xl hover:shadow-indigo-500/10 transition-shadow">
                <div
                  className={`h-32 bg-gradient-to-br ${item.color} flex items-center justify-center`}
                >
                  <PlayCircle size={40} className={item.iconColor} />
                </div>
                <div className="p-5 flex flex-col flex-1 gap-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${typeBadge[item.type]}`}
                    >
                      {typeLabel[item.type]}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-neutral-500">
                      <Clock size={11} /> {item.duration}
                    </span>
                  </div>

                  <h3 className="font-bold text-neutral-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed flex-1">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-neutral-200 dark:border-neutral-700 px-2 py-0.5 text-xs text-neutral-600 dark:text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800">
                    <span className="flex items-center gap-1 text-xs text-neutral-500">
                      <Users size={11} /> {item.students}+ students
                    </span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Watch <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
