import axios from 'axios';
import { BlogPost } from '../types';

const API_URL = 'http://localhost:5001/api';

export const blogService = {
  getAllPosts: async (): Promise<BlogPost[]> => {
    const response = await axios.get(`${API_URL}/blog-posts`);
    return response.data;
  },

  getPostById: async (id: string): Promise<BlogPost> => {
    const response = await axios.get(`${API_URL}/blog-posts/${id}`);
    return response.data;
  },

  createPost: async (post: Omit<BlogPost, 'id'>): Promise<BlogPost> => {
    const response = await axios.post(`${API_URL}/blog-posts`, post);
    return response.data;
  }
};
