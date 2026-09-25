import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between bg-[var(--surface)] px-5 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
      <span className="text-xl font-bold text-[var(--text)]">한입 링크</span>
      <Link
        href="/new"
        className="btn-primary flex h-9 items-center rounded-xl bg-[var(--accent)] px-4 text-sm font-bold text-white"
      >
        + Add Link
      </Link>
    </header>
  );
}
