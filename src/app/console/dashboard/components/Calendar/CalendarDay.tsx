import { Plus } from "lucide-react";

import { Session } from "../../types/calendar";
import { formatDateKey } from "../../utils/calendar";

import CalendarSession from "./CalendarSession";

type Props = {
  date: Date;
  isCurrentMonth: boolean;
  sessions: Session[];
  isToday: boolean;
  onAddSession: (date: Date) => void;
};

const CalendarDay = ({
  date,
  isCurrentMonth,
  sessions,
  isToday,
  onAddSession,
}: Props) => {
  const dateKey = formatDateKey(date);

  return (
    <div
      className={`group relative min-h-28 border-b border-r border-slate-100 p-2 transition-colors ${
        isCurrentMonth
          ? "bg-white hover:bg-slate-50"
          : "bg-slate-50/50"
      }`}
    >
      {/* Date */}
      <div className="flex items-center justify-between">
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full text-sm ${
            isToday
              ? "bg-blue-600 font-semibold text-white"
              : isCurrentMonth
                ? "text-slate-700"
                : "text-slate-300"
          }`}
        >
          {date.getDate()}
        </span>

        {/* Add session */}
        {isCurrentMonth && (
          <button
            type="button"
            onClick={() =>
              onAddSession(date)
            }
            title="Thêm buổi dạy"
            className="
              flex h-7 w-7 items-center justify-center
              rounded-md
              text-slate-400
              opacity-0
              transition-all
              duration-150
              hover:bg-blue-50
              hover:text-blue-600
              group-hover:opacity-100
            "
          >
            <Plus
              size={17}
              strokeWidth={2}
            />
          </button>
        )}
      </div>

      {/* Sessions */}
      <div className="mt-2 space-y-1">
        {sessions
          .slice(0, 2)
          .map((session) => (
            <CalendarSession
              key={session.id}
              session={session}
            />
          ))}

        {sessions.length > 2 && (
          <p className="px-1 text-[10px] text-slate-400">
            +{sessions.length - 2} buổi khác
          </p>
        )}
      </div>

      {/* Hover detail */}
      {sessions.length > 0 && (
        <div className="pointer-events-none absolute left-1/2 top-full z-50 hidden w-64 -translate-x-1/2 pt-2 group-hover:block">
          <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-xl">
            <p className="text-xs font-semibold text-slate-900">
              {date.toLocaleDateString(
                "vi-VN",
                {
                  weekday: "long",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                },
              )}
            </p>

            <div className="mt-2 space-y-3">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="border-t border-slate-100 pt-2"
                >
                  <p className="text-xs font-medium text-slate-800">
                    {session.family}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {session.startTime}
                    {session.endTime
                      ? ` - ${session.endTime}`
                      : ""}
                  </p>

                  <p
                    className={`mt-1 text-xs font-medium ${
                      session.status ===
                      "taught"
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {session.status ===
                    "taught"
                      ? "Đã dạy"
                      : "Chưa dạy"}
                  </p>

                  {session.note && (
                    <p className="mt-1 text-xs text-slate-500">
                      {session.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarDay;