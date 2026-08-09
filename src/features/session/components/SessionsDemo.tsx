"use client";

import { FormEvent, useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";

import { useSessions } from "../hooks/use-sessions";
import { useCreateSession } from "../hooks/use-create-session";
import { useUpdateSession } from "../hooks/use-update-session";
import { useDeleteSession } from "../hooks/use-delete-session";
import {
  CreateSessionDto,
  Session,
  UpdateSessionDto,
  SessionFamily,
} from "../session.types";
import SessionForm from "./SessionForm";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("vi-VN").format(value) + "đ";
};

const formatDate = (value: string) => {
  return new Date(value).toLocaleString("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  });
};

const SessionsDemo = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, isError, error } = useSessions(page, pageSize);

  const createMutation = useCreateSession();
  const updateMutation = useUpdateSession();
  const deleteMutation = useDeleteSession();

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [editingSession, setEditingSession] = useState<Session | null>(null);

  const [form, setForm] = useState<CreateSessionDto>({
    amount: 200000,
    date: "",
    isAttended: false,
    familyId: "",
  });

  const sessions = data?.data ?? [];
  const metadata = data?.metadata;

  const resetForm = () => {
    setForm({
      amount: 200000,
      date: "",
      isAttended: true,
      familyId: "",
    });

    setEditingSession(null);
    setIsFormOpen(false);
  };

  const handleCreate = () => {
    setEditingSession(null);

    setForm({
      amount: 200000,
      date: "",
      isAttended: true,
      familyId: "",
    });

    setIsFormOpen(true);
  };

  const handleEdit = (session: Session) => {
    setEditingSession(session);

    setForm({
      amount: session.amount,
      date: session.date.slice(0, 16),
      isAttended: session.isAttended,
      familyId: session.familyId,
    });

    setIsFormOpen(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.familyId || !form.date) {
      return;
    }

    if (editingSession) {
      const updateData: UpdateSessionDto = {
        amount: form.amount,
        date: new Date(form.date).toISOString(),
        isAttended: form.isAttended,
        familyId: form.familyId,
      };

      updateMutation.mutate(
        {
          id: editingSession.id,
          data: updateData,
        },
        {
          onSuccess: resetForm,
        },
      );

      return;
    }

    createMutation.mutate(
      {
        ...form,
        date: new Date(form.date).toISOString(),
      },
      {
        onSuccess: resetForm,
      },
    );
  };

  const handleDelete = (session: Session) => {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa buổi dạy tại "${session.family.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    deleteMutation.mutate(session.id);
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 p-5">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Sessions</h2>

          <p className="mt-1 text-sm text-slate-500">Quản lý các buổi dạy</p>
        </div>

        <button
          type="button"
          onClick={handleCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          <Plus size={17} />
          Thêm buổi dạy
        </button>
      </div>

      {/* Error */}
      {isError && (
        <div className="m-5 rounded-lg bg-red-50 p-4 text-sm text-red-600">
          Không thể tải danh sách buổi dạy.
          <br />
          {error instanceof Error && error.message}
        </div>
      )}

      {/* Loading */}
      {isLoading ? (
        <div className="p-10 text-center text-sm text-slate-500">
          Đang tải...
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70">
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Gia đình
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Ngày dạy
                  </th>

                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Trạng thái
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Tiền
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {sessions.map((session) => (
                  <tr
                    key={session.id}
                    className="transition-colors hover:bg-slate-50"
                  >
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

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {formatDate(session.date)}
                    </td>

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

                    <td className="px-5 py-4 text-right text-sm font-medium text-slate-800">
                      {formatCurrency(session.amount)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          title="Chỉnh sửa"
                          onClick={() => handleEdit(session)}
                          className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          title="Xóa"
                          disabled={deleteMutation.isPending}
                          onClick={() => handleDelete(session)}
                          className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {sessions.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-12 text-center text-sm text-slate-500"
                    >
                      Chưa có buổi dạy nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
            <p className="text-sm text-slate-500">
              Tổng cộng{" "}
              <span className="font-medium text-slate-700">
                {metadata?.total ?? 0}
              </span>{" "}
              buổi
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Trước
              </button>

              <span className="text-sm text-slate-600">
                {metadata?.page ?? page} / {metadata?.totalPages ?? 1}
              </span>

              <button
                type="button"
                disabled={page >= (metadata?.totalPages ?? 1)}
                onClick={() => setPage((prev) => prev + 1)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Sau
              </button>
            </div>
          </div>
        </>
      )}

      {/* Form */}
      {isFormOpen && <SessionForm data={form} />}
    </section>
  );
};

export default SessionsDemo;
