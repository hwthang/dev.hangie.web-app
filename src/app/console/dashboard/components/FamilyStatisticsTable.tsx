import {
  Pencil,
  Plus,
  Trash2,
  Users,
} from "lucide-react";

export type FamilyStatistic = {
  id: string;
  familyName: string;
  sessionRate: number;
  taughtSessions: number;
  absentSessions: number;
  expectedSalary: number;
};

type Props = {
  data: FamilyStatistic[];
  onAdd?: () => void;
  onEdit?: (family: FamilyStatistic) => void;
  onDelete?: (family: FamilyStatistic) => void;
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("vi-VN").format(value) + "đ";
};

const FamilyStatisticsTable = ({
  data,
  onAdd,
  onEdit,
  onDelete,
}: Props) => {
  const totalTaught = data.reduce(
    (total, family) => total + family.taughtSessions,
    0,
  );

  const totalAbsent = data.reduce(
    (total, family) => total + family.absentSessions,
    0,
  );

  const totalSalary = data.reduce(
    (total, family) => total + family.expectedSalary,
    0,
  );

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 p-5">
        <div>
          <h2 className="font-semibold text-slate-900">
            Thống kê theo gia đình
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Tổng hợp số buổi dạy và tiền lương dự kiến
          </p>
        </div>

        <div className="flex items-center gap-3">
        

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Users size={20} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Gia đình
              </th>

              <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                Đã dạy
              </th>

              <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                Chưa dạy
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Đơn giá/buổi
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Lương dự kiến
              </th>

              <th className="w-28 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {data.map((family) => (
              <tr
                key={family.id}
                className="transition-colors hover:bg-slate-50"
              >
                <td className="px-5 py-4">
                  <span className="font-medium text-slate-800">
                    {family.familyName}
                  </span>
                </td>

                <td className="px-5 py-4 text-center">
                  <span className="inline-flex min-w-8 items-center justify-center rounded-full bg-emerald-50 px-2 py-1 text-sm font-medium text-emerald-700">
                    {family.taughtSessions}
                  </span>
                </td>

                <td className="px-5 py-4 text-center">
                  <span className="inline-flex min-w-8 items-center justify-center rounded-full bg-red-50 px-2 py-1 text-sm font-medium text-red-700">
                    {family.absentSessions}
                  </span>
                </td>

                <td className="px-5 py-4 text-right text-sm text-slate-600">
                  {formatCurrency(family.sessionRate)}
                </td>

                <td className="px-5 py-4 text-right font-medium text-slate-900">
                  {formatCurrency(family.expectedSalary)}
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      type="button"
                      onClick={() => onEdit?.(family)}
                      title="Chỉnh sửa"
                      className="
                        flex h-8 w-8 items-center justify-center
                        rounded-md
                        text-slate-400
                        transition-colors
                        hover:bg-blue-50
                        hover:text-blue-600
                      "
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete?.(family)}
                      title="Xóa"
                      className="
                        flex h-8 w-8 items-center justify-center
                        rounded-md
                        text-slate-400
                        transition-colors
                        hover:bg-red-50
                        hover:text-red-600
                      "
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {data.length > 0 && (
              <tr className="bg-slate-50 font-semibold">
                <td className="px-5 py-4 text-slate-900">
                  Tổng cộng
                </td>

                <td className="px-5 py-4 text-center text-emerald-700">
                  {totalTaught}
                </td>

                <td className="px-5 py-4 text-center text-red-700">
                  {totalAbsent}
                </td>

                <td className="px-5 py-4 text-right text-slate-400">
                  —
                </td>

                <td className="px-5 py-4 text-right text-slate-900">
                  {formatCurrency(totalSalary)}
                </td>

                <td />
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="px-5 py-12 text-center">
          <p className="text-sm text-slate-500">
            Chưa có dữ liệu thống kê.
          </p>
        </div>
      )}
    </section>
  );
};

export default FamilyStatisticsTable;