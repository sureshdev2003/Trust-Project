import { NextResponse } from "next/server";
import { db } from '@/lib/db';
import { certificates } from '@/drizzle/schema';
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const title = form.get("title") as string;
    const description = form.get("description") as string;
    const photo = form.get("photo") as File;

    if (!title || !photo) {
      return NextResponse.json(
        { success: false, message: "Title & Photo required" },
        { status: 400 }
      );
    }

    // Save uploaded photo to public folder
    const bytes = await photo.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${photo.name}`;
    const filePath = path.join(process.cwd(), "public/certificates", fileName);

    await writeFile(filePath, buffer);

    // Save to DB
    await db.insert(certificates).values({
      title,
      description,
      image: `/certificates/${fileName}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Error uploading certificate" },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    const allCertificates = await db.select().from(certificates).orderBy(certificates.id);

    return NextResponse.json({ success: true, data: allCertificates });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Error fetching certificates" },
      { status: 500 }
    );
  }
}

