import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f4f7f4] px-4 py-10">
      <div className="mx-auto max-w-7xl animate-pulse space-y-8">
        <div className="h-10 w-1/3 rounded-xl bg-gray-200" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="h-28 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <div className="flex h-full items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-gray-200" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 w-2/3 rounded bg-gray-200" />
                  <div className="h-3 w-1/2 rounded bg-gray-100" />
                </div>
                <div className="h-8 w-16 rounded bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-sm font-medium text-gray-500">
          পণ্যের তথ্য লোড হচ্ছে...
        </p>
      </div>
    </div>
  );
}
