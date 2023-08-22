"use client";
import { AnimatePresence, motion } from "framer-motion";

interface AnimationProps {
  i: [number, number]; // Define the type of 'i' as an array of numbers
}

export const translate = {
  initial: {
    y: "100%",
    opacity: 0,
  },
  enter: (i: [number, number]) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: i[0] },
  }),
  exit: (i: [number, number]) => ({
    y: "100%",
    opacity: 0,
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: i[1] },
  }),
};

export default function Footer() {
  return (
    <AnimatePresence initial={false}>
      <div
        className="flex
    items-end
    flex-wrap
    text-sm
        uppercase
    mt-10"
      >
        <ul className="w-1/2 mt-[10px] overflow-hidden list-none p-0]">
          <motion.li custom={[0.3, 0]} variants={translate} initial="initial" animate="enter" exit="exit">
            <span>Made by: </span>Yun
          </motion.li>
        </ul>
      </div>
    </AnimatePresence>
  );
}
