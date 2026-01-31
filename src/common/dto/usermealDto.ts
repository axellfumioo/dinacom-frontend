import { UserMealTime } from "./usermealtimeDto";


export interface UserMeal {
  id: string;
  food_names: string;
  Calories: number;
  Protein: number;
  Fat: number;
  Carbs: number;
  portion: number;
  time: UserMealTime;
  created_at: string;
}

export interface PaginatedUserMealResponse {
  data: UserMeal[];
  pagination: {
    page: number;
    page_size: number;
    total_pages: number;
    total_rows: number;    
  }
}

export interface CreateUserMealRequest {
  food_name: string;
  calories: number;
  protein: number;
  fat: number;
  carbohydrate: number;
  portion: number;
  time: UserMealTime;
}
