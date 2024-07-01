import { NextRequest } from "next/server";
import { AUTH_ROUTES, COOKIE_JWT_TOKEN_NAME, PUBLIC_ROUTES } from "./lib/constants";

export default async function middleware(req: NextRequest) {
    const { nextUrl } = req;
    const token = req.cookies.get(COOKIE_JWT_TOKEN_NAME);
    const isLoggedIn = !!token && !!token.value;
    const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname)
    const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname)


    if (isAuthRoute) {
        if (isLoggedIn) return Response.redirect(new URL('/dashboard', nextUrl))
        return null
    }
    if (!isLoggedIn && !isPublicRoute) return Response.redirect(new URL('/auth/login', nextUrl))
}

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}