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
      return;
    }
  }, [router]);
  return (
    <div className="relative flex min-h-screen bg-slate-50">
      <Sidebar />
      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default ConsoleLayout;
