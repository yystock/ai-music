import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from "openai";
import { decrementCredits, checkCredits } from "@/lib/credits";
import { formSchema } from "@/lib/type";
import z from "zod";
import prismadb from "@/lib/prismadb";
import { getRecommendation } from "@/lib/spotify";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { email, request, songs, source, task, to } = formSchema.parse(body);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", { status: 500 });
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

    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: ChatCompletionRequestMessageRoleEnum.System,
            content:
              "You are a professional musician. You have listened to all genres of music. You often write music reviews. Help the users identify what kind of music they are into. You are terse, assertive, and never apologize. Then write everything in single paragraph, no more than 250 words.",
          },
          {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: `Please give me your opinion about ${songs[0].name} by ${songs[0].artist}.`,
          },
        ],
      });
      const requestedSongs = songs.map((song) => song.id);
      const joinedSongNames = requestedSongs.join(",");

      const { data } = await getRecommendation(joinedSongNames);
      const recommendations: any[] = data.tracks;

      await prismadb.userRequest.update({
        where: {
          id: userRequest.id,
        },
        data: {
          status: "completed",
          result: response.data.choices[0].message?.content,
          results: {
            create: recommendations.map((song) => ({
              id: song.id,
              name: song.name,
              artist: song.artists[0].name,
              previewUrl: song.preview_url,
              imageUrl: song.album.images[1].url,
            })),
          },
        },
      });

      await decrementCredits(userId);

      // return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_APP_URL}/yours/${userRequest.id}`));
      return NextResponse.json({ id: userRequest.id });
    } catch (error) {
      console.log("[SONG_ROUTE_ERROR]", error);
      await prismadb.userRequest.update({
        where: {
          id: userRequest.id,
        },
        data: {
          status: "failed",
        },
      });
      return new NextResponse("Internal Error", { status: 500 });
    }
  } catch (error) {
    console.log("[SONG_ROUTE_ERROR]", error);
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }
    return new NextResponse("Internal Error", { status: 500 });
  }
}
