import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { gallery } from '@/drizzle/schema';
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const file = formData.get("image") as File;

    if (!title || !file) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Convert image → buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate filename
    const fileName = Date.now() + "-" + file.name.replace(/\s+/g, "_");

    // Save image inside /public/uploads/gallery/
    const filePath = path.join(
      process.cwd(),
      "public",
      "uploads",
      "gallery",
      fileName
    );

    await writeFile(filePath, buffer);

    // Public URL for frontend
  await db.insert(gallery).values({
  title,
  description,
  imagePath: `/uploads/gallery/${fileName}`
});


    return NextResponse.json({ success: true, imagePath: `/uploads/gallery/${fileName}` }, { status: 200 });
  } catch (error) {
    console.error("Gallery Upload Error:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const data = await db.select().from(gallery);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Gallery Fetch Error:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
