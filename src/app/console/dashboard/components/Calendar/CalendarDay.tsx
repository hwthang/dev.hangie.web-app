import { Check, Plus, X } from "lucide-react";

import { Session } from "../../types/calendar";

/**
 * =========================
 * Màu theo nhà (cùng id => cùng màu)
 * =========================
 * Viết đầy đủ class Tailwind (không ghép chuỗi động)
 * để Tailwind không bị purge mất.
 */
type FamilyColor = {
  bg: string;
  text: string;
  border: string;
  dot: string;
};

const FAMILY_COLORS: FamilyColor[] = [
  { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-300", dot: "bg-blue-500" },
  { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-300", dot: "bg-amber-500" },
  { bg: "bg-violet-100", text: "text-violet-800", border: "border-violet-300", dot: "bg-violet-500" },
  { bg: "bg-cyan-100", text: "text-cyan-800", border: "border-cyan-300", dot: "bg-cyan-500" },
  { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-300", dot: "bg-orange-500" },
  { bg: "bg-pink-100", text: "text-pink-800", border: "border-pink-300", dot: "bg-pink-500" },
  { bg: "bg-lime-100", text: "text-lime-800", border: "border-lime-300", dot: "bg-lime-500" },
  { bg: "bg-indigo-100", text: "text-indigo-800", border: "border-indigo-300", dot: "bg-indigo-500" },
  { bg: "bg-teal-100", text: "text-teal-800", border: "border-teal-300", dot: "bg-teal-500" },
  { bg: "bg-fuchsia-100", text: "text-fuchsia-800", border: "border-fuchsia-300", dot: "bg-fuchsia-500" },
];

const getFamilyColor = (id: string | number): FamilyColor => {
  const str = String(id);
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }

  return FAMILY_COLORS[hash % FAMILY_COLORS.length];
};

/**
 * Session có thêm familyId (optional để không lỗi type
 * nếu chỗ khác chưa truyền; khi thiếu sẽ dùng tên nhà để tính màu)
 */
type SessionItem = Session & {
  familyId?: string | number;
};

const colorOf = (session: SessionItem) =>
  getFamilyColor(session.familyId ?? session.family);

type Props = {
  date: Date;
  isCurrentMonth: boolean;
  sessions: SessionItem[];
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
            onClick={() => onAddSession(date)}
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
            <Plus size={17} strokeWidth={2} />
          </button>
        )}
      </div>

      {/* Sessions */}
      <div className="mt-2 space-y-1">
        {sessions.slice(0, 2).map((session) => {
          const color = colorOf(session);
          const isTaught = session.status === "taught";

          return (
            <div
              key={session.id}
              title={`${session.family} - ${session.startTime}`}
              className={`flex items-center justify-between gap-1 rounded border px-1.5 py-0.5 text-xs ${color.bg} ${color.text} ${color.border}`}
            >
              <span className="truncate font-medium">
                {session.family}
              </span>

              {isTaught ? (
                <Check
                  className="h-3.5 w-3.5 shrink-0 text-emerald-600"
                  strokeWidth={3}
                  aria-label="Đã dạy"
                />
              ) : (
                <X
                  className="h-3.5 w-3.5 shrink-0 text-red-600"
                  strokeWidth={3}
                  aria-label="Chưa dạy"
                />
              )}
            </div>
          );
        })}

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
              {date.toLocaleDateString("vi-VN", {
                weekday: "long",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>

            <div className="mt-2 space-y-3">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="border-t border-slate-100 pt-2"
                >
                  <p className="flex items-center gap-1.5 text-xs font-medium text-slate-800">
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${
                        colorOf(session).dot
                      }`}
                    />
                    {session.family}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {session.startTime}
                    {session.endTime ? ` - ${session.endTime}` : ""}
                  </p>

                  <p
                    className={`mt-1 text-xs font-medium ${
                      session.status === "taught"
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {session.status === "taught" ? "Đã dạy" : "Chưa dạy"}
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