export default function LinkForm() {
  return (
    <form className="flex max-w-[480px] flex-col gap-3.5 rounded-2xl bg-[var(--surface)] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.06)]">
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
          placeholder="https://example.com"
          className="h-12 rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-3.5 text-base text-[var(--text)] placeholder:text-[var(--placeholder)] outline-none focus:border-[var(--accent)]"
        />
      </div>

      <button
        type="submit"
        className="btn-primary h-12 self-start rounded-xl bg-[var(--accent)] px-6 text-base font-bold text-white"
      >
        저장
      </button>
    </form>
  );
}
