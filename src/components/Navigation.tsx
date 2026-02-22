"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X, Code2 } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/teaching", label: "Teaching" },
  { href: "/#contact", label: "Contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl px-5 py-3 flex items-center justify-between shadow-lg shadow-black/5"
      >
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <Code2 size={16} />
          </span>
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Sudesh Kumarasiri
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
                  pathname === link.href
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
                )}
              >
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-indigo-50 dark:bg-indigo-950"
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-4 right-4 max-w-4xl mx-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4 shadow-xl"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      )}
    </header>
  );
}
