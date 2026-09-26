"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useFolders } from "@/lib/folder-context";
import { useLinks } from "@/lib/link-context";

export default function LinkForm() {
  const router = useRouter();
  const { folders } = useFolders();
  const { addLink } = useLinks();

  const [url, setUrl] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(
    null
  );
  const folderId = selectedFolderId ?? folders[0]?.id ?? "";
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!url.trim() || !folderId || isSaving) return;

    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/link-preview?url=${encodeURIComponent(url.trim())}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "링크 정보를 가져오지 못했습니다.");
      }

      const newLink = await addLink({
        url: data.url,
        title: data.title,
        description: data.description,
        thumbnail: data.thumbnail,
        folderId,
      });

      if (!newLink) {
        throw new Error("링크를 저장하지 못했습니다.");
      }

      router.push(`/folder/${folderId}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "링크 정보를 가져오는 중 문제가 발생했습니다."
      );
      setIsSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-[480px] flex-col gap-3.5 rounded-2xl bg-[var(--surface)] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.06)]"
    >
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="link-url"
          className="text-sm font-bold text-[var(--text)]"
        >
          링크 주소
        </label>
        <input
          id="link-url"
          type="url"
          required
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://example.com"
          className="h-12 rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-3.5 text-base text-[var(--text)] placeholder:text-[var(--placeholder)] outline-none focus:border-[var(--accent)]"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="link-folder"
          className="text-sm font-bold text-[var(--text)]"
        >
          폴더
        </label>
        <select
          id="link-folder"
          value={folderId}
          onChange={(event) => setSelectedFolderId(event.target.value)}
          className="h-12 rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-3.5 text-base text-[var(--text)] outline-none focus:border-[var(--accent)]"
        >
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="text-sm font-medium text-[var(--error)]">{error}</p>
      )}

      <button
        type="submit"
        disabled={isSaving}
        className="btn-primary h-12 self-start rounded-xl bg-[var(--accent)] px-6 text-base font-bold text-white disabled:opacity-60"
      >
        {isSaving ? "저장 중..." : "저장"}
      </button>
    </form>
  );
}
