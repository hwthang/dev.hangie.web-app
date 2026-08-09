"use client";

import { Pencil, Plus, Trash2, Users, X } from "lucide-react";
import { useState } from "react";

import {
  useCreateFamily,
  useDeleteFamily,
  useFamilies,
  useUpdateFamily,
} from "../use-families";

import type { CreateFamilyDto, Family } from "../family.service";
import { useAuth } from "@/features/auth/auth.provider";

type FormData = CreateFamilyDto;

const initialForm: FormData = {
  userId: "",
  name: "",
  note: "",
  sessionRate: 0,
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("vi-VN").format(value) + "đ";
};

const FamiliesDemo = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFamily, setEditingFamily] = useState<Family | null>(null);

  const [form, setForm] = useState<FormData>(initialForm);
  const { user } = useAuth();

  // =========================
  // Queries
  // =========================

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const {
    data: familiesResponse,
    isLoading,
    isError,
    error,
  } = useFamilies(page, pageSize);

  const families = familiesResponse?.data ?? [];
  const metadata = familiesResponse?.metadata;

  // =========================
  // Mutations
  // =========================

  const createMutation = useCreateFamily();
  const updateMutation = useUpdateFamily();
  const deleteMutation = useDeleteFamily();

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  // =========================
  // Form
  // =========================

  const handleOpenCreate = () => {
    setEditingFamily(null);
    setForm({ ...initialForm, userId: user?.id });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (family: Family) => {
    setEditingFamily(family);

    setForm({
      userId: user?.id,
      name: family.name,
      note: family.note ?? "",
      sessionRate: family.sessionRate,
    });

    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    if (isSubmitting) return;

    setIsFormOpen(false);
    setEditingFamily(null);
    setForm(initialForm);
  };

  const handleChange = (field: keyof FormData, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name.trim()) {
      return;
    }

    if (form.sessionRate <= 0) {
      return;
    }

    // =========================
    // Create
    // =========================

    if (!editingFamily) {
      createMutation.mutate(form, {
        onSuccess: () => {
          handleCloseForm();
        },
      });

      return;
    }

    // =========================
    // Update
    // =========================

    updateMutation.mutate(
      {
        id: editingFamily.id,
        data: form,
      },
      {
        onSuccess: () => {
          handleCloseForm();
        },
      },
    );
  };

  // =========================
  // Delete
  // =========================

  const handleDelete = (family: Family) => {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa "${family.name}" không?`,
    );

    if (!confirmed) {
      return;
    }

    deleteMutation.mutate(family.id);
  };

  // =========================
  // Loading
  // =========================

  if (isLoading) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-center px-5 py-16">
          <p className="text-sm text-slate-500">
            Đang tải danh sách gia đình...
          </p>
        </div>
      </section>
    );
  }

  // =========================
  // Error
  // =========================

  if (isError) {
    return (
      <section className="rounded-xl border border-red-200 bg-white">
        <div className="px-5 py-16 text-center">
          <p className="font-medium text-red-600">
            Không thể tải danh sách gia đình.
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {error instanceof Error ? error.message : "Đã xảy ra lỗi."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* =========================
          Table
      ========================= */}

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Users size={19} />
              </div>

              <h2 className="font-semibold text-slate-900">
                Danh sách gia đình
              </h2>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Quản lý các gia đình và đơn giá mỗi buổi dạy.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <Plus size={17} />
            Thêm gia đình
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Gia đình
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Ghi chú
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Đơn giá/buổi
                </th>

                <th className="w-28 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Thao tác
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {families?.map((family) => (
                <tr
                  key={family.id}
                  className="transition-colors hover:bg-slate-50"
                >
                  {/* Name */}
                  <td className="px-5 py-4">
                    <span className="font-medium text-slate-800">
                      {family.name}
                    </span>
                  </td>

                  {/* Note */}
                  <td className="max-w-xs px-5 py-4">
                    <span className="block truncate text-sm text-slate-500">
                      {family.note || "—"}
                    </span>
                  </td>

                  {/* Session rate */}
                  <td className="px-5 py-4 text-right text-sm font-medium text-slate-800">
                    {formatCurrency(family.sessionRate)}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(family)}
                        disabled={deleteMutation.isPending}
                        title="Chỉnh sửa"
                        className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(family)}
                        disabled={deleteMutation.isPending}
                        title="Xóa"
                        className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {/* Empty */}
              {families.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-16 text-center">
                    <Users size={32} className="mx-auto text-slate-300" />

                    <p className="mt-3 text-sm font-medium text-slate-600">
                      Chưa có gia đình
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Hãy thêm gia đình đầu tiên.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================
          Modal
      ========================= */}

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <button
            type="button"
            aria-label="Đóng"
            onClick={handleCloseForm}
            className="absolute inset-0 cursor-default bg-slate-900/30 backdrop-blur-[2px]"
          />

          {/* Modal */}
          <div className="relative w-full max-w-md rounded-xl border border-slate-200 bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h3 className="font-semibold text-slate-900">
                  {editingFamily ? "Chỉnh sửa gia đình" : "Thêm gia đình"}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {editingFamily
                    ? "Cập nhật thông tin gia đình."
                    : "Nhập thông tin gia đình mới."}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseForm}
                disabled={isSubmitting}
                className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 p-5">
              {/* Name */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Tên gia đình
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="VD: Gia đình Nguyễn Văn A"
                  disabled={isSubmitting}
                  className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
                />
              </div>

              {/* Note */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Ghi chú
                </label>

                <textarea
                  value={form.note ?? ""}
                  onChange={(e) => handleChange("note", e.target.value)}
                  placeholder="VD: Học lớp 10..."
                  rows={3}
                  disabled={isSubmitting}
                  className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
                />
              </div>

              {/* Session rate */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Đơn giá mỗi buổi
                </label>

                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    value={form.sessionRate || ""}
                    onChange={(e) =>
                      handleChange("sessionRate", Number(e.target.value))
                    }
                    placeholder="200000"
                    disabled={isSubmitting}
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 pr-10 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
                  />

                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    đ
                  </span>
                </div>
              </div>

              {/* Mutation error */}
              {(createMutation.isError || updateMutation.isError) && (
                <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                  {(createMutation.error ?? updateMutation.error) instanceof
                  Error
                    ? (createMutation.error ?? updateMutation.error)?.message
                    : "Không thể lưu gia đình."}
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  disabled={isSubmitting}
                  className="h-10 rounded-lg px-4 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-50"
                >
                  Hủy
                </button>

                <button
                  type="submit"
                  disabled={
                    isSubmitting || !form.name.trim() || form.sessionRate <= 0
                  }
                  className="h-10 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting
                    ? "Đang lưu..."
                    : editingFamily
                      ? "Lưu thay đổi"
                      : "Thêm gia đình"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between border-t border-slate-200 px-5 py-3">
        <p className="text-sm text-slate-500">
          Hiển thị{" "}
          <span className="font-medium text-slate-700">{families.length}</span>{" "}
          / {metadata?.total ?? 0} gia đình
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-40"
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
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-40"
          >
            Sau
          </button>
        </div>
      </div>
    </>
  );
};

export default FamiliesDemo;
