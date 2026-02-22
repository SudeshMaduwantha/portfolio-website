import { prisma } from "@/lib/prisma";
import { ClientSitesManager } from "./ClientSitesManager";

export default async function AdminClientsPage() {
  const sites = await prisma.clientSite.findMany({
    orderBy: { order: "asc" },
  });
  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Client Sites</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Manage live client websites shown on your Services page
        </p>
      </div>
      <ClientSitesManager initialSites={sites} />
    </div>
  );
}
