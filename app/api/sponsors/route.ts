import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sponsors } from '@/drizzle/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    const allSponsors = await db.select().from(sponsors).orderBy(desc(sponsors.createdAt));
    return NextResponse.json(allSponsors);
  } catch (error) {
    console.error('Error fetching sponsors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sponsors' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageUrl, name, link } = body;

    if (!imageUrl || !name || !link) {
      return NextResponse.json(
        { error: 'Image URL, name, and link are required' },
        { status: 400 }
      );
    }

    const newSponsor = await db.insert(sponsors).values({
      imageUrl,
      name,
      link,
    }).returning();

    return NextResponse.json(newSponsor[0], { status: 201 });
  } catch (error) {
    console.error('Error creating sponsor:', error);
    return NextResponse.json(
      { error: 'Failed to create sponsor' },
      { status: 500 }
    );
  }
}