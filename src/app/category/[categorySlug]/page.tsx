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

const CategoryPage = async ({
    params,
}: {
    params: Promise<{ categorySlug: string }>;
}) => {
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
                        <div
                            key={product.id}
                            className="rounded-2xl border bg-white p-5 shadow-sm"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">
                                    {product.categoryIcon}
                                </span>

                                <div>
                                    <h2 className="text-lg font-bold">
                                        {product.nameBn}
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        প্রতি {product.unit}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5">
                                <p className="text-sm text-gray-500">
                                    আজকের দাম
                                </p>

                                <p className="text-3xl font-bold">
                                    ৳{product.today}
                                </p>
                            </div>

                            <div className="mt-3">
                                {product.change.dir === "up" ? (
                                    <span className="text-green-600">
                                        ↑ {product.change.pct}%
                                    </span>
                                ) : (
                                    <span className="text-red-600">
                                        ↓ {product.change.pct}%
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;