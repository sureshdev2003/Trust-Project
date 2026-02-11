import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { donations } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !['pending', 'verified', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be pending, verified, or rejected' },
        { status: 400 }
      );
    }

    const updatedDonation = await db
      .update(donations)
      .set({ status })
      .where(eq(donations.id, parseInt(id)))
      .returning();

    if (updatedDonation.length === 0) {
      return NextResponse.json(
        { error: 'Donation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedDonation[0]);
  } catch (error) {
    console.error('Error updating donation:', error);
    return NextResponse.json(
      { error: 'Failed to update donation' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const deletedDonation = await db
      .delete(donations)
      .where(eq(donations.id, parseInt(id)))
      .returning();

    if (deletedDonation.length === 0) {
      return NextResponse.json(
        { error: 'Donation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Donation deleted successfully' });
  } catch (error) {
    console.error('Error deleting donation:', error);
    return NextResponse.json(
      { error: 'Failed to delete donation' },
      { status: 500 }
    );
  }
}