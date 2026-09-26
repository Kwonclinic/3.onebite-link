"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import type { AuthError } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

function getLoginErrorMessage(error: AuthError): string {
  switch (error.code) {
    case "invalid_credentials":
    case "user_not_found":
      return "이메일 또는 비밀번호가 올바르지 않습니다.";
    case "email_not_confirmed":
      return "이메일 인증이 필요합니다. 이메일함을 확인해주세요.";
    case "user_banned":
      return "차단된 계정입니다.";
    case "over_request_rate_limit":
      return "시도가 너무 많습니다. 잠시 후 다시 시도해주세요.";
    default:
      return "로그인에 실패했습니다. 다시 시도해주세요.";
  }
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const isFormComplete = email.trim() !== "" && password !== "";

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!isFormComplete || isSubmitting) return;

    setIsSubmitting(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setIsSubmitting(false);

    if (error) {
      setToast(getLoginErrorMessage(error));
      return;
    }

    router.push("/");
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-[var(--background)] px-5 py-9">
      {toast && (
        <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-[var(--error)] px-5 py-3 text-sm font-bold text-white shadow-[0_2px_10px_rgba(0,0,0,0.15)]">
          {toast}
        </div>
      )}

      <div className="w-full max-w-[360px] rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)] p-8 shadow-[0_1px_6px_rgba(0,0,0,0.06)]">
        <h1 className="text-center text-2xl font-bold text-[var(--text)]">
          한입 링크
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3.5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="login-email"
              className="text-sm font-bold text-[var(--text)]"
            >
              이메일
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="h-12 rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-3.5 text-base text-[var(--text)] placeholder:text-[var(--placeholder)] outline-none focus:border-[var(--accent)]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="login-password"
              className="text-sm font-bold text-[var(--text)]"
            >
              비밀번호
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="h-12 rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-3.5 text-base text-[var(--text)] placeholder:text-[var(--placeholder)] outline-none focus:border-[var(--accent)]"
            />
          </div>

          <button
            type="submit"
            disabled={!isFormComplete || isSubmitting}
            className="btn-primary mt-2 flex h-12 items-center justify-center rounded-xl bg-[var(--accent)] text-base font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-[var(--text-sub)]">
          아직 계정이 없으신가요?{" "}
          <Link href="/signup" className="font-bold text-[var(--accent)]">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
