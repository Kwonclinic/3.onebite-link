import Link from "next/link";
import { folders } from "@/lib/mock-data";

export default function Sidebar() {
  return (
    <aside className="w-60 shrink-0 border-r border-[var(--border)] px-3 py-4">
      <nav className="flex flex-col gap-1">
        <Link
          href="/"
          className="flex items-center justify-between rounded-md bg-[var(--hover-bg)] px-3 py-2 text-sm font-medium text-[var(--text)]"
        >
          All
        </Link>

        <div className="mt-4 px-3 text-[13px] font-medium text-[var(--text-sub)]">
          폴더
        </div>

        {folders.map((folder) => (
          <Link
            key={folder.id}
            href={`/folder/${folder.id}`}
            className="card-hover flex items-center justify-between rounded-md px-3 py-2 text-sm text-[var(--text)]"
          >
            <span>{folder.name}</span>
            <span className="text-[13px] text-[var(--text-sub)]">
              {folder.count}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
