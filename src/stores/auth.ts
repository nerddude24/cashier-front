import type { User } from "@/types/auth";
import { create } from "zustand";

type AuthState = {
	user: User | null;
	isLoading: boolean;
	setUser: (user: User | null) => void;
	setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	isLoading: true,
	setUser: (user) => set({ user: user, isLoading: false }),
	setLoading: (loading) => set({ isLoading: loading }),
}));
