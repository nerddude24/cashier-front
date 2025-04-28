import React, { useState } from "react";
import Receipt from "./Receipt";
import type { OrderProduct } from "@/types/product";

interface OrderSummaryProps {
	products: OrderProduct[];
	onRemoveProduct: (id: number) => void;
	onNewOrder?: () => void;
	currentTime: string;
	onQuantityChange?: (productId: number, newQuantity: number) => void;
}

export default function OrderSummary({
	products,
	onRemoveProduct,
	onNewOrder,
	currentTime,
	onQuantityChange,
}: OrderSummaryProps) {
	const total = products.reduce((sum, product) => sum + product.coast, 0);
	const [showReceipt, setShowReceipt] = useState(false);

	return (
    <div className="w-full h-full flex flex-col border border-[#595959]/45 p-4 relative">
      <div className="flex justify-between items-baseline mb-4">
        <div className="text-[#595959] text-sm">TOTAL</div>
        <div className="text-8xl font-mono">{total.toFixed(2)}</div>
      </div>
      <div className="flex flex-row gap-4">
        <button
          type="button"
          onClick={() => setShowReceipt(true)}
          className="p-2 w-full mb-4 border rounded-md border-[#595959]/45 text-[#595959] hover:border-white/50 hover:text-white transition-colors flex items-center justify-center gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19 8H5C3.34 8 2 9.34 2 11V17H6V21H18V17H22V11C22 9.34 20.66 8 19 8ZM16 19H8V14H16V19ZM19 12C18.45 12 18 11.55 18 11C18 10.45 18.45 10 19 10C19.55 10 20 10.45 20 11C20 11.55 19.55 12 19 12ZM18 3H6V7H18V3Z"
              fill="currentColor"
            />
          </svg>
          PRINT ORDER
        </button>
        {showReceipt && (
          <Receipt
            products={products}
            currentTime={currentTime}
            onClose={() => setShowReceipt(false)}
            onQuantityChange={onQuantityChange}
          />
        )}
      </div>
      <div className="flex-1 overflow-auto mb-12">
        <div className="grid grid-cols-5 p-2 bg-[#232323] text-sm mb-2 text-left py-2 gap-2">
          <div>N</div>
          <div className="receipt-table">PRODUCT NAME</div>
          <div>UNIT PRICE</div>
          <div>QUANTITY</div>
          <div>COAST</div>
        </div>
        {products.map((p, index) => (
          <div
            key={p.product.id}
            className="grid grid-cols-5 items-center text-white text-sm mb-1 group">
            <div className="flex items-center py-1 gap-2">
              <button
                onClick={() => onRemoveProduct(p.product.id)}
                className="opacity-0 group-hover:opacity-100 mr-1 text-red-500 hover:text-red-400 transition-opacity">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
              {index + 1}
            </div>
            <div className="relative left-[-40px] w-[120px]">
              {p.product.name}
            </div>
            <div>{p.product.price}</div>
            <div className="flex items-center gap-2">
              <span>{p.quantity}</span>
              {onQuantityChange && (
                <div className="flex flex-col">
                  <button
                    onClick={() =>
                      onQuantityChange(p.product.id, p.quantity + 1)
                    }
                    className="hover:text-blue-500 transition-colors">
                    ▲
                  </button>
                  <button
                    onClick={() =>
                      onQuantityChange(
                        p.product.id,
                        Math.max(1, p.quantity - 1)
                      )
                    }
                    className="hover:text-blue-500 transition-colors">
                    ▼
                  </button>
                </div>
              )}
            </div>
            <div>{p.coast}</div>
          </div>
        ))}
      </div>
      {products.length > 0 && (
        <div className="absolute bottom-4 right-4 text-yellow-500 text-sm flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
              fill="currentColor"
            />
          </svg>
          A Purchase order pending
        </div>
      )}
      <button
        onClick={onNewOrder}
        className="absolute bottom-4 left-4 text-blue-500 hover:text-blue-400 transition-colors p-2 border-1 rounded-l border-blue-500 flex items-center gap-2">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"
            fill="currentColor"
          />
        </svg>
        NEW ORDER
      </button>
    </div>
  );
}
