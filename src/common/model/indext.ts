export interface FoodScan {
  id: string;
  userId: string;
  imageUrl: string;
  result: {
    foodName: string;
    calories: number;
    nutrients: {
      protein: number;
      carbs: number;
      fat: number;
    };
  };
  scannedAt: string;
}
