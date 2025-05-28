import React from "react";
import Image from "next/image";
import type { ApiOrderProduct, OrderProduct } from "@/types/product";
import confirmOrder from "@/actions/confirm-order";

interface ReceiptProps {
	products: OrderProduct[];
	currentTime: string;
	onClose: () => void;
	onQuantityChange?: (productId: number, newQuantity: number) => void;
}

export default function Receipt({
	products,
	currentTime,
	onClose,
}: ReceiptProps) {
	const total = products.reduce((sum, product) => sum + product.coast, 0);

	const handleConfirmOrder = async () => {
		const apiOrderProducts: ApiOrderProduct[] = products.map((p) => ({
			id: p.product.id,
			name: p.product.name,
			price: p.product.price,
			quantity: p.quantity,
			subtotal: p.coast,
		}));

		await confirmOrder(apiOrderProducts);
		onClose();
	};

	return (
		<div className="fixed inset-0 bg-black/20 flex items-center justify-center p-6 z-100">
			<div className=" bg-[#1a1a1a] rounded-lg w-full max-w-2xl p-8">
				<div className="flex justify-between items-start">
					<div className="relative left-44 w-[220px] h-[140px]">
						<Image
							src="/ShoppingCenter.svg"
							alt="ShoppingCenter Logo"
							fill
							style={{ objectFit: "contain" }}
							priority
						/>
					</div>
					<div className="text-right">
						<div className="text-sm">{currentTime}</div>
					</div>
				</div>

				<div className="mb-6">
					<div className="grid grid-cols-5 p-2 bg-[#232323] text-sm mb-2 text-left items-center gap-2 font-semibold">
						<div>N</div>
						<div className="receipt-table">PRODUCT NAME</div>
						<div>UNIT PRICE</div>
						<div>QUANTITY</div>
						<div>TOTAL</div>
					</div>
					{products.map((p, index) => (
						<div
							key={p.product.id}
							className="grid grid-cols-5 px-2 gap-2 text-sm mb-1 py-1 border-b"
						>
							<div>{index + 1}</div>
							<div className="receipt-table">{p.product.name}</div>
							<div> DZD {p.product.price.toFixed(2)}</div>
							<div>{p.quantity}</div>
							<div> DZD {p.coast.toFixed(2)}</div>
						</div>
					))}
				</div>

				<div className="flex justify-between items-baseline mb-8 pt-4">
					<div className=" text-lg">TOTAL</div>
					<div className="text-4xl font-mono"> DZD {total.toFixed(2)}</div>
				</div>

				<div className="flex justify-center gap-4 ">
					<button
						type="button"
						onClick={handleConfirmOrder}
						className="px-4 py-2 border hover:bg-white/10 cursor-pointer transition-colors"
					>
						Confirm Order
					</button>
				</div>
			</div>
		</div>
	);
}
