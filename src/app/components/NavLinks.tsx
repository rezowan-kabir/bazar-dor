import CategoryLinks from "./CategoryLinks";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export default async function NavLinks() {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
  );

  if (!response.ok) {
    throw new Error("ক্যাটাগরির তালিকা লোড করা যায়নি।");
  }

  const categories: Category[] = await response.json();

  if (!Array.isArray(categories)) {
    throw new Error("ক্যাটাগরির তালিকাটি সঠিক নয়।");
  }

  if (categories.length === 0) {
    throw new Error("কোনো ক্যাটাগরি পাওয়া যায়নি।");
  }

  return <CategoryLinks categories={categories} />;
}
