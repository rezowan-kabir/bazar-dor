"use client";

import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

function getRedirectPath() {
  const redirectPath = new URLSearchParams(window.location.search).get(
    "redirect",
  );

  if (redirectPath?.startsWith("/") && !redirectPath.startsWith("//")) {
    return redirectPath;
  }

  return "/";
}

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: getRedirectPath(),
      });

      if (error) {
        toast.error(error.message || "সাইন ইন করতে সমস্যা হয়েছে!");
        return;
      }

      if (data) {
        toast.success("সফলভাবে সাইন ইন করা হয়েছে! 🎉");
        router.push(getRedirectPath());
        router.refresh();
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "সাইন ইন করা যায়নি।",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    const callbackUrl = new URL(getRedirectPath(), window.location.origin);
    callbackUrl.searchParams.set("auth", "success");

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: `${callbackUrl.pathname}${callbackUrl.search}`,
      });

      if (error) {
        toast.error(error.message || "সোশ্যাল সাইন ইন করা যায়নি।");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "সোশ্যাল সাইন ইন করা যায়নি।",
      );
    }
  };

  return (
    <main className="container mx-auto min-h-screen bg-[#f4f7f4] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          সাইন ইন
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <div className="bg-white py-8 px-6 sm:px-10 shadow-sm border border-gray-100 rounded-3xl w-full max-w-md space-y-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              ইমেইল
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* signin btn */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00873e] hover:bg-[#007032] text-white font-semibold py-3.5 px-4 rounded-xl transition-colors shadow-sm text-base disabled:opacity-50"
            >
              {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
            </button>
          </div>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-xs">অথবা</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* social login */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleSocialSignIn("google")}
            className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 text-xs font-semibold text-gray-700"
          >
            <span className="text-base">G</span>
            <span>Google দিয়ে চালিয়ে যান</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignIn("github")}
            className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 text-xs font-semibold text-gray-700"
          >
            <span className="text-base">🐙</span>
            <span>GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        <div className="text-center text-xs text-gray-500 pt-1">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="text-green-600 font-semibold hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
