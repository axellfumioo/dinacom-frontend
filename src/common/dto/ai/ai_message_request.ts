export interface CreateMessageRequestDto {
    content: string;
}

export interface CreateMessageWithMediaRequestDto {
    content: string;
    userId: string;
    chatId: string;
    image: File;
}