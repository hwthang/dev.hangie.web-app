"use client";


import { Session } from "@/features/session/session.types";
import SessionItem from "./SessionItem";

export type SessionMetadata = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

type Props = {
  sessions: Session[];
  metadata?: SessionMetadata;

  page: number;
  onPageChange: (page: number) => void;

  onEdit: (session: Session) => void;
  onDelete: (session: Session) => void;

  isLoading?: boolean;
  isDeleting?: boolean;
};

const SessionTable = ({
  sessions,
  metadata,
  page,
  onPageChange,
  onEdit,
  onDelete,
  isLoading = false,
  isDeleting = false,
}: Props) => {
  /**
   * Pagination
   */
  const currentPage = metadata?.page ?? page;
  const totalPages = Math.max(
    metadata?.totalPages ?? 1,
    1,
  );
  const total = metadata?.total ?? 0;

  const canGoPrevious = currentPage > 1;
  const canGoNext =
    currentPage < totalPages;

  const handlePrevious = () => {
    if (!canGoPrevious || isLoading) return;

    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (!canGoNext || isLoading) return;

    onPageChange(currentPage + 1);
  };

  /**
   * Loading
   */
  if (isLoading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <p className="text-sm text-slate-500">
          Đang tải danh sách buổi dạy...
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70">
              <th
                scope="col"
                className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Gia đình
              </th>

              <th
                scope="col"
                className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Ngày dạy
              </th>

              <th
                scope="col"
                className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Trạng thái
              </th>

              <th
                scope="col"
                className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Tiền
              </th>

              <th
                scope="col"
                className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {sessions.length > 0 ? (
              sessions.map((session) => (
                <SessionItem
                  key={session.id}
                  session={session}
                  isDeleting={isDeleting}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-16 text-center"
                >
                  <div className="flex flex-col items-center">
                    <p className="text-sm font-medium text-slate-700">
                      Chưa có buổi dạy
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Danh sách buổi dạy hiện đang
                      trống.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Total */}
        <p className="text-sm text-slate-500">
          Tổng cộng{" "}
          <span className="font-medium text-slate-700">
            {total}
          </span>{" "}
          buổi
        </p>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Trang trước"
            disabled={
              !canGoPrevious || isLoading
            }
            onClick={handlePrevious}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Trước
          </button>

          <span className="min-w-20 text-center text-sm text-slate-600">
            Trang{" "}
            <span className="font-medium text-slate-800">
              {currentPage}
            </span>{" "}
            / {totalPages}
          </span>

          <button
            type="button"
            aria-label="Trang sau"
            disabled={
              !canGoNext || isLoading
            }
            onClick={handleNext}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionTable;

