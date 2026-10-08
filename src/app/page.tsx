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
    <div className="bg-[#F0F5F0] py-8">
      <div className="container mx-auto my-10">
        <Banner />
        <div className=" mt-10">
          <h2 className="text-2xl font-extrabold flex gap-1 items-center"><RiPriceTag2Fill className="text-green-400" /> আজ দাম বেড়েছে</h2>
          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 py-5">
            {/* up products */}
            {
              newProducts.slice(0, 6).map(product => <div key={product.id}>
                <ProductCard product={product} />
              </div>)
            }
          </div>
          {/* down products */}
          <div className="mt-5">
            <h2 className="text-2xl font-extrabold flex gap-1 items-center"><RiPriceTag2Fill className="text-red-600" /> আজ দাম কমেছে</h2>
            <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4 ">
              {
                downProducts.slice(0, 6).map(product => <div key={product.id}>
                  <ProductCard product={product} />
                </div>)
              }
            </div>
            <div className="mt-10">
              {/* All products */}
                  <h2 className="text-2xl font-extrabold">সব পণ্য</h2>
                  <p className="text-md font-">মোট ৩৩টি পণ্য দেখানো হচ্ছে</p>
              <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                  data.map(product => <div key={product.id}>
                    <ProductCard product={product} />
                  </div>)
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
