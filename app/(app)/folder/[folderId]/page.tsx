import { notFound } from "next/navigation";
import LinkGrid from "@/components/LinkGrid";
import { getFolderById, getLinksByFolder } from "@/lib/mock-data";

export default async function FolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await params;
  const folder = getFolderById(folderId);

  if (!folder) {
    notFound();
  }

  return <LinkGrid links={getLinksByFolder(folder.id)} />;
}
