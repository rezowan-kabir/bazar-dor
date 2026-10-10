import Link from "next/link";
import React from "react";



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

export default function ProductCard({ product }: { product: Product }) {
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  return (
    <Link href={`/product/${product.slug}`} className="block">
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:border-green-600 hover:shadow-md flex items-center justify-between cursor-pointer">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl">
            {product.image || product.categoryIcon}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-base">
              {product.nameBn}
            </h3>
            <p className="text-xs text-gray-500">
              প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-lg font-bold text-gray-900">
            {product.today} <span className="text-sm font-normal">টাকা</span>
          </p>
          <div
            className={`text-xs font-semibold flex items-center justify-end space-x-1 ${
              isUp
                ? "text-red-600"
                : isDown
                  ? "text-green-600"
                  : "text-gray-500"
            }`}
          >
            <span>{isUp ? "▲" : isDown ? "▼" : "•"}</span>
            <span>{product.change?.pct}%</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
