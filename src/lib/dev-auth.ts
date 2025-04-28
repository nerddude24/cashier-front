// This file provides mock authentication for development purposes
// It allows bypassing the login flow to directly access protected routes

import { cookies } from "next/headers";
import type { User } from "@/types/auth";

// Mock user with cashier role for development
export const mockCashierUser: User = {
  id: 999,
  name: "Dev Cashier",
  email: "dev@example.com",
  role: "cashier",
};

// Set a mock token in cookies for development
export async function setDevAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set("token", "dev-mock-token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 1, // 1 day
    path: "/",
    sameSite: "strict",
  });
}

// Mock function to replace getUser in development mode
export async function getDevUser(): Promise<User> {
  return mockCashierUser;
}
