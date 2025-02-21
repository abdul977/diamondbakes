import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import GalleryItem from '../models/galleryModel.js';

const router = express.Router();

// Helper function to generate gallery item ID
async function generateGalleryId() {
  const items = await GalleryItem.find();
  const ids = items.map(item => parseInt(item.id.replace('g', '')));
  const maxId = Math.max(0, ...ids);
  return `g${maxId + 1}`;
}

// @desc    Get all gallery items
// @route   GET /api/gallery
// @access  Public
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all gallery items...');
    const items = await GalleryItem.find().sort({ createdAt: -1 });
    console.log(`Found ${items.length} gallery items`);
    res.json(items);
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get single gallery item
// @route   GET /api/gallery/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const item = await GalleryItem.findOne({ id: req.params.id });
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.json(item);
  } catch (error) {
    console.error('Error fetching gallery item:', error);
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create gallery item
// @route   POST /api/gallery
// @access  Private/Admin
router.post('/', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    console.log('Create gallery item request:', req.body);
    
    // Validate required fields
    const missingFields = [];
    if (!req.body.title) missingFields.push('title');
    if (!req.body.image) missingFields.push('image');

    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      });
    }

    const galleryId = await generateGalleryId();
    const item = new GalleryItem({
      ...req.body,
      id: galleryId,
      createdAt: new Date().toISOString()
    });

    const savedItem = await item.save();
    console.log('Gallery item created:', savedItem.id);
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Error creating gallery item:', error);
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update gallery item
// @route   PUT /api/gallery/:id
// @access  Private/Admin
router.put('/:id', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    console.log('Update gallery item request:', {
      id: req.params.id,
      updates: req.body
    });

    const item = await GalleryItem.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    console.log('Gallery item updated:', item.id);
    res.json(item);
  } catch (error) {
    console.error('Error updating gallery item:', error);
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete gallery item
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    console.log('Delete gallery item request:', req.params.id);
    const item = await GalleryItem.findOneAndDelete({ id: req.params.id });
    
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    console.log('Gallery item deleted:', item.id);
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
