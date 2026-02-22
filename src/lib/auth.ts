import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "sudesh-portfolio-jwt-secret-2024-dktech"
);

const COOKIE_NAME = "admin_session";

export async function signToken(payload: { username: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as { username: string };
  } catch {
    return null;
  }
}

export async function getSession() {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function setSession(username: string, response: Response) {
  const token = await signToken({ username });
  response.headers.set(
    "Set-Cookie",
    `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 24 * 3600}`
  );
}

export function clearSessionCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export async function getOrCreateProfile() {
  let profile = await prisma.profile.findUnique({ where: { id: "main" } });
  if (!profile) {
    const bcrypt = await import("bcryptjs");
    const hashed = await bcrypt.hash("admin123", 12);
    profile = await prisma.profile.create({
      data: {
        id: "main",
        adminUsername: "admin",
        adminPassword: hashed,
        bio: "Full-Stack Developer & AI Engineer based in Sri Lanka. Founder of DKTech PVT LTD. Currently pursuing BSc (Hons) Software Systems Engineering at University of Kelaniya.",
        email: "contact@dktech.lk",
        phone: "+94713172922",
        location: "Sri Lanka",
      },
    });
  }
  return profile;
}
