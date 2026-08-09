export type SessionDisplayStatus =
  | "taught"
  | "absent"
  | "pending";

export const getSessionStatus = (
  isAttended: boolean,
  date: string | Date,
): SessionDisplayStatus => {
  if (isAttended) {
    return "taught";
  }

  const sessionDate = new Date(date);
  const now = new Date();

  if (sessionDate < now) {
    return "absent";
  }

  return "pending";
};