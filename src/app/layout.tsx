import "./globals.css";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="bg-[#0C0C0C] text-white max-w-[100vw] overflow-hidden dark">
				{children}
			</body>
		</html>
	);
}
