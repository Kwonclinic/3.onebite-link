import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/lib/types";

export default function LinkGrid({ links }: { links: LinkItem[] }) {
  if (links.length === 0) {
    return (
      <p className="text-sm text-[var(--text-sub)]">
        저장된 링크가 없어요.
      </p>
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
