import { UserMealTime } from "./usermealtimeDto";


export interface UserMeal {
  id: string;
  food_name: string;
  calories: number;
  protein: number;
  fat: number;
  carbohydrate: number;
  portion: number;
  time: UserMealTime;
  created_at: string;
}

export interface PaginatedUserMealResponse {
  data: UserMeal[];
  meta: {
    page: number;
    page_size: number;
    total: number;
  };
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
