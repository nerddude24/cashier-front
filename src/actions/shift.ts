"use server";

import { API_URL } from "@/config";
import type { Shift } from "@/types/shift";
import { cookies } from "next/headers";

export async function getShifts(): Promise<Shift[] | null> {
	const token = (await cookies()).get("token")?.value;
	if (!token) return null;

	try {
		const res = await fetch(`${API_URL}/user/shifts`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		if (!res.ok) {
			console.error(res.statusText);
			console.error(await res.json());
			return null;
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
}
