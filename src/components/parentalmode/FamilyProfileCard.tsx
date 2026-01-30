import React from 'react';
import { Settings, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const FamilyProfileCard = ({ family }) => {
  const router = useRouter();
  const addmember = {
    add: "/dashboard/parentalmode/add"
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative">
      <button className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-lg transition-colors">
        <Settings className="w-6 h-6 text-gray-600" />
      </button>
      
      <div className="flex flex-col items-center text-center">
        <div className="w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-gray-100">
          <img 
            src={family.profileImage} 
            alt={family.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{family.name}</h2>
        <p className="text-gray-500 mb-6">Dibuat {family.createdDate}</p>
        
        <button
          onClick={() => router.push(addmember.add)}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
        >
          <Users className="w-5 h-5" />
          Tambah
        </button>
      </div>
    </div>
  );
};