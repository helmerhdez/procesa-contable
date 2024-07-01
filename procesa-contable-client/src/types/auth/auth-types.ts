import { LoginSchema } from "@/types/auth/login-schema";
import { JwtPayload } from "jsonwebtoken";
import { z } from "zod";

export type LoginFormType = z.infer<typeof LoginSchema>

export type FormAlertType = {
    message?: string
}

export type LoginSuccessType = {
    token?: string,
}

export type AuthActionType =
    { error: string | undefined; success?: undefined; }
    | { success: string; error?: undefined; }

export type CustomJwtPayload = JwtPayload & {
    name: string;
    company: string;
    user_id: string;
    role: string
}