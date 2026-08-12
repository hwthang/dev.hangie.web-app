"use client";

import { useState } from "react";

import Modal from "@/shared/components/Modal";
import SessionForm from "@/features/session/components/SessionForm";

import CalendarGrid from "./CalendarGrid";

import {
  CalendarDay,
  CalendarSessions,
} from "../../types/calendar";

type Props = {
  calendarDays: CalendarDay[];
  sessions: CalendarSessions;
  today: Date;
};

const Calendar = ({
  calendarDays,
  sessions,
  today,
}: Props) => {
  const [selectedDate, setSelectedDate] =
    useState<Date | null>(null);

  const handleAddSession = (date: Date) => {
    setSelectedDate(date);
  };

  const handleClose = () => {
    setSelectedDate(null);
  };

  return (
    <>
      <CalendarGrid
        calendarDays={calendarDays}
        sessions={sessions}
        today={today}
        onAddSession={handleAddSession}
      />

      <Modal
        open={selectedDate !== null}
        onOpenChange={(open) => {
          if (!open) {
            handleClose();
          }
        }}
        title="Thêm buổi dạy"
      >
        {selectedDate && (
          <SessionForm
            data={{
              date: selectedDate.toISOString(),
              isAttended: false,
              familyId: "",
            }}
            onSuccess={handleClose}
            onCancel={handleClose}
          />
        )}
      </Modal>
    </>
  );
};

export default Calendar;