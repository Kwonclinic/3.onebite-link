import { getFolderById } from "@/lib/mock-data";
import type { LinkItem } from "@/lib/types";

export default function LinkCard({ link }: { link: LinkItem }) {
  const folder = getFolderById(link.folderId);

  return (
    <a
      href={`https://${link.url}`}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover flex flex-col gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
    >
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[var(--hover-bg)] text-sm font-semibold text-[var(--text)]">
          {link.title.charAt(0).toUpperCase()}
        </span>
        <span className="truncate text-sm text-[var(--text-sub)]">
          {link.url}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="truncate text-base font-medium text-[var(--text)]">
          {link.title}
        </h3>
        <p className="line-clamp-2 text-sm text-[var(--text-sub)]">
          {link.description}
        </p>
      </div>

      {folder && (
        <span className="inline-flex w-fit items-center rounded-sm bg-[var(--hover-bg)] px-2 py-0.5 text-[13px] text-[var(--text)]">
          {folder.name}
        </span>
      )}
    </a>
  );
}
