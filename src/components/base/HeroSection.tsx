import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function HeroSection() {
   return (
      <div className="w-full min-h-screen flex items-center justify-center flex-col text-center">
         <div>
            <Image
               src={"/banner_img.svg"}
               alt="Banner image"
               width={600}
               height={600}
            />
         </div>
         <div>
            <h1 className="text-6xl md:text-7xl lg:text-9xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mt-4">
               Clash
            </h1>
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
               Discover better choice together
            </p>
            <Link href="/login">
               <Button className="mt-4">Get Started</Button>
            </Link>
         </div>
      </div>
   );
}
