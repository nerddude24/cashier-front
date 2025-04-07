import React from "react";
import Image from "next/image";

interface OrderProduct {
  id: number;
  name: string;
  barCode: string;
  unitPrice: number;
  quantity: number;
  coast: number;
}

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


  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-6 print:p-0 print:bg-[#232323] z-100">
      <div className=" bg-[#1a1a1a] rounded-lg w-full max-w-2xl p-8 print:p-4 print:max-w-none">
        <div className="flex justify-between items-start mb-6 print:mb-4">
          <div className="relative w-[200px] h-[120px]">
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

        <div className="mb-6 print:mb-4">
          <div className="grid grid-cols-6 p-2 bg-[#232323] text-sm mb-2 text-left items-center gap-2 font-semibold">
            <div>N</div>
            <div>PRODUCT NAME</div>
            <div>BAR CODE</div>
            <div>UNIT PRICE</div>
            <div>QUANTITY</div>
            <div>TOTAL</div>
          </div>
          {products.map((product, index) => (
            <div
              key={product.id}
              className="grid grid-cols-6 px-2 gap-2 text-sm mb-1 py-1 border-b"
            >
              <div>{index + 1}</div>
              <div className="receipt-table">{product.name}</div>
              <div>{product.barCode}</div>
              <div>${product.unitPrice.toFixed(2)}</div>
              <div>{product.quantity}</div>
              <div>${product.coast.toFixed(2)}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-baseline mb-8 print:mb-4 pt-4">
          <div className=" text-lg">TOTAL</div>
          <div className="text-4xl font-mono">${total.toFixed(2)}</div>
        </div>
        <h1 className="text-center text-l font-semibold mb-4 print:mb-2">
          <span className="text-red-500">IMPORTANT:</span> If you want to make a
          return, please keep this receipt.
        </h1>

        <div className="flex justify-center gap-4 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 border hover:bg-white/10 cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
