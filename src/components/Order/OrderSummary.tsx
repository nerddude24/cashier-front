import React from 'react';

interface OrderProduct {
  id: number;
  name: string;
  barCode: string;
  unitPrice: number;
  quantity: number;
  coast: number;
}

interface OrderSummaryProps {
  products: OrderProduct[];
  onRemoveProduct: (id: number) => void;
  onNewOrder?: () => void;
}

export default function OrderSummary({ products, onRemoveProduct, onNewOrder }: OrderSummaryProps) {
  const total = products.reduce((sum, product) => sum + product.coast, 0);

  return (
    <div className="w-full h-full flex flex-col border border-[#595959]/45 p-4 relative">
      <div className="flex justify-between items-baseline mb-4">
        <div className="text-[#595959] text-sm">TOTAL</div>
        <div className="text-8xl font-mono">{total.toFixed(2)}</div>
      </div>
      <div className="flex flex-row gap-4">
        <button className="px-4 py-2 mb-4 border rounded-md border-[#595959]/45 text-[#595959] hover:border-white/50 hover:text-white transition-colors flex items-center justify-center gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V12H20V18ZM20 8H4V6H20V8Z"
              fill="currentColor"
            />
          </svg>
          PAY USING CARD
        </button>
        <button className="w-full px-4 py-2 mb-4 border rounded-md border-[#595959]/45 text-[#595959] hover:border-white/50 hover:text-white transition-colors flex items-center justify-center gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8H5C3.34 8 2 9.34 2 11V17H6V21H18V17H22V11C22 9.34 20.66 8 19 8ZM16 19H8V14H16V19ZM19 12C18.45 12 18 11.55 18 11C18 10.45 18.45 10 19 10C19.55 10 20 10.45 20 11C20 11.55 19.55 12 19 12ZM18 3H6V7H18V3Z"
              fill="currentColor"
            />
          </svg>
          PRINT ORDER
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-6 p-2 bg-[#232323] text-sm mb-2 text-left items-center gap-2">
          <div>N</div>
          <div>PRODUCT NAME</div>
          <div>BAR CODE</div>
          <div>UNIT PRICE</div>
          <div>QUANTITY</div>
          <div>COAST</div>
        </div>
        {products.map((product, index) => (
          <div
            key={product.id}
            className="grid grid-cols-6 gap-2 text-white text-sm mb-1 group"
          >
            <div className="flex items-center gap-2">
              <button
                onClick={() => onRemoveProduct(product.id)}
                className="opacity-0 group-hover:opacity-100 mr-1 text-red-500 hover:text-red-400 transition-opacity"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
              {index + 1}
            </div>
            <div>{product.name}</div>
            <div>{product.barCode}</div>
            <div>{product.unitPrice}</div>
            <div>{product.quantity}</div>
            <div>{product.coast}</div>
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
            xmlns="http://www.w3.org/2000/svg"
          >
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
        className="absolute bottom-4 left-4 text-blue-500 hover:text-blue-400 transition-colors flex items-center gap-2"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
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