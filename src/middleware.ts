import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define protected routes and required roles
const protectedRoutes = [
  { matcher: createRouteMatcher(["/inventory", "/order"]), requiredRole: "inventory" },
  { matcher: createRouteMatcher(["/payment", "/customer"]), requiredRole: "payment" },
  { matcher: createRouteMatcher(["/reviews"]), requiredRole: "reviews" },
];

export default clerkMiddleware(async (auth, req) => {
  const CLERK_SIGN_IN_URL = "https://rich-duck-49.accounts.dev/sign-in?redirect_url=https://your-vercel-project.vercel.app/dashboard";
  const UNAUTHORIZED_URL = "/unauthorized";

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.redirect(CLERK_SIGN_IN_URL);
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const userRole = user.publicMetadata?.role;

  if (userRole === "admin") {
    return NextResponse.next();
  }

  for (const route of protectedRoutes) {
    if (route.matcher(req) && userRole !== route.requiredRole) {
      return NextResponse.redirect(new URL(UNAUTHORIZED_URL, req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: "/((?!.*\\..*|_next).*)",
};
