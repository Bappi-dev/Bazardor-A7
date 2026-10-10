'use client'
import { IProduct } from "@/app/page";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface ProductCardProps {
    product: IProduct;
}
const ProductCard = ({ product }:ProductCardProps) => {
    const { data: session  } = useSession();

    const phatnam = usePathname()
    console.log(phatnam);

    // console.log(product);

    return (
        <div>

            <Link href={`${session?.user ? `/product/${product.id}` : '/sign-in'}`}>
                <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    {/* Top */}
                    <div className="lg:flex items-center justify-between">
                        <div className="lg:flex items-center gap-3">
                            <div className="lg:flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-2xl">
                                {product.categoryIcon}
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-gray-900">
                                    {product.nameBn}
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    প্রতি {product.unit}
                                </p>
                            </div>
                        </div>

                        {/* Price change */}
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

                    {/* Price */}
                    <div className="mt-6 flex items-end justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                আজকের দাম
                            </p>

                            <div className="mt-1 flex items-baseline gap-1">
                                <span className="text-3xl font-extrabold text-gray-900">
                                    ৳{product.today}
                                </span>

                                <span className="text-sm text-gray-500">
                                    /{product.unit}
                                </span>
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-xs text-gray-400">
                                গতকাল
                            </p>

                            <p className="font-medium text-gray-600">
                                ৳{product.yesterday}
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;