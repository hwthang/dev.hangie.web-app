"use client";

import { useMemo, useState } from "react";

import {
  Calendar,
  StatisticsCards,
} from "./components";

import FamilyStatisticsTable from "./components/FamilyStatisticsTable";

import { useFamilies } from "@/features/family/use-families";
import { useSessions } from "@/features/session/hooks/use-sessions";

import {
  CalendarSessions,
  CalendarDay,
} from "./types/calendar";

const Dashboard = () => {
  const [page] = useState(1);
  const pageSize = 100;

  const {
    data: sessionsResponse,
    isLoading: isSessionsLoading,
  } = useSessions(page, pageSize);

  const {
    data: familiesResponse,
    isLoading: isFamiliesLoading,
  } = useFamilies(page, pageSize);

  const sessions = sessionsResponse?.data ?? [];
  const families = familiesResponse?.data ?? [];

  /**
   * =========================
   * Current month
   * =========================
   */
  const today = new Date();

  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  /**
   * =========================
   * Sessions trong tháng hiện tại
   * =========================
   */
  const monthlySessions = useMemo(() => {
    return sessions.filter((session) => {
      const date = new Date(session.date);

      return (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    });
  }, [sessions, currentMonth, currentYear]);

  /**
   * =========================
   * Statistics Cards
   * =========================
   */
  const statistics = useMemo(() => {
    const taughtSessions =
      monthlySessions.filter(
        (session) => session.isAttended,
      ).length;

    const absentSessions =
      monthlySessions.filter(
        (session) => !session.isAttended,
      ).length;

    const expectedSalary =
      monthlySessions
        .filter(
          (session) => session.isAttended,
        )
        .reduce(
          (total, session) =>
            total + session.amount,
          0,
        );

    return {
      taughtSessions,
      absentSessions,
      expectedSalary,
    };
  }, [monthlySessions]);

  /**
   * =========================
   * Family Statistics
   * =========================
   */
  const familyStatistics = useMemo(() => {
    return families.map((family) => {
      const familySessions =
        monthlySessions.filter(
          (session) =>
            session.familyId === family.id,
        );

      const taughtSessions =
        familySessions.filter(
          (session) => session.isAttended,
        ).length;

      const absentSessions =
        familySessions.filter(
          (session) => !session.isAttended,
        ).length;

      const expectedSalary =
        familySessions
          .filter(
            (session) => session.isAttended,
          )
          .reduce(
            (total, session) =>
              total + session.amount,
            0,
          );

      return {
        id: family.id,
        familyName: family.name,
        sessionRate: family.sessionRate,
        taughtSessions,
        absentSessions,
        expectedSalary,
      };
    });
  }, [families, monthlySessions]);

  /**
   * =========================
   * Calendar Sessions
   * =========================
   *
   * API Session
   *      ↓
   * CalendarSessions
   */
  const calendarSessions =
    useMemo<CalendarSessions>(() => {
      return sessions.reduce(
        (result, session) => {
          const date = new Date(
            session.date,
          );

          const dateKey =
            `${date.getFullYear()}-${String(
              date.getMonth() + 1,
            ).padStart(2, "0")}-${String(
              date.getDate(),
            ).padStart(2, "0")}`;

          if (!result[dateKey]) {
            result[dateKey] = [];
          }

          result[dateKey].push({
            id: session.id,
            family: session.family.name,
            startTime:
              date.toLocaleTimeString(
                "vi-VN",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                },
              ),
            status: session.isAttended
              ? "taught"
              : "absent",
          });

          return result;
        },
        {} as CalendarSessions,
      );
    }, [sessions]);

  /**
   * =========================
   * Calendar Days
   * =========================
   *
   * Tạo calendar của tháng hiện tại.
   *
   * Calendar gồm:
   * - ngày cuối tháng trước
   * - ngày tháng hiện tại
   * - ngày đầu tháng sau
   *
   * Tổng cộng 42 ô.
   */
  const calendarDays = useMemo<
    CalendarDay[]
  >(() => {
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDay = new Date(
      year,
      month,
      1,
    );

    const lastDay = new Date(
      year,
      month + 1,
      0,
    );

    const days: CalendarDay[] = [];

    /**
     * JS:
     *
     * Sunday = 0
     * Monday = 1
     * ...
     * Saturday = 6
     *
     * Chuyển về:
     *
     * Monday = 0
     * ...
     * Sunday = 6
     */
    const firstDayOfWeek =
      firstDay.getDay() === 0
        ? 6
        : firstDay.getDay() - 1;

    /**
     * Previous month
     */
    for (
      let i = firstDayOfWeek - 1;
      i >= 0;
      i--
    ) {
      const date = new Date(
        year,
        month,
        -i,
      );

      days.push({
        date,
        isCurrentMonth: false,
      });
    }

    /**
     * Current month
     */
    for (
      let day = 1;
      day <= lastDay.getDate();
      day++
    ) {
      days.push({
        date: new Date(
          year,
          month,
          day,
        ),
        isCurrentMonth: true,
      });
    }

    /**
     * Next month
     *
     * 42 = 6 tuần × 7 ngày
     */
    const remaining =
      42 - days.length;

    for (
      let i = 1;
      i <= remaining;
      i++
    ) {
      days.push({
        date: new Date(
          year,
          month + 1,
          i,
        ),
        isCurrentMonth: false,
      });
    }

    return days;
  }, [currentMonth, currentYear]);

  /**
   * =========================
   * Loading
   * =========================
   */
  const isLoading =
    isSessionsLoading ||
    isFamiliesLoading;

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-slate-500">
          Đang tải dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <StatisticsCards
        data={statistics}
      />

      {/* Family statistics */}
      <FamilyStatisticsTable
        data={familyStatistics}
        onDelete={() => {}}
        onEdit={() => {}}
      />

      {/* Calendar */}
      <Calendar
        sessions={calendarSessions}
        calendarDays={calendarDays}
        today={today}
      />
    </div>
  );
};

export default Dashboard;

