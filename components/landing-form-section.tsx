"use client";
import { motion } from "framer-motion";
import { SongForm } from "./song-form";
import Drip from "./drip";

export default function LandingFormSection() {
  return (
    <div className="min-h-screen dark:bg-[#121321] py-32 relative">
      <div className="absolute inset-x-8 top-10 w-72 h-72 bg-purple-300 dark:bg-purple-500 rounded-full filter blur-3xl opacity-70 mx-auto animate-blob animation-delay-4000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-700 rounded-full filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      <motion.section
        initial={{ opacity: 0, x: -500 }}
        whileInView={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 500 }}
        transition={{ type: "spring", stiffness: 50, duration: 4, delay: 0.25 }}
        id="section-1"
        className="grid grid-cols-1 justify-items-center"
      >
        <h2 className="text-center text-4xl dark:text-white font-extrabold mb-8">Try Now</h2>
        <SongForm />
      </motion.section>
      <Drip color="fill-[#FFFFFF] dark:fill-[#121321]" />
    </div>
  );
}
