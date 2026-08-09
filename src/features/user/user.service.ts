import { api } from "@/lib/axios";

export interface User {
  id: string;
  name: string;
}

export const userService = {
  getUsers: async () => {
    const { data } = await api.get<User[]>("/users");
    return data;
  },

  getUser: async (id: string) => {
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
  },

  createUser: async (body: { name: string }) => {
    const { data } = await api.post<User>("/users", body);
    return data;
  },
};