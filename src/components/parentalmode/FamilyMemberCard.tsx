import React from 'react';

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

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg">
      <img
        src={member.avatar}
        alt={member.name}
        className="w-16 h-16 rounded-full object-cover flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 text-lg mb-2">
          {member.name}
        </h3>

        <div className="mb-2">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-yellow-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Kalori</span>
          <span className="text-gray-900 font-medium">
            {member.currentCalories} /{' '}
            {member.targetCalories.toLocaleString()} kkal
          </span>
        </div>
      </div>

      <button
        onClick={() => onViewDetail(member)}
        className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex-shrink-0"
      >
        Lihat detail
      </button>
    </div>
  );
};
