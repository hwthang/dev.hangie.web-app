import { api } from "@/lib/axios";
import { PaginatedResponse } from "@/types/pagination";
import { Session } from "inspector/promises";
import {
  CreateSessionDto,
  SessionResponse,
  UpdateSessionDto,
} from "./session.types";

export const sessionService = {
  async getList(page: number, pageSize: number): Promise<SessionResponse> {
    const response = await api.get(
      `/sessions?page=${page}&pageSize=${pageSize}`,
    );

    return response.data;
  },

  async getDetail(id: string): Promise<Session> {
    const response = await api.get<Session>(`/sessions/${id}`);

    return response.data;
  },

  async create(data: CreateSessionDto): Promise<Session> {
    const response = await api.post<Session>("/sessions", data);

    return response.data;
  },

  async update(id: string, data: UpdateSessionDto): Promise<Session> {
    const response = await api.patch<Session>(`/sessions/${id}`, data);

    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/sessions/${id}`);
  },
};
