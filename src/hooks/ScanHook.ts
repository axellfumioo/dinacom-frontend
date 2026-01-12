import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { foodScanService } from "@/services/FoodScanService"
import { FoodScanDto } from "@/common/dto/foodscanDto"
import toast from "react-hot-toast"



export const useImageInput = (
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["scanFood"],
    mutationFn: (dto: FoodScanDto) => foodScanService.scanFood(dto),

    onSuccess: () => {
      toast.success("Scan berhasil")
      queryClient.invalidateQueries({
        queryKey: ["userFoodScans"],
      })
    },

    onError: (err: any) => {
      setError(err.message)
    },
  })
}

export const useGetFoodScanByID = (foodscanId: string) => {
  return useQuery({
    queryKey: ['foodscan', foodscanId],
    queryFn: () => foodScanService.getFoodScanByID(foodscanId),
    staleTime: 1 * 60 * 60
  })
}


export const useGetUserScans = () => {
  return useQuery({
    queryKey: ["userFoodScans"],
    queryFn: () => foodScanService.getUserFoodScans(),
    staleTime: 2 * 60 * 60
  })
}

export const useGetFoodscanResultByID = (id: string) => {
  return useQuery({
    queryKey: ["foodscanResult",]
  })
}