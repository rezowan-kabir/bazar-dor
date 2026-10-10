import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Product {
  id: number;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products", );

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

const Marquee = async () => {
  const products = await getProducts();

  if (!products.length) {
    return null;
  }

  const unitLabels: Record<string, string> = {
    kg: "কেজি",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  return (
    <div className="border-y border-gray-200 bg-white text-gray-800">
      <div className="container mx-auto flex items-center overflow-hidden">
        

        <MarqueeText className="py-1" direction="right" duration={10}>
          {products.map((product) => {
            const isUp = product.change.dir === "up";
            const isDown = product.change.dir === "down";

            const arrow = isUp ? "▲" : isDown ? "▼" : "—";

            const color = isUp
              ? "text-red-500"
              : isDown
                ? "text-green-600"
                : "text-gray-500";

            return (
              <span
                key={product.id}
                className="inline-flex items-center gap-2 border-r border-gray-200 px-5 whitespace-nowrap"
              >
                <span>{product.image}</span>

                <span className="font-medium">{product.nameBn}</span>

                <span>
                  {product.today.toLocaleString("bn-BD")} টাকা/
                  {unitLabels[product.unit] ?? product.unit}
                </span>

                <span className={`font-semibold ${color}`}>
                  {arrow}{" "}
                  {product.change.pct.toLocaleString("bn-BD", {
                    maximumFractionDigits: 1,
                  })}
                  %
                </span>
              </span>
            );
          })}
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;
