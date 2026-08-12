"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  LogOut,
  Menu,
  Calendar,
  X,
} from "lucide-react";

type NavigationItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

const navigationItems: NavigationItem[] = [
  {
    label: "Tổng quan",
    href: "/console/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Gia đình",
    href: "/console/families",
    icon: Users,
  },
  {
    label: "Buổi học",
    href: "/console/sessions",
    icon: Calendar,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  // Đóng menu khi chuyển trang
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Khóa scroll khi menu mở
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ESC để đóng
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("hangieUser");

    setOpen(false);
    router.replace("/");
  };

  return (
    <>
      {/* =========================================
          MENU BUTTON
      ========================================= */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Mở menu"
          className="
            fixed
            left-4
            top-8
            z-[60]
            flex
            h-10
            w-10
            -translate-y-1/2
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            text-slate-500
            shadow-sm
            transition-all
            duration-200
            hover:border-blue-200
            hover:bg-blue-50
            hover:text-blue-600
            hover:shadow-md
            active:scale-95
          "
        >
          <Menu size={20} strokeWidth={2} />
        </button>
      )}

      {/* =========================================
          OVERLAY
      ========================================= */}
      <div
        onClick={() => setOpen(false)}
        className={`
          fixed
          inset-0
          z-40
          bg-slate-900/20
          backdrop-blur-[3px]
          transition-all
          duration-300
          ${
            open
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* =========================================
          SIDEBAR
      ========================================= */}
      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          w-72
          flex-col
          border-r
          border-slate-200
          bg-white
          shadow-2xl
          transition-transform
          duration-300
          ease-out
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Header sidebar */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-sm shadow-blue-600/20">
              H
            </div>

            <div>
              <p className="text-sm font-bold tracking-tight text-slate-900">
                Hangie
              </p>

              <p className="text-[11px] text-slate-400">
                Teaching Manager
              </p>
            </div>
          </div>

          {/* Close */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Đóng menu"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
              active:scale-95
            "
          >
            <X size={19} strokeWidth={2} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5">
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
            Điều hướng
          </p>

          <ul className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`
                      group
                      flex
                      h-11
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      text-sm
                      font-medium
                      transition-all
                      duration-200
                      ${
                        isActive
                          ? "bg-blue-50 text-blue-600"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      }
                    `}
                  >
                    <span
                      className={`
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        transition
                        ${
                          isActive
                            ? "bg-blue-100 text-blue-600"
                            : "text-slate-400 group-hover:text-slate-700"
                        }
                      `}
                    >
                      <Icon
                        size={18}
                        strokeWidth={2}
                      />
                    </span>

                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-100 p-3">
          <button
            type="button"
            onClick={handleLogout}
            className="
              group
              flex
              h-11
              w-full
              items-center
              gap-3
              rounded-xl
              px-3
              text-sm
              font-medium
              text-slate-500
              transition-all
              hover:bg-red-50
              hover:text-red-600
              active:scale-[0.98]
            "
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg">
              <LogOut
                size={18}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>

            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;