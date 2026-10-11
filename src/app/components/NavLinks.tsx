import Link from "next/link";
import { notFound } from "next/navigation";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
  );
  const categories: Category[] = await res.json();
if (!categories) {
  notFound();
}
  return (
    <div className="container mx-auto   ">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-6 overflow-x-auto no-scrollbar scroll-smooth py-1">
          {categories?.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="flex items-center space-x-2 text-gray-800 font-medium text-sm sm:text-base whitespace-nowrap transition-colors duration-200 group flex-shrink-0"
            >
              <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                {category.icon}
              </span>
              <span>{category.nameBn}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavLinks;
