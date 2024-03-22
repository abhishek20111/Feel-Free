import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ["/api/webhook"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// import { NextResponse } from "next/server";
// import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

// export default authMiddleware({
//     afterAuth(auth, request, evt) {

//         const path = request.nextUrl.pathname

//         const isPublicPath = path === '/sign-in' || path === '/sign-up' 

//         // if (isPublicPath && auth.userId ) {
//         //     console.log("hrere 1");
//         //     return NextResponse.redirect(new URL('/', request.nextUrl))
//         // }
        
//         if (!isPublicPath && !auth.userId ) {
//             console.log("hrere 2");
//             return NextResponse.redirect(new URL('/sign-in', request.url));
//         }
//         console.log("middelware ",path);
//         return NextResponse.next();
//     },
//     publicRoutes: ["/api/webhook",],        
// });

// export const config = {
//     matcher: [
//         "/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)",
//         '/profile/:path*',
//         '/sign-in',
//         '/sign-up',
//         '/create-post',
//         '/search',
//         '/whiteList',
//     ],
// };
