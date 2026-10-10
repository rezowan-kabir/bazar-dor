"use client"

import Link from "next/link";
import React from "react";

export default function SignInPage() {
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
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              ইমেইল
            </label>
            <input
             
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400     text-sm "
            />
          </div>

          {/* password*/}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              পাসওয়ার্ড
            </label>
            <input
              
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400   text-sm"
            />
          </div>

          {/* signin btn */}
          <div className="pt-2">
            <button
              
              className="w-full bg-[#00873e] hover:bg-[#007032] text-white font-semibold py-3.5 px-4 rounded-xl transition-colors shadow-sm text-base"
            >
              সাইন ইন
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
            
            className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 text-xs font-semibold text-gray-700 "
          >
            <span className="text-base">G</span>
            <span>Google দিয়ে চালিয়ে যান</span>
          </button>

          <button
            
            className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 text-xs font-semibold text-gray-700 "
          >
            <span className="text-base">🐙</span>
            <span>GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        <div className="text-center text-xs text-gray-500 pt-1">
          অ্যাকাউন্ট নেই?{"    "}
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
