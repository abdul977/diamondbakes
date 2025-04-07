// This script seeds FAQ data directly to MongoDB using the provided connection string
// Run with: node scripts/seed-faq-cli.js

import { MongoClient } from 'mongodb';

// MongoDB connection string
const MONGODB_URI = 'mongodb+srv://abdul977:salis977@cluster0.s6mmj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const DB_NAME = 'diamondbakes';
const COLLECTION_NAME = 'faqcategories';

// Initial FAQ data
const faqData = [
  {
    name: "Ordering & Delivery",
    order: 0,
    questions: [
      {
        question: "How do I place an order?",
        answer: "You can place an order through our WhatsApp line at +234 802 740 8760. Simply click on any product and use the \"Order on WhatsApp\" button to start your order.",
        order: 0
      },
      {
        question: "What is the lead time for orders?",
        answer: "Regular orders need at least 24 hours notice. For custom cakes and large events, we recommend placing orders 3-5 days in advance. Bulk orders for events may require longer lead times.",
        order: 1
      },
      {
        question: "Do you offer delivery?",
        answer: "Yes, we offer delivery within Lagos. Delivery fees vary based on location. You can discuss delivery options and fees when placing your order.",
        order: 2
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept bank transfers, mobile money, and cash payments. Payment details will be provided when you place your order.",
        order: 3
      }
    ]
  },
  {
    name: "Products & Customization",
    order: 1,
    questions: [
      {
        question: "Can I customize my cake design?",
        answer: "Yes! We offer custom cake designs for all occasions. Please provide your requirements and reference images when placing your order.",
        order: 0
      },
      {
        question: "Do you cater for dietary restrictions?",
        answer: "We can accommodate some dietary requirements like eggless or sugar-free options. Please discuss your specific needs when ordering.",
        order: 1
      },
      {
        question: "What is your most popular product?",
        answer: "Our celebration cakes and meat pies are among our most popular items. For events, our small chops packages are frequently ordered.",
        order: 2
      },
      {
        question: "How long do your products stay fresh?",
        answer: "Most of our products are best consumed within 24-48 hours. Bread and pastries are freshly baked daily. Storage instructions will be provided with your order.",
        order: 3
      }
    ]
  },
  {
    name: "Events & Bulk Orders",
    order: 2,
    questions: [
      {
        question: "Do you cater for events?",
        answer: "Yes, we provide catering services for all types of events including weddings, birthdays, and corporate functions. Contact us for custom quotes.",
        order: 0
      },
      {
        question: "Is there a minimum order for events?",
        answer: "Minimum orders vary by product. For small chops, we typically require a minimum of 50 pieces. For other products, please inquire when ordering.",
        order: 1
      },
      {
        question: "Do you offer discounts for bulk orders?",
        answer: "Yes, we offer special pricing for bulk orders. The discount depends on the quantity and products ordered. Contact us for a custom quote.",
        order: 2
      },
      {
        question: "Can you set up a dessert table for my event?",
        answer: "Yes, we offer dessert table setup services for events. This includes display setup, labeling, and arrangement of your ordered items.",
        order: 3
      }
    ]
  },
  {
    name: "Quality & Storage",
    order: 3,
    questions: [
      {
        question: "What ingredients do you use?",
        answer: "We use high-quality, fresh ingredients in all our products. Our ingredients are sourced from trusted suppliers to ensure the best taste and quality.",
        order: 0
      },
      {
        question: "How should I store my ordered items?",
        answer: "Storage instructions vary by product. Generally, bread and pastries should be stored at room temperature if consuming within 24 hours, or refrigerated for longer storage. Detailed instructions will be provided with your order.",
        order: 1
      },
      {
        question: "Do you use preservatives?",
        answer: "We minimize the use of preservatives in our products. This is why we recommend consuming them fresh within the recommended timeframe.",
        order: 2
      },
      {
        question: "What if I'm not satisfied with my order?",
        answer: "Customer satisfaction is our priority. If you're not satisfied with your order, please contact us within 24 hours of receiving it, and we'll work to resolve the issue.",
        order: 3
      }
    ]
  }
];

// Function to seed the FAQ data
async function seedFAQData() {
  let client;
  
  try {
    console.log('Connecting to MongoDB...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
    
    // Check if collection has data
    const existingData = await collection.countDocuments();
    if (existingData > 0) {
      console.log(`Found ${existingData} existing FAQ categories. Clearing collection...`);
      await collection.deleteMany({});
      console.log('Existing FAQ data cleared.');
    }
    
    // Prepare data with IDs and timestamps
    const now = new Date();
    const preparedData = faqData.map((category, index) => ({
      id: (index + 1).toString(), // Generate sequential IDs
      name: category.name,
      order: category.order,
      questions: category.questions,
      createdAt: now,
      updatedAt: now
    }));
    
    // Insert the data
    console.log('Inserting FAQ data...');
    const result = await collection.insertMany(preparedData);
    
    console.log(`Successfully inserted ${result.insertedCount} FAQ categories.`);
    console.log('FAQ data seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding FAQ data:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
}

// Run the seeding function
seedFAQData();
