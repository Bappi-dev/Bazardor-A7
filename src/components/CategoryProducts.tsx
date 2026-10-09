
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

const CategoryProducts = ({ product }: { product: IProduct }) => {

    return (
        <div>
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

        </div>
    );
};

export default CategoryProducts;