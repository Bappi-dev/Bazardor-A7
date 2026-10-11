"use client";

import { IProduct } from "@/app/page";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";


interface CategoryProductsProps {
    product: IProduct[];
}

const CategoryProducts = ({ product }: CategoryProductsProps) => {
    const [sortBy, setSortBy] = useState("default");
    const { data: session } = useSession();
    const sortedProducts = [...product].sort((a, b) => {
        if (sortBy === "asc") {
            return a.today - b.today;
        }

        if (sortBy === "desc") {
            return b.today - a.today;
        }

        return 0;
    });

    return (
        <div className="space-y-6 ">

            {/* Sorting Dropdown */}
            <div className="lg:flex border p-4 rounded-2xl justify-end bg-white mb-6 font-bold items-center gap-4 shadow-sm">

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-lg border border-gray-300 px-3 py-2"
                >
                    <option value="default">ডিফল্ট</option>
                    <option value="asc">দাম: কম থেকে বেশি</option>
                    <option value="desc">দাম: বেশি থেকে কম</option>
                </select>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {sortedProducts.map((product) => (
                    <Link
                        key={product.id}
                        href={
                            session?.user
                                ? `/product/${product.id}`
                                : `/sign-in?callbackUrl=/product/${product.id}`
             }
                        className="rounded-xl border  border-gray-200 p-4 bg-white shadow-sm"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-2xl">
                            {product.categoryIcon}
                        </div>

                        <h2 className="mt-3 text-lg font-bold">
                            {product.nameBn}
                        </h2>

                        <p className="mt-2 text-xl font-semibold text-green-700">
                            ৳{product.today} / {product.unit}
                        </p>
                    </Link>
                ))}
            </div>

        </div>
    );
};

export default CategoryProducts;
