"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ModeToggle = () => {
  const [hasMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!hasMounted) {
    return <div className="hidden w-10 h-10" />;
  }

  return (
    <>
      <button className="flex items-center justify-center h-12 w-12" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "dark" ? (
          <Moon size={24} className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 " />
        ) : (
          <Sun size={24} className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 " />
        )}
      </button>
    </>
  );
};
