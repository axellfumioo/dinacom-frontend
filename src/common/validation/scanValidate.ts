import z from "zod";

export const scanValidate = z.object({
    image: z
    .instanceof(File, {message: "Image file is required"})
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Format harus JPG / PNG / WEBP"
    ),
});