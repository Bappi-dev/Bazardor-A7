import DetailsPage from "@/components/pages/ProductsDetails/DetailsPage";
import { IProduct, ProductPageProps } from "@/components/pages/ProductsDetails/Type";






const ProductDetailsPage = async ({ params }: ProductPageProps) => {
  const { productId } = await params;

  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products/${productId}`
  );

  if (!res.ok) {
    throw new Error("Product data fetch করা যায়নি");
  }
  console.log(res);

  const product: IProduct = await res.json();


 
  

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-3 py-6 sm:px-6 lg:px-10">


      
     <DetailsPage product={product}/>
  
    </main>
  );
};

export default ProductDetailsPage;