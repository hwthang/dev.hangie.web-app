"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, User, KeyRound, LogOut } from "lucide-react";
import { useAuth } from "@/features/auth/auth.provider";
import { useRouter } from "next/navigation";

const Header = () => {
  const [open, setOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);

  const { user } = useAuth();

  const router = useRouter();

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

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("hangieUser");

    router.replace("/");
  };

  const username = user?.username ?? "Người dùng";

  const initials = username.slice(0, 2).toUpperCase();

  return (
    <header
      className="
        sticky
        top-0
        z-30
        flex
        h-16
        shrink-0
        items-center
        justify-between
        border-b
        border-slate-200
        bg-white/95
        px-5
        pl-20
        backdrop-blur
        sm:px-6
        sm:pl-20
      "
    >
      {/* =====================================
          BRAND
      ===================================== */}
      <div className="flex items-center gap-3">
        <div
          className="
            hidden
            h-8
            w-px
            bg-slate-200
            sm:block
          "
        />

        <div>
          <h1 className="text-base font-bold tracking-tight text-slate-900">
            Hangie
          </h1>

          <p className="hidden text-[11px] text-slate-400 sm:block">
            Teaching Manager
          </p>
        </div>
      </div>

      {/* =====================================
          USER
      ===================================== */}
      <div ref={userMenuRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            p-1.5
            transition-all
            duration-200
            hover:bg-slate-50
            active:scale-[0.98]
          "
        >
          {/* Avatar */}
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-blue-50
              text-xs
              font-bold
              text-blue-600
              ring-1
              ring-blue-100
            "
          >
            {initials}
          </div>

          {/* User info */}
          <div className="hidden text-left sm:block">
            <p className="max-w-32 truncate text-sm font-semibold text-slate-700">
              {username}
            </p>

            <p className="text-[11px] text-slate-400">Tài khoản</p>
          </div>

          <ChevronDown
            size={16}
            strokeWidth={2}
            className={`
              text-slate-400
              transition-transform
              duration-200
              ${open ? "rotate-180" : ""}
            `}
          />
        </button>

        {/* =====================================
            DROPDOWN
        ===================================== */}
        {open && (
          <div
            className="
              absolute
              right-0
              top-full
              z-50
              mt-2
              w-60
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-1.5
              shadow-xl
              shadow-slate-200/70
            "
          >
            {/* User info */}
            <div className="mb-1 flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                {initials}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {username}
                </p>
              </div>
            </div>

            {/* Profile */}
            <button
              type="button"
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-3
                py-2.5
                text-sm
                text-slate-600
                transition
                hover:bg-slate-50
                hover:text-slate-900
              "
            >
              <User size={18} strokeWidth={2} />

              <span>Thông tin cá nhân</span>
            </button>

            {/* Password */}
            <button
              type="button"
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-3
                py-2.5
                text-sm
                text-slate-600
                transition
                hover:bg-slate-50
                hover:text-slate-900
              "
            >
              <KeyRound size={18} strokeWidth={2} />

              <span>Đổi mật khẩu</span>
            </button>

            <div className="my-1 border-t border-slate-100" />

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-3
                py-2.5
                text-sm
                text-red-600
                transition
                hover:bg-red-50
              "
            >
              <LogOut size={18} strokeWidth={2} />

              <span>Đăng xuất</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
