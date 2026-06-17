import { z } from "zod";

const passwordSchema = z
  .string()
  .trim()
  .min(8, "Password minimal 8 karakter");

export const loginSchema = z.object({
  email: z.string().trim().email("Email tidak valid"),
  password: z.string().trim().min(1, "Password wajib diisi"),
});

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Nama minimal 2 karakter"),
    email: z.string().trim().email("Email tidak valid"),
    password: passwordSchema,
    confirm: z.string().trim(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Konfirmasi password tidak sama",
    path: ["confirm"],
  });

export const profileNameSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter"),
});

export const checkInSchema = z.object({
  mood_score: z.number().int().min(0).max(5),
  journal_text: z.string().trim().max(2000, "Jurnal maksimal 2000 karakter"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ProfileNameFormData = z.infer<typeof profileNameSchema>;
export type CheckInFormData = z.infer<typeof checkInSchema>;

export function getFirstZodError(error: unknown, fallback = "Periksa kembali input Anda.") {
  if (error instanceof z.ZodError) {
    return error.errors[0]?.message || fallback;
  }

  return fallback;
}
