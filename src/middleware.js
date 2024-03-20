import { NextResponse } from "next/server";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
    afterAuth(auth, request, evt) {
        // console.log(auth.userId, !auth.isPublicRoute, req.nextUrl.pathname);
        // if (!auth.userId && !auth.isPublicRoute) {
        //     console.log("1");
        //     return redirectToSignIn({ returnBackUrl: req.url });
        // }

        // console.log("3");
        // return NextResponse.next();

        const path = request.nextUrl.pathname

        const isPublicPath = path === '/sign-in' || path === '/sign-up' 

        if (isPublicPath && auth.userId ) {
            return NextResponse.redirect(new URL('/', request.nextUrl))
        }

        if (!isPublicPath && !auth.userId ) {
            return NextResponse.redirect(new URL('/sign-in', request.url));
        }
        console.log("middelware ",path);
        return NextResponse.next();
    },
    publicRoutes: ["/api/webhook",],
});

export const config = {
    matcher: [
        "/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)",
        '/profile/:path*',
        '/sign-in',
        '/sign-up',
        '/create-post',
        '/search',
        '/whiteList',
    ],
};
