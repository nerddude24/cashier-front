"use server";

import { API_URL } from "@/config";
import type { ApiOrderProduct } from "@/types/product";
import { cookies } from "next/headers";

export default async function confirmOrder(products: ApiOrderProduct[]) {
	const token = (await cookies()).get("token")?.value;
	if (!token) return;

	try {
		const res = await fetch(`${API_URL}/ticket`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ payment_method: "cash", products }),
		});

		const data = await res.json();

		if (!res.ok) {
			console.error(res.statusText);
			console.error(data);
			return;
		}

		console.log("Order confirmed successfully");
	} catch (error) {
		console.error(error);
	}
}
