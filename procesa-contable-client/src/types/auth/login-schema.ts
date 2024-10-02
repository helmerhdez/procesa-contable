import { z } from "zod";

const passwordValidation = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&*\-])[A-Za-z\d@$!%?&*\-]{6,}$/
);

export const LoginSchema = z.object({
    email: z.string()
        .min(1, { message: "El email es requerido" })
        .email({ message: "El email no es válido" }),
    password: z.string()
        .min(6, { message: "La contraseña debe contener al menos 6 caracteres" })
});