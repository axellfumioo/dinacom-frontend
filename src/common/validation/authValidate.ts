import z from "zod";

export const registerValidate = z.object({
  name: z.string().min(3, { message: "Name minimal 3 karakter" }),
  email: z.string().email({ message: "Email tidak valid" }),
  password: z.string().min(8, { message: "Password minimal 8 karakter" }),
  phone_number: z.string().min(10, { message: "Nomor telepon harus 10 karakter" }),
  date_of_birth: z.string().min(10, { message: "Tanggal lahir harus diisi" }),
  gender: z.string().min(1, { message: "Pilih salah satu gender" }),
});

export type RegisterForm = z.infer<typeof registerValidate>;
