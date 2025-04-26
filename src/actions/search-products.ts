"use server";

import { API_URL } from "@/config";
import type { Product } from "@/types/product";
import { cookies } from "next/headers";

export default async function searchProducts(
	query: string,
): Promise<Product[] | null> {
	const token = (await cookies()).get("token")?.value;
	if (!token) return null;

	try {
		const res = await fetch(`${API_URL}/search?search=${query}`, {
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

		const { products } = await res.json();
		return products as Product[];
	} catch (error) {
		console.error(error);
		return null;
	}
}
