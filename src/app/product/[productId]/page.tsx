interface ProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

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

const ProductDetailsPage = async ({ params }: ProductPageProps) => {
  const { productId } = await params;

  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products/${productId}`
  );

  if (!res.ok) {
    throw new Error("Product data fetch করা যায়নি");
  }

  const product: IProduct = await res.json();

  const prices = [
    product.today,
    product.yesterday,
    product.lastWeek,
    product.lastMonth,
  ];

  const lowest = Math.min(...prices);
  const highest = Math.max(...prices);
  const average = Math.round(
    prices.reduce((total, price) => total + price, 0) / prices.length
  );

  const priceHistory = [
    { label: "আজকের দাম", price: product.today },
    { label: "গতকালের দাম", price: product.yesterday },
    { label: "গত সপ্তাহের দাম", price: product.lastWeek },
    { label: "গত মাসের দাম", price: product.lastMonth },
  ];

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-3 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-5">
        {/* Product Header */}
        <section className="flex flex-col justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-3xl">
              {product.categoryIcon || product.image}
            </div>

            <div>
              <h1 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                ক্যাটাগরি: {product.categoryNameBn}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                প্রতি {product.unit}
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-[#f0f5f0] px-5 py-3 sm:text-right">
            <p className="text-sm text-gray-500">আজকের দাম</p>

            <p className="text-3xl font-extrabold text-gray-900">
              ৳{product.today}
            </p>

            <p
              className={`mt-1 text-sm font-semibold ${
                product.change.dir === "up"
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {product.change.dir === "up" ? "↑" : "↓"}{" "}
              {product.change.pct}%
              {product.change.dir === "up" ? " দাম বেড়েছে" : " দাম কমেছে"}
            </p>
          </div>
        </section>

        {/* Market Summary */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="mb-4 text-lg font-bold text-gray-800">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>
              <p className="mt-2 text-2xl font-bold text-green-600">
                ৳{lowest}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">সর্বোচ্চ দাম</p>
              <p className="mt-2 text-2xl font-bold text-red-600">
                ৳{highest}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">গড় দাম</p>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                ৳{average}
              </p>
            </div>
          </div>

          
        </section>

        {/* Price History */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5">
      <h2 className="mb-4 text-lg font-bold text-gray-800">
        দামের তুলনা
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-gray-600">
              <th className="px-4 py-3">বাজার</th>
              <th className="px-4 py-3">বিভাগ</th>
              <th className="px-4 py-3">সময়</th>
              <th className="px-4 py-3 text-right">দাম</th>
            </tr>
          </thead>

          <tbody>
            {priceHistory.map((item, index) => (
              <tr
                key={item.label}
                className={`border-b last:border-0 ${
                  index % 2 === 0 ? "bg-[#f0f5f0]" : "bg-white"
                }`}
              >
                <td className="px-4 py-3 text-gray-700">
                 <p>মাঠ বাজার</p>
                </td>

                <td className="px-4 py-3 text-gray-700">
                   <p>রাজশাহী</p>
                </td>

                <td className="px-4 py-3 text-gray-700">
                  {item.label}
                </td>

                <td className="px-4 py-3 text-right font-semibold text-gray-900">
                  ৳{item.price}/{product.unit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
      </div>
    </main>
  );
};

export default ProductDetailsPage;