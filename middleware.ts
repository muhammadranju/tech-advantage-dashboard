import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Define public routes that don't require authentication
  const publicRoutes = ["/login"];

  // Check if the request is for a public route
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Retrieve the authentication token from cookies
  const token = req.cookies.get("token");

  // If no token is found, redirect to the login page
  if (!token) {
    return NextResponse.redirect(
      new URL(`/login`, req.url)
    );
  }
  // If token exists, allow the request to proceed
  return NextResponse.next();
}

// Configure the middleware to apply to specific routes
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"], // Adjust to your protected routes
};
