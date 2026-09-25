"use client";

import { useState } from "react";
import DeleteLinkModal from "@/components/DeleteLinkModal";
import EditLinkModal from "@/components/EditLinkModal";
import { useFolders } from "@/lib/folder-context";
import { useLinks } from "@/lib/link-context";
import type { LinkItem } from "@/lib/types";

export default function LinkCard({ link }: { link: LinkItem }) {
  const { folders } = useFolders();
  const { removeLink, updateLink } = useLinks();
  const folder = folders.find((item) => item.id === link.folderId);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="link-card-row relative">
      <a
        href={`https://${link.url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="card-hover flex flex-col gap-3 rounded-2xl bg-[var(--surface)] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.06)]"
      >
        {link.thumbnail && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={link.thumbnail}
            alt=""
            className="h-32 w-full rounded-xl object-cover"
          />
        )}

        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--hover-bg)] text-sm font-bold text-[var(--accent)]">
            {link.title.charAt(0).toUpperCase()}
          </span>
          <span className="truncate text-sm text-[var(--text-sub)]">
            {link.url}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="truncate text-base font-bold text-[var(--text)]">
            {link.title}
          </h3>
          <p className="line-clamp-2 text-sm text-[var(--text-sub)]">
            {link.description}
          </p>
        </div>

        {folder && (
          <span className="inline-flex w-fit items-center rounded-lg bg-[var(--hover-bg)] px-2.5 py-1 text-[13px] font-bold text-[var(--accent)]">
            {folder.name}
          </span>
        )}
      </a>

      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          setIsEditing(true);
        }}
        aria-label={`${link.title} 링크 수정`}
        className="link-card-edit-btn absolute right-11 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--surface)] text-[var(--text-sub)] shadow-[0_1px_4px_rgba(0,0,0,0.15)]"
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
        onClick={(event) => {
          event.preventDefault();
          setIsDeleting(true);
        }}
        aria-label={`${link.title} 링크 삭제`}
        className="link-card-delete-btn absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--surface)] text-[var(--text-sub)] shadow-[0_1px_4px_rgba(0,0,0,0.15)]"
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

      {isDeleting && (
        <DeleteLinkModal
          linkTitle={link.title}
          onClose={() => setIsDeleting(false)}
          onConfirm={() => {
            removeLink(link.id);
            setIsDeleting(false);
          }}
        />
      )}

      {isEditing && (
        <EditLinkModal
          link={link}
          onClose={() => setIsEditing(false)}
          onSave={(input) => {
            updateLink(link.id, input);
            setIsEditing(false);
          }}
        />
      )}
    </div>
  );
}
