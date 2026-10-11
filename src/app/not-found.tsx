"use client";

import Link from "next/link";
import { Button } from "@heroui/react";

const NotFoundPage = () => {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-red-50 via-white to-rose-100 px-4">
            {/* Background Decoration */}
            <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-red-200/40 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-rose-300/40 blur-3xl" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-xl rounded-3xl border border-red-100 bg-white/80 p-8 text-center shadow-2xl shadow-red-200/40 backdrop-blur-xl sm:p-14">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100 ring-8 ring-red-50">
                    <span className="text-5xl font-black text-red-600">!</span>
                </div>

                <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-red-500">
                    Page Not Found
                </p>

                <h1 className="text-8xl font-black tracking-tight text-red-600 sm:text-9xl">
                    404
                </h1>

                <h2 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
                    Oops! Lost Your Way?
                </h2>

                <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-600 sm:text-base">
                    The page you are looking for doesn't exist or may have been moved.
                    Let's get you back on the right track!
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link href="/"><Button
                        
                        className="h-12 rounded-xl bg-red-600 px-8 font-semibold text-white shadow-lg shadow-red-200 transition-all hover:-translate-y-1 hover:bg-red-700"
                    >
                        ← Back to Home
                    </Button></Link>
                </div>

                <div className="mt-10 border-t border-red-100 pt-5">
                    <p className="text-xs font-medium tracking-wide text-gray-400">
                        ERROR CODE: 404 · PAGE NOT FOUND
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;