import Loading from "@/components/Loading/Loading";
import DetailsPage from "@/components/pages/ProductsDetails/DetailsPage";
import { IProduct, ProductPageProps } from "@/components/pages/ProductsDetails/Type";
import { getSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { Suspense } from "react";





const ProductDetailsPage = async ({ params }: ProductPageProps) => {
  const { productId } = await params;

  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products/${productId}`
  );

  if (!res.ok) {
    throw new Error("Product data fetch করা যায়নি");
  }
  console.log(res);

  const product: IProduct = await res.json();


 
  

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-3 py-6 sm:px-6 lg:px-10">

      <Suspense fallback={<div><Loading/></div>}>
      
     <DetailsPage product={product}/>
    </Suspense>
    </main>
  );
};

export default ProductDetailsPage;