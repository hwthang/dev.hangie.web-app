import Link from "next/link";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  ArrowRight,
  Wallet,
} from "lucide-react";

const Home = () => {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-100">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-blue-600"
          >
            Hangie
          </Link>

          <Link
            href="/login"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Đăng nhập
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-20 lg:pb-28 lg:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600">
            <CheckCircle2 size={16} />
            Quản lý việc dạy học đơn giản hơn
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Quản lý lịch dạy.
            <br />
            <span className="text-blue-600">Theo dõi thu nhập.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            Hangie giúp bạn quản lý gia đình, lịch dạy, chấm công và
            theo dõi tiền lương trong một nơi duy nhất.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Bắt đầu sử dụng
              <ArrowRight size={18} />
            </Link>

            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Khám phá tính năng
            </a>
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="mx-auto mt-16 max-w-5xl rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-sm">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="flex h-10 items-center gap-2 border-b border-slate-100 px-4">
              <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
              <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
              <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            </div>

            <div className="grid min-h-[280px] grid-cols-1 gap-4 p-6 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-100 p-4">
                <p className="text-sm text-slate-500">Đã dạy</p>
                <p className="mt-2 text-3xl font-semibold">18</p>
                <p className="mt-1 text-xs text-emerald-600">
                  Buổi trong tháng
                </p>
              </div>

              <div className="rounded-xl border border-slate-100 p-4">
                <p className="text-sm text-slate-500">Buổi nghỉ</p>
                <p className="mt-2 text-3xl font-semibold">2</p>
                <p className="mt-1 text-xs text-red-500">
                  Cần theo dõi
                </p>
              </div>

              <div className="rounded-xl border border-slate-100 p-4">
                <p className="text-sm text-slate-500">
                  Lương dự kiến
                </p>
                <p className="mt-2 text-3xl font-semibold">
                  5.4M
                </p>
                <p className="mt-1 text-xs text-blue-600">
                  Trong tháng này
                </p>
              </div>

              <div className="sm:col-span-3 rounded-xl border border-slate-100 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold">
                    Lịch dạy
                  </p>
                  <span className="text-xs text-slate-400">
                    Tháng hiện tại
                  </span>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 28 }).map((_, index) => (
                    <div
                      key={index}
                      className={`h-8 rounded-md ${
                        [5, 9, 14, 18, 23].includes(index)
                          ? "bg-blue-100"
                          : "bg-slate-50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="border-y border-slate-100 bg-slate-50"
      >
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-blue-600">
              TÍNH NĂNG
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Mọi thứ bạn cần để quản lý việc dạy
            </h2>

            <p className="mt-4 text-slate-500">
              Không cần ghi chép thủ công hay theo dõi nhiều nơi.
              Hangie tập trung mọi thông tin cần thiết vào một hệ
              thống.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <Feature
              icon={<CalendarDays size={22} />}
              title="Quản lý lịch dạy"
              description="Theo dõi lịch dạy trực quan trên lịch, dễ dàng biết hôm nay cần dạy gia đình nào."
            />

            <Feature
              icon={<CheckCircle2 size={22} />}
              title="Chấm công"
              description="Ghi nhận buổi dạy và trạng thái đi dạy nhanh chóng, hạn chế bỏ sót."
            />

            <Feature
              icon={<Wallet size={22} />}
              title="Theo dõi thu nhập"
              description="Tự động tổng hợp số buổi và tính tiền lương dự kiến theo từng gia đình."
            />

            <Feature
              icon={<Mail size={22} />}
              title="Nhắc nhở"
              description="Nhận thông báo nhắc lịch dạy và chấm công để bạn không bỏ quên công việc."
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              VÌ SAO HANGIE?
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Tập trung vào việc dạy,
              <br />
              để Hangie lo phần quản lý.
            </h2>

            <p className="mt-5 leading-7 text-slate-500">
              Khi số lượng gia đình và buổi dạy tăng lên, việc ghi
              nhớ lịch và tính toán thu nhập bằng tay trở nên khó
              khăn. Hangie giúp bạn đơn giản hóa những công việc
              đó.
            </p>

            <div className="mt-7 space-y-4">
              <Benefit text="Theo dõi tất cả gia đình trên một hệ thống" />
              <Benefit text="Quản lý lịch dạy theo từng ngày" />
              <Benefit text="Tự động tổng hợp số buổi và thu nhập" />
              <Benefit text="Nhắc nhở lịch dạy và chấm công" />
            </div>
          </div>

          <div className="rounded-2xl bg-blue-600 p-8 text-white">
            <Clock3 size={32} />

            <h3 className="mt-6 text-2xl font-semibold">
              Đừng để một buổi dạy bị bỏ quên.
            </h3>

            <p className="mt-3 leading-7 text-blue-100">
              Hangie giúp bạn luôn biết mình cần làm gì hôm nay,
              đã dạy bao nhiêu buổi và thu nhập dự kiến là bao
              nhiêu.
            </p>

            <Link
              href="/login"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              Sử dụng Hangie
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Hangie. All rights reserved.</p>

          <p>Simple tools for better teaching.</p>
        </div>
      </footer>
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
    <div className="rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        {icon}
      </div>

      <h3 className="mt-4 font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
};

const Benefit = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center gap-3">
      <CheckCircle2
        size={19}
        className="shrink-0 text-blue-600"
      />
      <span className="text-sm text-slate-600">{text}</span>
    </div>
  );
};

export default Home;

