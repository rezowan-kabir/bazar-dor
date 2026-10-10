import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from "react";
import CurrentDate from "./CurrentDate";
import UserInfo from './UserInfo';

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

              <UserInfo />
            </div>
          </div>
        </div>
      </div>
    );
};

export default Header;