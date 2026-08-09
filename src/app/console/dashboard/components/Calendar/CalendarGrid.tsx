import {
  CalendarDay as CalendarDayType,
  CalendarSessions,
} from "../../types/calendar";

import {
  formatDateKey,
  isSameDate,
} from "../../utils/calendar";

import { WEEK_DAYS } from "../../constants/calendar";
import CalendarDay from "./CalendarDay";

type Props = {
  calendarDays: CalendarDayType[];
  sessions: CalendarSessions;
  today: Date;
  onAddSession: (date: Date) => void;
};

const CalendarGrid = ({
  calendarDays,
  sessions,
  today,
  onAddSession,
}: Props) => {
  return (
    <div>
      {/* Week days */}
      <div className="grid grid-cols-7">
        {WEEK_DAYS.map((day) => (
          <div
            key={day}
            className="border-b border-slate-200 px-3 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7">
        {calendarDays?.map(
          ({ date, isCurrentMonth }) => {
            const dateKey =
              formatDateKey(date);

            return (
              <CalendarDay
                key={dateKey}
                date={date}
                isCurrentMonth={isCurrentMonth}
                sessions={
                  sessions[dateKey] ?? []
                }
                isToday={isSameDate(
                  date,
                  today,
                )}
                onAddSession={() =>
                  onAddSession(date)
                }
              />
            );
          },
        )}
      </div>
    </div>
  );
};

export default CalendarGrid;