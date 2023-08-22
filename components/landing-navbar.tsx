"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { UserButton, useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";

const font = Montserrat({ weight: "600", subsets: ["latin"] });

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center pl-4">
        <div className="relative h-9 w-9 mr-4">
          <Image fill alt="Logo" src="/music_logo_opt.png" />
        </div>
        <h1 className={cn("text-2xl font-bold text-white", font.className)}>MusiCat</h1>
      </Link>
      <div className="flex items-center gap-x-6 pr-4">
        <ModeToggle />

        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="outline" className="rounded-full">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};
