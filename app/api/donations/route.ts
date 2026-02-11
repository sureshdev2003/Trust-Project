import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { donations } from '@/drizzle/schema';
import { desc } from 'drizzle-orm';
import { transporter } from "@/lib/mail";

export async function GET() {
  try {
    const allDonations = await db.select().from(donations).orderBy(desc(donations.createdAt));
    return NextResponse.json(allDonations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch donations' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
const { name, email, amount, panNumber, transactionId, proofImageUrl } = body;

if (!name || !email || !amount || !panNumber || !transactionId || !proofImageUrl) {
  return NextResponse.json(
    { error: 'All fields are required' },
    { status: 400 }
  );
}


    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate amount is a positive number
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return NextResponse.json(
        { error: 'Invalid donation amount' },
        { status: 400 }
      );
    }

const newDonation = await db.insert(donations).values({
  fullName: name,
  email,
  amount,
  panCard: panNumber,
  transactionId,
  proofImageUrl,
  status: 'pending'
}).returning();

    await transporter.sendMail({
      from: `"Donation Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Donation Received - Thank You!",
      html: `
        <h2>Dear ${name},</h2>
        <p>Thank you for your generous donation of <b>₹${amount}</b>.</p>
        <p>Your transaction ID: <b>${transactionId}</b></p>
        <p>We truly appreciate your support and contribution.</p>
        <br/>
        <p>Regards,<br/>Donation Team</p>
      `,
    });

    return NextResponse.json(newDonation[0], { status: 201 });
  } catch (error) {
    console.error('Error creating donation:', error);
    return NextResponse.json(
      { error: 'Failed to create donation' },
      { status: 500 }
    );
  }
}