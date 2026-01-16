"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { profileService } from "@/services/ProfileService";
import {
  UpdateProfileDto,
  UploadAvatarDto,
} from "@/common/dto/profileDto";

export const useProfile = () => {
  const queryClient = useQueryClient();


  const useCurrentProfile = () => {
    return useQuery({
      queryKey: ["profile"],
      queryFn: async () => {
        profileService.getProfile();
      },
    });
  };

  const updateProfileMutation = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: async (dto: UpdateProfileDto) => {
      profileService.updateProfile(dto);
    },
    onSuccess: () => {
      // refresh profile setelah update
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const uploadAvatarMutation = useMutation({
    mutationKey: ["uploadAvatar"],
    mutationFn: async (dto: UploadAvatarDto) => {
      profileService.uploadAvatar(dto);
    },
    onSuccess: () => {
      // refresh profile setelah upload avatar
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  return {
    // query
    useCurrentProfile,

    // mutations
    updateProfile: updateProfileMutation,
    uploadAvatar: uploadAvatarMutation,
  };
};
