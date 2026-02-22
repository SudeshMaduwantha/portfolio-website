"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Globe,
  Brain,
  Database,
  Layers,
  GraduationCap,
  Code2,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  MessageCircle,
  Mail,
  Zap,
  Shield,
  Smartphone,
  LayoutDashboard,
  Server,
  Palette,
} from "lucide-react";

const services = [
  {
    id: "web-dev",
    icon: Globe,
    title: "Full-Stack Web Development",
    shortDesc: "Modern, fast web apps built with the latest technologies.",
    description:
      "Custom web applications built with Next.js, React, PHP, and robust backends. From simple landing pages to complex ERP systems — scalable, secure, and beautifully crafted.",
    features: [
      "Next.js / React SPAs & SSR sites",
      "PHP / Laravel backend systems",
      "REST API & database integration",
      "Admin dashboards & CRM systems",
      "Payment gateway integration",
      "Performance & SEO optimized",
    ],
    tech: ["Next.js", "React", "PHP", "TypeScript", "PostgreSQL", "MySQL"],
    color: "from-indigo-600 to-violet-600",
    badge: "Most Popular",
    badgeColor: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
  },
  {
    id: "wordpress",
    icon: Layers,
    title: "WordPress Development",
    shortDesc: "Professional WordPress sites & custom theme/plugin development.",
    description:
      "Custom WordPress themes, plugin development, and full website builds. WooCommerce stores, business sites, and conversion-focused landing pages tailored to your brand.",
    features: [
      "Custom theme development",
      "Plugin development & customization",
      "WooCommerce online stores",
      "Speed & SEO optimization",
      "Website migrations",
      "Ongoing maintenance & support",
    ],
    tech: ["WordPress", "WooCommerce", "PHP", "CSS", "JavaScript", "Elementor"],
    color: "from-blue-600 to-cyan-600",
    badge: null,
    badgeColor: "",
  },
  {
    id: "ai",
    icon: Brain,
    title: "AI & Automation Solutions",
    shortDesc: "Intelligent systems, chatbots & ML-powered web apps.",
    description:
      "AI-powered web applications, chatbots, and automation tools using Python and modern AI frameworks. From customer service bots to data analysis dashboards.",
    features: [
      "AI chatbot development",
      "Data analysis & dashboards",
      "Python automation scripts",
      "ML model integration into web apps",
      "API integrations (OpenAI, Gemini)",
      "Business process automation",
    ],
    tech: ["Python", "OpenAI API", "TensorFlow", "FastAPI", "Next.js", "PostgreSQL"],
    color: "from-violet-600 to-purple-700",
    badge: "New",
    badgeColor: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
  },
  {
    id: "database",
    icon: Database,
    title: "Database Design & Systems",
    shortDesc: "Reliable, scalable database architecture for your business.",
    description:
      "Database design, optimization, and administration for web and enterprise applications. ERP, inventory management, and reporting systems built with reliable SQL databases.",
    features: [
      "Database schema design",
      "MySQL & PostgreSQL optimization",
      "ERP & inventory systems",
      "Data migration & cleanup",
      "Backup & security setup",
      "Reporting & analytics integration",
    ],
    tech: ["MySQL", "PostgreSQL", "Supabase", ".NET", "C#", "Java"],
    color: "from-emerald-600 to-teal-600",
    badge: null,
    badgeColor: "",
  },
  {
    id: "ui",
    icon: Palette,
    title: "UI/UX Design & Branding",
    shortDesc: "Beautiful, user-friendly interfaces that convert visitors.",
    description:
      "Modern UI/UX design using Figma and Tailwind CSS. Responsive, mobile-first designs that look stunning on any device and guide users toward your goals.",
    features: [
      "Responsive mobile-first design",
      "Figma wireframes & prototypes",
      "Tailwind CSS implementation",
      "Brand identity & color systems",
      "Landing page design",
      "Dark/light mode support",
    ],
    tech: ["Figma", "Tailwind CSS", "Framer Motion", "Next.js", "React"],
    color: "from-pink-600 to-rose-600",
    badge: null,
    badgeColor: "",
  },
  {
    id: "training",
    icon: GraduationCap,
    title: "Tech Training & Workshops",
    shortDesc: "Learn web development, programming, and ICT from scratch.",
    description:
      "One-on-one and group training sessions for web development, Python, and ICT. School-level to professional-level courses, both online (YouTube/Zoom) and in-person.",
    features: [
      "Web development courses (HTML to React)",
      "Python & data science training",
      "ICT school curriculum coaching",
      "University assignment guidance",
      "Corporate tech workshops",
      "YouTube tutorial content (DKTech)",
    ],
    tech: ["HTML", "CSS", "JavaScript", "Python", "React", "Next.js"],
    color: "from-amber-600 to-orange-600",
    badge: null,
    badgeColor: "",
  },
];

const clientSites = [
  {
    name: "Wildcat Safari",
    url: "https://wildcat-safari.com/",
    displayUrl: "wildcat-safari.com",
    description: "Wildlife safari & eco-tourism website with booking features, gallery, and tour information.",
    category: "Tourism & Hospitality",
    tech: ["WordPress", "PHP", "JavaScript"],
    color: "from-green-600 to-emerald-700",
    emoji: "🦁",
  },
  {
    name: "Yorkshire International College",
    url: "https://www.yorkshireinternationalcollege.com/",
    displayUrl: "yorkshireinternationalcollege.com",
    description: "International education college website with courses, admissions, and student portal information.",
    category: "Education",
    tech: ["WordPress", "PHP", "CSS"],
    color: "from-blue-600 to-indigo-700",
    emoji: "🎓",
  },
  {
    name: "INOBSSE",
    url: "https://www.inobsse.com/",
    displayUrl: "inobsse.com",
    description: "Professional business services platform serving corporate clients.",
    category: "Business Services",
    tech: ["Web Development", "PHP", "MySQL"],
    color: "from-violet-600 to-purple-700",
    emoji: "🏢",
  },
];

const why = [
  { icon: Zap, title: "Fast Delivery", desc: "Projects delivered on time with clean, maintainable code." },
  { icon: Shield, title: "Secure & Reliable", desc: "Security-first development with industry best practices." },
  { icon: Smartphone, title: "Mobile-First", desc: "100% responsive designs that work on all devices." },
  { icon: LayoutDashboard, title: "Admin Panel Included", desc: "Manage your content with easy-to-use admin dashboards." },
  { icon: Server, title: "Full Support", desc: "Post-launch support, maintenance, and updates available." },
  { icon: Code2, title: "Clean Code", desc: "Scalable architecture you can build on for years." },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ServicesClient() {
  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="px-4 pt-12 pb-6 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
            <Zap size={12} /> Available for hire
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4 leading-tight">
            Services I Offer
          </h1>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto mb-8">
            From full-stack web apps to AI solutions and WordPress sites — I deliver professional, modern digital
            products tailored to your business needs.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://wa.me/94713172922"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors"
            >
              <MessageCircle size={16} /> Get a Quote on WhatsApp
            </a>
            <Link
              href="/#contact"
              className="flex items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 px-5 py-2.5 text-sm font-semibold text-neutral-700 dark:text-neutral-300 transition-colors"
            >
              <Mail size={16} /> Send a Message
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Services Grid ── */}
      <section className="px-4 py-8 max-w-6xl mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.id}
                variants={item}
                className="group rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 flex flex-col hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon + Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${svc.color} shadow-lg`}
                  >
                    <Icon size={22} className="text-white" />
                  </div>
                  {svc.badge && (
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${svc.badgeColor}`}>
                      {svc.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">{svc.title}</h3>
                <p className="text-sm text-neutral-500 mb-4 leading-relaxed">{svc.description}</p>

                {/* Features */}
                <ul className="space-y-1.5 mb-5 flex-1">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {svc.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 text-xs font-medium text-neutral-600 dark:text-neutral-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="https://wa.me/94713172922"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${svc.color} px-4 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90`}
                >
                  Get Started <ArrowRight size={14} />
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ── Client Portfolio ── */}
      <section className="px-4 py-12 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
            Live Client Websites
          </h2>
          <p className="text-neutral-500">
            Real projects currently live on the web — built and delivered for clients.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {clientSites.map((site) => (
            <motion.div key={site.url} variants={item} className="group">
              {/* Browser Chrome Preview */}
              <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-black/30 transition-all duration-300 hover:-translate-y-1">
                {/* Browser bar */}
                <div className="bg-neutral-100 dark:bg-neutral-800 px-4 py-3 flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-700">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400" />
                    <span className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 mx-3 rounded-md bg-white dark:bg-neutral-700 px-3 py-1 text-xs text-neutral-400 dark:text-neutral-500 font-mono truncate">
                    {site.displayUrl}
                  </div>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-indigo-500 transition-colors"
                    title={`Open ${site.name}`}
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>

                {/* Preview Panel */}
                <div
                  className={`relative h-44 bg-gradient-to-br ${site.color} flex flex-col items-center justify-center gap-2`}
                >
                  <span className="text-5xl">{site.emoji}</span>
                  <span className="text-white/80 text-sm font-medium">{site.name}</span>
                  {/* Hover overlay */}
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-none text-white font-semibold text-sm"
                  >
                    <ExternalLink size={18} /> Visit Website
                  </a>
                </div>

                {/* Info */}
                <div className="bg-white dark:bg-neutral-900 p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-neutral-900 dark:text-white">{site.name}</h3>
                    <span className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 text-xs text-neutral-500">
                      {site.category}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500 mb-3 leading-relaxed">{site.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {site.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 text-xs font-medium text-neutral-600 dark:text-neutral-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Why Choose Me ── */}
      <section className="px-4 py-12 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
            Why Work With Me?
          </h2>
          <p className="text-neutral-500">Quality, reliability, and communication you can count on.</p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {why.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={item}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 flex gap-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950">
                <Icon size={18} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900 dark:text-white text-sm">{title}</p>
                <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="px-4 pb-16 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-gradient-to-br from-indigo-950 via-violet-950 to-purple-950 p-10 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-3">Ready to Build Something?</h2>
          <p className="text-indigo-200/80 mb-8 max-w-xl mx-auto">
            Have a project in mind? Let&apos;s talk. I&apos;m available for freelance projects, full-time
            roles, and consultations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://wa.me/94713172922"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-6 py-3 text-sm font-semibold text-white transition-colors"
            >
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>
            <Link
              href="/#contact"
              className="flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors"
            >
              <Mail size={16} /> Send Email
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
