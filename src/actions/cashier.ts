"use server";

import { API_URL } from "@/config";
import { extractStrings } from "@/lib/utils";
import type { Cashier } from "@/types/entities";
import { cookies } from "next/headers";

export async function getCashiers(): Promise<Cashier[] | null> {
	const token = (await cookies()).get("token")?.value;
	if (!token) return null;

	try {
		const res = await fetch(`${API_URL}/user/cashiers`, {
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
		return data.Cashiers as Cashier[];
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function addCashier(
	newCashier: Cashier,
): Promise<string[] | null> {
	const token = (await cookies()).get("token")?.value;
	if (!token) return ["Invalid token! please refresh the page."];

	try {
		const res = await fetch(`${API_URL}/user/addCashier`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
			},
			body: JSON.stringify(newCashier),
		});

		if (!res.ok) {
			console.error(res.statusText);
			const errors = await res.json();
			console.error(errors);
			return extractStrings(errors);
		}

		console.log("Cashier added successfully");
		return null;
	} catch (error) {
		console.error(error);
		return [`${error}`];
	}
}

export async function removeCashier(id: number): Promise<string[] | null> {
	const token = (await cookies()).get("token")?.value;
	if (!token) return ["Invalid token! please refresh the page."];

	try {
		const res = await fetch(`${API_URL}/user/cashiers/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		if (!res.ok) {
			console.error(res.statusText);
			const errors = await res.json();
			console.error(errors);
			return extractStrings(errors);
		}

		console.log("Cashier removed successfully");
		return null;
	} catch (error) {
		console.error(error);
		return [`${error}`];
	}
}
