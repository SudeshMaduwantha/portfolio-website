"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Youtube,
  BookOpen,
  Briefcase,
  ArrowRight,
  Sparkles,
  Terminal,
  Globe,
  Database,
  Layers,
  Github,
  Mail,
  MessageCircle,
  Building2,
  Star,
  Brain,
  Award,
} from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { ProjectCard } from "./ProjectCard";
import { ContactForm } from "./ContactForm";
import type { Project } from "@prisma/client";

interface HomeClientProps {
  featured: Project[];
}

const skills = [
  { name: "Next.js", icon: "", color: "bg-black/5 dark:bg-white/10" },
  { name: "React", icon: "", color: "bg-sky-500/10" },
  { name: "TypeScript", icon: "", color: "bg-blue-500/10" },
  { name: "WordPress", icon: "", color: "bg-blue-400/10" },
  { name: "Prisma", icon: "", color: "bg-teal-500/10" },
  { name: "PostgreSQL", icon: "", color: "bg-blue-600/10" },
  { name: "Python", icon: "", color: "bg-yellow-500/10" },
  { name: "PHP", icon: "", color: "bg-violet-500/10" },
  { name: "Java", icon: "", color: "bg-orange-600/10" },
  { name: "C#", icon: "", color: "bg-purple-600/10" },
  { name: ".NET", icon: "", color: "bg-indigo-500/10" },
  { name: "C++", icon: "", color: "bg-blue-700/10" },
  { name: "C", icon: "", color: "bg-neutral-500/10" },
  { name: "Tailwind", icon: "", color: "bg-cyan-500/10" },
  { name: "Node.js", icon: "", color: "bg-green-500/10" },
  { name: "MySQL", icon: "", color: "bg-orange-500/10" },
  { name: "Framer", icon: "", color: "bg-pink-500/10" },
  { name: "Git", icon: "", color: "bg-red-500/10" },
];

const stats = [
  { label: "Projects Built", value: "10+", icon: Briefcase },
  { label: "Students Taught", value: "200+", icon: GraduationCap },
  { label: "Tutorials Created", value: "50+", icon: Youtube },
  { label: "Years Coding", value: "4+", icon: Terminal },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export function HomeClient({ featured }: HomeClientProps) {
  return (
    <div className="min-h-screen">
      {/* HERO BENTO */}
      <section className="px-4 py-8 max-w-6xl mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-12 auto-rows-auto gap-4"
        >
          {/* Profile Card */}
          <motion.div
            variants={item}
            className="md:col-span-4 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm dark:shadow-none p-6 flex flex-col items-center text-center gap-4"
          >
            <div className="relative">
              <div className="h-28 w-28 rounded-full overflow-hidden ring-4 ring-indigo-500/30 ring-offset-2 ring-offset-white dark:ring-offset-neutral-900">
                <Image
                  src="/assets/SudeshKumarasiri.jpeg"
                  alt="Sudesh Kumarasiri"
                  width={112}
                  height={112}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              <span className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white dark:ring-neutral-900">
                <span className="h-2 w-2 rounded-full bg-white" />
              </span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                Sudesh Kumarasiri
              </h2>
              <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5">
                Full-Stack &amp; AI Engineer
              </p>
            </div>

            <div className="w-full space-y-2">
              {[
                { icon: Building2, label: "Founder & CEO", sub: "DKTECH PVT LTD", color: "text-violet-500" },
                { icon: GraduationCap, label: "Undergraduate", sub: "University of Kelaniya", color: "text-emerald-500" },
                { icon: BookOpen, label: "ICT Teacher", sub: "School Level", color: "text-sky-500" },
                { icon: Youtube, label: "Content Creator", sub: "DKTech YouTube", color: "text-rose-500" },
              ].map(({ icon: Icon, label, sub, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-left"
                >
                  <Icon size={15} className={color} />
                  <div>
                    <p className="text-xs font-semibold text-neutral-900 dark:text-white">{label}</p>
                    <p className="text-xs text-neutral-500">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col w-full gap-2 mt-1">
              <Link
                href="/#contact"
                className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors"
              >
                <Mail size={14} /> Hire Me
              </Link>
              <a
                href="https://wa.me/94713172922"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors"
              >
                <MessageCircle size={14} /> WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Hero Block */}
          <motion.div
            variants={item}
            className="md:col-span-8 relative overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-indigo-950 via-violet-950 to-purple-950 p-8 md:p-10 min-h-[320px] flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.3),transparent_60%)]" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl" />

            <div className="relative">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-300 mb-6"
              >
                <Sparkles size={12} />
                Available for Freelance Projects
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  Sudesh
                </span>{" "}
                <br />
                <span className="text-2xl md:text-3xl font-normal text-neutral-300">
                  Full-Stack &amp; AI Engineer
                </span>
              </h1>

              <p className="mt-4 text-neutral-400 max-w-lg leading-relaxed">
                Founder &amp; CEO of{" "}
                <span className="text-violet-400 font-semibold">DKTECH PVT LTD</span>.
                Building next-level web applications with Next.js, Prisma &amp; PostgreSQL.
                Software Systems Engineering undergraduate &amp; ICT Teacher.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="https://github.com/SudeshMaduwantha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/15 px-4 py-2 text-sm font-medium text-white transition-colors"
                >
                  <Github size={14} /> GitHub
                </a>
                <a
                  href="https://youtube.com/@dktechpvtltd2131?si=aY_Bf_qH_tGg9egF"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 px-4 py-2 text-sm font-medium text-rose-300 transition-colors"
                >
                  <Youtube size={14} /> DKTech
                </a>
                <a
                  href="https://wa.me/94713172922"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-300 transition-colors"
                >
                  <MessageCircle size={14} /> WhatsApp
                </a>
              </div>
            </div>

            <div className="relative flex flex-wrap gap-3 mt-6">
              <Link
                href="/projects"
                className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors"
              >
                View Projects <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>

          {/* Skills Block */}
          <motion.div
            variants={item}
            className="md:col-span-5 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm dark:shadow-none p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <Layers size={16} className="text-indigo-500" />
              <h2 className="font-bold text-neutral-900 dark:text-white">Tech Stack</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <motion.span
                  key={skill.name}
                  whileHover={{ scale: 1.05 }}
                  className={`flex items-center gap-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 ${skill.color} px-3 py-1.5 text-xs font-medium text-neutral-900 dark:text-neutral-100`}
                >
                  <span>{skill.icon}</span>
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Database Block */}
          <motion.div
            variants={item}
            className="md:col-span-3 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-teal-950 to-emerald-950 p-6 flex flex-col justify-between min-h-[180px]"
          >
            <Database size={28} className="text-teal-400" />
            <div>
              <p className="text-lg font-bold text-white">Prisma + PostgreSQL</p>
              <p className="text-xs text-teal-300/70 mt-1">
                Type-safe ORM with Supabase  production ready
              </p>
            </div>
          </motion.div>

          {/* Teaching / YouTube CTA Block */}
          <motion.div
            variants={item}
            className="md:col-span-4 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-rose-950 to-orange-950 p-6 flex flex-col justify-between min-h-[180px]"
          >
            <Youtube size={28} className="text-rose-400" />
            <div>
              <p className="text-lg font-bold text-white">DKTech PVT LTD  YouTube</p>
              <p className="text-xs text-rose-300/70 mt-2">
                Programming tutorials, masterclasses &amp; ICT lessons  Sinhala &amp; English
              </p>
              <a
                href="https://youtube.com/@dktechpvtltd2131?si=aY_Bf_qH_tGg9egF"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-rose-300 hover:text-white transition-colors"
              >
                Visit Channel <ArrowRight size={12} />
              </a>
            </div>
          </motion.div>

          {/* GitHub Block */}
          <motion.div
            variants={item}
            className="md:col-span-3 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-950 dark:bg-neutral-900 p-6 flex flex-col gap-3"
          >
            <div className="flex items-center gap-2">
              <Github size={20} className="text-white" />
              <span className="text-sm font-bold text-white">Open Source</span>
            </div>
            <p className="text-xs text-neutral-400">
              All projects fully open source  clean code, documented APIs, and
              production patterns
            </p>
            <a
              href="https://github.com/SudeshMaduwantha"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-medium text-white transition-colors"
            >
              <Github size={12} /> @SudeshMaduwantha
            </a>
          </motion.div>

          {/* DKTECH Company Block */}
          <motion.div
            variants={item}
            className="md:col-span-2 rounded-3xl border border-violet-200 dark:border-violet-900 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950 dark:to-purple-950 p-6 flex flex-col items-center justify-center gap-3 text-center"
          >
            <Building2 size={28} className="text-violet-600 dark:text-violet-400" />
            <div>
              <p className="text-sm font-bold text-neutral-900 dark:text-white">DKTECH</p>
              <p className="text-xs text-violet-600 dark:text-violet-400 font-medium">PVT LTD</p>
              <p className="text-xs text-neutral-500 mt-1">Founder &amp; CEO</p>
            </div>
          </motion.div>

          {/* Location Block */}
          <motion.div
            variants={item}
            className="md:col-span-2 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm dark:shadow-none p-6 flex flex-col items-center justify-center gap-3 text-center"
          >
            <Globe size={28} className="text-indigo-500" />
            <div>
              <p className="text-sm font-bold text-neutral-900 dark:text-white">Sri Lanka </p>
              <p className="text-xs text-neutral-500">Remote-friendly</p>
            </div>
          </motion.div>

          {/* Stars Block */}
          <motion.div
            variants={item}
            className="md:col-span-2 rounded-3xl border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 p-6 flex flex-col items-center justify-center gap-3 text-center"
          >
            <Star size={28} className="text-amber-500" fill="currentColor" />
            <div>
              <p className="text-sm font-bold text-neutral-900 dark:text-white">GitHub Stars</p>
              <p className="text-xs text-neutral-500">Growing daily</p>
            </div>
          </motion.div>

          {/* Education Block */}
          <motion.div
            variants={item}
            className="md:col-span-7 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm dark:shadow-none p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <Award size={16} className="text-indigo-500" />
              <h2 className="font-bold text-neutral-900 dark:text-white">Education</h2>
            </div>
            <div className="space-y-3">
              {[
                {
                  degree: "BSc (Hons) Software Systems Engineering",
                  school: "University of Kelaniya",
                  period: "2022 – Present",
                  badge: "Undergraduate",
                  color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
                },
                {
                  degree: "G.C.E. Advanced Level — ICT Stream",
                  school: "Sri Lanka",
                  period: "Completed",
                  badge: "A/L",
                  color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
                },
                {
                  degree: "G.C.E. Ordinary Level",
                  school: "Sri Lanka",
                  period: "Completed",
                  badge: "O/L",
                  color: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
                },
              ].map(({ degree, school, period, badge, color }) => (
                <div key={degree} className="flex items-start gap-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 px-4 py-3">
                  <GraduationCap size={16} className="text-indigo-500 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">{degree}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{school} · {period}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${color}`}>{badge}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Engineer Block - Redesigned */}
          <motion.div
            variants={item}
            className="md:col-span-5 rounded-3xl border border-violet-500/30 dark:border-violet-900/60 bg-gradient-to-br from-violet-950 via-purple-950 to-indigo-950 p-6 flex flex-col justify-between min-h-[220px] overflow-hidden relative"
          >
            {/* Glow effects */}
            <div className="absolute -top-6 -right-6 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-8 w-28 h-28 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none" />

            {/* Top row */}
            <div className="relative flex items-center justify-between">
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Brain size={30} className="text-violet-300" />
              </motion.div>
              <span className="text-xs font-medium text-violet-300/80 bg-violet-500/15 border border-violet-500/25 px-2.5 py-1 rounded-full">
                Active R&amp;D
              </span>
            </div>

            {/* Content */}
            <div className="relative mt-3">
              <p className="text-lg font-bold text-white">AI Engineering</p>
              <p className="text-xs text-violet-300/70 mt-1.5 leading-relaxed">
                Building intelligent systems — chatbots, automation &amp; ML-powered web apps.
              </p>
              {/* Skill pills */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {["Python", "OpenAI", "LangChain", "TensorFlow", "RAG", "Automation"].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-violet-500/15 border border-violet-500/25 px-2.5 py-0.5 text-xs text-violet-300 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {/* Project highlight */}
              <div className="mt-3 flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2">
                <Sparkles size={12} className="text-violet-400 shrink-0" />
                <p className="text-xs text-violet-200/80 font-medium">DKTech AI Assistant — flagship project</p>
              </div>
            </div>
          </motion.div>

          {/* Services CTA Block */}
          <motion.div
            variants={item}
            className="md:col-span-12 rounded-3xl border border-indigo-200 dark:border-indigo-900 bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-950/60 dark:to-violet-950/60 p-6 flex flex-col md:flex-row items-center justify-between gap-5"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600">
                <Briefcase size={22} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-neutral-900 dark:text-white text-lg">Available for Hire</p>
                <p className="text-sm text-neutral-500">
                  Full-stack web apps · WordPress · AI solutions · Tech training · and more
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/services"
                className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors"
              >
                View Services <ArrowRight size={14} />
              </Link>
              <a
                href="https://wa.me/94713172922"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors"
              >
                <MessageCircle size={14} /> WhatsApp
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* STATS */}
      <AnimatedSection className="px-4 py-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              viewport={{ once: true }}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm dark:shadow-none p-5 text-center"
            >
              <Icon size={20} className="text-indigo-500 mx-auto mb-2" />
              <p className="text-3xl font-bold text-neutral-900 dark:text-white">{value}</p>
              <p className="text-xs text-neutral-500 mt-1">{label}</p>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* FEATURED PROJECTS */}
      <AnimatedSection className="px-4 py-10 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
              Featured Projects
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              Deep-dive case studies  architecture, patterns &amp; real solutions
            </p>
          </div>
          <Link
            href="/projects"
            className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            All Projects <ArrowRight size={14} />
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((project, i) => (
              <AnimatedSection key={project.id} delay={i * 0.12}>
                <ProjectCard {...project} />
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 py-16 text-center">
            <p className="text-neutral-500">Projects coming soon  add them via the Admin Panel.</p>
            <Link
              href="/admin"
              className="mt-3 inline-block text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Go to Admin 
            </Link>
          </div>
        )}
      </AnimatedSection>

      {/* CONTACT */}
      <AnimatedSection id="contact" className="px-4 py-16 max-w-3xl mx-auto">
        <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm dark:shadow-none p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
              Let&apos;s Work Together
            </h2>
            <p className="text-sm text-neutral-500 mt-2">
              Have a project idea? Need a developer or ICT tutor? Let&apos;s talk.
            </p>
            <a
              href="https://wa.me/94713172922"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors"
            >
              <MessageCircle size={15} /> Chat on WhatsApp  +94 71 317 2922
            </a>
          </div>
          <ContactForm />
        </div>
      </AnimatedSection>
    </div>
  );
}
