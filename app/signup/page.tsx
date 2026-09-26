"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import type { AuthError } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

function getSignupErrorMessage(error: AuthError): string {
  switch (error.code) {
    case "user_already_exists":
    case "email_exists":
    case "identity_already_exists":
      return "이미 가입된 이메일입니다.";
    case "weak_password":
      return "비밀번호는 6자 이상이어야 합니다.";
    case "email_address_invalid":
      return "올바른 이메일 형식이 아닙니다.";
    case "over_email_send_rate_limit":
    case "over_request_rate_limit":
      return "시도가 너무 많습니다. 잠시 후 다시 시도해주세요.";
    case "signup_disabled":
    case "email_provider_disabled":
      return "현재 회원가입을 이용할 수 없습니다.";
    default:
      return "회원가입에 실패했습니다. 다시 시도해주세요.";
  }
}

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const isFormComplete =
    email.trim() !== "" && password !== "" && passwordConfirm !== "";

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!isFormComplete || isSubmitting) return;

    if (password !== passwordConfirm) {
      setToast("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsSubmitting(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });

    setIsSubmitting(false);

    if (error) {
      setToast(getSignupErrorMessage(error));
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
              htmlFor="signup-email"
              className="text-sm font-bold text-[var(--text)]"
            >
              이메일
            </label>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="h-12 rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-3.5 text-base text-[var(--text)] placeholder:text-[var(--placeholder)] outline-none focus:border-[var(--accent)]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="signup-password"
              className="text-sm font-bold text-[var(--text)]"
            >
              비밀번호
            </label>
            <input
              id="signup-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="h-12 rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-3.5 text-base text-[var(--text)] placeholder:text-[var(--placeholder)] outline-none focus:border-[var(--accent)]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="signup-password-confirm"
              className="text-sm font-bold text-[var(--text)]"
            >
              비밀번호 확인
            </label>
            <input
              id="signup-password-confirm"
              type="password"
              value={passwordConfirm}
              onChange={(event) => setPasswordConfirm(event.target.value)}
              placeholder="비밀번호를 다시 입력하세요"
              className="h-12 rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-3.5 text-base text-[var(--text)] placeholder:text-[var(--placeholder)] outline-none focus:border-[var(--accent)]"
            />
          </div>

          <button
            type="submit"
            disabled={!isFormComplete || isSubmitting}
            className="btn-primary mt-2 flex h-12 items-center justify-center rounded-xl bg-[var(--accent)] text-base font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "가입 중..." : "회원가입"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-[var(--text-sub)]">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="font-bold text-[var(--accent)]">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
