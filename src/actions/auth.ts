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

export async function login(formData: FormData): Promise<{
	error?: string;
	token?: string;
}> {
	try {
		const res = await fetch(`${API_URL}/login`, {
			method: "POST",
			body: formData,
		});

		if (!res.ok) {
			if (res.status === 401) return { error: "Invalid Credentials" };

			console.error(
				`Login error, Code: ${res.status}, Message: ${res.statusText}`,
			);
			return { error: "Unknown error Occurred" };
		}

		const { token } = await res.json();
		return { token };
	} catch (err) {
		console.error(`Login error: ${err}`);
		return { error: "Unknown error Occurred" };
	}
}
