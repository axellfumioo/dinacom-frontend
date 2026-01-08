"use client";

import { User, LogOut } from "lucide-react";

type SidebarUserCardProps = {
  collapsed: boolean;
  user?: {
    name: string;
    role: {
      role_name: string;
    };
  };
  onLogout: () => void;
};

export default function SidebarUserCard({
  collapsed,
  user,
  onLogout,
}: SidebarUserCardProps) {
  return (
    <div
      className={`mt-auto border-t border-yellow-100 bg-linear-to-tr from-yellow-50/60 to-white ${
        collapsed ? "px-2 py-4" : "px-4 py-5"
      }`}
    >
      <div
        className={`rounded-2xl border border-yellow-100 bg-white/80 backdrop-blur shadow-sm ${
          collapsed ? "p-2.5" : "p-3.5"
        }`}
      >
        {collapsed ? (
          <>
            <div className="flex flex-col items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-yellow-500/15 text-yellow-600 flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="mt-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-yellow-500 text-white shadow hover:bg-yellow-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="sr-only">Keluar dari aplikasi</span>
            </button>
          </>
        ) : (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-yellow-500/15 text-yellow-600 flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.role.role_name}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-yellow-500 text-white shadow hover:bg-yellow-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="sr-only">Keluar dari aplikasi</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
