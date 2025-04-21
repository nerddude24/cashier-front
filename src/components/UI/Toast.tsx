import React, { useEffect } from "react";

interface ToastProps {
	message: string;
	isVisible: boolean;
	onClose: () => void;
	duration?: number;
}

export default function Toast({
	message,
	isVisible,
	onClose,
	duration = 3000,
}: ToastProps) {
	useEffect(() => {
		if (isVisible) {
			const timer = setTimeout(() => {
				onClose();
			}, duration);

			return () => clearTimeout(timer);
		}
	}, [isVisible, duration, onClose]);

	if (!isVisible) return null;

	return (
		<div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
			<div className="bg-[#232323] text-white px-6 py-3 rounded-lg shadow-lg border border-[#595959]/45 flex items-center gap-3">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="text-yellow-500"
				>
					<path
						d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
						fill="currentColor"
					/>
				</svg>
				{message}
			</div>
		</div>
	);
}
