import apiClient from '../utils/apiClient';
import { BlogPost } from '../types';

export const blogService = {
  // Test blog routes
  async testRoute(): Promise<{ message: string }> {
    try {
      console.log('Testing blog routes...');
      const response = await apiClient.get('/blog/test');
      console.log('Test response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error testing blog routes:', error);
      throw error;
    }
  },

  // Get all blog posts
  async getAllPosts(): Promise<BlogPost[]> {
    try {
      console.log('Fetching blog posts...');
      const response = await apiClient.get('/blog/posts');
      console.log('Blog posts response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }
  },

  // Get single blog post
  async getPostById(id: string): Promise<BlogPost> {
    try {
      const response = await apiClient.get(`/blog/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching blog post ${id}:`, error);
      throw error;
    }
  },

  // Create new blog post
  async createPost(post: Omit<BlogPost, 'id' | 'date'>): Promise<BlogPost> {
    try {
      const response = await apiClient.post('/blog/posts', post);
      return response.data;
    } catch (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }
  },

  // Update blog post
  async updatePost(id: string, post: Partial<BlogPost>): Promise<BlogPost> {
    try {
      const response = await apiClient.put(`/blog/posts/${id}`, post);
      return response.data;
    } catch (error) {
      console.error(`Error updating blog post ${id}:`, error);
      throw error;
    }
  },

  // Delete blog post
  async deletePost(id: string): Promise<void> {
    try {
      await apiClient.delete(`/blog/posts/${id}`);
    } catch (error) {
      console.error(`Error deleting blog post ${id}:`, error);
      throw error;
    }
  }
};
