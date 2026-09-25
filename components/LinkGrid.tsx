import Link from "next/link";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/lib/types";

export default function LinkGrid({ links }: { links: LinkItem[] }) {
  if (links.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl bg-[var(--surface)] px-6 py-16 text-center shadow-[0_1px_6px_rgba(0,0,0,0.06)]">
        <p className="text-lg font-bold text-[var(--text)]">
          아직은 텅 빈 폴더예요
        </p>
        <p className="text-sm text-[var(--text-sub)]">
          첫 링크가 올라오는 순간, 이 폴더의 대표 맛집이 됩니다.
        </p>
        <Link
          href="/new"
          className="btn-primary mt-3 flex h-10 items-center rounded-xl bg-[var(--accent)] px-5 text-sm font-bold text-white"
        >
          + 링크 추가하기
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
      {links.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </div>
  );
}
