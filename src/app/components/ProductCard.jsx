import React from "react";

export default function ProductCard({ product }) {
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  return (
    <div className="container mx-auto flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-colors hover:text-green-600">
      <div className="flex items-center space-x-3">
        {/* Product Icon / Image */}
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
        {/* Percentage Change Tag */}
        <div
          className={`text-xs font-semibold flex items-center justify-end space-x-1 ${
            isUp ? "text-red-600" : isDown ? "text-green-600" : "text-gray-500"
          }`}
        >
          <span>{isUp ? "▲" : isDown ? "▼" : "•"}</span>
          <span>{product.change?.pct}%</span>
        </div>
      </div>
    </div>
  );
}
