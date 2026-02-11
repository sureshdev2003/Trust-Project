// Load .env when present so DATABASE_URL is available during local script runs
import "dotenv/config";
import { db } from "@/lib/db";
import { admin } from "@/drizzle/schema";
import * as crypto from "crypto";

// Helpful runtime check: ensure DATABASE_URL is present and is a string
if (!process.env.DATABASE_URL || typeof process.env.DATABASE_URL !== "string") {
  console.error(
    "❌ Missing or invalid DATABASE_URL. Set DATABASE_URL in your environment or create a .env file with DATABASE_URL=postgresql://user:password@host:port/db"
  );
  process.exit(1);
}
import "dotenv/config"

async function createAdmin() {
  const password = "admin123";
  
  // Hash password using Node's crypto
  const passwordHash = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  try {
    await db.insert(admin).values({
      passwordHash,
    });
    
    console.log("✅ Admin created successfully!");
    console.log(`Password: ${password}`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
}

createAdmin();
