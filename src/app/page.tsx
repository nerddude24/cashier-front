"use client";

import login from "@/actions/login";
import { Button } from "@/components/ui/button";
import { FormItem } from "@/components/ui/form_item";
import { getRouteForRole } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<Button disabled={pending} className="w-full cursor-pointer mt-8">
			Submit
		</Button>
	);
}

export default function Page() {
	const [state, loginAction] = useActionState(login, undefined);
	const router = useRouter();

	useEffect(() => {
		if (!state?.role) return;

		router.push(getRouteForRole(state.role));
	}, [state?.role, router]);

	return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <form
        action={loginAction}
        className="flex flex-col w-full max-w-md gap-4 border border-gray-500 rounded-md p-10 ">
        <h1 className="text-4xl text-center font-bold">Login</h1>
        <FormItem name="name" label="Name" errors={state?.errors?.name} />
        <FormItem
          name="password"
          label="Password"
          errors={state?.errors?.password}
        />
        <FormItem
          name="cash_register_id"
          label="Cash Register ID"
          placeholder="For cashiers only"
          errors={state?.errors?.cash_register_id}
          isOptional
        />

        <SubmitButton />
      </form>
    </main>
  );
}
