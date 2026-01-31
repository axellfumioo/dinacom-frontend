export interface DoctorDto {
  ID: string;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  name: string;
  specialization: string;
  rating: number;
  reviews: number;
  price: string;
  alumnus: string;
  practice: string;
  str: string;
  profile_picture?: string;
}

export interface DoctorChatRoomDto {
  ID: string;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  user_id: string;
  doctor_id: string;
  doctor?: DoctorDto;
  last_message?: string;
  last_message_at?: string;
}

export interface DoctorChatMessageDto {
  ID: string;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  room_id: string;
  sender_id: string;
  sender_type: "user" | "doctor";
  message: string;
  is_read: boolean;
}

export interface CreateDoctorChatroomRequest {
  doctor_id: string;
}

export interface CreateDoctorChatMessageRequest {
  room_id: string;
  message: string;
}
