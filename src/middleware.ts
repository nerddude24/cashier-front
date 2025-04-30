import { getUser } from "@/actions/auth";
import { getRouteForRole } from "@/lib/utils";
import { type NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/cashier", "/manager_dashboard"] as const;

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const isLoginPage = pathname === "/";
	const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
		pathname.startsWith(route),
	);

	if (!isLoginPage && !isProtectedRoute) return NextResponse.next();

	const token = request.cookies.get("token")?.value;

	if (isProtectedRoute) {
		if (!token) return NextResponse.redirect(new URL("/", request.url));

		// there is a token, check if it is valid
		const user = await getUser();
		if (!user) {
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

			// else if token is invalid, delete it
			const res = NextResponse.next();
			res.cookies.delete("token");
			return res;
		}
	}

	return NextResponse.next();
}

// Run on all routes except for internal Next.js routes
export const config = {
	matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
