
"use client";

import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";

const Navbar = () => {
  const { data: session, isPending } = useSession();

  const handleSignOut = async () => {
    const { error } = await signOut();

    if (error) {
      console.error("Sign out failed:", error);
      return;
    }
  };

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <nav className="flex items-center justify-between p-4">
      {session?.user ? (
        <div className="flex items-center gap-3">
          <span>স্বাগতম, {session.user.name}</span>
          <Button
            className="bg-red-500 text-white"
            onPress={handleSignOut}
          >
            সাইন আউট
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Link href="/sign-in">
            <Button className="border bg-white text-black">
              সাইন ইন
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button className="bg-green-500 text-white">
              সাইন আপ
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
