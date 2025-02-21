import mongoose from 'mongoose';

// Menu Category Schema
const categorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
}, {
  collection: 'categories'
});

// Menu Product Schema
const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  categoryId: {
    type: String,
    required: true,
    ref: 'Category'
  },
  categoryName: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
}, {
  collection: 'products'
});

// Pre-save middleware to set categoryName based on categoryId
productSchema.pre('save', async function(next) {
  try {
    if (this.isModified('categoryId')) {
      const category = await mongoose.model('Category').findOne({ id: this.categoryId });
      if (!category) {
        throw new Error('Invalid category ID');
      }
      this.categoryName = category.name;
    }
    next();
  } catch (error) {
    next(error);
  }
});

export const Category = mongoose.model('Category', categorySchema);
export const Product = mongoose.model('Product', productSchema);
