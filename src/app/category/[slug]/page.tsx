import { notFound } from "next/navigation";
import CategoryProductList from "@/app/components/CategoryProductList";
import React from "react";

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
}

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${slug}`,
  );

  if (!res.ok) {
    throw new Error("এই ক্যাটাগরির পণ্য লোড করা যায়নি।");
  }

  const products: Product[] = await res.json();

  if (!Array.isArray(products)) {
    throw new Error("পণ্যের তালিকাটি সঠিক নয়।");
  }

  if (products.length === 0) {
    notFound();
  }

  const categoryName = products[0]?.categoryNameBn || slug;
  const categoryIcon = products[0]?.categoryIcon || "🛒";

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner">
            {categoryIcon}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {categoryName}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              মোট {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        <CategoryProductList products={products} />
      </div>
    </main>
  );
}

export const instant = false;
