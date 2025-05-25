import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

// Define the type for a meme object
interface Meme {
  name: string;
  explanation: string;
  image: string;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query") || "";
  const random = url.searchParams.get("random") === "true";

  const filePath = path.join(process.cwd(), "public/data/memes.json");
  const jsonData = await fs.readFile(filePath, "utf8");
  const memes: Meme[] = JSON.parse(jsonData);

  if (random) {
    const randomMeme = memes[Math.floor(Math.random() * memes.length)];
    return NextResponse.json({
      name: randomMeme.name,
      image: randomMeme.image,
    });
  }

  if (query) {
    const filteredMemes = memes.filter((meme: Meme) =>
      meme.name.toLowerCase().includes(query.toLowerCase())
    );
    return NextResponse.json(filteredMemes);
  }

  // Return all memes if no query or random parameter
  return NextResponse.json(memes);
}
