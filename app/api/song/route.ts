import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from "openai";
import { decrementCredits, checkCredits } from "@/lib/credits";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { source, request } = body;
    console.log(source, request);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    if (!request) {
      return new NextResponse("Request are required", { status: 400 });
    }

    if (!source) {
      return new NextResponse("Source are required", { status: 400 });
    }

    const credits = await checkCredits();

    if (!credits) {
      return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
    }

    console.log("starting");

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: ChatCompletionRequestMessageRoleEnum.System,
          content:
            "You are a professional musician. You have listened to all genres of music. You often write reviews about songs and make song recommendations to other people. Help the users find similar songs that they might like. You are terse, assertive, and never apologize.",
        },
        {
          role: ChatCompletionRequestMessageRoleEnum.User,
          content: `Please recommend me 5 songs similar to ${request}`,
        },
      ],
    });
    console.log("completed");

    await decrementCredits();

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log("[SONG_ROUTE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
