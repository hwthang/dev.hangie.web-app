"use client";

import Header from "@/layouts/Header";
import Sidebar from "@/layouts/Sidebar";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const ConsoleLayout = ({ children }: Props) => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      router.replace("/");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Floating menu */}
      <Sidebar />

      {/* Main */}
      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ConsoleLayout;