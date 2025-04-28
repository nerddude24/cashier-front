"use client";

import type { Product } from "@/types/product";

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "chicken",
    price: 9.99,
  },
  {
    id: 2,
    name: "tomatos",
    price: 699.99,
  },
  {
    id: 3,
    name: "batata",
    price: 129.99,
  },
  {
    id: 4,
    name: "djasser",
    price: 999.99,
  },
  {
    id: 5,
    name: "produit w khlas",
    price: 3.99,
  },
  {
    id: 6,
    name: "coffee",
    price: 2.49,
  },
];

export default async function searchProducts(
  query: string
): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  const normalizedQuery = query.toLowerCase();
  return sampleProducts.filter((product) =>
    product.name.toLowerCase().includes(normalizedQuery)
  );
}
