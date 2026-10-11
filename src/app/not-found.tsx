import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">পেজটি খুঁজে পাওয়া যায়নি!</p>
      <Link
        href="/"
        className="bg-green-600 text-white px-6 py-2.5 rounded-xl hover:bg-green-700 transition-colors"
      >
        হোমে ফিরে যান
      </Link>
    </div>
  );
};

export default NotFound;
