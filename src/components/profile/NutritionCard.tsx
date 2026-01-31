import React from 'react';

export const NutritionCard = ({ Icon, value, unit, label, color, current, target }: { Icon: React.ComponentType<any>, value: string, unit: string, label: string, color: string, current: number, target: number }) => {
  const percentage = (current / target) * 100;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color === 'orange' ? 'bg-orange-100' :
          color === 'blue' ? 'bg-blue-100' :
            color === 'yellow' ? 'bg-yellow-100' :
              'bg-red-100'
          }`}>
          <Icon className={`w-6 h-6 ${color === 'orange' ? 'text-orange-500' :
            color === 'blue' ? 'text-blue-500' :
              color === 'yellow' ? 'text-yellow-500' :
                'text-red-500'
            }`} />
        </div>
        <span className="text-xs text-gray-400 font-medium">{unit}</span>
      </div>

      <h3 className="text-3xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-sm text-gray-600 mb-3">{label}</p>

      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${color === 'orange' ? 'bg-orange-500' :
            color === 'blue' ? 'bg-blue-500' :
              color === 'yellow' ? 'bg-yellow-500' :
                'bg-red-500'
            }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
    </div>
  );
};