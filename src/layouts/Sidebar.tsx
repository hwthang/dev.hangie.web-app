"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Menu,
  ChevronLeft,
  Calendar,
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
  // {
  //   label: "Cài đặt",
  //   href: "/console/settings",
  //   icon: Settings,
  // },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("hangieUser");
    router.replace("/");
  };

  return (
    <aside
      className={`flex sticky top-0 h-screen flex-col overflow-hidden border-r border-slate-200 bg-white transition-[width] duration-300 ease-in-out ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex h-16 shrink-0 items-center border-b border-slate-200">
        <div
          className={`flex w-full items-center transition-all duration-300 ${
            collapsed ? "justify-center" : "justify-between px-4"
          }`}
        >
          {/* Toggle */}
          <button
            type="button"
            onClick={() => setCollapsed((prev) => !prev)}
            title={collapsed ? "Mở rộng" : "Thu gọn"}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 active:scale-95"
          >
            <span
              className={`transition-transform duration-300 ease-in-out ${
                collapsed ? "rotate-180" : "rotate-0"
              }`}
            >
              <ChevronLeft size={20} strokeWidth={2} />
            </span>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.href === "/console"
                ? pathname === "/console"
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={`group flex h-11 w-full items-center rounded-lg transition-all duration-200 ${
                    collapsed ? "justify-center" : "justify-start gap-3 px-3"
                  } ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {/* Icon */}
                  <Icon
                    size={21}
                    strokeWidth={2}
                    className="shrink-0 transition-transform duration-200 group-hover:scale-105"
                  />

                  {/* Label */}
                  <span
                    className={`overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-800 ${
                      collapsed
                        ? "w-0 translate-x-[-8px] opacity-0"
                        : "w-auto translate-x-0 opacity-100"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="shrink-0 border-t border-slate-200 p-2">
        <button
          onClick={handleLogout}
          type="button"
          title={collapsed ? "Đăng xuất" : undefined}
          className={`group flex h-11 w-full items-center rounded-lg text-sm font-medium text-slate-500 transition-all duration-200 hover:bg-red-50 hover:text-red-600 active:scale-[0.98] ${
            collapsed ? "justify-center" : "justify-start gap-3 px-3"
          }`}
        >
          <LogOut
            size={21}
            strokeWidth={2}
            className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
          />

          <span
            className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
              collapsed
                ? "w-0 translate-x-[-8px] opacity-0"
                : "w-auto translate-x-0 opacity-100"
            }`}
          >
            Đăng xuất
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
