import mongoose from 'mongoose';

// FAQ Question Schema
const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  answer: {
    type: String,
    required: true,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  }
});

// FAQ Category Schema
const faqCategorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  },
  questions: [questionSchema]
}, {
  collection: 'faqcategories',
  timestamps: true
});

// Helper function to generate category ID
faqCategorySchema.statics.generateCategoryId = async function() {
  const categories = await this.find();
  const ids = categories.map(c => parseInt(c.id));
  const maxId = Math.max(0, ...ids);
  return (maxId + 1).toString();
};

export default mongoose.model('FAQCategory', faqCategorySchema);
