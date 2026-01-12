import { useState } from 'react';
import { profileService } from '@/services/ProfileService';
import { UpdateProfileDto, UploadAvatarDto } from '@/common/dto/profileDto';

export const useProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (dto: UpdateProfileDto) => {
    setLoading(true);
    setError(null);
    try {
      const response = await profileService.updateProfile(dto);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const uploadAvatar = async (dto: UploadAvatarDto) => {
    setLoading(true);
    setError(null);
    try {
      const response = await profileService.uploadAvatar(dto);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload avatar');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProfile,
    uploadAvatar,
    loading,
    error,
  };
};