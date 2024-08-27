import { NextRequest } from "next/server";
import { AUTH_ROUTES, COOKIE_JWT_TOKEN_NAME, DASHBOARD_ROUTE, LOGIN_ROUTE, PUBLIC_ROUTES } from "./lib/constants";

export default async function middleware(req: NextRequest) {
    const { nextUrl } = req;
    const token = req.cookies.get(COOKIE_JWT_TOKEN_NAME);
    const isLoggedIn = !!token && !!token.value;
    const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname)
    const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname)

    if (process.env.NODE_ENV === 'production') {
        if (isAuthRoute) {
            if (isLoggedIn) return Response.redirect(new URL(DASHBOARD_ROUTE, nextUrl))
            return null
        }
        if (!isLoggedIn && !isPublicRoute) return Response.redirect(new URL(LOGIN_ROUTE, nextUrl))
    }
}

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}