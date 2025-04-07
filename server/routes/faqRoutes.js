import express from 'express';
import FAQCategory from '../models/faqModel.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get all FAQ categories with questions
// @route   GET /api/faq
// @access  Public
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all FAQ categories...');
    const categories = await FAQCategory.find().sort({ order: 1 });
    
    // Sort questions by order within each category
    const sortedCategories = categories.map(category => {
      const categoryObj = category.toObject();
      categoryObj.questions = categoryObj.questions.sort((a, b) => a.order - b.order);
      return categoryObj;
    });
    
    console.log(`Found ${categories.length} FAQ categories`);
    res.json(sortedCategories);
  } catch (error) {
    console.error('Error fetching FAQ categories:', error);
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get a single FAQ category by ID
// @route   GET /api/faq/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const category = await FAQCategory.findOne({ id: req.params.id });
    if (!category) {
      return res.status(404).json({ message: 'FAQ category not found' });
    }
    
    // Sort questions by order
    const categoryObj = category.toObject();
    categoryObj.questions = categoryObj.questions.sort((a, b) => a.order - b.order);
    
    res.json(categoryObj);
  } catch (error) {
    console.error(`Error fetching FAQ category ${req.params.id}:`, error);
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a new FAQ category
// @route   POST /api/faq
// @access  Private/Admin
router.post('/', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    console.log('Create FAQ category request:', req.body);
    
    // Validate required fields
    if (!req.body.name) {
      return res.status(400).json({ message: 'Category name is required' });
    }
    
    // Generate a unique ID
    const categoryId = await FAQCategory.generateCategoryId();
    
    const categoryData = {
      id: categoryId,
      name: req.body.name,
      order: req.body.order || 0,
      questions: req.body.questions || []
    };
    
    const category = new FAQCategory(categoryData);
    await category.save();
    
    console.log('FAQ category created successfully:', {
      id: category.id,
      name: category.name
    });
    
    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating FAQ category:', error);
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update a FAQ category
// @route   PUT /api/faq/:id
// @access  Private/Admin
router.put('/:id', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    console.log(`Update FAQ category ${req.params.id} request:`, req.body);
    
    const category = await FAQCategory.findOne({ id: req.params.id });
    if (!category) {
      return res.status(404).json({ message: 'FAQ category not found' });
    }
    
    // Update fields
    if (req.body.name) category.name = req.body.name;
    if (req.body.order !== undefined) category.order = req.body.order;
    if (req.body.questions) category.questions = req.body.questions;
    
    await category.save();
    
    console.log('FAQ category updated successfully:', {
      id: category.id,
      name: category.name
    });
    
    res.json(category);
  } catch (error) {
    console.error(`Error updating FAQ category ${req.params.id}:`, error);
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete a FAQ category
// @route   DELETE /api/faq/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    console.log(`Delete FAQ category ${req.params.id} request`);
    
    const category = await FAQCategory.findOne({ id: req.params.id });
    if (!category) {
      return res.status(404).json({ message: 'FAQ category not found' });
    }
    
    await category.deleteOne();
    
    console.log('FAQ category deleted successfully:', {
      id: req.params.id
    });
    
    res.json({ message: 'FAQ category deleted successfully' });
  } catch (error) {
    console.error(`Error deleting FAQ category ${req.params.id}:`, error);
    res.status(500).json({ message: error.message });
  }
});

// @desc    Add a question to a FAQ category
// @route   POST /api/faq/:id/questions
// @access  Private/Admin
router.post('/:id/questions', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    console.log(`Add question to FAQ category ${req.params.id} request:`, req.body);
    
    // Validate required fields
    if (!req.body.question || !req.body.answer) {
      return res.status(400).json({ message: 'Question and answer are required' });
    }
    
    const category = await FAQCategory.findOne({ id: req.params.id });
    if (!category) {
      return res.status(404).json({ message: 'FAQ category not found' });
    }
    
    // Get the highest order value
    const maxOrder = category.questions.length > 0 
      ? Math.max(...category.questions.map(q => q.order || 0)) 
      : -1;
    
    // Add the new question
    category.questions.push({
      question: req.body.question,
      answer: req.body.answer,
      order: req.body.order !== undefined ? req.body.order : maxOrder + 1
    });
    
    await category.save();
    
    console.log('Question added successfully to FAQ category:', {
      categoryId: category.id,
      question: req.body.question
    });
    
    res.status(201).json(category);
  } catch (error) {
    console.error(`Error adding question to FAQ category ${req.params.id}:`, error);
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update a question in a FAQ category
// @route   PUT /api/faq/:id/questions/:questionId
// @access  Private/Admin
router.put('/:id/questions/:questionId', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    console.log(`Update question ${req.params.questionId} in FAQ category ${req.params.id} request:`, req.body);
    
    const category = await FAQCategory.findOne({ id: req.params.id });
    if (!category) {
      return res.status(404).json({ message: 'FAQ category not found' });
    }
    
    // Find the question
    const questionIndex = category.questions.findIndex(q => q._id.toString() === req.params.questionId);
    if (questionIndex === -1) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    // Update question fields
    if (req.body.question) category.questions[questionIndex].question = req.body.question;
    if (req.body.answer) category.questions[questionIndex].answer = req.body.answer;
    if (req.body.order !== undefined) category.questions[questionIndex].order = req.body.order;
    
    await category.save();
    
    console.log('Question updated successfully in FAQ category:', {
      categoryId: category.id,
      questionId: req.params.questionId
    });
    
    res.json(category);
  } catch (error) {
    console.error(`Error updating question ${req.params.questionId} in FAQ category ${req.params.id}:`, error);
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete a question from a FAQ category
// @route   DELETE /api/faq/:id/questions/:questionId
// @access  Private/Admin
router.delete('/:id/questions/:questionId', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    console.log(`Delete question ${req.params.questionId} from FAQ category ${req.params.id} request`);
    
    const category = await FAQCategory.findOne({ id: req.params.id });
    if (!category) {
      return res.status(404).json({ message: 'FAQ category not found' });
    }
    
    // Find and remove the question
    const questionIndex = category.questions.findIndex(q => q._id.toString() === req.params.questionId);
    if (questionIndex === -1) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    category.questions.splice(questionIndex, 1);
    await category.save();
    
    console.log('Question deleted successfully from FAQ category:', {
      categoryId: category.id,
      questionId: req.params.questionId
    });
    
    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error(`Error deleting question ${req.params.questionId} from FAQ category ${req.params.id}:`, error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
