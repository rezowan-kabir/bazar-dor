import Link from "next/link";
import React from "react";

export const instant = false;

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: Market[];
}

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;

  // প্রোডাক্টস লিস্ট ফেচ করে নির্দিষ্ট slug মেলানো
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
  const products: Product[] = await res.json();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">পণ্যটি পাওয়া যায়নি।</p>
      </div>
    );
  }

  // বাজারের সর্বনিম্ন, সর্বোচ্চ এবং গড় হিসাব করা
  const markets = product.markets || [];
  const minPrice =
    markets.length > 0 ? Math.min(...markets.map((m) => m.min)) : product.today;
  const maxPrice =
    markets.length > 0 ? Math.max(...markets.map((m) => m.max)) : product.today;
  const avgPrice =
    markets.length > 0
      ? (
          markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0) /
          markets.length
        ).toFixed(2)
      : product.today;

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const priceDiff = Math.abs(product.today - product.yesterday);

  const toBanglaNumber = (value: number | string) =>
    String(value).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);

  return (
    <main className="min-h-screen bg-[#f7f8f6] py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs sm:text-sm text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-gray-800">
            হোম
          </Link>
          <span>›</span>
          <Link
            href={`/category/${product.category}`}
            className="hover:text-gray-800"
          >
            {product.categoryNameBn}
          </Link>
          <span>›</span>
          <span className="text-gray-900 font-medium">{product.nameBn}</span>
        </nav>

        {/* Product Hero Banner */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl shadow-inner">
              {product.image || product.categoryIcon}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {product.nameBn}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                প্রতি {product.unit === "kg" ? "কেজি" : product.unit} -{" "}
                {product.categoryNameBn}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                গতকালকের তুলনায় আজ দাম{" "}
                <span className="font-semibold text-gray-800">
                  {isUp ? "বেড়েছে" : isDown ? "কমেছে" : "একই আছে"}
                </span>{" "}
                · {toBanglaNumber(priceDiff)} টাকা
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-right w-full sm:w-auto">
            <p className="text-xs text-gray-500">আজকের দাম</p>
            <p className="text-3xl font-extrabold text-gray-900 mt-0.5">
              {toBanglaNumber(product.today)}
            </p>
            <p className="text-xs text-gray-500">
              টাকা / {product.unit === "kg" ? "কেজি" : product.unit}
            </p>
            <div
              className={`text-xs font-bold mt-1 flex items-center justify-end gap-1 ${
                isUp
                  ? "text-red-600"
                  : isDown
                    ? "text-green-600"
                    : "text-gray-500"
              }`}
            >
              <span>{isUp ? "▲" : isDown ? "▼" : "•"}</span>
              <span>{toBanglaNumber(product.change?.pct ?? 0)}%</span>
            </div>
          </div>
        </div>

        {/* Price Summary Cards */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            দামের সারসংক্ষেপ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-500 font-medium">সর্বনিম্ন দাম</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {toBanglaNumber(minPrice)} টাকা
              </p>
              <p className="text-xs text-gray-400 mt-1">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-500 font-medium">সর্বোচ্চ দাম</p>
              <p className="text-2xl font-bold text-red-600 mt-1">
                {toBanglaNumber(maxPrice)} টাকা
              </p>
              <p className="text-xs text-gray-400 mt-1">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-500 font-medium">গড় দাম</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {toBanglaNumber(avgPrice)} টাকা
              </p>
              <p className="text-xs text-gray-400 mt-1">প্রতি কেজি-এর হিসাবে</p>
            </div>
          </div>
        </div>

        {/* Market Price Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            বাজারভিত্তিক আজকের দাম
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 font-semibold bg-gray-50/50">
                  <th className="py-3 px-4">বাজার</th>
                  <th className="py-3 px-4">বিভাগ</th>
                  <th className="py-3 px-4">সর্বনিম্ন</th>
                  <th className="py-3 px-4">সর্বোচ্চ</th>
                  <th className="py-3 px-4">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {markets.map((m, index) => {
                  const mAvg = ((m.min + m.max) / 2).toFixed(2);
                  return (
                    <tr
                      key={index}
                      className="hover:bg-gray-50/80 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-medium text-gray-900">
                        {m.market}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">
                        {m.division}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-gray-900">
                        {toBanglaNumber(m.min)} টাকা
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-gray-900">
                        {toBanglaNumber(m.max)} টাকা
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-gray-900">
                        {toBanglaNumber(mAvg)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
