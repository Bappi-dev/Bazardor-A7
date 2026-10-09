
interface ProductPageProps {
    params: Promise<{
        productId: string;
    }>;
}

const marketPrices = [
    { market: "কারওয়ান বাজার", area: "ঢাকা", price: 66, yesterday: 64, week: 62 },
    { market: "মিরপুর বাজার", area: "ঢাকা", price: 70, yesterday: 68, week: 65 },
    { market: "মোহাম্মদপুর বাজার", area: "ঢাকা", price: 68, yesterday: 67, week: 64 },
    { market: "নিউ মার্কেট", area: "ঢাকা", price: 69, yesterday: 68, week: 65 },
    { market: "যাত্রাবাড়ী বাজার", area: "ঢাকা", price: 63, yesterday: 62, week: 60 },
    { market: "গুলশান বাজার", area: "ঢাকা", price: 75, yesterday: 73, week: 70 },
    { market: "উত্তরা বাজার", area: "ঢাকা", price: 72, yesterday: 70, week: 68 },
    { market: "বাড্ডা বাজার", area: "ঢাকা", price: 67, yesterday: 66, week: 63 },
    { market: "ধানমন্ডি বাজার", area: "ঢাকা", price: 74, yesterday: 72, week: 69 },
    { market: "শ্যামলী বাজার", area: "ঢাকা", price: 68, yesterday: 67, week: 65 },
    { market: "রামপুরা বাজার", area: "ঢাকা", price: 65, yesterday: 64, week: 61 },
    { market: "সদরঘাট বাজার", area: "ঢাকা", price: 64, yesterday: 63, week: 60 },
];

const ProductDetailsPage = async ({ params }: ProductPageProps) => {
    const { productId } = await params;
    const product = {
        id: productId,
        name: "বাসমতি চাল",
        category: "চাল",
        unit: "কেজি",
        icon: "🍚",
        today: 66,
        yesterday: 64,
        lastWeek: 62,
        change: 3.1,
    };

    const average = Math.round(
        marketPrices.reduce((sum, item) => sum + item.price, 0) /
        marketPrices.length
    );

    const lowest = Math.min(...marketPrices.map((item) => item.price));
    const highest = Math.max(...marketPrices.map((item) => item.price));

    return (
        <main className="min-h-screen bg-[#f0f5f0] px-3 py-6 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-6xl space-y-4">

                {/* Product header */}
                <section className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-white p-4 sm:p-5">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl">
                            {product.icon}
                        </div>

                        <div className="min-w-0">
                            <h1 className="text-lg font-bold text-gray-900 sm:text-2xl">
                                {product.name}
                            </h1>

                            <p className="text-xs text-gray-500 sm:text-sm">
                                ক্যাটাগরি: {product.category}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                                বাজারদরের সর্বশেষ তথ্য ও তুলনা
                            </p>
                        </div>
                    </div>

                    <div className="shrink-0 rounded-xl bg-[#f0f5f0] px-3 py-2 text-center">
                        <p className="text-xs text-gray-500">
                            আজকের দাম
                        </p>

                        <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                            ৳{product.today}
                        </p>

                        <p className="text-xs text-gray-500">
                            প্রতি {product.unit}
                        </p>

                        <p className="text-xs font-medium text-red-600">
                            ↑ {product.change}%
                        </p>
                    </div>
                </section>

                {/* Market summary */}
                <section className="rounded-xl border border-gray-100 bg-white p-4 sm:p-5">
                    <h2 className="mb-3 text-sm font-semibold text-gray-800">
                        বাজার সারসংক্ষেপ
                    </h2>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div className="rounded-xl border border-gray-200 p-3">
                            <p className="text-xs text-gray-500">
                                সর্বনিম্ন দাম
                            </p>
                            <p className="mt-1 text-lg font-bold text-green-600">
                                ৳{lowest}
                            </p>
                            <p className="text-xs text-gray-500">
                                প্রতি {product.unit}
                            </p>
                        </div>

                        <div className="rounded-xl border border-gray-200 p-3">
                            <p className="text-xs text-gray-500">
                                সর্বোচ্চ দাম
                            </p>
                            <p className="mt-1 text-lg font-bold text-red-600">
                                ৳{highest}
                            </p>
                            <p className="text-xs text-gray-500">
                                প্রতি {product.unit}
                            </p>
                        </div>

                        <div className="rounded-xl border border-gray-200 p-3">
                            <p className="text-xs text-gray-500">
                                গড় বাজারদর
                            </p>
                            <p className="mt-1 text-lg font-bold text-green-600">
                                ৳{average}
                            </p>
                            <p className="text-xs text-gray-500">
                                প্রতি {product.unit}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Market price table */}
                <section className="rounded-xl border border-gray-100 bg-white p-4 sm:p-5">
                    <h2 className="mb-4 text-sm font-semibold text-gray-800">
                        বাজারভিত্তিক আজকের দাম
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px] border-collapse text-left text-xs sm:text-sm">
                            <thead>
                                <tr className="border-b border-gray-300 bg-gray-50 text-gray-700">
                                    <th className="px-3 py-3 font-semibold">
                                        বাজার
                                    </th>
                                    <th className="px-3 py-3 font-semibold">
                                        এলাকা
                                    </th>
                                    <th className="px-3 py-3 text-right font-semibold">
                                        আজকের দাম
                                    </th>
                                    <th className="px-3 py-3 text-right font-semibold">
                                        গতকালের দাম
                                    </th>
                                    <th className="px-3 py-3 text-right font-semibold">
                                        গত সপ্তাহ
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {marketPrices.map((item, index) => (
                                    <tr
                                        key={item.market}
                                        className={`border-b border-gray-200 ${index % 2 === 0
                                                ? "bg-[#f0f5f0]"
                                                : "bg-white"
                                            }`}
                                    >
                                        <td className="px-3 py-3 font-medium text-gray-800">
                                            {item.market}
                                        </td>

                                        <td className="px-3 py-3 text-gray-600">
                                            {item.area}
                                        </td>

                                        <td className="px-3 py-3 text-right font-semibold text-gray-900">
                                            ৳{item.price}
                                        </td>

                                        <td className="px-3 py-3 text-right text-gray-600">
                                            ৳{item.yesterday}
                                        </td>

                                        <td className="px-3 py-3 text-right text-gray-600">
                                            ৳{item.week}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <p className="mt-3 text-xs text-gray-400">
                        * প্রদর্শিত বাজারদরগুলো ডেমো ডেটা; এগুলো বাস্তব বাজারদর নয়।
                    </p>
                </section>
            </div>
        </main>
    );
};

export default ProductDetailsPage;
