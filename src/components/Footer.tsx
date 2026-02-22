import Link from "next/link";
import { Github, Youtube, Linkedin, Mail, MessageCircle, Lock } from "lucide-react";

const socials = [
  {
    icon: Github,
    href: "https://github.com/SudeshMaduwantha",
    label: "GitHub",
  },
  {
    icon: Youtube,
    href: "https://youtube.com/@dktechpvtltd2131?si=aY_Bf_qH_tGg9egF",
    label: "YouTube - DKTech",
  },
  {
    icon: MessageCircle,
    href: "https://wa.me/94713172922",
    label: "WhatsApp",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/sudeshkumarasiri",
    label: "LinkedIn",
  },
  { icon: Mail, href: "mailto:sudesh@dktech.lk", label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 py-10 px-4">
      <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-bold text-lg bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Sudesh Kumarasiri
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Founder &amp; CEO &middot; DKTECH PVT LTD &middot; Software Systems Engineer
          </p>
        </div>

        <div className="flex items-center gap-2">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        <div className="flex gap-4 text-sm text-neutral-500 dark:text-neutral-400">
          <Link href="/projects" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Projects
          </Link>
          <Link href="/teaching" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Teaching
          </Link>
          <Link href="/#contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Contact
          </Link>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center gap-4">
        <p className="text-center text-xs text-neutral-400 dark:text-neutral-600">
          &copy; {new Date().getFullYear()} Sudesh Kumarasiri. Built with Next.js &middot; Prisma &middot; Framer Motion
        </p>
        <Link
          href="/admin/login"
          aria-label="Admin Panel"
          className="flex items-center gap-1 text-neutral-300 dark:text-neutral-700 hover:text-indigo-500 dark:hover:text-indigo-500 transition-colors opacity-50 hover:opacity-100"
        >
          <Lock size={11} />
        </Link>
      </div>
    </footer>
  );
}
