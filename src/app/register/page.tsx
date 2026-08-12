"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  UserPlus,
} from "lucide-react";

import { useCreateUser } from "@/features/user/use-create-user";

const Register = () => {
  const router = useRouter();
  const createUserMutation = useCreateUser();

  const [form, setForm] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    try {
      await createUserMutation.mutateAsync(form);
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const errorMessage =
    createUserMutation.error instanceof AxiosError
      ? createUserMutation.error.response?.data?.message ??
        "Đăng ký thất bại."
      : "Có lỗi xảy ra.";

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
          {/* =========================
              LEFT
          ========================== */}
          <section className="hidden lg:block">
            <div className="max-w-lg">
              {/* Logo */}
              <Link
                href="/"
                className="mb-8 flex items-center gap-3"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                  <CalendarDays
                    size={23}
                    strokeWidth={2.2}
                  />
                </div>

                <span className="text-2xl font-bold tracking-tight text-slate-900">
                  Hangie
                </span>
              </Link>

              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Get started
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-slate-900 xl:text-5xl">
                Bắt đầu quản lý
                <br />
                <span className="text-blue-600">
                  việc dạy dễ dàng hơn.
                </span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-slate-500">
                Tạo tài khoản Hangie để quản lý lịch dạy,
                chấm công và theo dõi thu nhập của bạn
                một cách đơn giản.
              </p>

              {/* Features */}
              <div className="mt-10 space-y-5">
                <Feature
                  icon={<CalendarDays size={18} />}
                  title="Quản lý lịch dạy"
                  description="Theo dõi lịch dạy trực quan và dễ dàng."
                />

                <Feature
                  icon={<CheckCircle2 size={18} />}
                  title="Chấm công nhanh chóng"
                  description="Ghi nhận và quản lý các buổi dạy."
                />

                <Feature
                  icon={<Clock3 size={18} />}
                  title="Theo dõi thu nhập"
                  description="Tự động thống kê tiền lương dự kiến."
                />
              </div>
            </div>
          </section>

          {/* =========================
              RIGHT
          ========================== */}
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

              {/* Register Card */}
              <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-7 shadow-xl shadow-slate-200/50 backdrop-blur-xl sm:p-9">
                {/* Header */}
                <div className="mb-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <UserPlus size={20} />
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                        Tạo tài khoản
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Bắt đầu sử dụng Hangie ngay hôm nay.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {/* Username */}
                  <div>
                    <label
                      htmlFor="username"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Tên đăng nhập
                    </label>

                    <input
                      id="username"
                      name="username"
                      value={form.username}
                      onChange={handleChange}
                      placeholder="Nhập tên đăng nhập"
                      autoComplete="username"
                      required
                      disabled={
                        createUserMutation.isPending
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-50"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Số điện thoại
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Nhập số điện thoại"
                      autoComplete="tel"
                      required
                      disabled={
                        createUserMutation.isPending
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-50"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      autoComplete="email"
                      required
                      disabled={
                        createUserMutation.isPending
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-50"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Mật khẩu
                    </label>

                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      required
                      disabled={
                        createUserMutation.isPending
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-50"
                    />

                    <p className="mt-2 text-xs text-slate-400">
                      Sử dụng mật khẩu bạn có thể dễ dàng ghi nhớ.
                    </p>
                  </div>

                  {/* Error */}
                  {createUserMutation.isError && (
                    <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                      {errorMessage}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={
                      createUserMutation.isPending
                    }
                    className="mt-2 flex w-full items-center justify-center rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-blue-600/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {createUserMutation.isPending
                      ? "Đang tạo tài khoản..."
                      : "Tạo tài khoản"}
                  </button>
                </form>

                {/* Login link */}
                <div className="mt-6 border-t border-slate-100 pt-6 text-center">
                  <p className="text-sm text-slate-500">
                    Đã có tài khoản?{" "}
                    <Link
                      href="/login"
                      className="font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline"
                    >
                      Đăng nhập
                    </Link>
                  </p>
                </div>
              </div>

              {/* Footer */}
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
        <p className="text-sm font-semibold text-slate-800">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Register;