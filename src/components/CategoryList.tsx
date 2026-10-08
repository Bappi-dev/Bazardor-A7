import Link from "next/link";

interface ICategory {
    id: string,
    icon: string,
    slug: string,
    nameBn: string
}
const CategoryList = async () => {
    "use cache";
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/categories")
    const data: ICategory[] = await res.json()
    return (
        <div className="my-2">
            <div className="flex gap-8 text-xl container mx-auto py-2">
                {
                    data.map(da => <Link href={`/category/${da.slug}`} key={da.id}><span>{da.icon}</span>{da.nameBn}</Link>)
                }
            </div>
        </div>
    );
};

export default CategoryList;