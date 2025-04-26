"use server";

import { API_URL } from "@/config";
import type { Product } from "@/types/product";
import { cookies } from "next/headers";

export default async function searchProducts(
	value: string,
): Promise<Product[] | null> {
	const token = (await cookies()).get("token")?.value;
	if (!token) return null;

	try {
		const res = await fetch(`${API_URL}/search?q=${value}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		if (!res.ok) {
			console.error(res.statusText);
			return null;
		}

		const data = await res.json();
		console.log(data);
		return null;
	} catch (error) {
		console.error(error);
		return null;
	}
}
