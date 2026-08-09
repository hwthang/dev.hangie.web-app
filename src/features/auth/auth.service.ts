import { api } from "@/lib/axios";

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    username: string;
    email: string;
    phone: string;
  };
}

export const authService = {
  async login(dto: LoginDto): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>("/auth/login", dto);

    return data;
  },
};
