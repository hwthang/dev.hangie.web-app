"use client";

import React, { ReactNode, useContext, useEffect, useState } from "react";
import { AuthContext, User } from "./auth.context";
import { useRouter } from "next/navigation";

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      router.replace("/");
      return;
    }

    const hangieUser = localStorage.getItem("hangieUser");
    if (!hangieUser) return;

    const currentUser = JSON.parse(hangieUser);
    console.log(currentUser)
    setUser(currentUser);
  }, [router]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};

export default AuthProvider;
