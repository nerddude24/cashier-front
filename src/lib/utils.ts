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
