"use client";

import { notFound, useParams } from "next/navigation";
import LinkGrid from "@/components/LinkGrid";
import { useFolders } from "@/lib/folder-context";
import { useLinks } from "@/lib/link-context";

export default function FolderPage() {
  const { folderId } = useParams<{ folderId: string }>();
  const { folders, isLoadingFolders } = useFolders();
  const { links } = useLinks();
  const decodedFolderId = decodeURIComponent(folderId);
  const folder = folders.find((item) => item.id === decodedFolderId);

  if (!folder) {
    if (isLoadingFolders) return null;
    notFound();
  }

  return (
    <LinkGrid links={links.filter((link) => link.folderId === folder.id)} />
  );
}
