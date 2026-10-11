import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f4f7f4]">
      <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-600 mt-4 text-sm font-medium">লোড হচ্ছে...</p>
    </div>
  );
}
