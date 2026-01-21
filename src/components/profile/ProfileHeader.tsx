"use client";

import { userStore } from "@/common/lib/store";
import { useProfile } from "@/hooks/useProfile";
import { useStore } from "@tanstack/react-store";
import { ImageUp } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";
import toast from "react-hot-toast";

export const ProfileHeader = () => {
  const { uploadAvatar, useCurrentProfile } = useProfile();
  const { data: user } = useCurrentProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const userName = useStore(userStore);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) toast.error("Gambar g ada");

    uploadAvatar.mutate({
      avatar: file!,
    });

    e.target.value = "";
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20">
          <Image
            src={user?.avatar || "/default-avatar.png"}
            width={80}
            height={80}
            alt="User Avatar"
            className="w-20 h-20 rounded-full object-cover"
          />

          <div
            onClick={handleClick}
            className="absolute top-0 right-0 bg-white rounded-full p-1 shadow cursor-pointer hover:bg-gray-100"
          >
            <ImageUp className="w-4 h-4 text-gray-600" />
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleChange}
          />
        </div>

        <h1 className="text-2xl font-bold text-gray-900">
          {userName?.name || "User"}
        </h1>
      </div>
    </div>
  );
};
