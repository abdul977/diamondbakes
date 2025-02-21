/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.

use('diamondbakes');

// 1. First, get all categories
const categories = db.categories.find().toArray();
print('Found categories:', categories);

// 2. Create a map of category name to ID
const categoryMap = categories.reduce((acc, cat) => {
  acc[cat.name] = cat.id;
  return acc;
}, {});

print('Category map:', categoryMap);

// 3. Update all products to have correct categoryId and categoryName
const products = db.products.find().toArray();
print('Found products:', products);

products.forEach(product => {
  const categoryId = categoryMap[product.categoryName];
  if (categoryId) {
    // Update product with correct categoryId
    db.products.updateOne(
      { _id: product._id },
      { 
        $set: { 
          categoryId: categoryId,
          categoryName: product.categoryName 
        } 
      }
    );
    print(`Updated product ${product.name} with categoryId ${categoryId}`);
  } else {
    print(`Warning: No matching category found for product ${product.name} with categoryName ${product.categoryName}`);
  }
});

// 4. Verify the updates
const updatedProducts = db.products.find().toArray();
print('Updated products:', updatedProducts);