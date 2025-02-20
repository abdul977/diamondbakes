import mongoose from 'mongoose';
import { Category, Product } from '../server/models/menuModels.js';

const MONGODB_URI = 'mongodb+srv://abdul977:salis977@cluster0.s6mmj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Initial categories data
const categories = [
  {
    id: '1',
    name: 'CAKES',
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80',
    description: 'All types of cakes including budget and celebration cakes',
    link: '/products/cakes'
  },
  {
    id: '2',
    name: 'BREAD VARIETIES',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80',
    description: 'Different types of freshly baked bread including banana and coconut bread',
    link: '/products/bread-varieties'
  },
  {
    id: '3',
    name: 'MEAT & CHICKEN PIES',
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&q=80',
    description: 'Delicious savory pies made with fresh meat and chicken filling',
    link: '/products/meat-and-chicken-pies'
  },
  {
    id: '4',
    name: 'SMALL CHOPS',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80',
    description: 'Perfect party snacks and finger foods for your events',
    link: '/products/small-chops'
  },
  {
    id: '5',
    name: 'SHAWARMA',
    image: 'https://images.unsplash.com/photo-1633321702518-7feccafb94d5?auto=format&fit=crop&q=80',
    description: 'Delicious shawarma wraps with special sauce',
    link: '/products/shawarma'
  },
  {
    id: '6',
    name: 'OTHER PASTRIES',
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80',
    description: 'Various pastries and baked treats ready to travel',
    link: '/products/other-pastries'
  }
];

// Category name to ID mapping
const categoryMap = {
  'CAKES': '1',
  'BREAD VARIETIES': '2',
  'MEAT & CHICKEN PIES': '3',
  'SMALL CHOPS': '4',
  'SHAWARMA': '5',
  'OTHER PASTRIES': '6'
};

// Initial products data with categoryId and categoryName
const products = [
  // Cakes
  {
    id: 'c1',
    name: 'Birthday Cake',
    description: 'Customized birthday cakes with your choice of flavors and designs',
    price: 'Starting from ₦30,000',
    categoryId: categoryMap['CAKES'],
    categoryName: 'CAKES',
    image: 'https://images.unsplash.com/photo-1589218909732-f304d13fbf2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMGNha2V8ZW58MHwwfHx8MTczOTQ5NDA3NHww&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'c2',
    name: 'Wedding Cake',
    description: 'Elegant multi-tiered wedding cakes with premium decorations',
    price: 'Starting from ₦100,000',
    categoryId: categoryMap['CAKES'],
    categoryName: 'CAKES',
    image: 'https://images.unsplash.com/photo-1604702433171-33756f3f3825?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2FrZXxlbnwwfDB8fHwxNzM5NDk0MDc1fDA&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'c3',
    name: 'Cupcakes',
    description: 'Delicious cupcakes in various flavors perfect for any occasion',
    price: '₦10,000 per dozen',
    categoryId: categoryMap['CAKES'],
    categoryName: 'CAKES',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlfGVufDB8MHx8fDE3Mzk0OTQwNzV8MA&ixlib=rb-4.0.3&q=80&w=1080'
  },

  // Bread Varieties
  {
    id: 'b1',
    name: 'Banana Bread',
    description: 'Moist and delicious banana bread made with ripe bananas and premium ingredients',
    price: '₦7,000',
    categoryId: categoryMap['BREAD VARIETIES'],
    categoryName: 'BREAD VARIETIES',
    image: 'https://images.unsplash.com/photo-1686431985100-a31cb343bce9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxmcmVzaGx5JTIwYmFrZWQlMjBicmVhZHxlbnwwfDB8fHwxNzM5NDk0MDc3fDA&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'b2',
    name: 'Coconut Bread',
    description: 'Sweet and fluffy coconut bread with real coconut flakes',
    price: '₦6,000',
    categoryId: categoryMap['BREAD VARIETIES'],
    categoryName: 'BREAD VARIETIES',
    image: 'https://images.unsplash.com/photo-1566698629409-787a68fc5724?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwYnJlYWR8ZW58MHwwfHx8MTczOTQ5NDA3OHww&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'b3',
    name: 'Whole Wheat Bread',
    description: 'Healthy whole wheat bread perfect for sandwiches',
    price: '₦5,000',
    categoryId: categoryMap['BREAD VARIETIES'],
    categoryName: 'BREAD VARIETIES',
    image: 'https://images.unsplash.com/photo-1598373182308-3270495d2f58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxicmVhZCUyMGxvYWZ8ZW58MHwwfHx8MTczOTQ5NDA3OXww&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'b4',
    name: 'Milk Bread',
    description: 'Soft and fluffy milk bread, perfect for breakfast',
    price: '₦4,000',
    categoryId: categoryMap['BREAD VARIETIES'],
    categoryName: 'BREAD VARIETIES',
    image: 'https://images.unsplash.com/photo-1579697096985-41fe1430e5df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZHxlbnwwfDB8fHwxNzM5NDk0MDc5fDA&ixlib=rb-4.0.3&q=80&w=1080'
  },

  // Pies
  {
    id: 'p1',
    name: 'Meat Pie',
    description: 'Classic Nigerian meat pie filled with seasoned minced meat, potatoes, and carrots',
    price: '₦1,000 per piece',
    categoryId: categoryMap['MEAT & CHICKEN PIES'],
    categoryName: 'MEAT & CHICKEN PIES',
    image: 'https://images.unsplash.com/photo-1545668855-b923f0176935?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxtZWF0JTIwcGllfGVufDB8MHx8fDE3Mzk0OTQwODF8MA&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'p2',
    name: 'Chicken Pie',
    description: 'Delicious pie filled with tender chicken and vegetables',
    price: '₦1,000 per piece',
    categoryId: categoryMap['MEAT & CHICKEN PIES'],
    categoryName: 'MEAT & CHICKEN PIES',
    image: 'https://images.unsplash.com/photo-1601000938365-f182c5ec2f77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwcGllfGVufDB8MHx8fDE3Mzk0OTQwODF8MA&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'p3',
    name: 'Party Pack Pies',
    description: 'Mix of meat and chicken pies perfect for events (minimum 50 pieces)',
    price: 'Starting from ₦50,000',
    categoryId: categoryMap['MEAT & CHICKEN PIES'],
    categoryName: 'MEAT & CHICKEN PIES',
    image: 'https://images.unsplash.com/photo-1601000938259-9e92002320b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxuaWdlcmlhbiUyMG1lYXQlMjBwaWV8ZW58MHwwfHx8MTczOTQ5NDA4Mnww&ixlib=rb-4.0.3&q=80&w=1080'
  },

  // Small Chops
  {
    id: 'sc1',
    name: 'Classic Small Chops Pack',
    description: 'Mix of spring rolls, samosas, puff puff, and chicken wings (50 pieces)',
    price: '₦30,000',
    categoryId: categoryMap['SMALL CHOPS'],
    categoryName: 'SMALL CHOPS',
    image: 'https://images.unsplash.com/photo-1606525437679-037aca74a3e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxzcHJpbmclMjByb2xsc3xlbnwwfDB8fHwxNzM5NDk0MDg0fDA&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'sc2',
    name: 'Premium Party Pack',
    description: 'Deluxe mix including fish rolls, mini pizzas, and meatballs (100 pieces)',
    price: '₦70,000',
    categoryId: categoryMap['SMALL CHOPS'],
    categoryName: 'SMALL CHOPS',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxzYW1vc2F8ZW58MHwwfHx8MTczOTQ5NDA4NXww&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'sc3',
    name: 'Puff Puff Special',
    description: 'Nigerian-style soft and fluffy puff puff (50 pieces)',
    price: '₦10,000',
    categoryId: categoryMap['SMALL CHOPS'],
    categoryName: 'SMALL CHOPS',
    image: 'https://images.unsplash.com/photo-1665833613236-7c1d087463b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxwdWZmJTIwcHVmZnxlbnwwfDB8fHwxNzM5NDk0MDg1fDA&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'sc4',
    name: 'Spring Rolls Pack',
    description: 'Crispy vegetable spring rolls with sweet chili sauce (30 pieces)',
    price: '₦20,000',
    categoryId: categoryMap['SMALL CHOPS'],
    categoryName: 'SMALL CHOPS',
    image: 'https://images.unsplash.com/photo-1574183118053-258a7b31e784?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxmaW5nZXIlMjBmb29kfGVufDB8MHx8fDE3Mzk0OTQwODZ8MA&ixlib=rb-4.0.3&q=80&w=1080'
  },

  // Shawarma
  {
    id: 'sh1',
    name: 'Classic Chicken Shawarma',
    description: 'Grilled chicken with fresh vegetables and special sauce wrapped in flat bread',
    price: '₦4,000',
    categoryId: categoryMap['SHAWARMA'],
    categoryName: 'SHAWARMA',
    image: 'https://images.unsplash.com/photo-1724698341025-3df06b7e490d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwc2hhd2FybWF8ZW58MHwwfHx8MTczOTQ5NDA4N3ww&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'sh2',
    name: 'Beef Shawarma',
    description: 'Seasoned beef strips with vegetables and garlic sauce',
    price: '₦5,000',
    categoryId: categoryMap['SHAWARMA'],
    categoryName: 'SHAWARMA',
    image: 'https://images.unsplash.com/photo-1654579920979-8ebb4e96b755?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxiZWVmJTIwc2hhd2FybWF8ZW58MHwwfHx8MTczOTQ5NDA4OHww&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'sh3',
    name: 'Special Shawarma',
    description: 'Double meat (chicken and beef) with extra cheese and special sauce',
    price: '₦6,000',
    categoryId: categoryMap['SHAWARMA'],
    categoryName: 'SHAWARMA',
    image: 'https://images.unsplash.com/photo-1662116765994-1e4200c43589?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxzaGF3YXJtYSUyMHdyYXB8ZW58MHwwfHx8MTczOTQ5NDA4OXww&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'sh4',
    name: 'Party Pack',
    description: 'Mix of chicken and beef shawarma (10 pieces)',
    price: '₦44,000',
    categoryId: categoryMap['SHAWARMA'],
    categoryName: 'SHAWARMA',
    image: 'https://images.unsplash.com/photo-1715640396476-a884855dbcc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxneXJvJTIwc2FuZHdpY2h8ZW58MHwwfHx8MTczOTQ5NDA4OXww&ixlib=rb-4.0.3&q=80&w=1080'
  },

  // Other Pastries
  {
    id: 'pa1',
    name: 'Sausage Roll',
    description: 'Classic sausage roll with seasoned minced meat filling',
    price: '₦800 per piece',
    categoryId: categoryMap['OTHER PASTRIES'],
    categoryName: 'OTHER PASTRIES',
    image: 'https://images.unsplash.com/photo-1619445832874-8b153f60ae78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxzYXVzYWdlJTIwcm9sbHxlbnwwfDB8fHwxNzM5NDk0MDkwfDA&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'pa2',
    name: 'Doughnuts',
    description: 'Soft and fluffy doughnuts with various toppings (6 pieces)',
    price: '₦5,000',
    categoryId: categoryMap['OTHER PASTRIES'],
    categoryName: 'OTHER PASTRIES',
    image: 'https://images.unsplash.com/photo-1587652758160-6fee93aee8a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGNyb2lzc2FudHN8ZW58MHwwfHx8MTczOTQ5NDA5MXww&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'pa3',
    name: 'Scotch Egg',
    description: 'Boiled egg wrapped in seasoned minced meat and breadcrumbs',
    price: '₦1,000 per piece',
    categoryId: categoryMap['OTHER PASTRIES'],
    categoryName: 'OTHER PASTRIES',
    image: 'https://images.unsplash.com/photo-1599639668273-01b1f435b56d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxkb3VnaG51dHMlMjBkaXNwbGF5fGVufDB8MHx8fDE3Mzk0OTQwOTJ8MA&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'pa4',
    name: 'Croissants',
    description: 'Buttery, flaky croissants (4 pieces)',
    price: '₦6,000',
    categoryId: categoryMap['OTHER PASTRIES'],
    categoryName: 'OTHER PASTRIES',
    image: 'https://images.unsplash.com/photo-1576748092413-ee713ea2f178?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxzY290Y2glMjBlZ2d8ZW58MHwwfHx8MTczOTQ5NDA5Mnww&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    id: 'pa5',
    name: 'Chicken Roll',
    description: 'Puff pastry filled with seasoned shredded chicken',
    price: '₦1,200 per piece',
    categoryId: categoryMap['OTHER PASTRIES'],
    categoryName: 'OTHER PASTRIES',
    image: 'https://images.unsplash.com/photo-1504113888839-1c8eb50233d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzY2NTJ8MHwxfHNlYXJjaHwxfHxwYXN0cnklMjBkaXNwbGF5fGVufDB8MHx8fDE3Mzk0OTQwOTN8MA&ixlib=rb-4.0.3&q=80&w=1080'
  }
];

async function initializeMenu() {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: 'diamondbakes'
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing menu data');

    // Insert new data
    await Category.insertMany(categories);
    console.log('Inserted categories');

    await Product.insertMany(products);
    console.log('Inserted products');

    console.log('Menu initialization complete');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

initializeMenu();
