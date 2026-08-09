import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";
import { MONTHS } from "../../constants/calendar";

type Props = {
  currentMonth: number;
  currentYear: number;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onMonthChange: (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => void;
  onYearChange: (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => void;
};

const CalendarHeader = ({
  currentMonth,
  currentYear,
  onPreviousMonth,
  onNextMonth,
  onToday,
  onMonthChange,
  onYearChange,
}: Props) => {
  const currentYearValue = new Date().getFullYear();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 p-5">
      {/* Title */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <CalendarDays size={20} />
        </div>

        <div>
          <h2 className="font-semibold text-slate-900">
            Lịch dạy
          </h2>

          <p className="text-sm text-slate-500">
            Theo dõi các buổi dạy trong tháng
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onPreviousMonth}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
          title="Tháng trước"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          onClick={onToday}
          className="h-10 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          Hôm nay
        </button>

        <button
          type="button"
          onClick={onNextMonth}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
          title="Tháng sau"
        >
          <ChevronRight size={18} />
        </button>

        <select
          value={currentMonth}
          onChange={onMonthChange}
          className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500"
        >
          {MONTHS.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>

        <select
          value={currentYear}
          onChange={onYearChange}
          className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500"
        >
          {Array.from({ length: 5 }, (_, index) => {
            const year =
              currentYearValue - 2 + index;

            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>

        <button
          type="button"
          className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          <Download size={17} />
          Xuất Excel
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;