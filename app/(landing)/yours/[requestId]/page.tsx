import TopFiveSongs from "@/components/TopSongs/TopSongs";
import LoadingState from "@/components/loading-state";
import GeneratedMusic from "@/components/music-gen";
import prismadb from "@/lib/prismadb";
import { notFound } from "next/navigation";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Personalized Music",
  description: "Personalized Music",
};
interface YoursProps {
  params: {
    requestId: string;
  };
}

export default async function Yours({ params }: YoursProps) {
  const { requestId } = params;

  const request = await prismadb.userRequest.findFirst({
    where: {
      id: requestId,
    },

    include: {
      results: true,
    },
  });
  if (!request?.results) {
    return notFound();
  }
  //Music Generation", "Song Recommendations", "Similar Songs
  if (request.task === "Music Generation") {
    return <GeneratedMusic result={request.result} />;
  } else if (request.task === "Song Recommendations" || request.task === "Similar Songs") {
    return <TopFiveSongs id={requestId} data={request.results} message={request.result} />;
  } else {
    return notFound();
  }
}
