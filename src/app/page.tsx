"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import SearchBar from "@/components/UI/SearchBar";
import ProductTable from "@/components/UI/ProductTable";
import OrderSummary from "@/components/Order/OrderSummary";
import type { Product } from "@/types/Product";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
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
    const newOrderProducts = [...orderProducts];
    const existingProduct = newOrderProducts.find((p) => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
      existingProduct.coast =
        existingProduct.quantity * existingProduct.unitPrice;
    } else {
      newOrderProducts.push({ ...product });
    }
    setOrderProducts(newOrderProducts);
    setProducts(products.filter((p) => p.id !== product.id));
  };

  const handleRemoveProduct = (id: number) => {
    setOrderProducts(orderProducts.filter((product) => product.id !== id));
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
