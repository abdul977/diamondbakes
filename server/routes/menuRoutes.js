import express from 'express';
import { Category, Product } from '../models/menuModels.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Debug endpoint to verify router is working
router.get('/test', (req, res) => {
  console.log('Test endpoint hit');
  res.json({ message: 'Router is working' });
});

// Helper function to generate product ID
async function generateProductId(categoryName) {
  // Get prefix based on category
  const prefixMap = {
    'CAKES': 'c',
    'BREAD VARIETIES': 'b',
    'MEAT & CHICKEN PIES': 'p',
    'SMALL CHOPS': 'sc',
    'SHAWARMA': 'sh',
    'OTHER PASTRIES': 'pa'
  };
  
  const prefix = prefixMap[categoryName] || 'p'; // Default to 'p' if category not found
  
  // Find highest number for this prefix
  const products = await Product.find({ id: new RegExp(`^${prefix}\\d+$`) });
  const numbers = products.map(p => parseInt(p.id.replace(prefix, '')));
  const maxNum = Math.max(0, ...numbers);
  
  return `${prefix}${maxNum + 1}`;
}

// Helper function to generate category ID
async function generateCategoryId() {
  const categories = await Category.find();
  const ids = categories.map(c => parseInt(c.id));
  const maxId = Math.max(0, ...ids);
  return (maxId + 1).toString();
}

// @desc    Get all menu categories
// @route   GET /api/menu/categories
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    console.log('Fetching all menu categories...');
    const categories = await Category.find();
    console.log('Found categories:', categories);
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create new category
// @route   POST /api/menu/categories
// @access  Private/Admin
router.post('/categories', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    console.log('Create category request:', {
      body: req.body,
      user: {
        id: req.user?._id,
        role: req.user?.role
      }
    });
    
    // Validate required fields
    const missingFields = [];
    if (!req.body.name) missingFields.push('name');
    if (!req.body.description) missingFields.push('description');
    if (!req.body.image) missingFields.push('image');
    if (!req.body.link) missingFields.push('link');

    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      });
    }

    // Generate unique category ID
    const categoryId = await generateCategoryId();

    const categoryData = {
      ...req.body,
      id: categoryId
    };

    console.log('Creating category with data:', categoryData);

    const category = new Category(categoryData);
    await category.save();
    
    console.log('Category created successfully:', {
      id: category.id,
      name: category.name
    });

    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(400).json({ 
      message: error.message,
      details: error.errors || 'Invalid category data'
    });
  }
});

// @desc    Update category
// @route   PUT /api/menu/categories/:id
// @access  Private/Admin
router.put('/categories/:id', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    console.log('Update category request:', {
      id: req.params.id,
      updates: req.body,
      user: {
        id: req.user?._id,
        role: req.user?.role
      }
    });

    // Remove id from update data if present
    const updateData = { ...req.body };
    delete updateData.id;

    // Validate required fields
    const missingFields = [];
    if (!updateData.name) missingFields.push('name');
    if (!updateData.description) missingFields.push('description');
    if (!updateData.image) missingFields.push('image');
    if (!updateData.link) missingFields.push('link');

    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      });
    }

    const category = await Category.findOneAndUpdate(
      { id: req.params.id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    console.log('Category updated successfully:', {
      id: category.id,
      name: category.name
    });

    res.json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(400).json({ 
      message: error.message,
      details: error.errors || 'Invalid category data'
    });
  }
});

// @desc    Delete category
// @route   DELETE /api/menu/categories/:id
// @access  Private/Admin
router.delete('/categories/:id', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    console.log('Delete category request:', {
      id: req.params.id,
      user: {
        id: req.user?._id,
        role: req.user?.role
      }
    });

    const category = await Category.findOneAndDelete({ id: req.params.id });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    console.log('Category deleted successfully:', {
      id: category.id,
      name: category.name
    });

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(400).json({ message: error.message });
  }
});

// @desc    Get all products (with optional category filter)
// @route   GET /api/menu/products
// @access  Public
router.get('/products', async (req, res) => {
  try {
    const { category } = req.query;
    console.log('Requested category:', category);
    
    let query = {};
    if (category) {
      query.category = category;
    }
    
    console.log('MongoDB query:', JSON.stringify(query));
    const products = await Product.find(query);
    console.log(`Found ${products.length} products for query:`, query);
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get single product by ID
// @route   GET /api/menu/products/:id
// @access  Public
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create new product
// @route   POST /api/menu/products
// @access  Private/Admin
router.post('/products', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    console.log('Create product request:', {
      body: req.body,
      user: {
        id: req.user?._id,
        role: req.user?.role
      }
    });
    
    // Validate required fields
    const missingFields = [];
    if (!req.body.name) missingFields.push('name');
    if (!req.body.description) missingFields.push('description');
    if (!req.body.price) missingFields.push('price');
    if (!req.body.category) missingFields.push('category');
    if (!req.body.image) missingFields.push('image');

    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      });
    }

    // Generate unique product ID based on category
    const productId = await generateProductId(req.body.category);

    const productData = {
      ...req.body,
      id: productId
    };

    console.log('Creating product with data:', productData);

    const product = new Product(productData);
    await product.save();
    
    console.log('Product created successfully:', {
      id: product.id,
      name: product.name,
      category: product.category
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ 
      message: error.message,
      details: error.errors || 'Invalid product data'
    });
  }
});

// @desc    Update product
// @route   PUT /api/menu/products/:id
// @access  Private/Admin
router.put('/products/:id', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    console.log('Update product request:', {
      id: req.params.id,
      updates: req.body,
      user: {
        id: req.user?._id,
        role: req.user?.role
      }
    });
    
    // Remove id from update data if present
    const updateData = { ...req.body };
    delete updateData.id;
    
    // Validate required fields
    const missingFields = [];
    if (!updateData.name) missingFields.push('name');
    if (!updateData.description) missingFields.push('description');
    if (!updateData.price) missingFields.push('price');
    if (!updateData.category) missingFields.push('category');
    if (!updateData.image) missingFields.push('image');

    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      });
    }

    const product = await Product.findOneAndUpdate(
      { id: req.params.id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    console.log('Product updated successfully:', {
      id: product.id,
      name: product.name,
      category: product.category
    });

    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({ 
      message: error.message,
      details: error.errors || 'Invalid product data'
    });
  }
});

// @desc    Delete product
// @route   DELETE /api/menu/products/:id
// @access  Private/Admin
router.delete('/products/:id', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    console.log('Delete product request:', {
      id: req.params.id,
      user: {
        id: req.user?._id,
        role: req.user?.role
      }
    });

    const product = await Product.findOneAndDelete({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    console.log('Product deleted successfully:', {
      id: product.id,
      name: product.name
    });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(400).json({ message: error.message });
  }
});

// Export the router
const exportedRouter = router;
console.log('MenuRoutes initialized with endpoints:', 
  Object.keys(router.stack.reduce((routes, r) => {
    if (r.route) {
      const method = Object.keys(r.route.methods)[0].toUpperCase();
      routes[`${method} ${r.route.path}`] = true;
    }
    return routes;
  }, {}))
);
export default exportedRouter;
