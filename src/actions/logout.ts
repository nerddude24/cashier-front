"use server";

import { API_URL } from "@/config";
import { cookies } from "next/headers";

export default async function logout() {
	const cookieStore = await cookies();
	const token = cookieStore.get("token")?.value;
	if (!token) return;

	const res = await fetch(`${API_URL}/logout`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	if (!res.ok)
		console.error(
			`Logout error, Code: ${res.status}, Message: ${res.statusText}, Token: ${token}`,
		);

	cookieStore.delete("token");
}
