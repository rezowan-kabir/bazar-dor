"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function UserInfo() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে!");
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {user ? (
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 py-1.5 px-3 rounded-full border border-gray-200 transition-colors cursor-pointer"
          >
            {user.image ? (
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={user.image}
                  alt={user.name || "User"}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">
                {user.name?.[0] || "U"}
              </div>
            )}
            <span className="font-semibold text-gray-800 text-sm">
              {user.name}
            </span>
            <span className="text-xs text-gray-500">▼</span>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50">
              <div className="border-b border-gray-100 pb-3 mb-3">
                <p className="font-bold text-gray-900 text-sm truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>

              <div className="space-y-1">
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium"
                >
                  <span>👤</span>আমার প্রোফাইল
                </Link>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleSignOut();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium text-left"
                >
                  <span>↩</span> সাইন আউট
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2 sm:gap-6">
          <Link
            href="/signin"
            className="text-gray-700 hover:text-green-600 font-medium text-xs sm:text-base transition-colors whitespace-nowrap"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-base transition-colors whitespace-nowrap shadow-sm"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
}
