import { Button } from "@heroui/react";
import Image from "next/image";
import bannerImag from "@/assest/bazar-hero.png"

const Banner = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });
    return (
        <div>
            <div>
                <p>{date}</p>
                <h1>আজকের বাজারের দাম এক নজরে</h1>
                <h2>চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</h2>
                <Button>সব পণ্য দেখুন</Button>
                <div>
                    <Image
                        width={400}
                        height={400}
                        src={bannerImag}
                        alt="banner"></Image>
                </div>
            </div>
        </div>
    );
};

export default Banner;