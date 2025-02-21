import express from 'express';
import About from '../models/aboutModel.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get about content
router.get('/', async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ message: 'About content not found' });
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update about content (protected)
router.put('/', protect, async (req, res) => {
  try {
    let about = await About.findOne();
    
    if (!about) {
      // If no about content exists, create it
      about = new About(req.body);
    } else {
      // Update existing content
      about.heading = req.body.heading;
      about.introduction = req.body.introduction;
      about.features = req.body.features;
      about.story = req.body.story;
      about.commitment = req.body.commitment;
    }

    const updatedAbout = await about.save();
    res.json(updatedAbout);
  } catch (error) {
    if (error.message === 'Only one About document can exist') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// Delete about content (protected) - Mainly for development purposes
router.delete('/', protect, async (req, res) => {
  try {
    await About.deleteMany({});
    res.json({ message: 'About content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
