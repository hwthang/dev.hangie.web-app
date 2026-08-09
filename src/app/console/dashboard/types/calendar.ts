export type SessionStatus = "taught" | "absent";

export type Session = {
  id: string;
  family: string;
  startTime: string;
  endTime?: string;
  status: SessionStatus;
  note?: string;
};

export type CalendarDay = {
  date: Date;
  isCurrentMonth: boolean;
};

export type CalendarSessions = Record<
  string,
  Session[]
>;