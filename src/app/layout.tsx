import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { NeuralBackground } from "@/components/NeuralBackground";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Sudesh Kumarasiri · Full-Stack Developer & ICT Teacher",
    template: "%s | Sudesh Kumarasiri",
  },
  description:
    "Full-Stack Developer, Software Systems Engineering undergraduate at University of Kelaniya, ICT Teacher and Content Creator. Building next-level web applications with Next.js, Prisma, and more.",
  keywords: [
    "Sudesh Kumarasiri",
    "DKTech",
    "Full-Stack Developer",
    "Next.js Developer Sri Lanka",
    "ICT Teacher",
    "Software Engineering",
    "University of Kelaniya",
    "Web Developer",
    "React Developer",
    "Prisma PostgreSQL",
  ],
  authors: [{ name: "Sudesh Kumarasiri", url: "https://sudesh.dev" }],
  creator: "Sudesh Kumarasiri",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Sudesh Kumarasiri · Full-Stack Developer & ICT Teacher",
    description:
      "Full-Stack Developer, Software Systems Engineering undergraduate at University of Kelaniya, ICT Teacher and Content Creator.",
    siteName: "Sudesh Kumarasiri Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sudesh Kumarasiri · Full-Stack Developer",
    description: "Full-Stack Developer · ICT Teacher · Content Creator",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <NeuralBackground />
          <Navigation />
          <main className="pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
