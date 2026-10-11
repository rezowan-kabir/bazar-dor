import React from "react";
import ProductCard from "./ProductCard";



export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets?: string[];
}

export default async function ProductSection() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );

  if (!res.ok) {
    throw new Error("পণ্যের তালিকা লোড করা যায়নি।");
  }

  const products: Product[] = await res.json();

  if (!Array.isArray(products)) {
    throw new Error("পণ্যের তালিকাটি সঠিক নয়।");
  }

  const increasedProducts = products
    .filter((product) => product.change?.dir === "up")
    .sort(
      (first, second) =>
        Math.abs(second.change.pct) - Math.abs(first.change.pct),
    )
    .slice(0, 6);
  const decreasedProducts = products
    .filter((product) => product.change?.dir === "down")
    .sort(
      (first, second) =>
        Math.abs(second.change.pct) - Math.abs(first.change.pct),
    )
    .slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* today price up section */}
      <div>
        <h2 className="text-xl font-bold text-red-600 flex items-center gap-2 mb-4">
          <span>▲</span> আজ দাম বেড়েছে
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {increasedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* today price down section */}
      <div>
        <h2 className="text-xl font-bold text-green-600 flex items-center gap-2 mb-4">
          <span>▼</span> আজ দাম কমেছে
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {decreasedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* all products section */}
      <section id="products">
        <h2 className="text-xl font-bold text-gray-900 mb-1">সব পণ্য</h2>
        <p className="text-sm text-gray-500 mb-4">
          মোট {products.length}টি পণ্য দেখানো হচ্ছে
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
