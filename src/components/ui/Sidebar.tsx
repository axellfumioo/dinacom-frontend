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
import SidebarUserCard from "./Logout";
import { useGetUserAIChat } from "@/hooks/useAIchat";

type SidebarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  collapsed: boolean;
  onCollapseChange: (collapsed: boolean) => void;
};

export default function Sidebar({
  open,
  setOpen,
  collapsed,
  onCollapseChange,
}: SidebarProps) {
  const pathname = usePathname();
  const { data: AIChat, isPending } = useGetUserAIChat();

  const menuItems = [
    { label: "Dashboard", icon: Home, path: "/dashboard" },
    { label: "Scan Makan", icon: Scan, path: "/dashboard/scanmakanan" },
    {
      label: "Health Assistant",
      icon: Sparkles,
      path:
        AIChat?.ID && !isPending
          ? `/dashboard/healtassistent?chatId=${AIChat.ID}`
          : "/dashboard/healtassistent",
    },
    {
      label: "Riwayat Harian",
      icon: CalendarDays,
      path: "/dashboard/riwayatharian",
    },
    { label: "Konsultasi", icon: MessageCircle, path: "/dashboard/konsultasi" },
    { label: "Parental Mode", icon: Infinity, path: "/dashboard/parentalmode" },
    { label: "Strava", icon: Activity, path: "/dashboard/strava" },
    {
      label: "Weekly Report",
      icon: BarChart3,
      path: "/dashboard/weeklyreport/",
    },
  ];

  return (
    <>
      {/* OPEN DESKTOP SIDEBAR */}
      {collapsed && (
        <button
          onClick={() => onCollapseChange(false)}
          className="fixed top-4 left-4 z-40 hidden lg:flex w-10 h-10 items-center justify-center rounded-md bg-white border shadow hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>
      )}

      {/* OVERLAY MOBILE */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          bg-white border-r
          transition-all duration-300
          ${collapsed ? "w-0" : "w-64"}
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* HEADER */}
        {!collapsed && (
          <div className="h-16 flex items-center justify-between px-6 border-b">
            <h1 className="text-xl font-bold">NutriOne</h1>

            <button
              onClick={() => onCollapseChange(true)}
              className="hidden lg:flex p-2 rounded-md hover:bg-gray-100"
            >
              <Transition
                show={!collapsed}
                enter="transition-opacity duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <X size={20} />
              </Transition>
            </button>
          </div>
        )}

        {/* MENU */}
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
                    flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium
                    ${
                      active
                        ? "bg-yellow-100 text-yellow-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        )}

        {/* USER CARD (FIX: HANYA RENDER SAAT TIDAK COLLAPSED) */}
        {!collapsed && <SidebarUserCard />}
      </aside>
    </>
  );
}
