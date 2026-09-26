"use client";

import { useState } from "react";
import Link from "next/link";
import NewFolderModal from "@/components/NewFolderModal";
import { useFolders } from "@/lib/folder-context";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addFolder, isAddingFolder } = useFolders();

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between bg-[var(--surface)] px-5 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
      <span className="text-xl font-bold text-[var(--text)]">한입 링크</span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          disabled={isAddingFolder}
          className="btn-secondary flex h-9 items-center rounded-xl bg-[var(--hover-bg)] px-4 text-sm font-bold text-[var(--accent)] disabled:opacity-60"
        >
          + New Folder
        </button>

        <Link
          href="/new"
          className="btn-primary flex h-9 items-center rounded-xl bg-[var(--accent)] px-4 text-sm font-bold text-white"
        >
          + Add Link
        </Link>
      </div>

      {isModalOpen && (
        <NewFolderModal
          isSubmitting={isAddingFolder}
          onClose={() => setIsModalOpen(false)}
          onSave={async (name) => {
            await addFolder(name);
            setIsModalOpen(false);
          }}
        />
      )}
    </header>
  );
}
