import { MongoClient } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://abdul977:salis977@cluster0.s6mmj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function checkDatabase() {
  try {
    const client = await MongoClient.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const db = client.db('diamondbakes');
    const collection = db.collection('blogposts');

    const posts = await collection.find({}).toArray();
    console.log('Blog Posts:', JSON.stringify(posts, null, 2));

    await client.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkDatabase();
