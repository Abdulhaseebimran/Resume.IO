import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Check for both secure and standard tokens
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: process.env.NODE_ENV === "production"
    });

    console.log(`[Middleware] Path: ${pathname} | Auth: ${!!token}`);

    const isProtectedPath = pathname.startsWith("/dashboard") || pathname.startsWith("/editor");

    if (isProtectedPath && !token) {
        console.log(`[Middleware] Unauthorized access to ${pathname}. Redirecting to /login`);
        const url = new URL("/login", req.url);
        // Preserve the callback URL if possible
        url.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export default middleware;

export const config = {
    matcher: ["/dashboard/:path*", "/editor/:path*"],
};
