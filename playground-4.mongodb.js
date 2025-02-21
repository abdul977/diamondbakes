use('diamondbakes');

// Function to get all categories
function getAllCategories() {
  return db.getCollection('categories').find().toArray();
}

// Function to get products by category name
function getProductsByCategoryName(categoryName) {
  return db.getCollection('products').find({ categoryName: categoryName }).toArray();
}

// Get all categories first
const categories = getAllCategories();
print('All Categories:', JSON.stringify(categories, null, 2));

// Get products specifically for CAKES category
const cakeProducts = getProductsByCategoryName('CAKES');
print('\nProducts in CAKES category:', JSON.stringify(cakeProducts, null, 2));
