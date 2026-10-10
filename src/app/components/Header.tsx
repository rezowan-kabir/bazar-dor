import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from "react";
import CurrentDate from "./CurrentDate";

const Header = () => {
    return (
      <div>
        <div className="w-full bg-white ">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-20">
              <Link href='/'>
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="shrink-0">
                    <Image
                      className="rounded-xl bg-green-600 p-2"
                      src={"/logo-icon.png"}
                      height={50}
                      width={50}
                      alt="logo"
                    />
                  </div>
                  <div>
                    <h1 className="text-lg sm:text-2xl font-bold text-gray-900 tracking-tight">
                      বাজার দর
                    </h1>
                    <p className="text-[10px] sm:text-sm text-gray-500 whitespace-nowrap">
                      <Suspense fallback={null}>
                        <CurrentDate />
                      </Suspense>
                    </p>
                  </div>
                </div>
              </Link>

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
            </div>
          </div>
        </div>
      </div>
    );
};

export default Header;