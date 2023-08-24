"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Drip from "./drip";

const testimonials = [
  {
    name: "Tom",
    avatar: "/avatar-1.png",
    title: "1st time Try",
    description: "Love the app",
  },
  {
    name: "Ava Martinez",
    avatar: "/avatar-2.png",
    title: "Similar songs",
    description: "the songs are great",
  },
  {
    name: "Emily Williams",
    avatar: "/avatar-3.png",
    title: "New songs",
    description: "the music it recommends is similar to my taste",
  },
  {
    name: "Jessica Anderson",
    avatar: "/avatar-4.png",
    title: "Try it out",
    description: "Just want to check if it will actually recommend good songs",
  },
];

export const LandingContent = () => {
  return (
    <div className="relative flex flex-col px-10 pt-28 pb-44 min-h-screen dark:from-pink-950 dark:via-purple-950 dark:to-indigo-950 bg-gradient-to-b from-pink-100 via-purple-50 to-indigo-50  border-b-[2px] border-solid border-black">
      <h2 className="text-center text-4xl dark:text-white font-extrabold mb-20">Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatePresence mode="sync" initial={false}>
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: "-100%", filter: "blur(5px)" }}
              whileInView={{
                opacity: 1,
                x: "0%",
                filter: "blur(0px)",
                transition: { type: "spring", stiffness: 100, duration: 0.3 * index, delay: index * 0.2 },
              }}
              exit={{ opacity: 0, x: "100%", transition: { duration: 0.2 } }}
              // transition={{ type: "spring", stiffness: 100, duration: index * 0.3, delay: index * 0.2 }}
            >
              <Card
                className={cn(
                  "relative group cursor-pointer transition-shadow overflow-hidden border-none bg-blend-luminosity hover:shadow-xl hover:shadow-purple-300 "
                )}
              >
                <div className="absolute inset-0 z-10 group-hover:bg-indigo-800/90  dark:group-hover:bg-indigo-900/90 items-center flex flex-col translate-y-[60%] justify-center px-9 text-center transition-all duration-700 group-hover:translate-y-0">
                  <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    "{item.description}"
                  </p>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-lg">{item.name}</p>
                      <p className="text-zinc-400 text-sm">"{item.title}"</p>
                    </div>
                  </CardTitle>
                  <CardContent className={cn("pt-4 px-0 items-center mx-auto")}>
                    <Image src={item.avatar} height={150} width={150} alt={"Avatar"} className="mix-blend-normal dark:mix-blend-screen" />
                  </CardContent>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <Drip color="fill-[#e0e7ff] dark:fill-[#1e1b4b]" />
    </div>
  );
};
