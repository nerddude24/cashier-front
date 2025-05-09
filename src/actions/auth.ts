"use server";

import { API_URL } from "@/config";
import type { User } from "@/types/auth";
import { cookies } from "next/headers";

export async function getUser(): Promise<User | null> {
	const token = (await cookies()).get("token")?.value;
	if (!token) return null;

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

		const { user }: { user: User } = await res.json();
		return user;
	} catch (err) {
		console.error(err);
		return null;
	}
}
