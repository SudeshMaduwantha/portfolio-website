import { prisma } from "@/lib/prisma";
import { ProfileForm } from "./ProfileForm";

export default async function AdminProfilePage() {
  let profile = await prisma.profile.findUnique({ where: { id: "main" } });
  if (!profile) {
    profile = await prisma.profile.create({
      data: {
        id: "main",
        adminUsername: "admin",
        adminPassword: "$2a$12$placeholder",
        bio: "",
        email: "",
        phone: "",
        location: "Sri Lanka",
      },
    });
  }
  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Profile & CV</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Update your portfolio bio, contact info, and CV link
        </p>
      </div>
      <ProfileForm profile={profile} />
    </div>
  );
}
