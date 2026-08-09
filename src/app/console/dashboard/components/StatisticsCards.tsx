import {
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

export type StatisticsData = {
  taughtSessions: number;
  absentSessions: number;
  expectedSalary: number;
};

type Props = {
  data: StatisticsData;
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("vi-VN").format(value) + "đ";
};

const StatisticsCards = ({ data }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* Taught */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Số buổi đã dạy
            </p>

            <p className="mt-2 text-3xl font-semibold text-slate-900">
              {data.taughtSessions}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Trong tháng này
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <CheckCircle2 size={22} />
          </div>
        </div>
      </div>

      {/* Absent */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Số buổi Chưa dạy
            </p>

            <p className="mt-2 text-3xl font-semibold text-slate-900">
              {data.absentSessions}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Trong tháng này
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-50 text-red-600">
            <XCircle size={22} />
          </div>
        </div>
      </div>

      {/* Salary */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Tiền lương dự kiến
            </p>

            <p className="mt-2 text-3xl font-semibold text-slate-900">
              {formatCurrency(data.expectedSalary)}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Tạm tính trong tháng
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Clock3 size={22} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCards;