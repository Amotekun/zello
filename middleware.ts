import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get('access');
    const url = request.nextUrl.clone();

    // Allow unauthenticated access to login and register pages
    if (url.pathname === '/login' || url.pathname === '/register' ||  url.pathname === '/') {
        return NextResponse.next();
    }

    // Redirect to login page if token is missing
    if (!token) {
        return NextResponse.redirect(new URL('/', request.url));
    }
        // Set the token in the request headers
    

    // Optionally, you could add more logic to verify the token's validity
    // and handle expired tokens if needed.
    
    return NextResponse.next();
}
// Apply middleware to specific paths
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)', // Apply middleware to all paths except for API routes and static assets
    ],
};