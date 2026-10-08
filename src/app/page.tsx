import Banner from "@/components/Banner";
import ProductCard from "@/components/ProductCard";
import { RiPriceTag2Fill } from "react-icons/ri";

interface IChange {
  dir: "up" | "down";
  pct: number;
}

export interface IProduct {
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
  change: IChange;
}

export default async function Home() {
  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products")
  const data = await res.json()
  const newProducts: IProduct[] = data.filter(da => da.change?.dir === "up");
  const downProducts: IProduct[] = data.filter(down => down.change?.dir === "down")
  console.log(downProducts);
  return (
    <div className="bg-[#F0F5F0]">
      <div className="container mx-auto mt-5">
        <Banner />
        <div className=" mt-5">
          <h2 className="text-2xl font-bold flex gap-1 items-center"><RiPriceTag2Fill className="text-green-400" /> আজ দাম বেড়েছে</h2>
          <div className="grid grid-cols-3 gap-4 py-5">
            {
              newProducts.slice(0, 6).map(product => <div key={product.id}>
                <ProductCard product={product} />
              </div>)
            }
          </div>
          {/* down */}
          <div className="mt-5">
            <h2 className="text-2xl font-bold flex gap-1 items-center"><RiPriceTag2Fill className="text-red-600" /> আজ দাম কমেছে</h2>
            <div className="grid grid-cols-3 gap-4 my-4 ">
              {
                downProducts.slice(0, 6).map(product => <div key={product.id}>
                  <ProductCard product={product} />
                </div>)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
