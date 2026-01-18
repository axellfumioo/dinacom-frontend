"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { profileService } from "@/services/ProfileService";
import {
  UpdateProfileDto,
  UploadAvatarDto,
} from "@/common/dto/profileDto";
import { ApiResponse } from "@/common/dto/ai/apiResponse";
import { ProfileModel } from "@/common/model/profile";
import toast from "react-hot-toast";

export const useProfile = () => {
  const queryClient = useQueryClient();


const useCurrentProfile = () => {
  return useQuery<ProfileModel>({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await profileService.getProfile() as ApiResponse<ProfileModel>;
      return res.data;
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
      toast.success("Profile updated successfully");
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
      toast.success("Avatar uploaded successfully");
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
