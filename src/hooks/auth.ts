import { getUser } from "@/actions/auth";
import { useAuthStore } from "@/stores/auth";
import { useEffect } from "react";

export function useLoadUser() {
	const setLoading = useAuthStore((state) => state.setLoading);
	const setUser = useAuthStore((state) => state.setUser);

	useEffect(() => {
		async function fetchAndLoadUser() {
			const user = await getUser();
			if (user) setUser(user);

			setLoading(false);
		}

		setLoading(true);
		fetchAndLoadUser();
	}, [setLoading, setUser]);
}
