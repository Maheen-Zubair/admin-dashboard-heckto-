import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const protectedRoutes = [
  { matcher: createRouteMatcher(["/inventory", "/order"]), requiredRole: "inventory" },
  { matcher: createRouteMatcher(["/payment", "/customer"]), requiredRole: "payment" },
  { matcher: createRouteMatcher(["/reviews"]), requiredRole: "reviews" },
];

export default clerkMiddleware(async (auth, req) => {
  const CLERK_SIGN_IN_URL = "https://rich-duck-49.accounts.dev/sign-in?redirect_url=https://admin-dashboard-heckto-00-l9jp3q1v3-maheen-zubairs-projects.vercel.app/dashboard";
  const UNAUTHORIZED_URL = "/unauthorized";

  const session = await auth();
  console.log("Session Data:", session);

  if (!session || !session.userId) {
    console.log("No valid session found. Redirecting to sign-in.");
    return NextResponse.redirect(CLERK_SIGN_IN_URL);
  }

  const { userId } = session;
  console.log("UserID:", userId);

  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const userRole = user.publicMetadata?.role;

    console.log("User Role:", userRole);

    if (userRole === "admin") {
      return NextResponse.next();
    }

    for (const route of protectedRoutes) {
      if (route.matcher(req) && userRole !== route.requiredRole) {
        console.log(`Unauthorized access to ${req.url}, redirecting...`);
        return NextResponse.redirect(new URL(UNAUTHORIZED_URL, req.url));
      }
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.redirect(CLERK_SIGN_IN_URL);
  }

  return NextResponse.next();
});

export const config = {
  matcher: "/((?!.*\\..*|_next).*)",
};
