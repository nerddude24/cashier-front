"use server";

import { API_URL } from "@/config";
import type { User } from "@/types/auth";

export async function getUser(token: string): Promise<User | null> {
	try {
		const res = await fetch(`${API_URL}/user`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		if (!res.ok) {
			return null;
		}

		const user = (await res.json()) as User;
		return user;
	} catch (err) {
		console.error(err);
		return null;
	}
}

export function getRouteForRole(role: User["role"]) {
	switch (role) {
		case "cashier":
			return "/cashier";
		case "manager":
			return "/manager_dashboard";
		case "admin":
			return "/super_dashboard";
	}
}
