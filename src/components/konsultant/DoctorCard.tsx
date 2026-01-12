import React from 'react';
import { Star, Calendar, Clock, FileText } from 'lucide-react';

export const DoctorCard = ({ doctor, onChat }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative bg-gray-100 p-6">
        <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
          <div className="w-20 h-20 bg-blue-200 rounded-full"></div>
        </div>
        <span className="absolute top-3 left-3 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></span>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-center mb-1">{doctor.name}</h3>
        <div className="flex items-center justify-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-600">{doctor.rating}</span>
          <span className="text-sm text-gray-400">({doctor.reviews})</span>
        </div>
        
        <div className="text-center mb-4">
          <span className="text-xl font-bold text-gray-900">{doctor.price}</span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 bg-yellow-400 rounded flex-shrink-0 flex items-center justify-center mt-0.5">
              <Calendar className="w-3 h-3 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">Alumnus</div>
              <div className="text-xs text-gray-500">{doctor.alumnus}</div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <div className="w-5 h-5 bg-yellow-400 rounded flex-shrink-0 flex items-center justify-center mt-0.5">
              <FileText className="w-3 h-3 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">Praktek</div>
              <div className="text-xs text-gray-500">{doctor.practice}</div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <div className="w-5 h-5 bg-yellow-400 rounded flex-shrink-0 flex items-center justify-center mt-0.5">
              <Clock className="w-3 h-3 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">Nomor STR</div>
              <div className="text-xs text-gray-500">{doctor.str}</div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => onChat(doctor)}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2.5 rounded-lg transition-colors"
        >
          Chat
        </button>
      </div>
    </div>
  );
};
