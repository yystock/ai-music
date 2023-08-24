import { SongForm } from "@/components/song-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MusiCat | Music",
  description: "Create your own music with AI.",
};

export default function HomePage() {
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
