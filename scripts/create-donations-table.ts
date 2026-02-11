import { db } from '../lib/db';
import { sql } from 'drizzle-orm';

async function createDonationsTable() {
  try {
    console.log('Creating donations table...');
    
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS donations (
        id serial PRIMARY KEY NOT NULL,
        full_name text NOT NULL,
        email text NOT NULL,
        amount text NOT NULL,
        pan_card text NOT NULL,
        transaction_id text NOT NULL,
        proof_image_url text NOT NULL,
        status text DEFAULT 'pending' NOT NULL,
        created_at timestamp DEFAULT now() NOT NULL
      );
    `);
    
    console.log('Donations table created successfully!');
  } catch (error) {
    console.error('Error creating donations table:', error);
  }
}

createDonationsTable();