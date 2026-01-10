export interface MessageDto {
  id: string;
  chatId: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt?: string;
  imageUrl?: string;
}

export interface CreateMessageRequestDto {
  content: string;
}

export interface CreateMessageWithMediaRequestDto {
  content: string;
  userId: string;
  chatId: string;
  image: File;
}