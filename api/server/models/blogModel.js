import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  tags: [{
    type: String
  }]
}, {
  collection: 'blogposts'
});

// Helper function to generate blog post ID
blogPostSchema.statics.generateBlogId = async function() {
  const posts = await this.find();
  const ids = posts.map(p => parseInt(p.id));
  const maxId = Math.max(0, ...ids);
  return (maxId + 1).toString();
};

export default mongoose.model('BlogPost', blogPostSchema);