import { Button } from "@heroui/react";
import Image from "next/image";
import bannerImag from "@/assest/bazar-hero.png"

const Banner = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });
    return (
        <div>
            <div className="lg:flex space-x-70 rounded-xl items-center px-10 shadow-2xl">
                <div className="space-y-4">
                    <p className="bg-green-600 text-white w-60 p-2 rounded-2xl mb-5">{date}</p>
                    <h1 className="text-4xl font-bold">আজকের বাজারের দাম এক নজরে</h1>
                    <h2>চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন- সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</h2>
                    <Button className='bg-green-600'>সব পণ্য দেখুন</Button>
                </div>
                <div>
                    <Image
                       className="w-full h-[400] "
                        width={600}
                        height={600}
                        src={bannerImag}
                        alt="banner"></Image>
                </div>
            </div>
        </div>
    );
};

export default Banner;