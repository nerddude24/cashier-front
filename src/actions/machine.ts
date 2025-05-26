"use server";

import { API_URL } from "@/config";
import { extractStrings } from "@/lib/utils";
import type { Machine } from "@/types/entities";
import { cookies } from "next/headers";

export async function getMachines(): Promise<Machine[] | null> {
	const token = (await cookies()).get("token")?.value;
	if (!token) return null;

	try {
		const res = await fetch(`${API_URL}/user/cashRegisters`, {
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
		return data.cashRegisters as Machine[];
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function addMachine(): Promise<string[] | null> {
	const token = (await cookies()).get("token")?.value;
	if (!token) return ["Invalid token! please refresh the page."];

	try {
		const res = await fetch(`${API_URL}/user/addCashRegister`, {
			method: "POST",
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

		console.log("Machine added successfully");
		return null;
	} catch (error) {
		console.error(error);
		return [`${error}`];
	}
}

export async function removeMachine(id: number): Promise<string[] | null> {
	const token = (await cookies()).get("token")?.value;
	if (!token) return ["Invalid token! please refresh the page."];

	try {
		const res = await fetch(`${API_URL}/user/cashRegisters/${id}`, {
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

		console.log("Machine removed successfully");
		return null;
	} catch (error) {
		console.error(error);
		return [`${error}`];
	}
}
