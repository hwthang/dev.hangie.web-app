"use client";

import { Session } from "@/features/session/session.types";
import { Pencil, Trash2 } from "lucide-react";

type Props = {
  session: Session;
  isDeleting?: boolean;
  onEdit: (session: Session) => void;
  onDelete: (session: Session) => void;
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("vi-VN").format(value) + "đ";
};

const formatDate = (value: string) => {
  return new Date(value).toLocaleString("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  });
};

const SessionItem = ({
  session,
  isDeleting = false,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <tr className="transition-colors hover:bg-slate-50">
      {/* Family */}
      <td className="px-5 py-4">
        <div>
          <p className="font-medium text-slate-800">
            {session.family.name}
          </p>

          {session.family.note && (
            <p className="mt-1 text-xs text-slate-400">
              {session.family.note}
            </p>
          )}
        </div>
      </td>

      {/* Date */}
      <td className="px-5 py-4 text-sm text-slate-600">
        {formatDate(session.date)}
      </td>

      {/* Status */}
      <td className="px-5 py-4 text-center">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
            session.isAttended
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {session.isAttended ? "Đã dạy" : "Chưa dạy"}
        </span>
      </td>

      {/* Amount */}
      <td className="px-5 py-4 text-right text-sm font-medium text-slate-800">
        {formatCurrency(session.amount)}
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <div className="flex justify-end gap-2">
          <button
            type="button"
            title="Chỉnh sửa"
            onClick={() => onEdit(session)}
            className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-blue-50 hover:text-blue-600"
          >
            <Pencil size={17} />
          </button>

          <button
            type="button"
            title="Xóa"
            disabled={isDeleting}
            onClick={() => onDelete(session)}
            className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default SessionItem;