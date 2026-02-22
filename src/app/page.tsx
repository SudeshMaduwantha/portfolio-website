import { Metadata } from "next";
import { getFeaturedProjects } from "@/lib/actions";
import { HomeClient } from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "Sudesh Kumarasiri  Full-Stack Developer & ICT Teacher",
};

export default async function HomePage() {
  const featured = await getFeaturedProjects().catch(() => []);
  return <HomeClient featured={featured} />;
}
