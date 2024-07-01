'use server'

import { getTokenPayload } from "@/lib/auth/jwt-token"
import { COOKIE_JWT_TOKEN_NAME } from "@/lib/constants"
import { ApiResponse } from "@/types/api-types"
import { AuthActionType, LoginSuccessType } from "@/types/auth/auth-types"
import { LoginSchema } from "@/types/auth/login-schema"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from "zod"

export const login = async (values: z.infer<typeof LoginSchema>): Promise<AuthActionType> => {
    const validatedFields = LoginSchema.safeParse(values)
    if (!validatedFields.success) { return { error: "Campos no validos" } }

    try {
        const response = await fetch(`${process.env.PROCESA_CONTABLE_API_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify(validatedFields.data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const responseData: ApiResponse<LoginSuccessType> = await response.json();
        if (!responseData.success) { return { error: responseData.error?.message }; }

        const token = responseData.data?.token!;
        const tokenData = await getTokenPayload(token);
        cookies().set(COOKIE_JWT_TOKEN_NAME, token, { expires: new Date(tokenData?.exp! * 1000), httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
        return { success: "Inicio de sesión exitoso!" };

    } catch (error) {
        return { error: "Error al iniciar sesión" };
    }
}

export const logout = async () => {
    const cookiesStore = cookies();
    cookiesStore.delete(COOKIE_JWT_TOKEN_NAME);
    return redirect('/auth/login');
};

export const getUserData = async () => {
    const token = cookies().get(COOKIE_JWT_TOKEN_NAME);
    if (!token) throw new Error('No se encontró el token');

    const tokenData = await getTokenPayload(token.value);
    if (!tokenData) throw new Error('Token inválido');

    return tokenData;
};