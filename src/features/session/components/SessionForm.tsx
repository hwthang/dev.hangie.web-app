"use client";

import { Family } from "@/features/family/family.service";
import { useFamilies } from "@/features/family/use-families";
import React, { FormEvent, useEffect, useState } from "react";
import { useCreateSession } from "../hooks/use-create-session";
import { useUpdateSession } from "../hooks/use-update-session";

interface SessionFormData {
  id?: string;
  amount?: number;
  date?: string;
  isAttended?: boolean;
  familyId?: string;
}

interface Props {
  data?: SessionFormData;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface FormState {
  amount: number;
  date: string;
  isAttended: boolean;
  familyId: string;
}

const SessionForm = ({ data, onSuccess, onCancel }: Props) => {
  const {
    data: familiesResponse,
    isLoading: isLoadingFamilies,
    isError: isFamiliesError,
  } = useFamilies(1, 100);

  const createSession = useCreateSession();
  const updateSession = useUpdateSession();

  const families =
    familiesResponse?.data.map((item: Family) => ({
      id: item.id,
      name: item.name,
      sessionRate: item.sessionRate,
    })) ?? [];

  const [form, setForm] = useState<FormState>({
    amount: data?.amount ?? 0,
    date: data?.date ? formatDateTimeLocal(data.date) : "",
    isAttended: data?.isAttended ?? true,
    familyId: data?.familyId ?? "",
  });

  /*
   * Có familyId => Update
   * Không có familyId => Create
   */
  const isEdit = Boolean(data?.familyId);

  useEffect(() => {
    setForm({
      amount: data?.amount ?? 0,
      date: data?.date ? formatDateTimeLocal(data.date) : "",
      isAttended: data?.isAttended ?? false,
      familyId: data?.familyId ?? "",
    });
  }, [data]);

  const handleFamilyChange = (familyId: string) => {
    const family = families.find((item) => item.id === familyId);

    setForm((prev) => ({
      ...prev,
      familyId,
      amount: family?.sessionRate ?? prev.amount,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.familyId || !form.date) {
      return;
    }

    const payload = {
      amount: form.amount,
      date: new Date(form.date).toISOString(),
      isAttended: form.isAttended,
      familyId: form.familyId,
    };

    /*
     * UPDATE
     */
    if (isEdit && data?.id) {
      updateSession.mutate(
        {
          id: data.id,
          data: payload,
        },
        {
          onSuccess: () => {
            onSuccess?.();
          },
        },
      );

      return;
    }

    /*
     * CREATE
     */
    createSession.mutate(payload, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  };

  const isSubmitting = createSession.isPending || updateSession.isPending;

  if (isLoadingFamilies) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <p className="text-sm text-slate-500">Đang tải danh sách gia đình...</p>
      </div>
    );
  }

  if (isFamiliesError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <p className="text-sm text-red-600">
          Không thể tải danh sách gia đình.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-xl bg-white">
      {/* Header
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          {isEdit ? "Chỉnh sửa buổi dạy" : "Thêm buổi dạy"}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {isEdit
            ? "Cập nhật thông tin buổi dạy"
            : "Nhập thông tin buổi dạy mới"}
        </p>
      </div> */}

      {/* Family */}
      <div>
        <label
          htmlFor="family"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Gia đình
        </label>

        <select
          id="family"
          value={form.familyId}
          onChange={(event) => handleFamilyChange(event.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          required
        >
          <option value="">Chọn gia đình</option>

          {families.map((family) => (
            <option key={family.id} value={family.id}>
              {family.name}
            </option>
          ))}
        </select>
      </div>

      {/* Date */}
      <div>
        <label
          htmlFor="date"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Ngày và giờ
        </label>

        <input
          id="date"
          type="datetime-local"
          value={form.date}
          onChange={(event) =>
            setForm((prev) => ({
              ...prev,
              date: event.target.value,
            }))
          }
          required
          className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Amount */}
      <div>
        <label
          htmlFor="amount"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Tiền buổi dạy
        </label>

        <div className="relative">
          <input
            id="amount"
            type="number"
            min={0}
            value={form.amount}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                amount: Number(event.target.value),
              }))
            }
            required
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 pr-8 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
            đ
          </span>
        </div>
      </div>

      {/* Status */}
    
        <div>
          <p className="mb-2 text-sm font-medium text-slate-700">Trạng thái</p>

          <div className="grid grid-cols-2 gap-3">
            <label
              className={`cursor-pointer rounded-lg border px-4 py-3 text-center text-sm transition ${
                form.isAttended
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 text-slate-500 hover:bg-slate-50"
              }`}
            >
              <input
                type="radio"
                name="status"
                checked={form.isAttended}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    isAttended: true,
                  }))
                }
                className="sr-only"
              />
              Đã dạy
            </label>

            <label
              className={`cursor-pointer rounded-lg border px-4 py-3 text-center text-sm transition ${
                !form.isAttended
                  ? "border-red-500 bg-red-50 text-red-700"
                  : "border-slate-200 text-slate-500 hover:bg-slate-50"
              }`}
            >
              <input
                type="radio"
                name="status"
                checked={!form.isAttended}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    isAttended: false,
                  }))
                }
                className="sr-only"
              />
              Chưa dạy
            </label>
          </div>
        </div>
      

      {/* Error */}
      {(createSession.isError || updateSession.isError) && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          Không thể lưu buổi dạy. Vui lòng thử lại.
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            Hủy
          </button>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? "Đang lưu..."
            : isEdit
              ? "Lưu thay đổi"
              : "Thêm buổi dạy"}
        </button>
      </div>
    </form>
  );
};

const formatDateTimeLocal = (value: string) => {
  const date = new Date(value);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export default SessionForm;
