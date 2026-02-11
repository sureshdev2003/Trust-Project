import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { news } from "../drizzle/schema";
import { config } from "dotenv";

config({ path: ".env.local" });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

async function seedNews() {
  try {
    console.log("Seeding news articles...");

    const sampleNews = [
      {
        title: "Welcome to Our Dynamic News System",
        content: "This is a sample news article to demonstrate our new dynamic news system. You can now create, edit, and delete news articles through the admin dashboard, and they will automatically appear on the public news page.",
        imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
      },
      {
        title: "Admin Dashboard Now Live",
        content: "Our new admin dashboard is now live! Administrators can easily manage news articles, upload images, and keep the website content fresh and up-to-date.",
        imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
      },
    ];

    for (const article of sampleNews) {
      await db.insert(news).values(article);
      console.log(`Created article: ${article.title}`);
    }

    console.log("News seeding completed!");
  } catch (error) {
    console.error("Error seeding news:", error);
  } finally {
    await pool.end();
  }
}

seedNews();