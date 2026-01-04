export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto extends LoginDto{
    gender: string;
    name: string;
    date_of_birth: string;
}