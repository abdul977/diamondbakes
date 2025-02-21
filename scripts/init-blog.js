import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'diamondbakes';

const blogPosts = [
  {
    id: "1",
    title: "Top 5 Cake Decorating Tips for Beginners",
    excerpt: "Learn the essential techniques to make your cakes look professionally decorated.",
    content: `Whether you're just starting your baking journey or looking to improve your cake decorating skills, these five essential tips will help you create stunning cakes that look professionally made.

1. Start with a Level Surface
Always ensure your cake layers are level before decorating. Use a long serrated knife or cake leveler to trim any domes off your cake layers. This creates a stable foundation for your decorations.

2. Crumb Coat is Key
Never skip the crumb coat! This thin layer of frosting seals in the crumbs and creates a smooth surface for your final coat. Chill the cake for at least 15 minutes after applying the crumb coat.

3. Temperature Matters
Work with room temperature frosting for smooth application. If your frosting is too cold, it won't spread evenly. If it's too warm, it won't hold its shape.

4. Invest in Basic Tools
You don't need many tools to start, but a few essentials make a big difference: an offset spatula, bench scraper, and piping bags with basic tips.

5. Practice Piping
Before decorating your cake, practice piping techniques on parchment paper. You can scrape the frosting back into the bowl and reuse it, making this a cost-effective way to improve your skills.`,
    author: "Sarah Johnson",
    date: "2024-02-15",
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?q=80&w=1200&auto=format",
    tags: ["Tips", "Cake Decorating", "Beginner Friendly"]
  }
];

async function initBlogPosts() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection('blogposts');

    // Check if collection is empty before initializing
    const count = await collection.countDocuments();
    if (count === 0) {
      // Insert blog posts
      await collection.insertMany(blogPosts);
      console.log('Inserted sample blog posts');

      // Create indexes
      await collection.createIndex({ id: 1 }, { unique: true });
      console.log('Created indexes');
    } else {
      console.log('Blog posts collection already initialized');
    }

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

initBlogPosts().catch(console.error);