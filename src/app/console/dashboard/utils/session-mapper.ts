// utils/session-mapper.ts

import { Session as ApiSession } from "@/features/session/session.types";

import {
  CalendarSessions,
  Session as CalendarSession,
} from "../types/calendar";

const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const mapSessionsToCalendar = (
  sessions: ApiSession[],
): CalendarSessions => {
  return sessions.reduce<CalendarSessions>((result, session) => {
    const date = new Date(session.date);

    const dateKey = `${date.getFullYear()}-${String(
      date.getMonth() + 1,
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    const calendarSession: CalendarSession = {
      id: session.id,
      family: session.family.name,
      startTime: formatTime(session.date),
      status: session.isAttended ? "taught" : "absent",
      note: session.family.note ?? "",
    };

    if (!result[dateKey]) {
      result[dateKey] = [];
    }

    result[dateKey].push(calendarSession);

    return result;
  }, {});
};
