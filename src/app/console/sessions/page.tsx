"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";

import Modal from "@/shared/components/Modal";
import SessionForm from "@/features/session/components/SessionForm";
import { Session } from "@/features/session/session.types";
import { useSessions } from "@/features/session/hooks/use-sessions";
import { useDeleteSession } from "@/features/session/hooks/use-delete-session";
import SessionTable from "./components/SessionTable";

const Sessions = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  /**
   * Modal state
   */
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  /**
   * null  -> Create
   * Session -> Update
   */
  const [editingSession, setEditingSession] =
    useState<Session | null>(null);

  /**
   * Get sessions
   */
  const {
    data,
    isLoading,
    isError,
    error,
  } = useSessions(page, pageSize);

  /**
   * Delete mutation
   */
  const deleteMutation =
    useDeleteSession();

  const sessions = data?.data ?? [];
  const metadata = data?.metadata;

  /**
   * =========================
   * Modal
   * =========================
   */

  const handleCreate = () => {
    setEditingSession(null);
    setIsModalOpen(true);
  };

  const handleEdit = (session: Session) => {
    setEditingSession(session);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSession(null);
  };

  /**
   * Create / Update success
   */
  const handleFormSuccess = () => {
    handleCloseModal();
  };

  /**
   * =========================
   * Delete
   * =========================
   */

  const handleDelete = (session: Session) => {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa buổi dạy tại "${session.family.name}"?`,
    );

    if (!confirmed) return;

    deleteMutation.mutate(session.id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Buổi dạy
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Quản lý các buổi dạy của bạn
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          <Plus size={18} />

          Thêm buổi dạy
        </button>
      </div>

      {/* Error */}
      {isError && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
          Không thể tải danh sách buổi dạy.

          {error instanceof Error && (
            <p className="mt-1">
              {error.message}
            </p>
          )}
        </div>
      )}

      {/* Table */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {isLoading ? (
          <div className="p-10 text-center text-sm text-slate-500">
            Đang tải danh sách...
          </div>
        ) : (
          <SessionTable
            sessions={sessions}
            metadata={metadata}
            page={page}
            onPageChange={setPage}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isDeleting={
              deleteMutation.isPending
            }
          />
        )}
      </section>

      {/* Create / Update Modal */}
      <Modal
        open={isModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseModal();
          }
        }}
        title={
          editingSession
            ? "Chỉnh sửa buổi dạy"
            : "Thêm buổi dạy"
        }
      >
        <SessionForm
          data={
            editingSession ?? undefined
          }
          onSuccess={handleFormSuccess}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default Sessions;
