"use client";

import { notFound, useParams } from "next/navigation";
import LinkGrid from "@/components/LinkGrid";
import { getLinksByFolder } from "@/lib/mock-data";
import { useFolders } from "@/lib/folder-context";

export default function FolderPage() {
  const { folderId } = useParams<{ folderId: string }>();
  const { folders } = useFolders();
  const decodedFolderId = decodeURIComponent(folderId);
  const folder = folders.find((item) => item.id === decodedFolderId);

  if (!folder) {
    notFound();
  }

  return <LinkGrid links={getLinksByFolder(folder.id)} />;
}
