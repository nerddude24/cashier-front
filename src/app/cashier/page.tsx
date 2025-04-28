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
  setCurrentTime: React.Dispatch<React.SetStateAction<string>>
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
    const newOrderProducts = [...orderProducts];
    const existingProduct = newOrderProducts.find(
      (p) => p.product.id === product.product.id
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
      existingProduct.coast =
        existingProduct.quantity * existingProduct.product.price;
    } else {
      newOrderProducts.push(product);
    }
    setOrderProducts(newOrderProducts);
  };

  const handleRemoveProduct = (id: number) => {
    setOrderProducts(orderProducts.filter((p) => p.product.id !== id));
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
      })
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
        </div>

        <div className="text-right">
          <div className="text-[#595959] text-sm mb-8">{currentTime}</div>
          <LogoutButton className="cursor-pointer"/>
        </div>
      </div>

      <div className="flex gap-4 flex-1">
        <div className="flex-1 flex flex-col gap-6">
          <SearchBar onSearch={handleSearch} />
          <ProductTable
            products={searchedProducts}
            onProductSelect={handleProductSelect}
          />
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
