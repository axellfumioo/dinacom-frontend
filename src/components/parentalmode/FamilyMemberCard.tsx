import Image from 'next/image';
import React from 'react';
import { Eye, TrendingUp } from 'lucide-react';

export interface FamilyMember {
  id: string;
  name: string;
  avatar: string;
  currentCalories: number;
  targetCalories: number;
}

interface Props {
  member: FamilyMember;
  onViewDetail: (member: FamilyMember) => void;
}

export const FamilyMemberCard: React.FC<Props> = ({
  member,
  onViewDetail,
}) => {
  const progressPercentage =
    (member.currentCalories / member.targetCalories) * 100;
  const isOnTrack = progressPercentage >= 50 && progressPercentage <= 100;

  return (
    <div className="flex items-center gap-4 p-5 bg-white border-2 border-gray-200 rounded-xl hover:border-yellow-400 hover:shadow-md transition-all duration-200 group">
      <div className="relative">
        <Image
          src={member.avatar}
          alt={member.name}
          width={72}
          height={72}
          className="rounded-full object-cover shrink-0 ring-4 ring-gray-100 group-hover:ring-yellow-100 transition-all"
        />
        {/* Status indicator */}
        <div className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-4 border-white ${
          isOnTrack ? 'bg-green-500' : progressPercentage > 100 ? 'bg-red-500' : 'bg-yellow-500'
        }`}></div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-bold text-gray-900 text-lg">
            {member.name}
          </h3>
          {isOnTrack && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
              Sesuai target
            </span>
          )}
        </div>

        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-gray-600 font-medium">Progress Kalori</span>
            <span className="text-gray-900 font-bold">
              {progressPercentage.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                progressPercentage > 100 
                  ? 'bg-red-500' 
                  : 'bg-gradient-to-r from-yellow-400 to-orange-400'
              }`}
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            <span className="font-bold text-gray-900">{member.currentCalories.toLocaleString()}</span>
            {' / '}
            <span className="text-gray-600">{member.targetCalories.toLocaleString()} kkal</span>
          </span>
        </div>
      </div>

      <button
        onClick={() => onViewDetail(member)}
        className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-500 rounded-xl text-sm font-semibold text-gray-900 transition-colors shrink-0 flex items-center gap-2 group-hover:scale-105 transition-transform"
      >
        <Eye className="w-4 h-4" />
        Detail
      </button>
    </div>
  );
};
