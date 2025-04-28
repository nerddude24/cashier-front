import { NextResponse } from "next/server";

export function middleware() {
  const response = NextResponse.redirect(
    new URL(
      "/cashier",
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    )
  );

  response.cookies.set("token", "dev-bypass-token", {
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });

  return response;
}
export const config = {
  matcher: "/dev-bypass",
};
