import React from "react";
import type { OrderProduct, Product } from "@/types/product";

interface ProductTableProps {
  products: Product[];
  onProductSelect: (product: OrderProduct) => void;
}

export default function ProductTable({
  products,
  onProductSelect,
}: ProductTableProps) {
  return (
    <div className="w-full font-mono flex flex-col gap-4">
      <div className="flex-1">
        <div className="text-[#595959] mb-2">
          Search Results{" "}
          <span className="text-xs">(click to add to order)</span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-[#fff] mb-2 px-4 py-2 border-b border-[#595959]/20">
          <div className="font-semibold">PRODUCT NAME</div>
          <div className="font-semibold">UNIT PRICE</div>
        </div>
        <div className="space-y-1">
          {products.map((p) => (
            <div
              key={p.id}
              onClick={() =>
                onProductSelect({ product: p, quantity: 1, coast: p.price })
              }
              className="grid grid-cols-2 gap-4 text-white px-4 py-2 hover:bg-white/5 transition-colors rounded cursor-pointer">
              <div className="truncate">{p.name}</div>
              <div>${p.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
        {products.length === 0 && (
          <div className="text-center text-[#595959] py-8">
            No products found
          </div>
        )}
      </div>
    </div>
  );
}
