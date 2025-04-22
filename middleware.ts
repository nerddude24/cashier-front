import { getRouteForRole, getUser } from "@/actions/auth";
import { type NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = [
	"/cashier",
	"/manager_dashboard",
	"/super_dashboard",
] as const;

export default async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const isLoginPage = pathname === "/";
	const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
		pathname.startsWith(route),
	);
	const token = request.cookies.get("token")?.value;

	if (isProtectedRoute) {
		if (!token) return NextResponse.redirect(new URL("/", request.url));

		// there is a token, check if it is valid
		const user = await getUser(token);
		if (!user) {
			const res = NextResponse.redirect(new URL("/", request.url));
			res.cookies.delete("token");
			return res;
		}

		return NextResponse.next();
	}

	if (isLoginPage) {
		if (token) {
			const user = await getUser(token);
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

// Specify which paths middleware should run on
export const config = {
	matcher: ["/", ...PROTECTED_ROUTES],
};
