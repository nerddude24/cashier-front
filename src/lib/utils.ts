import type { User } from "@/types/auth";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getRouteForRole(role: User["role"]) {
	switch (role) {
		case "cashier":
			return "/cashier";
		case "manager":
			return "/manager";
	}
}

export function extractStrings(obj: unknown): string[] {
	const result: string[] = [];

	// biome-ignore lint/suspicious/noExplicitAny:
	function recurse(value: any) {
		if (typeof value === "string") {
			result.push(value);
		} else if (Array.isArray(value)) {
			for (const item of value) {
				recurse(item);
			}
		} else if (typeof value === "object" && value !== null) {
			for (const key in value) {
				if (Object.prototype.hasOwnProperty.call(value, key)) {
					recurse(value[key]);
				}
			}
		}
	}

	recurse(obj);
	return result;
}
