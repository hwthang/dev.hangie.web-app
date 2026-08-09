"use client";

import { createContext } from "react";

export interface User {
  id?: string;
  avatar: string;
  fullName: string;
}
export interface AuthContextType {
  user: User | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);
