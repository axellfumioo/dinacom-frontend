"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Scan,
  Sparkles,
  CalendarDays,
  MessageCircle,
  Infinity,
  Activity,
  BarChart3,
  X,
  Menu,
} from "lucide-react";

type SidebarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  collapsed: boolean;
  onCollapseChange: (collapsed: boolean) => void;
};

const menuItems = [
  { label: "Dashboard", icon: Home, path: "/dashboard" },
  { label: "Scan Makan", icon: Scan, path: "/scan" },
  { label: "Health Assistant", icon: Sparkles, path: "/assistant" },
  { label: "Riwayat Harian", icon: CalendarDays, path: "/riwayat" },
  { label: "Konsultasi", icon: MessageCircle, path: "/konsultasi" },
  { label: "Parental Mode", icon: Infinity, path: "/parental" },
  { label: "Strava", icon: Activity, path: "/strava" },
  { label: "Weekly Report", icon: BarChart3, path: "/weekly-report" },
];

export default function Sidebar({
  open,
  setOpen,
  collapsed,
  onCollapseChange,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* ================= OPEN SIDEBAR BUTTON ================= */}
      {collapsed && (
        <button
          onClick={() => onCollapseChange(false)}
          className="
            fixed top-4 left-4 z-40
            hidden lg:flex
            items-center justify-center
            w-10 h-10
            rounded-md
            bg-white border shadow
            hover:bg-gray-100
          "
          aria-label="Open Sidebar"
        >
          <Menu size={20} />
        </button>
      )}

      {/* ================= MOBILE OVERLAY ================= */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed z-50 inset-y-0 left-0 bg-white border-r
          transition-all duration-300
          ${collapsed ? "w-0" : "w-64"}
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* ================= HEADER ================= */}
        {!collapsed && (
          <div className="h-16 flex items-center justify-between px-6 border-b">
            <h1 className="text-xl font-bold">NutriOne</h1>

            {/* Close Sidebar */}
            <button
              onClick={() => onCollapseChange(true)}
              className="hidden lg:flex p-2 rounded-md hover:bg-gray-100"
              aria-label="Close Sidebar"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {/* ================= MENU ================= */}
        {!collapsed && (
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.path;

              return (
                <Link
                  key={item.label}
                  href={item.path}
                  onClick={() => setOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-md
                    text-sm font-medium transition
                    ${
                      active
                        ? "bg-yellow-100 text-yellow-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <Icon size={18} />
                  <span className="whitespace-nowrap">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        )}
      </aside>
    </>
  );
}
