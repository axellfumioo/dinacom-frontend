import React from "react";

type ProfileHeaderProps = {
  user: {
    name: string;
    avatar: string;
    role?: string;
  };
};

export const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
      <div className="flex items-center gap-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {user.name}
          </h1>
          {user.role && (
            <p className="text-gray-600">{user.role}</p>
          )}
        </div>
      </div>
    </div>
  );
};
