import { LoginSchema } from "@/types/auth/login-schema";
import { JwtPayload } from "jsonwebtoken";
import { z } from "zod";

export type LoginType = z.infer<typeof LoginSchema>

export type FormAlertType = {
    message?: string
}

export type LoginSuccessType = {
    token?: string,
}

export type AuthActionType =
    { error: string | undefined; success?: undefined; }
    | { success: string; user: CustomJwtPayload; error?: undefined; }

export type CustomJwtPayload = JwtPayload & {
    name: string;
    company: string;
    user_id: string;
    role: string
}

export type AuthContextType = {
    user: CustomJwtPayload | null,
    login: (values: LoginType) => Promise<AuthActionType | undefined>,
    logout: () => void,
}