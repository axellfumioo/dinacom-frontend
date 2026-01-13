import { userStore } from "@/common/lib/store";
import { useStore } from "@tanstack/react-store";
import Image from "next/image";
import React from "react";



export const ProfileHeader = () => {
  const user = useStore(userStore);
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
      <div className="flex items-center gap-4">
        <Image
          src={user?.avatar || "/default-avatar.png"}
          width={50}
          height={50}
          alt="User Avatar"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {user?.name}
          </h1>
          {/* {user.role && (
            <p className="text-gray-600">{user.role}</p>
          )} */}
        </div>
      </div>
    </div>
  );
};
