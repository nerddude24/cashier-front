"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import StaffManagement from "@/components/manager/StaffManagement";
import LogoutButton from "@/components/LogoutButton";

export default function Home() {
	const [currentTime, setCurrentTime] = useState<string>("");

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			setCurrentTime(now.toLocaleString());
		};
		updateTime();
		const timer = setInterval(updateTime, 1000);
		return () => clearInterval(timer);
	}, []);

	return (
		<>
			<div className="min-h-screen p-6 flex flex-col bg-[#0C0C0C]">
				<div className="flex justify-between mb-6 items-start">
					<div className="flex gap-2 items-center">
						<Image
							src="/ShoppingCenter.svg"
							alt="ShoppingCenter Logo"
							width={260}
							height={160}
							priority
						/>
						<LogoutButton />
					</div>
					<div className="text-right">
						<div className="text-[#595959] text-sm">{currentTime}</div>
					</div>
				</div>

				<div className="flex-1 h-[calc(100vh-200px)]">
					<div className="w-full max-w-6xl mx-auto">
						<StaffManagement />
					</div>
				</div>
			</div>
		</>
	);
}
