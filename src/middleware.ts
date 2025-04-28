import { getUser } from "@/actions/auth";
import { getRouteForRole } from "@/lib/utils";
import { type NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = [
  "/cashier",
  "/manager_dashboard",
  "/super_dashboard",
] as const;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/";
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (!isLoginPage && !isProtectedRoute) return NextResponse.next();

  const token = request.cookies.get("token")?.value;

  const isDev = process.env.NODE_ENV !== "production";
  if (isDev && pathname.startsWith("/cashier")) {
    return NextResponse.next();
  }

  if (isProtectedRoute) {
    if (!token) {
      if (isDev && pathname.startsWith("/cashier")) {
        const response = NextResponse.next();
        response.cookies.set("token", "dev-mock-token", {
          httpOnly: true,
          maxAge: 60 * 60 * 24, // 1 day
          path: "/",
        });
        return response;
      }
      return NextResponse.redirect(new URL("/", request.url));
    }

    const user = await getUser();
    if (!user) {
      if (isDev && pathname.startsWith("/cashier")) {
        return NextResponse.next();
      }
      const res = NextResponse.redirect(new URL("/", request.url));
      res.cookies.delete("token");
      return res;
    }

    return NextResponse.next();
  }

  if (isLoginPage) {
    if (token) {
      const user = await getUser();
      if (user) {
        const nextRoute = getRouteForRole(user.role);
        return NextResponse.redirect(new URL(nextRoute, request.url));
      }

      const res = NextResponse.next();
      res.cookies.delete("token");
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
