import { api } from "@/lib/axios";
import { PaginatedResponse } from "@/types/pagination";

export interface Family {
  id: string;
  name: string;
  note: string | null;
  sessionRate: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface CreateFamilyDto {
  name: string;
  note?: string;
  sessionRate: number;
  userId?: string;
}

export interface UpdateFamilyDto {
  name?: string;
  note?: string;
  sessionRate?: number;
}

export const familyService = {
  async getList(page = 1, pageSize = 10): Promise<PaginatedResponse<Family>> {
    const response = await api.get<PaginatedResponse<Family>>("/families", {
      params: {
        page,
        pageSize,
      },
    });

    return response.data;
  },

  async getDetail(id: string): Promise<Family> {
    const response = await api.get<Family>(`/families/${id}`);

    return response.data;
  },

  async create(data: CreateFamilyDto): Promise<Family> {
    console.log(data)
    const response = await api.post<Family>("/families", data);

    return response.data;
  },

  async update(id: string, data: UpdateFamilyDto): Promise<Family> {
    const response = await api.patch<Family>(`/families/${id}`, data);

    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/families/${id}`);
  },
};
