import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-12 items-center justify-between border-b border-[var(--border)] bg-[var(--background)]/80 px-4 backdrop-blur-sm">
      <span className="text-base font-semibold text-[var(--text)]">
        한입 링크
      </span>
      <Link
        href="/new"
        className="btn-primary flex h-8 items-center rounded-md bg-[var(--accent)] px-3 text-sm font-medium text-white"
      >
        + Add Link
      </Link>
    </header>
  );
}
