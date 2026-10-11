"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaStore, FaUserCircle } from "react-icons/fa";

const Navbar = (): React.JSX.Element => {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);

      const { error } = await signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি!");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে!");
    } finally {
      setIsSigningOut(false);
    }
  };

  const navLinks = [
    { name: "হোম", href: "/" },
    { name: "বাজারদর", href: "/product" },
  ];

  return (
    <header className="sticky top-0 z-50  border-emerald-100/80 bg-white/85">
      <nav className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}


        {/* Navigation Links */}
        {/* <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(`${link.href}/`));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition duration-200 ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-emerald-700"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div> */}

        {/* Authentication */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {isPending ? (
            <div className="h-10 w-24 animate-pulse rounded-xl bg-gray-100" />
          ) : session?.user ? (
            <>
              <div className="hidden items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50/70 px-3 py-2 sm:flex">
                <FaUserCircle className="text-xl text-emerald-600" />

                <div className="max-w-32">
                  <p className="text-[10px] text-gray-500 font-bold">স্বাগতম</p>
                  <p className="truncate text-sm font-bold text-gray-800">
                    {session.user.name}
                  </p>
                </div>
              </div>

              <Button
                type="button"
                isDisabled={isSigningOut}
                onPress={handleSignOut}
                className="h-10 rounded-xl bg-red-50 px-3 font-semibold text-red-600 transition hover:bg-red-100 sm:px-4"
              >
                {isSigningOut ? "অপেক্ষা করুন..." : "সাইন আউট"}
              </Button>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button

                  className={`h-10 rounded-xl border-emerald-200 px-3 font-semibold transition hover:bg-emerald-50 sm:px-5 ${pathname === "/sign-in"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-white text-gray-700"
                    }`}
                >
                  সাইন ইন
                </Button>
              </Link>

              <Link href="/sign-up">
                <Button
                  className="h-10 rounded-xl bg-emerald-600 px-3 font-semibold text-white shadow-md shadow-emerald-200 transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 sm:px-5"
                >
                  সাইন আপ
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;