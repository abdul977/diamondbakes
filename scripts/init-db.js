import { MongoClient } from 'mongodb';
import { blogPosts } from './data.js';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

async function initializeDb() {
  try {
    const client = await MongoClient.connect(uri);
    console.log('Connected to MongoDB');

    const db = client.db('diamondbakes');
    const collection = db.collection('blogposts');

    // Clear existing data
    await collection.deleteMany({});
    console.log('Cleared existing blog posts');

    // Insert blog posts
    const result = await collection.insertMany(blogPosts);
    console.log(`Inserted ${result.insertedCount} blog posts`);

    await client.close();
    console.log('Database initialization complete');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDb();
