import React from 'react';

export const MealCard = ({ meal }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100">
      <img 
        src={meal.image} 
        alt={meal.name}
        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
      />
      
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 mb-1">{meal.name}</h3>
        <p className="text-sm text-gray-500 mb-2">
          Sarapan~ <span className="font-medium">{meal.calories} kkal</span>
        </p>
        
        <div className="flex gap-2">
          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-md font-medium">
            Protein {meal.protein}g
          </span>
          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md font-medium">
            Lemak {meal.fat}g
          </span>
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md font-medium">
            Karbo {meal.carbs}g
          </span>
        </div>
      </div>
    </div>
  );
};