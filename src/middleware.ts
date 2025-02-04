import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server";

// Define protected routes and required roles
const protectedRoutes = [
  { matcher: createRouteMatcher(["/inventory","/order"]), requiredRole: "inventory" },
  { matcher: createRouteMatcher(["/payment","/customer"]), requiredRole: "payment" },
  { matcher: createRouteMatcher(["/reviews"]), requiredRole: "reviews" },
];

export default clerkMiddleware(async (auth, req) => {
  const CLERK_SIGN_IN_URL = "https://rich-duck-49.accounts.dev/sign-in";
  const UNAUTHORIZED_URL = "/unauthorized"; 

  const { userId } = await auth();

  if (!userId) {
    return new Response(null, {
      status: 307,
      headers: { Location: CLERK_SIGN_IN_URL },
    });
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const userRole = user.publicMetadata?.role;
  
  if (userRole === "admin") return;

  const { pathname } = new URL(req.url);

  for (const route of protectedRoutes) {
    if (route.matcher(req) && userRole !== route.requiredRole) {
      return Response.redirect(new URL(UNAUTHORIZED_URL, req.url)); 
    }
  }
});

export const config = {
  matcher: "/((?!.*\\..*|_next).*)",
};
