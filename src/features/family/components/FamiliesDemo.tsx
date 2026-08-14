"use client";

import {
  ChevronLeft,
  ChevronRight,
  Pencil,
  Plus,
  Trash2,
  Users,
  Wallet,
  X,
  FileText,
} from "lucide-react";
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
  // Pagination
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

  const isSubmitting =
    createMutation.isPending || updateMutation.isPending;

  // =========================
  // Form
  // =========================

  const handleOpenCreate = () => {
    setEditingFamily(null);

    setForm({
      ...initialForm,
      userId: user?.id ?? "",
    });

    setIsFormOpen(true);
  };

  const handleOpenEdit = (family: Family) => {
    setEditingFamily(family);

    setForm({
      userId: user?.id ?? "",
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

  const handleChange = (
    field: keyof FormData,
    value: string | number,
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!form.name.trim()) return;

    if (form.sessionRate <= 0) return;

    if (!editingFamily) {
      createMutation.mutate(form, {
        onSuccess: handleCloseForm,
      });

      return;
    }

    updateMutation.mutate(
      {
        id: editingFamily.id,
        data: form,
      },
      {
        onSuccess: handleCloseForm,
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

    if (!confirmed) return;

    deleteMutation.mutate(family.id);
  };

  // =========================
  // Loading
  // =========================

  if (isLoading) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

            <p className="mt-4 text-sm text-slate-500">
              Đang tải danh sách...
            </p>
          </div>
        </div>
      </section>
    );
  }

  // =========================
  // Error
  // =========================

  if (isError) {
    return (
      <section className="rounded-2xl border border-red-100 bg-white">
        <div className="px-6 py-20 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
            <X className="text-red-500" size={22} />
          </div>

          <p className="mt-4 font-semibold text-slate-900">
            Không thể tải danh sách
          </p>

          <p className="mt-2 text-sm text-slate-500">
            {error instanceof Error
              ? error.message
              : "Đã xảy ra lỗi. Vui lòng thử lại."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* =========================
            Header
        ========================= */}

        <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-4 py-4 sm:px-6 sm:py-5">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Users size={20} />
              </div>

              <div className="min-w-0">
                <h2 className="truncate font-semibold text-slate-900">
                  Gia đình
                </h2>

                <p className="hidden text-sm text-slate-500 sm:block">
                  Quản lý gia đình và đơn giá mỗi buổi dạy.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleOpenCreate}
            title="Thêm gia đình"
            className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 hover:shadow active:scale-[0.98] sm:px-4"
          >
            <Plus size={18} />

            <span className="hidden sm:inline">
              Thêm gia đình
            </span>
          </button>
        </div>

        {/* =========================
            Desktop Table
        ========================= */}

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Gia đình
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Ghi chú
                </th>

                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Đơn giá
                </th>

                <th className="w-28 px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Thao tác
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {families.map((family) => (
                <tr
                  key={family.id}
                  className="group transition hover:bg-slate-50/80"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-xs font-semibold text-slate-500">
                        {family.name.charAt(0).toUpperCase()}
                      </div>

                      <span className="font-medium text-slate-800">
                        {family.name}
                      </span>
                    </div>
                  </td>

                  <td className="max-w-xs px-6 py-4">
                    <span className="block truncate text-sm text-slate-500">
                      {family.note || "Không có ghi chú"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <span className="font-medium text-slate-800">
                      {formatCurrency(family.sessionRate)}
                    </span>

                    <p className="mt-0.5 text-xs text-slate-400">
                      mỗi buổi
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(family)}
                        title="Chỉnh sửa"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(family)}
                        disabled={deleteMutation.isPending}
                        title="Xóa"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* =========================
            Mobile Cards
        ========================= */}

        <div className="divide-y divide-slate-100 md:hidden">
          {families.map((family) => (
            <article
              key={family.id}
              className="p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-semibold text-blue-600">
                    {family.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-slate-800">
                      {family.name}
                    </h3>

                    {family.note && (
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                        {family.note}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex shrink-0 items-center">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(family)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600"
                    title="Chỉnh sửa"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(family)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
                    title="Xóa"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3">
                <Wallet size={15} className="text-slate-400" />

                <span className="text-xs text-slate-500">
                  Đơn giá
                </span>

                <span className="ml-auto text-sm font-semibold text-slate-800">
                  {formatCurrency(family.sessionRate)}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* =========================
            Empty
        ========================= */}

        {families.length === 0 && (
          <div className="px-6 py-20 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <Users size={26} />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-slate-800">
              Chưa có gia đình nào
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Bắt đầu bằng cách thêm gia đình đầu tiên.
            </p>

            <button
              type="button"
              onClick={handleOpenCreate}
              className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <Plus size={17} />
              Thêm gia đình
            </button>
          </div>
        )}

        {/* =========================
            Pagination
        ========================= */}

        {families.length > 0 && (
          <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 sm:px-6">
            <p className="text-xs text-slate-500 sm:text-sm">
              <span className="hidden sm:inline">
                Hiển thị{" "}
              </span>

              <span className="font-medium text-slate-700">
                {families.length}
              </span>

              <span className="hidden sm:inline">
                {" "}
                / {metadata?.total ?? 0} gia đình
              </span>
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() =>
                  setPage((prev) => Math.max(prev - 1, 1))
                }
                title="Trang trước"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={18} />
              </button>

              <span className="min-w-12 text-center text-xs font-medium text-slate-600 sm:text-sm">
                {metadata?.page ?? page} /{" "}
                {metadata?.totalPages ?? 1}
              </span>

              <button
                type="button"
                disabled={
                  page >= (metadata?.totalPages ?? 1)
                }
                onClick={() => setPage((prev) => prev + 1)}
                title="Trang sau"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* =========================
          Modal
      ========================= */}

{isFormOpen && (
  <div className="fixed inset-0 z-50 overflow-y-auto">
    {/* Overlay */}
    <button
      type="button"
      aria-label="Đóng"
      onClick={handleCloseForm}
      className="fixed inset-0 cursor-default bg-slate-900/30 backdrop-blur-[2px]"
    />

    {/* Modal container */}
    <div className="relative flex min-h-full items-center justify-center p-4 sm:p-6">
      {/* Modal */}
      <div className="relative my-auto w-full max-w-md rounded-xl border border-slate-200 bg-white shadow-xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h3 className="font-semibold text-slate-900">
              {editingFamily
                ? "Chỉnh sửa gia đình"
                : "Thêm gia đình"}
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
            aria-label="Đóng"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
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
              onChange={(e) =>
                handleChange("name", e.target.value)
              }
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
              onChange={(e) =>
                handleChange("note", e.target.value)
              }
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
                  handleChange(
                    "sessionRate",
                    Number(e.target.value),
                  )
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

          {/* Error */}
          {(createMutation.isError || updateMutation.isError) && (
            <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {(createMutation.error ??
                updateMutation.error) instanceof Error
                ? (
                    createMutation.error ??
                    updateMutation.error
                  )?.message
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
                isSubmitting ||
                !form.name.trim() ||
                form.sessionRate <= 0
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
  </div>
)}
    </>
  );
};

export default FamiliesDemo;