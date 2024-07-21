import { CustomJwtPayload } from "@/types/auth/auth-types";
import jwt from "jsonwebtoken";

export const getTokenPayload = (token: string): CustomJwtPayload | null => {
    try {
        const data = jwt.decode(token) as CustomJwtPayload
        return data
    } catch (error) {
        return null
    }
}