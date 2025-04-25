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

		console.log(res);

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
