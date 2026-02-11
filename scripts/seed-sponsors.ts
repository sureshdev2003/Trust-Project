import { db } from '../lib/db';
import { sponsors } from '../drizzle/schema';

const sampleSponsors = [
  {
    name: 'Microsoft',
    link: 'https://microsoft.com',
    imageUrl: '/uploads/microsoft-logo.png'
  },
  {
    name: 'Google',
    link: 'https://google.com',
    imageUrl: '/uploads/google-logo.png'
  },
  {
    name: 'Apple',
    link: 'https://apple.com',
    imageUrl: '/uploads/apple-logo.png'
  },
  {
    name: 'Tesla',
    link: 'https://tesla.com',
    imageUrl: '/uploads/tesla-logo.png'
  },
  {
    name: 'Netflix',
    link: 'https://netflix.com',
    imageUrl: '/uploads/netflix-logo.png'
  },
  {
    name: 'LinkedIn',
    link: 'https://linkedin.com',
    imageUrl: '/uploads/linkedin-logo.png'
  }
];

async function seedSponsors() {
  try {
    console.log('Seeding sponsors...');
    
    // Insert sample sponsors
    for (const sponsor of sampleSponsors) {
      await db.insert(sponsors).values(sponsor);
      console.log(`Added sponsor: ${sponsor.name}`);
    }
    
    console.log('Sponsors seeded successfully!');
  } catch (error) {
    console.error('Error seeding sponsors:', error);
  }
}

seedSponsors();