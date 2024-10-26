'use server'

import { getTokenPayload } from "@/lib/auth/jwt-token"
import { COOKIE_JWT_TOKEN_NAME } from "@/lib/constants"
import { ApiResponse } from "@/types/api-types"
import { AuthActionType, CustomJwtPayload, LoginSuccessType, LoginType } from "@/types/auth/auth-types"
import { LoginSchema } from "@/types/auth/login-schema"
import { cookies } from 'next/headers'

export const login = async (values: LoginType): Promise<AuthActionType> => {
    const validatedFields = LoginSchema.safeParse(values)
    if (!validatedFields.success) { return { error: "Campos no validos" } }

    try {
        console.info("Start login flow")
        const response = await fetch(`${process.env.PROCESA_CONTABLE_API_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify(validatedFields.data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        const responseData: ApiResponse<LoginSuccessType> = await response.json();
        if (!responseData.success) { return { error: responseData.error?.message }; }

        const token = responseData.data?.token!;
        const tokenData = await getTokenPayload(token);
        console.info("Finish login flow")
        cookies().set(COOKIE_JWT_TOKEN_NAME, token, { expires: new Date(tokenData?.exp! * 1000), httpOnly: true, secure: false, sameSite: 'none' });
        return { success: "Inicio de sesión exitoso, redirigiendo...", user: tokenData! };

    } catch (error) {
        return { error: "Error al iniciar sesión" };
    }
}

export const logout = async (): Promise<boolean> => {
    try {
        cookies().delete(COOKIE_JWT_TOKEN_NAME);
        return true
    } catch (error) {
        return false
    }
};

export const getUserData = async (): Promise<CustomJwtPayload | null> => {
    try {
        const token = cookies().get(COOKIE_JWT_TOKEN_NAME);
        if (!token) throw new Error('No se encontró el token');

        const tokenData = await getTokenPayload(token.value);
        if (!tokenData) throw new Error('Token inválido');
        return tokenData;
    } catch {
        return null
    }
};