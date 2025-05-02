"use server";

import { API_URL } from "@/config";
import { cookies } from "next/headers";

export async function addMachine(): Promise<boolean> {
	const token = (await cookies()).get("token")?.value;
	if (!token) return false;

	try {
		const res = await fetch(`${API_URL}/user/addCacheRegister`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});

		if (!res.ok) {
			console.error(res.statusText);
			console.error(await res.json());
			return false;
		}

		console.log("Machine added successfully");
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}
