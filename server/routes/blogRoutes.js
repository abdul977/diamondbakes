import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import BlogPost from '../models/blogModel.js';

const router = express.Router();

// Debug endpoint to verify router is working
router.get('/test', (req, res) => {
  console.log('Blog routes test endpoint hit');
  console.log('Request headers:', req.headers);
  res.json({ message: 'Blog router is working' });
});

// @desc    Get all blog posts
// @route   GET /api/blog/posts
// @access  Public
router.get('/posts', async (req, res) => {
  try {
    console.log('Fetching all blog posts...');
    const posts = await BlogPost.find().sort({ date: -1 });
    console.log('Found blog posts:', posts.length);
    res.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get single blog post
// @route   GET /api/blog/posts/:id
// @access  Public
router.get('/posts/:id', async (req, res) => {
  try {
    console.log('Fetching blog post:', req.params.id);
    const post = await BlogPost.findOne({ id: req.params.id });
    if (!post) {
      console.log('Blog post not found:', req.params.id);
      return res.status(404).json({ message: 'Blog post not found' });
    }
    console.log('Found blog post:', post.id);
    res.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create blog post
// @route   POST /api/blog/posts
// @access  Private/Admin
router.post('/posts', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    console.log('Create blog post request:', req.body);
    const postId = await BlogPost.generateBlogId();
    const post = new BlogPost({
      ...req.body,
      id: postId,
      date: new Date().toISOString()
    });

    const savedPost = await post.save();
    console.log('Blog post created:', savedPost.id);
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update blog post
// @route   PUT /api/blog/posts/:id
// @access  Private/Admin
router.put('/posts/:id', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    console.log('Update blog post request:', {
      id: req.params.id,
      updates: req.body
    });
    
    const post = await BlogPost.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!post) {
      console.log('Blog post not found for update:', req.params.id);
      return res.status(404).json({ message: 'Blog post not found' });
    }

    console.log('Blog post updated:', post.id);
    res.json(post);
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete blog post
// @route   DELETE /api/blog/posts/:id
// @access  Private/Admin
router.delete('/posts/:id', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    console.log('Delete blog post request:', req.params.id);
    const post = await BlogPost.findOneAndDelete({ id: req.params.id });
    
    if (!post) {
      console.log('Blog post not found for deletion:', req.params.id);
      return res.status(404).json({ message: 'Blog post not found' });
    }

    console.log('Blog post deleted:', post.id);
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ message: error.message });
  }
});

// Log all available routes on export
console.log('BlogRoutes initialized with endpoints:', 
  Object.keys(router.stack.reduce((routes, r) => {
    if (r.route) {
      const method = Object.keys(r.route.methods)[0].toUpperCase();
      routes[`${method} ${r.route.path}`] = true;
    }
    return routes;
  }, {}))
);

// Export the router
export default router;
