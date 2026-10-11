"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export default function CategoryLinks({
  categories,
}: {
  categories: Category[];
}) {
  const pathname = usePathname();

  return (
    <nav aria-label="পণ্যের ক্যাটাগরি" className="container mx-auto">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-6 overflow-x-auto no-scrollbar scroll-smooth py-1">
          {categories.map((category) => {
            const isActive = pathname === `/category/${category.slug}`;

            return (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                aria-current={isActive ? "page" : undefined}
                className={`flex shrink-0 items-center space-x-2 whitespace-nowrap text-sm font-medium transition-colors duration-200 sm:text-base ${
                  isActive
                    ? "text-green-700 underline decoration-2 underline-offset-8"
                    : "text-gray-800 hover:text-green-700"
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
