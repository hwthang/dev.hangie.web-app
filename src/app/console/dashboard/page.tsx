"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Calendar, StatisticsCards } from "./components";
import FamilyStatisticsTable from "./components/FamilyStatisticsTable";

import { useFamilies } from "@/features/family/use-families";
import { useSessions } from "@/features/session/hooks/use-sessions";

import { CalendarSessions, CalendarDay } from "./types/calendar";

const Dashboard = () => {
  const [page] = useState(1);
  const pageSize = 100;

  const { data: sessionsResponse, isLoading: isSessionsLoading } =
    useSessions(page, pageSize);

  const { data: familiesResponse, isLoading: isFamiliesLoading } =
    useFamilies(page, pageSize);

  const sessions = sessionsResponse?.data ?? [];
  const families = familiesResponse?.data ?? [];

  /**
   * Hôm nay (để highlight trong lịch) – không đổi
   */
  const today = useMemo(() => new Date(), []);

  /**
   * Tháng đang xem (luôn là ngày 1 của tháng)
   */
  const [viewDate, setViewDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();

  const goPrevMonth = () =>
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));

  const goNextMonth = () =>
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

  const goToday = () =>
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));

  const isViewingCurrentMonth =
    currentMonth === today.getMonth() && currentYear === today.getFullYear();

  /**
   * Sessions của tháng đang xem (filter ở frontend)
   */
  const monthlySessions = useMemo(() => {
    return sessions.filter((session) => {
      const date = new Date(session.date);
      return (
        date.getMonth() === currentMonth && date.getFullYear() === currentYear
      );
    });
  }, [sessions, currentMonth, currentYear]);

  /**
   * Statistics Cards
   */
  const statistics = useMemo(() => {
    const attended = monthlySessions.filter((s) => s.isAttended);

    return {
      taughtSessions: attended.length,
      absentSessions: monthlySessions.length - attended.length,
      expectedSalary: attended.reduce((total, s) => total + s.amount, 0),
    };
  }, [monthlySessions]);

  /**
   * Family Statistics
   */
  const familyStatistics = useMemo(() => {
    return families.map((family) => {
      const familySessions = monthlySessions.filter(
        (session) => session.familyId === family.id,
      );
      const attended = familySessions.filter((s) => s.isAttended);

      return {
        id: family.id,
        familyName: family.name,
        sessionRate: family.sessionRate,
        taughtSessions: attended.length,
        absentSessions: familySessions.length - attended.length,
        expectedSalary: attended.reduce((total, s) => total + s.amount, 0),
      };
    });
  }, [families, monthlySessions]);

  /**
   * Calendar Sessions
   * (giữ toàn bộ sessions để các ô của tháng trước/sau cũng hiển thị buổi học)
   */
  const calendarSessions = useMemo<CalendarSessions>(() => {
    return sessions.reduce((result, session) => {
      const date = new Date(session.date);

      const dateKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1,
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

      if (!result[dateKey]) {
        result[dateKey] = [];
      }

      result[dateKey].push({
        id: session.id,
        family: session.family.name,
        startTime: date.toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: session.isAttended ? "taught" : "absent",
      });

      return result;
    }, {} as CalendarSessions);
  }, [sessions]);

  /**
   * Calendar Days (42 ô) theo tháng đang xem
   */
  const calendarDays = useMemo<CalendarDay[]>(() => {
    const year = currentYear;
    const month = currentMonth;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days: CalendarDay[] = [];

    // Monday = 0 ... Sunday = 6
    const firstDayOfWeek =
      firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    // Tháng trước
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({ date: new Date(year, month, -i), isCurrentMonth: false });
    }

    // Tháng hiện tại
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push({ date: new Date(year, month, day), isCurrentMonth: true });
    }

    // Tháng sau (đủ 42 ô)
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }

    return days;
  }, [currentMonth, currentYear]);

  const isLoading = isSessionsLoading || isFamiliesLoading;

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-slate-500">Đang tải dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Month navigation */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">
          Tháng {currentMonth + 1}/{currentYear}
        </h2>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrevMonth}
            aria-label="Tháng trước"
            className="rounded-md border border-slate-200 p-2 hover:bg-slate-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={goToday}
            disabled={isViewingCurrentMonth}
            className="rounded-md border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Hôm nay
          </button>

          <button
            type="button"
            onClick={goNextMonth}
            aria-label="Tháng sau"
            className="rounded-md border border-slate-200 p-2 hover:bg-slate-50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <StatisticsCards data={statistics} />

      <FamilyStatisticsTable
        data={familyStatistics}
        onDelete={() => {}}
        onEdit={() => {}}
      />

      <Calendar
        sessions={calendarSessions}
        calendarDays={calendarDays}
        today={today}
      />
    </div>
  );
};

export default Dashboard;