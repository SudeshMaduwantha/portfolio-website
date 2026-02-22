import { Metadata } from "next";
import { ServicesClient } from "@/components/ServicesClient";

export const metadata: Metadata = {
  title: "Services | Sudesh Kumarasiri",
  description:
    "Professional web development, AI solutions, WordPress development, and tech training services by Sudesh Kumarasiri — DKTech.",
};

export default function ServicesPage() {
  return <ServicesClient />;
}
