"use client";

import LoginForm from "@/features/auth/components/LoginForm";
import { CalendarDays, CheckCircle2, Clock3, Info } from "lucide-react";
import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-200/30 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-100/60" />
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-100/40" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 py-10">
        <div className="grid w-full items-center gap-16 lg:grid-cols-2">
          {/* Left */}
          <section className="hidden lg:block">
            <div className="max-w-lg">
              {/* Logo */}
              <Link className="mb-8 flex items-center gap-3" href="/">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                  <CalendarDays size={23} strokeWidth={2.2} />
                </div>

                <span className="text-2xl font-bold tracking-tight text-slate-900">
                  Hangie
                </span>
              </Link>

              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Welcome back
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-slate-900 xl:text-5xl">
                Quản lý việc dạy
                <br />
                <span className="text-blue-600">đơn giản hơn.</span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-slate-500">
                Theo dõi lịch dạy, chấm công và thu nhập của bạn trên một nền
                tảng duy nhất.
              </p>

              {/* Features */}
              <div className="mt-10 space-y-4">
                <Feature
                  icon={<CalendarDays size={18} />}
                  title="Quản lý lịch dạy"
                  description="Theo dõi lịch dạy trực quan."
                />

                <Feature
                  icon={<CheckCircle2 size={18} />}
                  title="Chấm công dễ dàng"
                  description="Ghi nhận buổi dạy nhanh chóng."
                />

                <Feature
                  icon={<Clock3 size={18} />}
                  title="Theo dõi thu nhập"
                  description="Biết chính xác bạn đã dạy bao nhiêu."
                />
              </div>
            </div>
          </section>

          {/* Right - Login */}
          <section className="flex justify-center">
            <div className="w-full max-w-md">
              {/* Mobile logo */}
              <div className="mb-8 flex flex-col items-center lg:hidden">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                  <CalendarDays size={24} />
                </div>

                <h1 className="mt-3 text-2xl font-bold text-slate-900">
                  Hangie
                </h1>
              </div>

              {/* Login card */}
              {/* Login card */}
              <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-7 shadow-xl shadow-slate-200/50 backdrop-blur-xl sm:p-9">
                <div className="mb-7">
                  {/* Title + Demo account */}
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                      Đăng nhập
                    </h2>
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    Đăng nhập để tiếp tục sử dụng Hangie.
                  </p>
                </div>

                <LoginForm />

                {/* Register */}
                <div className="mt-6 border-t border-slate-100 pt-6 text-center">
                  <p className="text-sm text-slate-500">
                    Chưa có tài khoản?{" "}
                    <Link
                      href="/register"
                      className="font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline"
                    >
                      Đăng ký ngay
                    </Link>
                  </p>
                </div>
              </div>

              <p className="mt-6 text-center text-xs text-slate-400">
                © 2026 Hangie. Simple tools for better teaching.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

const Feature = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        {icon}
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-800">{title}</p>

        <p className="mt-0.5 text-xs text-slate-400">{description}</p>
      </div>
    </div>
  );
};

export default Login;
