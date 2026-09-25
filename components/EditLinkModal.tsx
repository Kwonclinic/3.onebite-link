"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useFolders } from "@/lib/folder-context";
import type { LinkItem } from "@/lib/types";

type EditLinkInput = {
  folderId: string;
  title: string;
  description: string;
};

export default function EditLinkModal({
  link,
  onClose,
  onSave,
}: {
  link: LinkItem;
  onClose: () => void;
  onSave: (input: EditLinkInput) => void;
}) {
  const { folders } = useFolders();
  const [folderId, setFolderId] = useState(link.folderId);
  const [title, setTitle] = useState(link.title);
  const [description, setDescription] = useState(link.description);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleInputRef.current?.focus();
    titleInputRef.current?.select();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!title.trim() || !folderId) return;
    onSave({ folderId, title, description });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[400px] rounded-2xl bg-[var(--surface)] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.06)]"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-[var(--text)]">링크 수정</h2>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="edit-link-folder"
              className="text-sm font-bold text-[var(--text)]"
            >
              폴더
            </label>
            <select
              id="edit-link-folder"
              value={folderId}
              onChange={(event) => setFolderId(event.target.value)}
              className="h-12 rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-3.5 text-base text-[var(--text)] outline-none focus:border-[var(--accent)]"
            >
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="edit-link-title"
              className="text-sm font-bold text-[var(--text)]"
            >
              제목
            </label>
            <input
              id="edit-link-title"
              ref={titleInputRef}
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="링크 제목"
              className="h-12 rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-3.5 text-base text-[var(--text)] placeholder:text-[var(--placeholder)] outline-none focus:border-[var(--accent)]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="edit-link-description"
              className="text-sm font-bold text-[var(--text)]"
            >
              설명
            </label>
            <textarea
              id="edit-link-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="링크 설명"
              rows={3}
              className="resize-none rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 text-base text-[var(--text)] placeholder:text-[var(--placeholder)] outline-none focus:border-[var(--accent)]"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex h-11 items-center rounded-xl bg-[var(--hover-bg)] px-5 text-sm font-bold text-[var(--accent)]"
            >
              취소
            </button>
            <button
              type="submit"
              className="btn-primary flex h-11 items-center rounded-xl bg-[var(--accent)] px-5 text-sm font-bold text-white"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
