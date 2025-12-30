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
} from "lucide-react";

type SidebarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onCollapseChange: (collapsed: boolean) => void;
};

const menuItems = [
  { label: "Dashboard", icon: Home, href: "/dashboard" },
  { label: "Scan Makan", icon: Scan, href: "/scan" },
  { label: "Health Assistant", icon: Sparkles, href: "/assistant" },
  { label: "Riwayat Harian", icon: CalendarDays, href: "/riwayat" },
  { label: "Konsultasi", icon: MessageCircle, href: "/konsultasi" },
  { label: "Parental Mode", icon: Infinity, href: "/parental" },
  { label: "Strava", icon: Activity, href: "/strava" },
  { label: "Weekly Report", icon: BarChart3, href: "/weekly-report" },
];

export default function Sidebar({
  open,
  setOpen,
  onCollapseChange,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay Mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed z-50 inset-y-0 left-0
          w-64 bg-white border-r
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b">
          <h1 className="text-xl font-bold">NutriOne</h1>

          <button
            onClick={() => setOpen(false)}
            className="lg:hidden"
          >
            <X />
          </button>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-md
                  text-sm font-medium
                  transition
                  ${
                    active
                      ? "bg-yellow-100 text-yellow-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
