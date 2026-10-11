"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isPending && !user) {
      router.push("/signin");
    }
  }, [isPending, user, router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();

    if (!name) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await authClient.updateUser({ name });

      if (error) {
        toast.error(error.message || "নাম আপডেট করা যায়নি।");
        return;
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট করা হয়েছে!");
      router.push("/profile");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "নাম আপডেট করা যায়নি।");
    } finally {
      setIsSaving(false);
    }
  }

  if (isPending || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f7f4]">
        <p className="text-gray-500">লোড হচ্ছে...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f7f4] px-4 py-12">
      <section className="w-full max-w-lg space-y-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            তথ্য আপডেট করুন
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের নাম পরিবর্তন করুন।
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-semibold text-gray-700"
            >
              নাম
            </label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={user.name || ""}
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full rounded-xl bg-[#00873e] px-4 py-3 font-semibold text-white transition-colors hover:bg-[#007032] disabled:opacity-50"
          >
            {isSaving ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
          </button>
        </form>

        <Link
          href="/profile"
          className="block text-center text-sm text-gray-500 hover:text-gray-800"
        >
          প্রোফাইলে ফিরে যান
        </Link>
      </section>
    </main>
  );
}
