import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { news } from "@/drizzle/schema";
import { desc } from "drizzle-orm";

// GET - Fetch all news articles
export async function GET() {
  try {
    const newsArticles = await db
      .select()
      .from(news)
      .orderBy(desc(news.createdAt));

    return NextResponse.json(newsArticles);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

// POST - Create new news article
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, imageUrl } = body;

    if (!title || !content || !imageUrl) {
      return NextResponse.json(
        { error: "Title, content, and image URL are required" },
        { status: 400 }
      );
    }

    // Validate that imageUrl is not a blob URL
    if (imageUrl.startsWith('blob:')) {
      return NextResponse.json(
        { error: "Invalid image URL. Please upload the image properly." },
        { status: 400 }
      );
    }

    const newNews = await db
      .insert(news)
      .values({
        title,
        content,
        imageUrl,
      })
      .returning();

    return NextResponse.json(newNews[0], { status: 201 });
  } catch (error) {
    console.error("Error creating news:", error);
    return NextResponse.json(
      { error: "Failed to create news" },
      { status: 500 }
    );
  }
}