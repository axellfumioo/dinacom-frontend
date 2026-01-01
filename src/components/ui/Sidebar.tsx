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
import { Transition } from "@headlessui/react";


type SidebarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  collapsed: boolean;
  onCollapseChange: (collapsed: boolean) => void;
};

const menuItems = [
  { label: "Dashboard", icon: Home, path: "/dashboard" },
  { label: "Scan Makan", icon: Scan, path: "/dashboard/scanmakanan" },
  { label: "Health Assistant", icon: Sparkles, path: "/dashboard/healtassistent" },
  { label: "Riwayat Harian", icon: CalendarDays, path: "/dashboard/riwayatharian" },
  { label: "Konsultasi", icon: MessageCircle, path: "/dashboard/konsultasi" },
  { label: "Parental Mode", icon: Infinity, path: "/dashboard/parentalmode" },
  { label: "Strava", icon: Activity, path: "/dashboard/strava" },
  { label: "Weekly Report", icon: BarChart3, path: "/dashboard/weeklyreport/" },
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
      {/* open dekstop sidebar */}
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

      {/* open mobile sidebar */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* isi sidebar */}
   <aside
        className={`
          fixed z-50 inset-y-0 left-0 bg-white border-r
          transition-all duration-300
          ${collapsed ? "w-0" : "w-64"}
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {!collapsed && (
          <div className="h-16 flex items-center justify-between px-6 border-b">
            <h1 className="text-xl font-bold">NutriOne</h1>

            {/* Close Sidebar */}
            <button
              onClick={() => onCollapseChange(true)}
              className="hidden lg:flex p-2 rounded-md hover:bg-gray-100"
              aria-label="Close Sidebar"
            >
              <Transition
                show={!collapsed}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <X size={20} />
              </Transition>
            </button>
          </div>
        )}
      
      {/* jika tidak tertutup maka tampilkan isi sidebar */}
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
                  <Icon size={20} />
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
