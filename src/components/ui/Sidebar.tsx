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

  // ================= DESKTOP STATE =================
  const desktopHidden = collapsed;

  // ================= MOBILE STATE =================
  const mobileHidden = !open;

  return (
    <>
      {/* ================= OPEN BUTTON (DESKTOP) ================= */}
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
          fixed z-50 inset-y-0 left-0
          w-64 bg-white border-r
          transform transition-transform duration-300 ease-in-out

          /* MOBILE */
          ${mobileHidden ? "-translate-x-full" : "translate-x-0"}

          /* DESKTOP */
          lg:${desktopHidden ? "-translate-x-full" : "translate-x-0"}
        `}
      >
        {/* ================= CONTENT ================= */}
        <div
          className={`
            h-full flex flex-col
            transition-opacity duration-200
            ${
              desktopHidden && mobileHidden
                ? "opacity-0 pointer-events-none"
                : "opacity-100"
            }
          `}
        >
          {/* ================= HEADER ================= */}
          <div className="h-16 flex items-center justify-between px-6 border-b">
            <h1 className="text-xl font-bold">NutriOne</h1>

            <button
              onClick={() => onCollapseChange(true)}
              className="hidden lg:flex p-2 rounded-md hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* ================= MENU ================= */}
          <nav className="p-4 space-y-2">
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
                    text-sm font-medium transition-colors
                    ${
                      active
                        ? "bg-yellow-100 text-yellow-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <Icon size={20} />
                  <span className="whitespace-nowrap">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
