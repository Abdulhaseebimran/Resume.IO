import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    // Protected paths
    const isProtectedPath = pathname.startsWith("/dashboard") || pathname.startsWith("/editor");

    if (isProtectedPath && !token) {
        const url = new URL("/login", req.url);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export default proxy;

export const config = {
    matcher: ["/dashboard/:path*", "/editor/:path*"],
};
