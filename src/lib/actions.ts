"use server";

import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import nodemailer from "nodemailer";

// ── Projects ──────────────────────────────────────────────────

export async function getAllProjects() {
  return prisma.project.findMany({
    orderBy: [
      { featured: "desc" },
      { createdAt: "desc" },
    ],
  });
}

export async function getFeaturedProjects() {
  return prisma.project.findMany({
    where: { featured: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({ where: { slug } });
}

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const longDesc = formData.get("longDesc") as string;
  const techStack = (formData.get("techStack") as string)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const imageUrl = formData.get("imageUrl") as string;
  const githubUrl = formData.get("githubUrl") as string;
  const liveUrl = formData.get("liveUrl") as string;
  const featured = formData.get("featured") === "on";
  const category = (formData.get("category") as string) || "fullstack";
  const problem = formData.get("problem") as string;
  const solution = formData.get("solution") as string;
  const architecture = formData.get("architecture") as string;
  const slug = slugify(title);

  const language = (formData.get("language") as string) || null;

  await prisma.project.create({
    data: {
      title,
      slug,
      description,
      longDesc,
      techStack,
      imageUrl,
      images: [],
      githubUrl,
      liveUrl,
      featured,
      category,
      problem,
      solution,
      architecture,
      source: "manual",
      language,
    },
  });

  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const longDesc = formData.get("longDesc") as string;
  const techStack = (formData.get("techStack") as string)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const imageUrl = formData.get("imageUrl") as string;
  const githubUrl = formData.get("githubUrl") as string;
  const liveUrl = formData.get("liveUrl") as string;
  const featured = formData.get("featured") === "on";
  const category = (formData.get("category") as string) || "fullstack";
  const problem = formData.get("problem") as string;
  const solution = formData.get("solution") as string;
  const architecture = formData.get("architecture") as string;
  const slug = slugify(title);

  const language = (formData.get("language") as string) || null;

  await prisma.project.update({
    where: { id },
    data: {
      title,
      slug,
      description,
      longDesc,
      techStack,
      imageUrl,
      githubUrl,
      liveUrl,
      featured,
      category,
      problem,
      solution,
      architecture,
      language,
    },
  });

  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
}

// ── Contact ───────────────────────────────────────────────────

export async function submitContact(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) return { error: "All fields are required" };

  // Save to DB
  await prisma.contact.create({ data: { name, email, message } });

  // Send email notification (requires SMTP_USER + SMTP_PASS in .env.local)
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
        to: "sudeshmaduwantha205@gmail.com",
        replyTo: email,
        subject: `📬 New Message from ${name} — Portfolio`,
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
            <div style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:24px 28px">
              <h1 style="color:#fff;margin:0;font-size:20px">New Contact Form Submission</h1>
              <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:13px">sudeshkumarasiri.com</p>
            </div>
            <div style="padding:28px;background:#fff">
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:8px 0;font-weight:600;color:#374151;width:90px">Name</td><td style="padding:8px 0;color:#111827">${name}</td></tr>
                <tr><td style="padding:8px 0;font-weight:600;color:#374151">Email</td><td style="padding:8px 0;color:#4f46e5"><a href="mailto:${email}" style="color:#4f46e5;text-decoration:none">${email}</a></td></tr>
              </table>
              <div style="margin-top:16px;padding:16px;background:#f9fafb;border-radius:8px;border-left:3px solid #4f46e5">
                <p style="margin:0;color:#374151;line-height:1.6;white-space:pre-wrap">${message}</p>
              </div>
              <a href="mailto:${email}" style="display:inline-block;margin-top:20px;padding:10px 20px;background:#4f46e5;color:#fff;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600">Reply to ${name}</a>
            </div>
          </div>
        `,
      });
    } catch (err) {
      console.error("[Email] Failed to send notification:", err);
      // Don't fail the whole submission — DB save already succeeded
    }
  }

  return { success: true };
}
