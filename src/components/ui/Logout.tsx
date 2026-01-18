"use client";

import { userStore } from "@/common/lib/store";
import { useProfile } from "@/hooks/useProfile";
import { authService } from "@/services/AuthService";
import { useStore } from "@tanstack/react-store";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SidebarUserCard() {
  const { useCurrentProfile } = useProfile();
  const router = useRouter();
  const userName = useStore(userStore);
  const { data: user } = useCurrentProfile();

  const handleLogout = () => {
    authService.logout();
    toast.success("Berhasil Logout");
    router.replace("/");
  };

  return (
    <div className="mt-36 border-t border-yellow-100 bg-linear-to-tr from-yellow-50/60 to-white px-4 py-3">
      <div className="rounded-2xl border border-yellow-100 bg-white/80 backdrop-blur shadow-sm p-4">
        <div className="flex items-start gap-3">
          {/* Avatar */}
<div
  onClick={() => router.push("/dashboard/profile")}
  title="Lihat Profil"
  className="
    relative
    w-10 h-10
    rounded-full
    overflow-hidden
    cursor-pointer
    hover:scale-105
    transition
  "
>
  <Image
    src={user?.avatar || "/default-avatar.png"}
    alt="Avatar"
    fill
    // sizes="40px"
    className="object-cover"
  />
</div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {userName?.name || "User"}
            </p>
            <p className="text-xs text-gray-500 truncate">{userName?.email}</p>
          </div>
          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-full bg-yellow-500 text-white shadow hover:bg-yellow-600 transition-colors"
          >
            {" "}
            <LogOut className="w-4 h-4" />{" "}
          </button>{" "}
        </div>
      </div>
    </div>
  );
}
