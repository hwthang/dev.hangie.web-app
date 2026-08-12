"use client";

import { AxiosError } from "axios";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useLogin } from "../use-login";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useLogin();
  const router = useRouter();

  const handleSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    loginMutation.reset();

    try {
      const data = await loginMutation.mutateAsync({
        email,
        password,
      });

      localStorage.setItem(
        "accessToken",
        data.accessToken,
      );

      localStorage.setItem(
        "hangieUser",
        JSON.stringify(data.user),
      );

      router.push("/console");
    } catch {}
  };

  const errorMessage =
    loginMutation.error instanceof AxiosError
      ? loginMutation.error.response?.data?.message ??
        "Email hoặc mật khẩu không chính xác."
      : "Đã xảy ra lỗi. Vui lòng thử lại.";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Email
        </label>

        <div className="relative">
          <Mail
            size={18}
            strokeWidth={1.8}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            id="email"
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            disabled={loginMutation.isPending}
            autoComplete="email"
            className="
              w-full rounded-lg border border-slate-200
              bg-white py-3 pl-10 pr-4
              text-sm text-slate-900
              placeholder:text-slate-400
              outline-none
              transition
              focus:border-blue-500
              focus:ring-4 focus:ring-blue-500/10
              disabled:cursor-not-allowed
              disabled:bg-slate-50
            "
            required
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Mật khẩu
        </label>

        <div className="relative">
          <LockKeyhole
            size={18}
            strokeWidth={1.8}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            id="password"
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            disabled={loginMutation.isPending}
            autoComplete="current-password"
            className="
              w-full rounded-lg border border-slate-200
              bg-white py-3 pl-10 pr-4
              text-sm text-slate-900
              placeholder:text-slate-400
              outline-none
              transition
              focus:border-blue-500
              focus:ring-4 focus:ring-blue-500/10
              disabled:cursor-not-allowed
              disabled:bg-slate-50
            "
            required
          />
        </div>
      </div>

      {/* Error */}
      {loginMutation.isError && (
        <div
          role="alert"
          className="
            flex items-start gap-3
            rounded-lg border border-red-100
            bg-red-50 px-4 py-3
            text-sm text-red-600
          "
        >
          <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />

          <p>{errorMessage}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="
          flex w-full items-center justify-center gap-2
          rounded-lg bg-blue-600
          py-3
          text-sm font-semibold text-white
          shadow-sm shadow-blue-600/20
          transition
          hover:bg-blue-700
          active:scale-[0.99]
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {loginMutation.isPending ? (
          <>
            <Loader2
              size={18}
              className="animate-spin"
            />
            Đang đăng nhập...
          </>
        ) : (
          "Đăng nhập"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
