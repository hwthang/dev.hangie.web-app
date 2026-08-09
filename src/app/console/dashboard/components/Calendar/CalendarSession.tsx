import { CheckCircle2, XCircle } from "lucide-react";
import { Session } from "../../types/calendar";

type Props = {
  session: Session;
};

const CalendarSession = ({ session }: Props) => {
  const isTaught = session.status === "taught";

  return (
    <div
      className={`rounded-md px-2 py-1.5 text-xs ${
        isTaught
          ? "bg-emerald-50 text-emerald-700"
          : "bg-red-50 text-red-700"
      }`}
    >
      <div className="flex items-center gap-1">
        {isTaught ? (
          <CheckCircle2 size={12} />
        ) : (
          <XCircle size={12} />
        )}

        <span className="truncate font-medium">
          {isTaught ? "Đã dạy" : "Chưa dạy"}
        </span>
      </div>
    </div>
  );
};

export default CalendarSession;