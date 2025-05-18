"use server";

import type { User } from "@/types/auth";
import { API_URL } from "@/config";
import { z } from "zod";
import { cookies } from "next/headers";

const schema = z.object({
	name: z.string(),
	password: z.string(),
	cash_register_id: z.string().optional(),
});

type LoginActionState = {
	errors?: {
		name?: string[];
		password?: string[];
		cash_register_id?: string[];
	};
	role?: User["role"];
};

export default async function login(
	_: unknown,
	formData: FormData,
): Promise<LoginActionState> {
	const result = schema.safeParse(Object.fromEntries(formData));

	if (!result.success) {
		return { errors: result.error.flatten().fieldErrors };
	}

	const { name, password, cash_register_id } = result.data;
	const body:
		| {
				name: string;
				password: string;
		  }
		| {
				name: string;
				password: string;
				cash_register_id: string;
		  } = cash_register_id
		? { name, password, cash_register_id }
		: { name, password };

	try {
		const res = await fetch(`${API_URL}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		if (!res.ok) {
			console.error(
				`Login error, Code: ${res.status}, Message: ${res.statusText}`,
			);
			console.error(await res.json());

			return { errors: { name: ["Unknown error occurred"] } };
		}

		const data = await res.json();
		const { token, role } = data;

		// Set the token in cookies
		const cookieStore = await cookies();
		cookieStore.set("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 60 * 60 * 24 * 1, // 1 day
			path: "/",
			sameSite: "strict",
		});

		return { role };
	} catch (err) {
		console.error(`Login error: ${err}`);
		return { errors: { name: ["Unknown error occurred"] } };
	}
}
