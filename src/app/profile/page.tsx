"use client";

import React, { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      router.push("/signin");
    }
  }, [user, isPending, router]);

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

        <div className="text-right">
          <Link
            href="/profile/update"
            className="inline-flex rounded-xl bg-[#00873e] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#007032]"
          >
            তথ্য আপডেট করুন
          </Link>
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
