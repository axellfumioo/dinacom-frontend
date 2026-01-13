"use client";

import { userStore } from "@/common/lib/store";
import { authService } from "@/services/AuthService";
import { useStore } from "@tanstack/react-store";
import { User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type SidebarUserCardProps = {
  collapsed: boolean;
};

export default function SidebarUserCard({ collapsed }: SidebarUserCardProps) {
  const router = useRouter();
  const user = useStore(userStore);

  const handleLogout = () => {
    authService.logout();
    toast.success("Berhasil Logout");
    router.replace("/");

  };

  return (
    <div
      className={`mt-36 border-t border-yellow-100 bg-linear-to-tr from-yellow-50/60 to-white ${
        collapsed ? "px-2 py-4" : "px-4 py-3"
      }`}
    >
      <div
        className={`rounded-2xl border border-yellow-100 bg-white/80 backdrop-blur shadow-sm ${
          collapsed ? "p-2.5" : "p-4"
        }`}
      >
        {collapsed ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-500/15 text-yellow-600 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-yellow-500 text-white shadow hover:bg-yellow-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 shrink-0 rounded-full bg-yellow-500/15 text-yellow-600 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 leading-tight">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 break-all">
                {user?.email}
              </p>
            </div>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-full bg-yellow-500 text-white shadow hover:bg-yellow-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
