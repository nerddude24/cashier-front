"use client";

import { useLoadUser } from "@/hooks/auth";

export default function CashierLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	useLoadUser();

	return children;
}
