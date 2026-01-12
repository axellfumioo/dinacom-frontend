import React from 'react';

export const ProfileHeader = ({ user, onSave }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img 
            src={user.avatar} 
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h1>
            <p className="text-gray-600">{user.role}</p>
          </div>
        </div>
        
        <button
          onClick={onSave}
          className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-xl transition-colors"
        >
          Save changes
        </button>
      </div>
    </div>
  );
};