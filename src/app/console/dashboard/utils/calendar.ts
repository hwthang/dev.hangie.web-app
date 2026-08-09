import { CalendarDay } from "../types/calendar";

export const getMondayIndex = (date: Date) => {
  const day = date.getDay();

  return day === 0 ? 6 : day - 1;
};

export const formatDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const isSameDate = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const getCalendarDays = (
  currentDate: Date,
): CalendarDay[] => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const firstDayIndex = getMondayIndex(firstDayOfMonth);
  const daysInMonth = lastDayOfMonth.getDate();

  const days: CalendarDay[] = [];

  // Previous month
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const date = new Date(year, month, -i);

    days.push({
      date,
      isCurrentMonth: false,
    });
  }

  // Current month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);

    days.push({
      date,
      isCurrentMonth: true,
    });
  }

  // Next month
  const remainingDays = 42 - days.length;

  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(year, month + 1, day);

    days.push({
      date,
      isCurrentMonth: false,
    });
  }

  return days;
};