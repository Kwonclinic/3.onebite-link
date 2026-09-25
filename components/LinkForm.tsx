export default function LinkForm() {
  return (
    <form className="flex max-w-[480px] flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="link-url"
          className="text-sm font-medium text-[var(--text)]"
        >
          링크 주소
        </label>
        <input
          id="link-url"
          type="url"
          placeholder="https://example.com"
          className="h-10 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 text-base text-[var(--text)] placeholder:text-[var(--placeholder)] outline-none focus:border-[var(--accent)]"
        />
      </div>

      <button
        type="submit"
        className="btn-primary h-10 self-start rounded-md bg-[var(--accent)] px-4 text-sm font-medium text-white"
      >
        저장
      </button>
    </form>
  );
}
