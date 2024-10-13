// middleware.js
import { NextResponse } from 'next/server';
import { auth } from './lib/firebaseConfig'; // Adjust the path as necessary

export async function middleware(req) {
  // Check if user is authenticated
  const user = auth.currentUser; // Check the current user

  // If the user is not logged in and is trying to access a protected route
  if (!user && req.nextUrl.pathname !== '/sign-in' && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/sign-in', req.url)); // Redirect to sign-in
  }

  // If the user is logged in and trying to access the sign-in page, redirect to home
  if (user && req.nextUrl.pathname === '/sign-in') {
    return NextResponse.redirect(new URL('/', req.url)); // Redirect to home
  }

  return NextResponse.next(); // Allow access to the requested page
}

// Apply the middleware to protected routes
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};