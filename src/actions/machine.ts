"use server";

import { API_URL } from "@/config";
import type { Machine } from "@/types/entities";
import { cookies } from "next/headers";

export async function getMachines(): Promise<Machine[] | null> {
	const token = (await cookies()).get("token")?.value;
	if (!token) return null;

	try {
		const res = await fetch(`${API_URL}/user/cacheRegisters`, {
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


export async function addMachine(): Promise<boolean> {
	const token = (await cookies()).get("token")?.value;
	if (!token) return false;

	try {
		const res = await fetch(`${API_URL}/user/addCacheRegister`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
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

export async function removeMachine(id: number): Promise<boolean> {
	const token = (await cookies()).get("token")?.value;
	if (!token) return false;

	try {
		const res = await fetch(`${API_URL}/user/cacheRegisters/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		if (!res.ok) {
			console.error(res.statusText);
			console.error(await res.json());
			return false;
		}

		console.log("Machine removed successfully");
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}
