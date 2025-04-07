"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import SearchBar from "@/components/UI/SearchBar";
import ProductTable from "@/components/UI/ProductTable";
import OrderSummary from "@/components/Order/OrderSummary";
import { Product } from "@/types/Product";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [orderProducts, setOrderProducts] = useState<Product[]>([]);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString());
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }
    // simulating product search
    const filteredProducts = [
      {
        id: 1,
        name: "Bread",
        barCode: "123456",
        unitPrice: 10,
        quantity: 1,
        coast: 10 * 1,
      },
      {
        id: 2,
        name: "chicken",
        barCode: "789012",
        unitPrice: 20,
        quantity: 2,
        coast: 20 * 2,
      },
      {
        id: 3,
        name: "thon rickamar",
        barCode: "345678",
        unitPrice: 15,
        quantity: 1,
        coast: 15 * 1,
      },
      {
        id: 4,
        name: "coffee",
        barCode: "345678",
        unitPrice: 15,
        quantity: 1,
        coast: 15 * 1,
      },
      {
        id: 5,
        name: "tea",
        barCode: "345678",
        unitPrice: 15,
        quantity: 1,
        coast: 15 * 1,
      },
      {
        id: 6,
        name: "Qantara water 5l",
        barCode: "345678",
        unitPrice: 15,
        quantity: 1,
        coast: 15 * 1,
      },
      {
        id: 7,
        name: "Guedila water 2l",
        barCode: "345678",
        unitPrice: 15,
        quantity: 1,
        coast: 15 * 1,
      },
      {
        id: 8,
        name: "Deglet Nour",
        barCode: "789012",
        unitPrice: 20,
        quantity: 2,
        coast: 20 * 2,
      },
    ].filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.barCode.includes(query)
    );
    setProducts(filteredProducts);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProducts([...selectedProducts, product]);
    setProducts(products.filter((p) => p.id !== product.id));
  };

  const handleProductDeselect = (productId: number) => {
    const deselectedProduct = selectedProducts.find((p) => p.id === productId);
    if (deselectedProduct) {
      setProducts([...products, deselectedProduct]);
      setSelectedProducts(selectedProducts.filter((p) => p.id !== productId));
    }
  };

  const handleAddToOrder = () => {
    if (selectedProducts.length === 0) return;
    const newOrderProducts = [...orderProducts];
    selectedProducts.forEach((product) => {
      const existingProduct = newOrderProducts.find((p) => p.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.coast =
          existingProduct.quantity * existingProduct.unitPrice;
      } else {
        newOrderProducts.push({ ...product });
      }
    });
    setOrderProducts(newOrderProducts);
    setSelectedProducts([]);
  };

  const handleRemoveProduct = (id: number) => {
    setOrderProducts(orderProducts.filter((product) => product.id !== id));
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
      orderProducts.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: newQuantity,
            coast: newQuantity * product.unitPrice,
          };
        }
        return product;
      })
    );
  };

  return (
    <div className="max-h-screen p-6 flex flex-col bg-[#0C0C0C]">
      <div className="flex justify-between mb-6 items-start">
        <Image
          src="/ShoppingCenter.svg"
          alt="ShoppingCenter Logo"
          width={260}
          height={160}
          priority
        />
        <div className="text-right">
          <div className="text-[#595959] text-sm">{currentTime}</div>
        </div>
      </div>

      <div className="flex gap-4 flex-1">
        <div className="flex-1 flex flex-col gap-6">
          <SearchBar onSearch={handleSearch} />
          <ProductTable
            products={products}
            selectedProducts={selectedProducts}
            onProductSelect={handleProductSelect}
            onProductDeselect={handleProductDeselect}
          />
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAddToOrder}
              className="px-4 py-2 bg-green-600/20 text-green-500 hover:bg-green-600/30 transition-colors rounded-md flex-1"
            >
              + ADD TO ORDER
            </button>
            <button
              onClick={handleUndo}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-600/20 text-yellow-500 hover:bg-yellow-600/30 transition-colors rounded-md flex-1"
            >
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
