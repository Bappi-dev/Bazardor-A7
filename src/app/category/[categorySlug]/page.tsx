
const CategoryProducts = async ({ params }) => {
    const { categorySlug } = await params;
    const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products?category=${categorySlug}`)
    if (!res.ok) {
        throw new Error('Failed to fetch category products');
    }
    const products = await res.json();
    console.log(products);

    return (
        <div>
            <div>
                {
                    products.map(product => <div key={product.id}>
                        <div className="flex">
                            <p>{product.image}</p>
                            <div>
                                {product.nameBn}
                            <p>{product.unit}</p>
                            </div>
                        </div>
                    </div>)
                }
            </div>

        </div>
    );
};

export default CategoryProducts;