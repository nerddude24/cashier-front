"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import SearchBar from "@/components/ui/SearchBar";
import ProductTable from "@/components/ui/ProductTable";
import OrderSummary from "@/components/order/OrderSummary";
import type { OrderProduct, Product } from "@/types/product";
import LogoutButton from "@/components/LogoutButton";
import { useAuthStore } from "@/stores/auth";
import searchProducts from "@/actions/search-products";

function useUpdateTime(
	setCurrentTime: React.Dispatch<React.SetStateAction<string>>,
) {
	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			setCurrentTime(now.toLocaleString());
		};
		updateTime();
		const timer = setInterval(updateTime, 1000);
		return () => clearInterval(timer);
	});
}

export default function Home() {
	const isLoadingUser = useAuthStore((state) => state.isLoading);
	const [selectedProducts, setSelectedProducts] = useState<OrderProduct[]>([]);
	const [searchedProducts, setSearchedProducts] = useState<Product[]>([]);
	const [orderProducts, setOrderProducts] = useState<OrderProduct[]>([]);
	const [currentTime, setCurrentTime] = useState<string>("");

	useUpdateTime(setCurrentTime);

	const handleSearch = async (query: string) => {
		if (!query.trim()) {
			setSearchedProducts([]);
			return;
		}

		const products = await searchProducts(query);
		if (!products) return;

		setSearchedProducts(products);
	};

	const handleProductSelect = (product: OrderProduct) => {
		if (selectedProducts.find((p) => p.product.id === product.product.id))
			return;

		setSelectedProducts([...selectedProducts, product]);
	};

	const handleProductDeselect = (productId: number) => {
		const deselectedProduct = selectedProducts.find(
			(p) => p.product.id === productId,
		);
		if (deselectedProduct) {
			setSelectedProducts(
				selectedProducts.filter((p) => p.product.id !== productId),
			);
		}
	};

	const handleAddToOrder = () => {
		if (selectedProducts.length === 0) return;
		const newOrderProducts = [...orderProducts];
		// biome-ignore lint/complexity/noForEach: <explanation>
		selectedProducts.forEach((product) => {
			const existingProduct = newOrderProducts.find(
				(p) => p.product.id === product.product.id,
			);
			if (existingProduct) {
				existingProduct.quantity += 1;
				existingProduct.coast =
					existingProduct.quantity * existingProduct.product.price;
			} else {
				newOrderProducts.push(product);
			}
		});
		setOrderProducts(newOrderProducts);
		setSelectedProducts([]);
	};

	const handleRemoveProduct = (id: number) => {
		setOrderProducts(orderProducts.filter((p) => p.product.id !== id));
	};

	const handleUndo = () => {
		if (orderProducts.length === 0) return;
		setOrderProducts(orderProducts.slice(0, -1));
	};

	const handleNewOrder = () => {
		setOrderProducts([]);
	};

	const handleQuantityChange = (productId: number, newQuantity: number) => {
		setOrderProducts(
			orderProducts.map((p) => {
				if (p.product.id === productId) {
					return {
						...p,
						quantity: newQuantity,
						coast: newQuantity * p.product.price,
					};
				}
				return p;
			}),
		);
	};

	if (isLoadingUser) return <div>Loading...</div>;

	return (
		<div className="max-h-screen p-6 flex flex-col bg-[#0C0C0C]">
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

			<div className="flex gap-4 flex-1">
				<div className="flex-1 flex flex-col gap-6">
					<SearchBar onSearch={handleSearch} />
					<ProductTable
						products={searchedProducts}
						selectedProducts={selectedProducts}
						onProductSelect={handleProductSelect}
						onProductDeselect={handleProductDeselect}
					/>
					<div className="flex gap-4 mt-4">
						<button
							type="button"
							onClick={handleAddToOrder}
							className="px-4 py-2 bg-green-600/20 text-green-500 hover:bg-green-600/30 transition-colors rounded-md flex-1"
						>
							+ ADD TO ORDER
						</button>
						<button
							type="button"
							onClick={handleUndo}
							className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-600/20 text-yellow-500 hover:bg-yellow-600/30 transition-colors rounded-md flex-1"
						>
							{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
							<svg
								width="21"
								height="16"
								viewBox="0 0 22 12"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M10.776 1.33333C8.0574 1.33333 5.59526 2.65333 3.69736 4.8L0.00415039 0V12H9.23717L5.52345 7.17333C6.94944 5.62667 8.76526 4.66667 10.776 4.66667C14.4077 4.66667 17.4956 7.74667 18.5728 12L21.0041 10.96C19.5782 5.37333 15.5464 1.33333 10.776 1.33333Z"
									fill="currentColor"
								/>
							</svg>
							UNDO LAST
						</button>
					</div>
				</div>
				<div className="w-[40vw]">
					<OrderSummary
						products={orderProducts}
						onRemoveProduct={handleRemoveProduct}
						onNewOrder={handleNewOrder}
						currentTime={currentTime}
						onQuantityChange={handleQuantityChange}
					/>
				</div>
			</div>
		</div>
	);
}
