"use client";

import { signIn, signUp } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SignUpPage = (): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(
      formData.get("confirmPassword") ?? ""
    );

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড একই নয়!");
      return;
    }

    try {
      setIsLoading(true);

      const { data, error } = await signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি!");
        return;
      }

      if (data) {
        toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
      }
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = async (
    provider: "google" | "github"
  ) => {
    try {
      setSocialLoading(provider);

      const { error } = await signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "সোশ্যাল সাইন আপ ব্যর্থ হয়েছে!");
        setSocialLoading(null);
      }
    } catch {
      toast.error("সাইন আপ করা যায়নি। আবার চেষ্টা করুন।");
      setSocialLoading(null);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#F0F5F0] via-white to-emerald-50 px-4 py-12">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-green-200/40 blur-3xl" />

      {/* Sign Up Card */}
      <section className="relative w-full max-w-md rounded-3xl border border-white/80 bg-white/85 p-6 shadow-2xl shadow-emerald-900/10 backdrop-blur-xl sm:p-9">
        {/* Logo & Heading */}
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-3xl font-black text-white shadow-lg shadow-emerald-200">
            B
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            যোগ দিন <span className="text-emerald-600">BazarDor</span>-এ
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            বিনামূল্যে অ্যাকাউন্ট তৈরি করুন এবং প্রতিদিনের
            <br className="hidden sm:block" />
            বাজারদর ও দামের তুলনা দেখুন।
          </p>
        </div>

        {/* Social Sign Up */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            isDisabled={isLoading || socialLoading !== null}
            onPress={() => handleSocialSignUp("google")}
            className="h-12 rounded-xl border-gray-200 bg-white font-semibold text-gray-700 transition hover:border-emerald-300 hover:bg-emerald-50"
          >
            <FcGoogle className="text-xl" />
            {socialLoading === "google" ? "অপেক্ষা করুন..." : "Google"}
          </Button>

          <Button
            type="button"
            isDisabled={isLoading || socialLoading !== null}
            onPress={() => handleSocialSignUp("github")}
            className="h-12 rounded-xl border-gray-200 bg-white font-semibold text-gray-700 transition hover:border-emerald-300 hover:bg-emerald-50"
          >
            <FaGithub className="text-xl" />
            {socialLoading === "github" ? "অপেক্ষা করুন..." : "GitHub"}
          </Button>
        </div>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs font-medium text-gray-400">
            অথবা ইমেইল দিয়ে
          </span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Form */}
        <Form onSubmit={onSubmit} className="flex flex-col gap-5">
          <TextField
            isRequired
            name="name"
            minLength={3}
            validate={(value) => {
              if (value.trim().length < 3) {
                return "নাম কমপক্ষে ৩ অক্ষরের হতে হবে।";
              }
              return null;
            }}
            className="flex w-full flex-col gap-2"
          >
            <Label className="text-sm font-semibold text-gray-700">
              আপনার নাম
            </Label>
            <Input
              placeholder="আপনার পুরো নাম লিখুন"
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-gray-900 outline-none transition focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100"
            />
            <FieldError className="text-sm text-red-500" />
          </TextField>

          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ) {
                return "সঠিক ইমেইল ঠিকানা লিখুন।";
              }
              return null;
            }}
            className="flex w-full flex-col gap-2"
          >
            <Label className="text-sm font-semibold text-gray-700">
              ইমেইল ঠিকানা
            </Label>
            <Input
              placeholder="bappi@example.com"
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-gray-900 outline-none transition focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100"
            />
            <FieldError className="text-sm text-red-500" />
          </TextField>

          <TextField
            isRequired
            name="password"
            type="password"
            minLength={8}
            validate={(value) => {
              if (value.length < 8) {
                return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
              }
              if (!/[A-Z]/.test(value)) {
                return "কমপক্ষে একটি বড় হাতের অক্ষর দিন।";
              }
              if (!/[0-9]/.test(value)) {
                return "কমপক্ষে একটি সংখ্যা দিন।";
              }
              return null;
            }}
            className="flex w-full flex-col gap-2"
          >
            <Label className="text-sm font-semibold text-gray-700">
              পাসওয়ার্ড
            </Label>
            <Input
              placeholder="একটি শক্তিশালী পাসওয়ার্ড দিন"
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-gray-900 outline-none transition focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100"
            />
            <Description className="text-xs text-gray-400">
              কমপক্ষে ৮ অক্ষর, একটি বড় হাতের অক্ষর ও একটি সংখ্যা।
            </Description>
            <FieldError className="text-sm text-red-500" />
          </TextField>

          <TextField
            isRequired
            name="confirmPassword"
            type="password"
            minLength={8}
            validate={(value) => {
              if (value.length < 8) {
                return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
              }
              return null;
            }}
            className="flex w-full flex-col gap-2"
          >
            <Label className="text-sm font-semibold text-gray-700">
              পাসওয়ার্ড নিশ্চিত করুন
            </Label>
            <Input
              placeholder="পাসওয়ার্ড আবার লিখুন"
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-gray-900 outline-none transition focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100"
            />
            <FieldError className="text-sm text-red-500" />
          </TextField>

          {/* Submit */}
          <Button
            type="submit"
            isDisabled={isLoading || socialLoading !== null}
            className="mt-1 h-12 w-full rounded-xl bg-emerald-600 font-bold text-white shadow-lg shadow-emerald-200 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 disabled:opacity-60"
          >
            {isLoading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন →"}
          </Button>
        </Form>

        {/* Footer */}
        <div className="mt-7 border-t border-gray-100 pt-5 text-center">
          <p className="text-xs leading-6 text-gray-400">
            আপনার তথ্য নিরাপদে রাখুন এবং BazarDor-এর সুবিধাগুলো উপভোগ করুন।
          </p>
        </div>
      </section>
    </main>
  );
};

export default SignUpPage;