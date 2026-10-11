import CategoryProducts from "@/components/CategoryProducts";

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

    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${categorySlug}`);
    const data = await res.json();
    
    
    const products: IProduct[] = Array.isArray(data) ? data : (data.products || data.data || []);

    return (
        <div className="bg-[#F0F5F0] min-h-screen">
            <div className="container mx-auto py-8">
                <div className="lg:flex border p-4 rounded-2xl bg-white mb-6 font-bold items-center gap-4 shadow-sm">
                    <span className="text-5xl">{products[0]?.categoryIcon || products[0]?.image || "🛒"}</span>
                    <div>
                        <p className="font-extrabold text-xl">{products[0]?.categoryNameBn || "ক্যাটাগরি"}</p>
                        <p className="text-gray-400">{products.length} টি পণ্যের আজকের দাম ও পরিবর্তন</p>
                    </div>
                </div>
                
              
                <CategoryProducts  product={products} />
            </div>
        </div>
    );
};

export default CategoryPage;