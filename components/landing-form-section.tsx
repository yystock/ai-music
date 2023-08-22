"use client";
import { motion } from "framer-motion";
import { SongForm } from "./song-form";
import Drip from "./drip";

export default function LandingFormSection() {
  return (
    <div className="min-h-screen dark:bg-slate-800 py-32 relative">
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
      <Drip color="fill-[#FFFFFF] dark:fill-[#1e293b]" />
    </div>
  );
}
