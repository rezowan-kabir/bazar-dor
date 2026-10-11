"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { notFound, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !user) {
      router.push("/signin");
    }
  }, [user, isPending, router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = String(formData.get("name") ?? "");
    setLoading(true);

    try {
      const { data, error } = await authClient.updateUser({
        name: name,
      });

      if (error) {
        toast.error(error.message || "নাম আপডেট করতে সমস্যা হয়েছে!");
      } else {
        toast.success("প্রোফাইল সফলভাবে আপডেট করা হয়েছে! 🎉");
        router.refresh();
      }
    } catch (err) {
      toast.error("কোথাও কোনো ত্রুটি ঘটেছে!");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট করা হয়েছে!");
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#f4f7f4] flex items-center justify-center">
        <p className="text-gray-500">লোড হচ্ছে...</p>
      </div>
    );
  }
if (!user) {
  notFound();
}
  if (!user) return null;

  return (
    <main className=" container mx-auto min-h-screen bg-[#f4f7f4] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            আমার প্রোফাইল
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* user section */}
        <div className="bg-white py-6 px-6 sm:px-8 shadow-sm border border-gray-100 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {user.image ? (
              <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-200">
                <Image
                  src={user.image}
                  alt={user.name || "User"}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-xl">
                {user.name?.[0] || "U"}
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 border border-red-200 text-red-600 hover:bg-red-50 font-semibold py-2 px-4 rounded-xl transition-colors text-sm"
          >
            <span>↩</span> সাইন আউট
          </button>
        </div>

        {/* update section */}
        <div className="bg-white py-8 px-6 sm:px-8 shadow-sm border border-gray-100 rounded-3xl space-y-6">
          <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
            তথ্য
          </h3>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                নাম
              </label>
              <input
                type="text"
                name="name"
                defaultValue={user.name || ""}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#00873e] hover:bg-[#007032] text-white font-semibold py-3.5 px-4 rounded-xl transition-colors shadow-sm text-base disabled:opacity-50"
              >
                {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
              </button>
            </div>
          </form>
        </div>

        <div className="text-center pt-4">
          <Link
            href="/"
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
