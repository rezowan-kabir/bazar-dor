import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Suspense } from "react";
import CurrentDate from "./CurrentDate";

const Hero = () => {
  return (
    <div className=" container mx-auto grid  grid-cols-1 items-center gap-8 rounded-[32px] border border-[#dce7df] bg-[#fbfdfb] px-6 py-10 sm:px-10 md:grid-cols-2 md:px-12 md:py-16 lg:gap-16">
      <div>
        <span className="inline-block rounded-full bg-[#e2f2e8] px-5 py-2 text-lg font-medium text-[#07853e]">
          <Suspense fallback={null}>
            <CurrentDate />
          </Suspense>
        </span>

        <h1 className="mt-5 text-3xl font-extrabold leading-tight text-[#1d2920] sm:text-4xl lg:text-5xl">
          আজকের বাজারের দাম এক নজরে
        </h1>

        <p className="mt-5 text-base leading-relaxed text-[#526052] sm:text-lg lg:text-xl">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        <Link
          href="#সব-পণ্য"
          className="mt-7 inline-flex items-center justify-center rounded-xl border-none bg-[#078b43] px-4 py-2 text-sm font-bold text-white shadow-md transition-colors hover:bg-[#067536] sm:px-6 sm:py-3 sm:text-base"
        >
          সব পণ্য দেখুন
        </Link>
      </div>

      <div className="flex items-center justify-center">
        <Image
          src="/bazar-hero.png"
          alt="বাজারের তাজা সবজির ঝুড়ি"
          width={500}
          height={400}
          priority
          className="h-auto w-full max-w-[420px] object-contain"
        />
      </div>
    </div>
  );
};

export default Hero;
