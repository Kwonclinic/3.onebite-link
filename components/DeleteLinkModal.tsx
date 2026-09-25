"use client";

import { useEffect } from "react";

export default function DeleteLinkModal({
  linkTitle,
  onClose,
  onConfirm,
}: {
  linkTitle: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[360px] rounded-2xl bg-[var(--surface)] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.06)]"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-[var(--text)]">링크 삭제</h2>
        <p className="mt-2 text-sm text-[var(--text-sub)]">
          {`'${linkTitle}' 링크를 삭제할까요? 이 작업은 되돌릴 수 없습니다.`}
        </p>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary flex h-11 items-center rounded-xl bg-[var(--hover-bg)] px-5 text-sm font-bold text-[var(--accent)]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="btn-danger flex h-11 items-center rounded-xl bg-[var(--error)] px-5 text-sm font-bold text-white"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
