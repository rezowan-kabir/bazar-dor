import Image from "next/image";
import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";

export default function Home() {
  return (
    <div>
      <Hero />
      <main className="min-h-screen bg-gray-50">
        {/* আপনার আগের নেভবার বা মার্কি এখানে থাকবে */}
        <ProductSection />
      </main>
    </div>
  );
}
