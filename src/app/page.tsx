import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";

export const instant = false;

export default function Home() {
  return (
    <div>
      <Hero />
      <main className="min-h-screen bg-gray-50">
        <ProductSection />
      </main>
    </div>
  );
}
