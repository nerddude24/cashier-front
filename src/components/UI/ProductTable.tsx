import React from "react";

interface Product {
  name: string;
  barCode: string;
  unitPrice: number;
  quantity: number;
  coast: number;
}

interface ProductTableProps {
  products: Product[];
}

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="w-full font-mono">
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
