export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
    phone_number: string;
}

export interface UpdateUserDto {
    name?: string;
    email?: string;
    phone_number?: string;
}

export interface ChangeUserPasswordDto {
    old_password: string;
    new_password: string;
}