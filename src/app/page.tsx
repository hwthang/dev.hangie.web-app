"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  DollarSign,
  LayoutDashboard,
  BarChart3,
  Users,
  Bell,
  Check,
} from "lucide-react";
import { useState } from "react";

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* =========================
          Header
      ========================= */}
      <header className="fixed left-0 right-0 top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
          <nav className="relative flex h-16 items-center justify-between rounded-2xl border border-slate-200/70 bg-white/85 px-4 shadow-sm backdrop-blur-xl sm:px-6">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center gap-2.5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20 transition-transform group-hover:scale-105">
                <CalendarDays size={21} strokeWidth={2.2} />
              </div>

              <span className="text-xl font-bold tracking-tight text-slate-900">
                Hangie
              </span>
            </Link>

            {/* Navigation */}
            <div className="hidden items-center gap-8 md:flex">
              <Link
                href="#features"
                className="text-sm font-medium text-slate-500 transition hover:text-blue-600"
              >
                Tính năng
              </Link>

              <Link
                href="#workflow"
                className="text-sm font-medium text-slate-500 transition hover:text-blue-600"
              >
                Cách hoạt động
              </Link>

              <Link
                href="#about"
                className="text-sm font-medium text-slate-500 transition hover:text-blue-600"
              >
                Về Hangie
              </Link>
            </div>

            {/* Actions */}
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                href="/login"
                className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
              >
                Đăng nhập
              </Link>

              <Link
                href="/register"
                className="group flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
              >
                Bắt đầu ngay
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            {/* Mobile */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 sm:hidden"
            >
              {mobileMenuOpen ? "×" : "☰"}
            </button>

            {mobileMenuOpen && (
              <div className="absolute left-0 right-0 top-[calc(100%+8px)] rounded-2xl border border-slate-200 bg-white p-3 shadow-xl sm:hidden">
                <div className="space-y-1">
                  <Link
                    href="#features"
                    className="block rounded-lg px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
                  >
                    Tính năng
                  </Link>

                  <Link
                    href="#workflow"
                    className="block rounded-lg px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
                  >
                    Cách hoạt động
                  </Link>

                  <Link
                    href="#about"
                    className="block rounded-lg px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
                  >
                    Về Hangie
                  </Link>

                  <div className="my-2 border-t border-slate-100" />

                  <Link
                    href="/login"
                    className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-600"
                  >
                    Đăng nhập
                  </Link>

                  <Link
                    href="/register"
                    className="block rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white"
                  >
                    Bắt đầu ngay
                  </Link>
                </div>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* =========================
          Hero
      ========================= */}
      <section className="relative overflow-hidden pt-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />
          <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-indigo-200/30 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-100/50" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              Simple tools for better teaching
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Quản lý việc dạy
              <br />
              <span className="text-blue-600">
                đơn giản hơn mỗi ngày.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
              Hangie giúp bạn quản lý lịch dạy, theo dõi
              buổi học, chấm công và kiểm soát thu nhập
              một cách đơn giản và trực quan.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/register"
                className="group flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                Bắt đầu miễn phí
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="#features"
                className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Khám phá Hangie
              </Link>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-300/40">
              <div className="rounded-xl bg-slate-50 p-4 sm:p-6">
                {/* Fake dashboard header */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">
                      Tổng quan
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-slate-900">
                      Xin chào, Thắng 👋
                    </h3>
                  </div>

                  <div className="h-9 w-9 rounded-full bg-blue-100" />
                </div>

                {/* Statistics */}
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <DashboardCard
                    icon={<CalendarDays size={18} />}
                    label="Buổi đã dạy"
                    value="18"
                  />

                  <DashboardCard
                    icon={<CheckCircle2 size={18} />}
                    label="Đã chấm công"
                    value="16"
                  />

                  <DashboardCard
                    icon={<DollarSign size={18} />}
                    label="Thu nhập dự kiến"
                    value="3.200.000đ"
                  />
                </div>

                {/* Calendar */}
                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-slate-900">
                      Lịch dạy
                    </h4>

                    <span className="text-xs text-slate-400">
                      Tháng 8, 2026
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-7 gap-2">
                    {Array.from({ length: 35 }).map((_, index) => {
                      const day = index - 4;

                      return (
                        <div
                          key={index}
                          className={`flex h-10 items-center justify-center rounded-lg text-xs ${
                            day > 0 && day <= 31
                              ? "bg-slate-50 text-slate-600"
                              : "text-slate-200"
                          } ${
                            [5, 10, 15, 20, 25].includes(day)
                              ? "bg-blue-50 font-semibold text-blue-600"
                              : ""
                          }`}
                        >
                          {day > 0 && day <= 31 ? day : ""}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          Problem
      ========================= */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Vấn đề
              </p>

              <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                Đừng để việc quản lý
                <br />
                <span className="text-slate-400">
                  trở thành một công việc khác.
                </span>
              </h2>

              <p className="mt-5 max-w-lg leading-7 text-slate-500">
                Khi có nhiều gia đình và nhiều buổi dạy,
                việc ghi chú bằng sổ tay hoặc những file
                riêng lẻ rất dễ khiến bạn quên lịch, bỏ sót
                buổi dạy hoặc khó theo dõi thu nhập.
              </p>
            </div>

            <div className="space-y-4">
              <ProblemItem
                icon={<CalendarDays size={19} />}
                title="Khó nhớ lịch dạy"
                description="Không biết hôm nay có buổi dạy nào hoặc lịch của từng gia đình."
              />

              <ProblemItem
                icon={<CheckCircle2 size={19} />}
                title="Dễ quên chấm công"
                description="Sau mỗi buổi dạy phải nhớ cập nhật lại thông tin."
              />

              <ProblemItem
                icon={<DollarSign size={19} />}
                title="Khó tính thu nhập"
                description="Phải tự cộng số buổi và tiền công vào cuối tháng."
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          Features
      ========================= */}
      <section
        id="features"
        className="mx-auto max-w-7xl px-6 py-24"
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Tính năng
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Tất cả những gì bạn cần
          </h2>

          <p className="mt-4 leading-7 text-slate-500">
            Một nơi duy nhất để quản lý lịch dạy,
            gia đình, chấm công và thu nhập.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <Feature
            icon={<CalendarDays size={22} />}
            title="Lịch dạy"
            description="Xem toàn bộ lịch dạy theo ngày, tháng và dễ dàng nhận biết các buổi đã dạy."
          />

          <Feature
            icon={<CheckCircle2 size={22} />}
            title="Chấm công"
            description="Ghi nhận nhanh trạng thái của từng buổi học ngay sau khi hoàn thành."
          />

          <Feature
            icon={<Users size={22} />}
            title="Quản lý gia đình"
            description="Lưu thông tin gia đình, học sinh và mức phí của từng buổi dạy."
          />

          <Feature
            icon={<BarChart3 size={22} />}
            title="Theo dõi thu nhập"
            description="Tự động tổng hợp số buổi và thu nhập dự kiến theo từng gia đình."
          />
        </div>
      </section>

      {/* =========================
          Workflow
      ========================= */}
      <section
        id="workflow"
        className="border-y border-slate-200 bg-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Cách hoạt động
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Đơn giản chỉ với vài bước
            </h2>
          </div>

          <div className="relative mt-16 grid gap-10 md:grid-cols-3">
            <Step
              number="01"
              icon={<Users size={22} />}
              title="Thêm gia đình"
              description="Lưu thông tin gia đình và mức phí cho mỗi buổi dạy."
            />

            <Step
              number="02"
              icon={<CalendarDays size={22} />}
              title="Theo dõi lịch"
              description="Tạo và theo dõi các buổi dạy trên lịch trực quan."
            />

            <Step
              number="03"
              icon={<CheckCircle2 size={22} />}
              title="Chấm công"
              description="Sau khi dạy xong, ghi nhận buổi dạy và Hangie tự tổng hợp."
            />
          </div>
        </div>
      </section>

      {/* =========================
          Benefits
      ========================= */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Tại sao Hangie?
            </p>

            <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Ít quản lý hơn.
              <br />
              <span className="text-blue-600">
                Nhiều thời gian hơn.
              </span>
            </h2>

            <p className="mt-5 max-w-lg leading-7 text-slate-500">
              Hangie được thiết kế tập trung vào những
              công việc bạn thực sự cần khi quản lý các
              buổi dạy cá nhân.
            </p>

            <div className="mt-8 space-y-4">
              <Benefit text="Theo dõi lịch dạy tập trung" />
              <Benefit text="Không bỏ sót buổi dạy" />
              <Benefit text="Biết chính xác số buổi đã dạy" />
              <Benefit text="Theo dõi thu nhập dễ dàng" />
            </div>
          </div>

          {/* Benefit visual */}
          <div className="relative">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">
                    Thu nhập tháng này
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    4.850.000đ
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <BarChart3 size={21} />
                </div>
              </div>

              <div className="mt-8 h-32">
                <div className="flex h-full items-end gap-3">
                  {[35, 50, 42, 70, 58, 85, 72, 95].map(
                    (height, index) => (
                      <div
                        key={index}
                        className="flex-1 rounded-t-lg bg-blue-100"
                        style={{
                          height: `${height}%`,
                        }}
                      >
                        <div
                          className="h-full rounded-t-lg bg-blue-500 transition-all hover:bg-blue-600"
                          style={{
                            height: `${Math.min(
                              height + 10,
                              100,
                            )}%`,
                          }}
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-xs text-slate-400">
                  8 buổi trong tuần
                </span>

                <span className="text-xs font-semibold text-green-600">
                  +18.5%
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          CTA
      ========================= */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-blue-600 px-6 py-16 text-center shadow-xl shadow-blue-600/20 sm:px-12">
            <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">
                Bắt đầu ngay
              </p>

              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Sẵn sàng quản lý việc dạy
                <br />
                đơn giản hơn?
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-blue-100">
                Tạo tài khoản Hangie và bắt đầu quản lý
                lịch dạy của bạn ngay hôm nay.
              </p>

              <Link
                href="/register"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
              >
                Tạo tài khoản miễn phí
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          Footer
      ========================= */}
      <footer
        id="about"
        className="border-t border-slate-200 bg-white"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <CalendarDays size={17} />
            </div>

            <span className="font-bold text-slate-900">
              Hangie
            </span>
          </div>

          <p className="text-xs text-slate-400">
            © 2026 Hangie. Simple tools for better teaching.
          </p>
        </div>
      </footer>
    </main>
  );
};

/* =========================
   Components
========================= */

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
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-blue-100 hover:shadow-lg hover:shadow-slate-200/60">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
        {icon}
      </div>

      <h3 className="mt-5 font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
};

const ProblemItem = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-slate-900">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
};

const Step = ({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="relative text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <p className="mt-5 text-xs font-bold tracking-widest text-blue-600">
        {number}
      </p>

      <h3 className="mt-2 font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
};

const Benefit = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-50 text-green-600">
        <Check size={14} strokeWidth={2.5} />
      </div>

      <span className="text-sm font-medium text-slate-700">
        {text}
      </span>
    </div>
  );
};

const DashboardCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-2 text-blue-600">
        {icon}

        <span className="text-xs text-slate-400">
          {label}
        </span>
      </div>

      <p className="mt-3 text-xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
};

export default Home;