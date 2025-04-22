"use server";

import { API_URL } from "@/config";
import { z } from "zod";

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
	token?: string;
};

export default async function login(
	_: any,
	formData: FormData,
): Promise<LoginActionState> {
	const result = schema.safeParse(Object.fromEntries(formData));

	if (!result.success) {
		return { errors: result.error.flatten().fieldErrors };
	}

	const { name, password, cash_register_id } = result.data;
	const body = cash_register_id
		? { name, password, cash_register_id }
		: { name, password };

	try {
		const res = await fetch(`${API_URL}/login`, {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!res.ok) {
			if (res.status === 401)
				return { errors: { name: ["Invalid Credentials"] } };

			if (res.status === 400) {
				const { errors } = await res.json();
				return { errors };
			}

			console.error(
				`Login error, Code: ${res.status}, Message: ${res.statusText}`,
			);
			return { errors: { name: ["Unknown error occurred"] } };
		}

		const { token } = await res.json();
		return { token };
	} catch (err) {
		console.error(`Login error: ${err}`);
		return { errors: { name: ["Unknown error occurred"] } };
	}
}
