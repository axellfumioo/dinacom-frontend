import { FoodScanModel } from "./foodscan"


export type FoodScanResultModel = {
    ID: string
    food_names: string
    food_type: string
    calories_kcal: number
    protein_g: number
    fat_g: number
    carbs_g: number
    vitamins: string[]
    food_scan_id: string
    food_scan: FoodScanModel
    confidence: number
    CreatedAt: string
}