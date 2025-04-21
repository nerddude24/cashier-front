import React from "react";
import type { Product } from "@/types/Product";

interface ProductTableProps {
	products: Product[];
	selectedProducts: Product[];
	onProductSelect: (product: Product) => void;
	onProductDeselect: (productId: number) => void;
}

export default function ProductTable({
	products,
	selectedProducts,
	onProductSelect,
	onProductDeselect,
}: ProductTableProps) {
	return (
		<div className="w-full font-mono flex flex-col gap-4">
			<div className="flex-1">
				<div className="text-[#595959] mb-2">Search Results</div>
				<div className="grid grid-cols-5 gap-4 text-[#fff] mb-2 px-4 py-2 border-b border-[#595959]/20">
					<div className="font-semibold">PRODUCT NAME</div>
					<div className="font-semibold">BAR CODE</div>
					<div className="font-semibold">UNIT PRICE</div>
					<div className="font-semibold">QUANTITY</div>
					<div className="font-semibold">COAST</div>
				</div>
				<div className="space-y-1">
					{products.map((product, index) => (
						<div
							key={product.name}
							onClick={() => onProductSelect(product)}
							className="grid grid-cols-5 gap-4 text-white px-4 py-2 hover:bg-white/5 transition-colors rounded cursor-pointer"
						>
							<div className="truncate">{product.name}</div>
							<div className="font-mono">{product.barCode}</div>
							<div>${product.unitPrice.toFixed(2)}</div>
							<div>{product.quantity}</div>
							<div>${product.coast.toFixed(2)}</div>
						</div>
					))}
				</div>
				{products.length === 0 && (
					<div className="text-center text-[#595959] py-8">
						No products found
					</div>
				)}
			</div>

			<div className="flex-1 border-l border-[#595959]/20 pl-4">
				<div className="text-[#595959] mb-2">Selected Products</div>
				<div className="grid grid-cols-5 gap-4 text-[#fff] mb-2 px-4 py-2 border-b border-[#595959]/20">
					<div className="font-semibold">PRODUCT NAME</div>
					<div className="font-semibold">BAR CODE</div>
					<div className="font-semibold">UNIT PRICE</div>
					<div className="font-semibold">QUANTITY</div>
					<div className="font-semibold">COAST</div>
				</div>
				<div className="space-y-1">
					{selectedProducts.map((product, index) => (
						<div
							key={product.name}
							className="grid grid-cols-5 gap-4 text-white px-4 py-2 group relative"
						>
							<div className="truncate">{product.name}</div>
							<div className="font-mono">{product.barCode}</div>
							<div>${product.unitPrice.toFixed(2)}</div>
							<div>{product.quantity}</div>
							<div>${product.coast.toFixed(2)}</div>
							<button
								type="button"
								onClick={() => onProductDeselect(index)}
								className="absolute right-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400 transition-all"
							>
								×
							</button>
						</div>
					))}
				</div>
				{selectedProducts.length === 0 && (
					<div className="text-center text-[#595959] py-8">
						No products selected
					</div>
				)}
			</div>
		</div>
	);
}
