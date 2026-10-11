"use client";

import { useState } from "react";
import ProductCard, { type Product } from "./ProductCard";

type SortOrder = "default" | "low-to-high" | "high-to-low";

function getPriceAsNumber(price: number | string) {
  const bengaliDigits = "০১২৩৪৫৬৭৮৯";
  const englishPrice = String(price)
    .replace(/[০-৯]/g, (digit) => String(bengaliDigits.indexOf(digit)))
    .replace(/[^\d.-]/g, "");

  return Number(englishPrice);
}

export default function CategoryProductList({
  products,
}: {
  products: Product[];
}) {
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");
  const sortedProducts = [...products];

  if (sortOrder === "low-to-high") {
    sortedProducts.sort(
      (first, second) =>
        getPriceAsNumber(first.today) - getPriceAsNumber(second.today),
    );
  }

  if (sortOrder === "high-to-low") {
    sortedProducts.sort(
      (first, second) =>
        getPriceAsNumber(second.today) - getPriceAsNumber(first.today),
    );
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 px-1 text-sm text-gray-600">
        <p>মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে</p>

        <label className="flex items-center gap-2">
          <span>সাজান:</span>
          <span className="relative">
            <select
              value={sortOrder}
              onChange={(event) =>
                setSortOrder(event.target.value as SortOrder)
              }
              className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-9 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low-to-high">দাম: কম থেকে বেশি</option>
              <option value="high-to-low">দাম: বেশি থেকে কম</option>
            </select>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
            >
              ▼
            </span>
          </span>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
