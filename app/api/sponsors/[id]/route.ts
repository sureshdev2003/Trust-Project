import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sponsors } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const sponsorId = parseInt(id);

    if (isNaN(sponsorId)) {
      return NextResponse.json(
        { error: 'Invalid sponsor ID' },
        { status: 400 }
      );
    }

    const deletedSponsor = await db
      .delete(sponsors)
      .where(eq(sponsors.id, sponsorId))
      .returning();

    if (deletedSponsor.length === 0) {
      return NextResponse.json(
        { error: 'Sponsor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Sponsor deleted successfully' });
  } catch (error) {
    console.error('Error deleting sponsor:', error);
    return NextResponse.json(
      { error: 'Failed to delete sponsor' },
      { status: 500 }
    );
  }
}