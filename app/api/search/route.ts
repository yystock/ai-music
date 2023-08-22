import { getSongs } from "@/lib/spotify";
import { NextResponse } from "next/server";

const clientId = process.env.SPOTIFY_CLIIENT_ID;
const token = process.env.SPOTIFY_TOKEN;
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  try {
    if (!query) {
      return new NextResponse("Body is required", { status: 400 });
    }
    const { data } = await getSongs(query);

    return NextResponse.json(data);
  } catch (error) {
    console.log("[SEARCH_ROUTE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
