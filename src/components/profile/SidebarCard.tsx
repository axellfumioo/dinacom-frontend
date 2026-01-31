import React from 'react';

type IconComponent = React.ComponentType<{ className?: string }>;

interface Props {
  icon: IconComponent;
  title: string;
  children: React.ReactNode;
}

export const SidebarCard = ({ icon: Icon, title, children }: Props) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-6 h-6 text-gray-900" />
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>
      {children}
    </div>
  );
};