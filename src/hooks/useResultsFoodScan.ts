import { foodScanService } from "@/services/FoodScanService";
import { useQuery } from "@tanstack/react-query";

export const useAllResults = () => {
    return useQuery({
        queryKey: ["results"],
        queryFn: () => foodScanService.GetAllFoodScanResults(),
    });
}

export const useGetUserFoodScan = () => {
    return useQuery({
        queryKey: ["results"],
        queryFn: () => foodScanService.GetUserFoodScanResult(),
    });
}

export const useGetFoodscanResultByID = (id: string) => {
    return useQuery({
        queryKey: ["foodscanResult", id],
        queryFn: () => foodScanService.GetFoodScanResultByID(id),
    })
}