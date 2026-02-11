import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { news } from "../drizzle/schema";
import { like, eq } from "drizzle-orm";
import { config } from "dotenv";

config({ path: ".env.local" });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

async function cleanupBlobUrls() {
  try {
    console.log("Checking for articles with blob URLs...");

    // Find articles with blob URLs
    const articlesWithBlobUrls = await db
      .select()
      .from(news)
      .where(like(news.imageUrl, "blob:%"));

    if (articlesWithBlobUrls.length === 0) {
      console.log("No articles with blob URLs found.");
      return;
    }

    console.log(`Found ${articlesWithBlobUrls.length} articles with blob URLs:`);
    
    for (const article of articlesWithBlobUrls) {
      console.log(`- ID: ${article.id}, Title: ${article.title}, URL: ${article.imageUrl}`);
      
      // Delete articles with blob URLs as they're invalid
      await db.delete(news).where(eq(news.id, article.id));
      console.log(`  Deleted article ID: ${article.id}`);
    }

    console.log("Cleanup completed!");
  } catch (error) {
    console.error("Error during cleanup:", error);
  } finally {
    await pool.end();
  }
}

cleanupBlobUrls();