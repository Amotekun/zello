import localFont from "next/font/local";

import { cn } from "@/lib/utils";
import { RiUnderline } from "react-icons/ri";
import { Navbar } from "@/components/nav/navbar";

const headingFont = localFont({
  src: "../public/fonts/font.woff2"
});

export default function MarketingPage() {
  return (
    <div className="h-full flex items-center justify-center flex-col">
      <Navbar />
      <div className={cn(
        "flex items-center justify-center flex-col",
        headingFont.className,
      )}>
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-green-100 text-amber-700 rounded-full">
          <RiUnderline className="h-6 w-6 mr-2" />
            Project managment
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
          Taskify helps team move
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-green-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
          Enjoy the flow
        </div>
      </div>
    </div>
  );
};