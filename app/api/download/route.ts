import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { url } = await req.json();

  if (!url || !url.includes("tiktok.com")) {
    return NextResponse.json({ error: "Invalid TikTok URL" }, { status: 400 });
  }

  const options = {
    method: "GET",
    url: "https://tiktok-api23.p.rapidapi.com/api/download/video",
    params: { url },
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": "tiktok-api23.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch video" }, { status: 500 });
  }
}