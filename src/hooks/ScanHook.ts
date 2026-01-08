import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { foodScanService } from "@/services/FoodScanService"
import { FoodScanDto } from "@/common/dto/foodscanDto"
import { toast } from "sonner"



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


export const useGetUserScans = () => {
  return useQuery({
    queryKey: ["userFoodScans"],
    queryFn: () => foodScanService.getUserFoodScans(),

    onError: (err: any) => {
      toast.error(`Gagal mengambil data scan: ${err.message}`)
    },
  })
}
