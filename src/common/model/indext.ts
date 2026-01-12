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

export interface UserStore {
  id: string;
  name: string;
  email: string;
}

export interface Profile {
  id: string;
  userId: string;
  name: string;
  avatar?: string;
  date_of_birth?: string;
  gender?: string;
  height_cm?: number;
  weight_kg?: number;
  activity_level?: string;
}
