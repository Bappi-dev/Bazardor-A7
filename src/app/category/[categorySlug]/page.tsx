
import ProductCard from "@/components/ProductCard";

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
    change: {
        dir: "up" | "down";
        pct: number;
    };
}

const CategoryPage = async ({ params, }: { params: Promise<{ categorySlug: string }>; }) => {
    const { categorySlug } = await params;

    const res = await fetch( `https://api.abcz.workers.dev/api/bazardor/products?category=${categorySlug}`
    );

    const products: IProduct[] = await res.json();

    return (
        <div className="bg-[#F0F5F0]">
            <div className="container mx-auto py-8">
                <div className="lg:flex border p-4 rounded-2xl bg-white mb-6 font-bold">
                    <h2 className="text-6xl">{products[0]?.image}</h2>
                    <div>
                        <p className="font-extrabold text-xl">{products[0]?.categoryNameBn}</p>
                        <p className="text-gray-400">{products.length} টি পণ্যের আজকের দাম ও পরিবর্তন</p>
                    </div>
                </div>
                <div className=" border p-2 rounded-2xl bg-white mb-5">
                    <div className="lg:flex justify-end gap-4 items-center">
                        <h1 className="text-2xl ">সাজান :</h1>
                        <select defaultValue="Pick a color" className="select border p-2 rounded-2xl">
                            <option>ডিফল্ট</option>
                            <option>{products[0].today}</option>
                            <option>কম থেকে বেশি</option>
                            <option>বেশি থেকে কম</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;