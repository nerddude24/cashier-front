import React from "react";
import { Product } from "@/types/Product";

interface ProductTableProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

export default function ProductTable({
  products,
  onProductSelect,
}: ProductTableProps) {
  return (
    <div className="w-full font-mono">
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
            key={index}
            onClick={() => {
              // Automatically add product to order with quantity 1
              const orderProduct = {
                ...product,
                quantity: 1,
                coast: product.unitPrice * 1,
              };
              onProductSelect(orderProduct);
            }}
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
        <div className="text-center text-[#595959] py-8">No products found</div>
      )}
    </div>
  );
}
