"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { SongForm } from "@/components/song-form";
export default function HomePage() {
  const router = useRouter();

  return (
    <div>
      <div className="mb-12 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">Explore the power of AI</h2>
      </div>
      <div className="flex justify-center">
        <SongForm />
      </div>
    </div>
  );
}
