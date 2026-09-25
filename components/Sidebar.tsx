"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import DeleteFolderModal from "@/components/DeleteFolderModal";
import RenameFolderModal from "@/components/RenameFolderModal";
import { useFolders } from "@/lib/folder-context";
import type { Folder } from "@/lib/types";

export default function Sidebar() {
  const { folders, removeFolder, renameFolder } = useFolders();
  const pathname = usePathname();
  const router = useRouter();
  const [folderToDelete, setFolderToDelete] = useState<Folder | null>(null);
  const [folderToRename, setFolderToRename] = useState<Folder | null>(null);

  function handleConfirmDelete() {
    if (!folderToDelete) return;

    removeFolder(folderToDelete.id);

    const activeFolderId = pathname.startsWith("/folder/")
      ? decodeURIComponent(pathname.slice("/folder/".length))
      : null;

    if (activeFolderId === folderToDelete.id) {
      router.push("/");
    }

    setFolderToDelete(null);
  }

  return (
    <aside className="w-60 shrink-0 border-r border-[var(--border)] bg-[var(--surface)] px-3 py-5">
      <nav className="flex flex-col gap-1">
        <Link
          href="/"
          className="flex items-center justify-between rounded-xl bg-[var(--hover-bg)] px-3 py-2.5 text-sm font-bold text-[var(--accent)]"
        >
          All
        </Link>

        <div className="mt-4 px-3 text-[13px] font-bold text-[var(--text-sub)]">
          폴더
        </div>

        {folders.map((folder) => (
          <div
            key={folder.id}
            className="folder-row nav-hover relative flex items-center rounded-xl"
          >
            <Link
              href={`/folder/${folder.id}`}
              className="flex flex-1 items-center justify-between px-3 py-2.5 text-sm font-medium text-[var(--text)]"
            >
              <span className="truncate">{folder.name}</span>
              <span className="folder-count pr-16 text-[13px] text-[var(--text-sub)] transition-opacity duration-200">
                {folder.count}
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setFolderToRename(folder)}
              aria-label={`${folder.name} 폴더 이름 수정`}
              className="folder-edit-btn absolute right-10 flex h-7 w-7 items-center justify-center rounded-lg text-[var(--text-sub)]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                <path d="M15 5l4 4" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setFolderToDelete(folder)}
              aria-label={`${folder.name} 폴더 삭제`}
              className="folder-delete-btn absolute right-1.5 flex h-7 w-7 items-center justify-center rounded-lg text-[var(--text-sub)]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
              </svg>
            </button>
          </div>
        ))}
      </nav>

      {folderToDelete && (
        <DeleteFolderModal
          folderName={folderToDelete.name}
          onClose={() => setFolderToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {folderToRename && (
        <RenameFolderModal
          initialName={folderToRename.name}
          onClose={() => setFolderToRename(null)}
          onSave={(name) => {
            renameFolder(folderToRename.id, name);
            setFolderToRename(null);
          }}
        />
      )}
    </aside>
  );
}
