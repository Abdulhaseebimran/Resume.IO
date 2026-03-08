import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET
    });
    const { pathname } = req.nextUrl;

    console.log(`Middleware tracing: ${pathname} | Has Token: ${!!token}`);

    // Protected paths
    const isProtectedPath = pathname.startsWith("/dashboard") || pathname.startsWith("/editor");

    if (isProtectedPath && !token) {
        console.log("No token found for protected path. Redirecting to /login");
        const url = new URL("/login", req.url);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export default middleware;

export const config = {
    matcher: ["/dashboard/:path*", "/editor/:path*"],
};
