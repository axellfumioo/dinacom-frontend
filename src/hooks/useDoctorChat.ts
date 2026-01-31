import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DoctorChatService from "@/services/DoctorChatService";
import { CreateDoctorChatroomRequest } from "@/common/dto/doctorChatDto";

/**
 * Hook to fetch all available doctors
 */
export const useGetAllDoctors = () => {
  return useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const response = await DoctorChatService.GetAllDoctors();
      return response.data;
    },
  });
};

/**
 * Hook to fetch all user's doctor chat rooms
 */
export const useGetAllUserDoctorChatRooms = () => {
  return useQuery({
    queryKey: ["user-doctor-chatrooms"],
    queryFn: async () => {
      const response = await DoctorChatService.GetAllUserDoctorChatRooms();
      return response.data;
    },
  });
};

/**
 * Hook to get or create a doctor chat room with a specific doctor
 */
export const useGetOrCreateDoctorChatRoom = (doctorID: string) => {
  return useQuery({
    queryKey: ["doctor-chatroom", doctorID],
    queryFn: async () => {
      const response = await DoctorChatService.GetOrCreateDoctorChatRoom(doctorID);
      return response.data;
    },
    enabled: !!doctorID,
  });
};

/**
 * Hook to create a new doctor chat room
 */
export const useCreateDoctorChatroom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateDoctorChatroomRequest) => {
      const response = await DoctorChatService.CreateDoctorChatroom(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-doctor-chatrooms"] });
    },
  });
};
