import { db } from '../lib/db';
import { donations } from '../drizzle/schema';

async function testDonations() {
  try {
    console.log('Testing donations table...');
    
    // Try to fetch donations
    const allDonations = await db.select().from(donations);
    console.log('Donations fetched successfully:', allDonations.length);
    
    // Try to create a test donation
    const testDonation = await db.insert(donations).values({
      fullName: 'Test Donor',
      email: 'test@example.com',
      amount: '1000',
      panCard: 'ABCDE1234F',
      transactionId: 'TEST123456',
      proofImageUrl: '/test.jpg',
      status: 'pending'
    }).returning();
    
    console.log('Test donation created:', testDonation[0]);
    
  } catch (error) {
    console.error('Error testing donations:', error);
  }
}

testDonations();