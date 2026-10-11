import SignInForm from "@/components/pages/SignInPage/SignInForm";
import { Suspense } from "react";


// 2. Export the main page wrapped in a Suspense boundary
const SignInPage = (): React.JSX.Element => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#F0F5F0] via-white to-emerald-50 px-4 sm:py-20">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-green-200/40 blur-3xl" />

      <Suspense fallback={<div className="text-center">লোড হচ্ছে...</div>}>
        <SignInForm />
      </Suspense>
    </main>
  );
};

export default SignInPage;