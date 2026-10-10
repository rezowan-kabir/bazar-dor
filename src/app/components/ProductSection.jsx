import React from "react";
import ProductCard from "./ProductCard";

export default async function ProductSection() {
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
  const products = await res.json();

  const increasedProducts = products.filter((p) => p.change?.dir === "up");
  const decreasedProducts = products.filter((p) => p.change?.dir === "down");

  return (
    <div className="container mx-auto max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* today price up section */}
      <div>
        <h2 className="text-xl font-bold text-red-600 flex items-center gap-2 mb-4">
          <span>▲</span> আজ দাম বেড়েছে
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {increasedProducts.slice(0, 6).map((product) => (
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
          {decreasedProducts.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* all product section*/}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          সব পণ্য
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          মোট {products.length}টি পণ্য দেখানো হচ্ছে
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
