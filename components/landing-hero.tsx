"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button, buttonVariants } from "@/components/ui/button";
import Drip from "./drip";

export const LandingHero = () => {
  return (
    <div className="relative border-b-[2px] border-solid border-black">
      <div className="dark:text-white font-bold pt-28 pb-36 text-center space-y-5 text-slate-800">
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
          <h1>The Best AI Tool for</h1>
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            <TypewriterComponent
              options={{
                strings: ["Similar Song Search.", "Music Recommendation.", "Playlist Generation.", "Music Review."],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </div>
        <div className="text-sm md:text-xl font-light text-zinc-400">Use AI for your musical journey.</div>
        <div>
          {/* {isSignedIn ? "/dashboard" : "/sign-up"} */}
          <Link href="#section-1" className={buttonVariants({ variant: "premium", className: "md:text-lg p-4 md:p-6 rounded-full font-semibold" })}>
            {/* <Button variant="premium" className="md:text-lg p-4 md:p-6 rounded-full font-semibold"> */}
            Start For Free
            {/* </Button> */}
          </Link>
        </div>
        <div className="text-zinc-400 text-xs md:text-sm font-normal">5 Free Try.</div>
      </div>
      <Drip color="fill-[#FFFFFF] dark:fill-[#000000]" />
    </div>
  );
};
