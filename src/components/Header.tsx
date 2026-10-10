import { Button } from "@heroui/react";
import { PiShoppingCartLight } from "react-icons/pi";
import CategoryList from "./CategoryList";
import Link from "next/link";
import Navbar from "./Navbar";


const Header = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <div>
            <div className="border-b-1">
                <div className="flex justify-between items-center container mx-auto py-4">
                    <div className="flex gap-4">
                        <span className="bg-green-500 rounded-xl p-2"><Link href="/"><PiShoppingCartLight size={40} /></Link></span>
                        <div className="items-center">
                            <h2 className="text-xl font-bold">বাজার দর</h2>
                            <p className="text-md">{date}</p>
                        </div>
                    </div>
                    <Navbar/>
                </div>
            </div>
            <CategoryList />
        </div>
    );
};

export default Header;