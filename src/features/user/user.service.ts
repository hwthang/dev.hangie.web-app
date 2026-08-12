import { api } from "@/lib/axios";

export interface User {
  id: string;
  name: string;
}

export interface CreateUserDto {
  username: string;
  phone: string;
  email: string;
  password: string;
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

  createUser: async (body: CreateUserDto) => {
    const { data } = await api.post<User>("/users", body);
    return data;
  },
};
