import CategoryProducts from "@/components/CategoryProducts";

interface IProduct {
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

    const res = await fetch(
        `https://api.api-store.workers.dev/api/bazardor/products?category=${categorySlug}`
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
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <CategoryProducts key={product.id}  product={product} /> 
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;