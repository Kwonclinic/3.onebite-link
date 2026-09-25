"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

export default function NewFolderModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (name: string) => void;
}) {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();

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
    if (!name.trim()) return;
    onSave(name);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[360px] rounded-2xl bg-[var(--surface)] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.06)]"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-[var(--text)]">새 폴더</h2>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="폴더 이름"
            className="h-12 rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-3.5 text-base text-[var(--text)] placeholder:text-[var(--placeholder)] outline-none focus:border-[var(--accent)]"
          />

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
