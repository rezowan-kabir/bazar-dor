import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
      dateStyle: "full",
    });
    return (
      <header className="container mx-auto w-full ">
        <div className=" px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-17">
            <div className="flex items-center  sm:space-x-4">
              <div >
                <Image
                  className="rounded-xl bg-green-600 p-2"
                  src={"/logo-icon.png"}
                  height={50}
                  width={50}
                  alt="logo"
                />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                  বাজার দর
                </h1>
                <p className="text-xs sm:text-sm text-gray-500">
                  {date}
                </p>

              </div>
            </div>

            <div className="flex items-center space-x-4 sm:space-x-6">
              <Link
                href="/signin"
                className="text-gray-700 hover:text-green-600 font-medium text-sm sm:text-base "
              >
                সাইন ইন
              </Link>

              <Link
                href="/signup"
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl   text-sm sm:text-base"
              >
                সাইন আপ
              </Link>
            </div>
          </div>
        </div>
      </header>
    );
};

export default Header;