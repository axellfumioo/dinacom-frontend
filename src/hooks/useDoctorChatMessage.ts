import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DoctorChatMessageService from "@/services/DoctorChatMessageService";
import { CreateDoctorChatMessageRequest } from "@/common/dto/doctorChatDto";

/**
 * Hook to fetch all messages for a specific room
 */
export const useGetMessagesByRoomID = (roomID: string) => {
  return useQuery({
    queryKey: ["doctor-messages", roomID],
    queryFn: async () => {
      const response = await DoctorChatMessageService.GetMessagesByRoomID(roomID);
      return response.data;
    },
    enabled: !!roomID,
  });
};

/**
 * Hook to create a new message
 */
export const useCreateDoctorMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateDoctorChatMessageRequest) => {
      const response = await DoctorChatMessageService.CreateNewMessage(data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      // Invalidate messages for the specific room
      queryClient.invalidateQueries({ 
        queryKey: ["doctor-messages", variables.room_id] 
      });
      // Also invalidate the chat rooms list to update last message
      queryClient.invalidateQueries({ 
        queryKey: ["user-doctor-chatrooms"] 
      });
    },
  });
};
