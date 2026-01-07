import { FoodScan } from '../model/indext';

export interface ScanFoodRequest {
  image: File;
}

export interface ScanFoodResponse {
  success: boolean;
  data: FoodScan;
  message?: string;
}

export interface GetAllFoodScansResponse {
  success: boolean;
  data: FoodScan[];
  message?: string;
}

export interface GetUserFoodScansResponse {
  success: boolean;
  data: FoodScan[];
  message?: string;
}
