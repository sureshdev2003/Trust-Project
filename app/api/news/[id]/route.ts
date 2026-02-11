import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { news } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

// GET - Fetch single news article
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const newsId = parseInt(resolvedParams.id);
    
    if (isNaN(newsId)) {
      return NextResponse.json(
        { error: "Invalid news ID" },
        { status: 400 }
      );
    }

    const newsArticle = await db
      .select()
      .from(news)
      .where(eq(news.id, newsId))
      .limit(1);

    if (newsArticle.length === 0) {
      return NextResponse.json(
        { error: "News article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(newsArticle[0]);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

// DELETE - Delete news article
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    console.log("DELETE request received for ID:", resolvedParams.id);
    
    const newsId = parseInt(resolvedParams.id);
    
    if (isNaN(newsId)) {
      console.error("Invalid news ID:", resolvedParams.id);
      return NextResponse.json(
        { error: "Invalid news ID" },
        { status: 400 }
      );
    }

    console.log("Attempting to delete news with ID:", newsId);

    const deletedNews = await db
      .delete(news)
      .where(eq(news.id, newsId))
      .returning();

    console.log("Delete result:", deletedNews);

    if (deletedNews.length === 0) {
      console.error("News article not found for ID:", newsId);
      return NextResponse.json(
        { error: "News article not found" },
        { status: 404 }
      );
    }

    console.log("Successfully deleted news article:", deletedNews[0]);
    return NextResponse.json({ 
      message: "News article deleted successfully",
      deletedArticle: deletedNews[0]
    });
  } catch (error) {
    console.error("Error deleting news:", error);
    return NextResponse.json(
      { error: `Failed to delete news: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}

// PUT - Update news article
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const newsId = parseInt(resolvedParams.id);
    const body = await request.json();
    const { title, content, imageUrl } = body;

    if (isNaN(newsId)) {
      return NextResponse.json(
        { error: "Invalid news ID" },
        { status: 400 }
      );
    }

    if (!title || !content || !imageUrl) {
      return NextResponse.json(
        { error: "Title, content, and image URL are required" },
        { status: 400 }
      );
    }

    const updatedNews = await db
      .update(news)
      .set({
        title,
        content,
        imageUrl,
      })
      .where(eq(news.id, newsId))
      .returning();

    if (updatedNews.length === 0) {
      return NextResponse.json(
        { error: "News article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedNews[0]);
  } catch (error) {
    console.error("Error updating news:", error);
    return NextResponse.json(
      { error: "Failed to update news" },
      { status: 500 }
    );
  }
}