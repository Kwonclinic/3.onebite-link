export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-[var(--background)] font-sans">
      <header className="sticky top-0 z-10 flex h-12 items-center border-b border-[var(--border)] bg-[var(--background)]/80 px-4 backdrop-blur-sm">
        <span className="text-base font-semibold text-[var(--text)]">
          onebite-link
        </span>
      </header>

      <main className="mx-auto flex w-full max-w-[720px] flex-1 flex-col gap-8 px-6 pt-10 pb-20">
        <div className="flex flex-col gap-4">
          <h1 className="text-[30px] leading-[1.2] font-bold text-[var(--text)]">
            링크를 한입에, onebite-link
          </h1>
          <p className="text-base leading-[1.6] text-[var(--text-sub)]">
            길고 복잡한 링크를 짧고 깔끔하게. 필요한 순간에 바로 꺼내 쓰는
            링크 모음을 만들어보세요.
          </p>
        </div>

        <div className="card-hover flex flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl leading-[1.3] font-semibold text-[var(--text)]">
              지금 바로 시작하기
            </h2>
            <p className="text-sm leading-[1.4] text-[var(--text-sub)]">
              계정 없이도 링크를 만들고 바로 공유할 수 있어요.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="url"
              placeholder="https://example.com/very/long/link"
              className="h-10 flex-1 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 text-base text-[var(--text)] placeholder:text-[var(--placeholder)] outline-none focus:border-[var(--accent)]"
            />
            <button className="btn-primary h-10 rounded-md bg-[var(--accent)] px-4 text-sm font-medium text-white">
              링크 줄이기
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="inline-flex w-fit items-center rounded-sm bg-[var(--hover-bg)] px-2 py-0.5 text-[13px] text-[var(--text)]">
            빠르고 간단함
          </span>
          <ul className="flex flex-col">
            {[
              ["가입 없이 사용", "이메일이나 비밀번호 없이 바로 링크를 만들 수 있어요."],
              ["클릭 통계 확인", "누가 언제 클릭했는지 한눈에 확인할 수 있어요."],
              ["원하는 만큼 관리", "만든 링크를 목록으로 모아 편하게 관리하세요."],
            ].map(([title, desc]) => (
              <li
                key={title}
                className="card-hover flex flex-col gap-0.5 rounded-md border-b border-[var(--border)] px-2 py-3 last:border-b-0"
              >
                <span className="text-base font-medium text-[var(--text)]">
                  {title}
                </span>
                <span className="text-sm text-[var(--text-sub)]">{desc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex h-10 items-center justify-center rounded-md border border-[var(--border)] px-4 text-sm font-medium text-[var(--text)]"
          >
            문서 보기
          </a>
        </div>
      </main>
    </div>
  );
}
