import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define the protected routes that require authentication
const protectedRoutes = ["/links", "/profile", "/preview"];

// Define the public routes that should be inaccessible to authenticated users
const publicRoutes = ["/login", "/signup"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  //   console.log(req.cookies);
  // Function to get the authentication token from cookies
  const getAuthToken = () => {
    const token = req.cookies.get("next-auth.session-token")?.value;
    return token;
  };

  const token = getAuthToken();
  const isAuthenticated = Boolean(token);

  // If the request is for a protected route
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      // Redirect unauthenticated users to the login page
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
    // If authenticated, proceed as normal
    return NextResponse.next();
  }

  // If the request is for a public route (e.g., login or signup)
  if (publicRoutes.some((route) => pathname === route)) {
    if (isAuthenticated) {
      // Redirect authenticated users to the profile page
      const profileUrl = new URL("/profile", req.url);
      return NextResponse.redirect(profileUrl);
    }
    // If not authenticated, proceed to the public page
    return NextResponse.next();
  }

  // For all other routes, proceed as normal
  return NextResponse.next();
}

// Configure the middleware to run on specific routes
export const config = {
  matcher: ["/links", "/profile", "/preview", "/login", "/signup"],
};
