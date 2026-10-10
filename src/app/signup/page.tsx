// 12345qwert
// kj@y.com
"use client";

import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! 🎉");

    }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#f4f7f4] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 ">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <div className="bg-white py-8 px-6 sm:px-10 shadow-sm border border-gray-100 rounded-3xl w-full max-w-md space-y-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              নাম
            </label>
            <input
              
              required
              placeholder="যেমন: রহিম উদ্দিন"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400     text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              ইমেইল
            </label>
            <input
              
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400  text-sm "
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              পাসওয়ার্ড
            </label>
            <input
              
              required
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 text-sm "
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
             
              required
              placeholder="আবার লিখুন"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm "
            />
          </div>

          <div className="pt-2">
            <button
             
              disabled={loading}
              className="w-full bg-[#00873e] hover:bg-[#007032] text-white font-semibold py-3.5 px-4 rounded-xl transition-colors shadow-sm text-base disabled:opacity-50"
            >
              {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </div>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-xs">অথবা</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => toast.error("গুগল সাইন-ইন কনফিগার করা হয়নি")}
            className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors"
          >
            <span className="text-base">G</span>
            <span>Google দিয়ে চালিয়ে যান</span>
          </button>

          <button
            
            onClick={() => toast.error("গিটহাব সাইন-ইন কনফিগার করা হয়নি")}
            className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors"
          >
            <span className="text-base">🐙</span>
            <span>GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        <div className="text-center text-xs text-gray-500 pt-1">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="text-green-600 font-semibold hover:underline"
          >
            সাইন ইন করুন
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