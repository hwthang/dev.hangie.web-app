"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, User, KeyRound, LogOut } from "lucide-react";
import { useAuth } from "@/features/auth/auth.provider";

const Header = () => {
  const [open, setOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { user } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      {/* Logo */}
      <div className="text-xl font-bold text-slate-900">Hangie</div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Notification
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          title="Thông báo"
        >
          <Bell size={20} strokeWidth={2} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button> */}

        {/* User menu */}
        <div ref={userMenuRef} className="relative">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-slate-100"
          >
            {/* Avatar */}
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-sm font-semibold text-slate-600">
              DH
            </div>

            {/* Name */}
            <span className="text-sm font-medium text-slate-700">
              {user?.username}
            </span>

            <ChevronDown
              size={16}
              className={`text-slate-400 transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <User size={18} strokeWidth={2} />
                <span>Thông tin cá nhân</span>
              </button>

              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <KeyRound size={18} strokeWidth={2} />
                <span>Đổi mật khẩu</span>
              </button>

              <div className="my-1 border-t border-slate-100" />

              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={18} strokeWidth={2} />
                <span>Đăng xuất</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
