import Replicate from "replicate";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { checkCredits, decrementCredits } from "@/lib/credits";
import { formSchema } from "@/lib/type";
import prismadb from "@/lib/prismadb";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { email, request, songs, source, task, to } = formSchema.parse(body);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const credits = await checkCredits(userId);

    if (!credits) {
      return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
    }

    const userRequest = await prismadb.userRequest.create({
      data: {
        email: email,
        request: request,
        songs: {
          create: songs.map((song) => ({
            id: song.id,
            name: song.name,
            artist: song.artist,
          })),
        },
        source: source,
        task: task,
        to: to,
        userId: userId,
        result: "",
      },
    });

    const requestedSongs = songs.map((song) => song.name + " by " + song.artist);
    const joinedSongNames = requestedSongs.join(",");
    const prompt = `${request} ${joinedSongNames}}`;

    const response: any = await replicate.run("riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05", {
      input: {
        prompt_a: prompt,
      },
    });

    await prismadb.userRequest.update({
      where: {
        id: userRequest.id,
      },
      data: {
        status: "completed",
        result: response.audio,
      },
    });

    await decrementCredits(userId);

    return NextResponse.json({ id: userRequest.id });
  } catch (error) {
    console.log("[MUSIC_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
