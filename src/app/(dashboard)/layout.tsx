"use client";

import { useLoadUser } from "@/hooks/auth";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	useLoadUser();

	return children;
}
