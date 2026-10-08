
import MarqueeText from "react-marquee-text";

const Marquee = async () => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products")
    const allProducts = await res.json()
    // console.log(allProducts);
    return (
        <div className="grid gap-5">

            <MarqueeText className="px-4" direction='right' duration={10}>
                {
                    allProducts.map(all => <div className="px-4 border-l py-2 " key={all.id}>
                        <div className="flex space-x-2">
                            <div className="flex gap-1">
                                <p>{all.image}</p>
                                <p>{all.nameBn}</p>
                            </div>
                            <p>{all.today}টাকা/কেজি</p>
                            <p className="text-red-500">{all.change.pct}%</p>
                        </div>
                    </div>)
                }
            </MarqueeText>
        </div>
    );
};

export default Marquee;