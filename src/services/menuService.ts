import apiClient from '../utils/apiClient';
import { MenuItem } from '../types';

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export const menuService = {
  // Fetch all menu categories
  async getCategories(): Promise<Category[]> {
    try {
      console.log('Fetching categories...');
      const response = await apiClient.get('/menu/categories');
      console.log('Categories response:', response.data);
      // Return the array directly since server doesn't wrap it
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Get single category
  async getCategory(id: string): Promise<Category> {
    try {
      const response = await apiClient.get(`/menu/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching category ${id}:`, error);
      throw error;
    }
  },

  // Add new category
  async addCategory(category: Omit<Category, 'id'>): Promise<Category> {
    try {
      const response = await apiClient.post(
        '/menu/categories',
        category
      );
      return response.data;
    } catch (error) {
      console.error('Error adding category:', error);
      throw error;
    }
  },

  // Update category
  async updateCategory(id: string, category: Partial<Category>): Promise<Category> {
    try {
      const response = await apiClient.put(
        `/menu/categories/${id}`,
        category
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating category ${id}:`, error);
      throw error;
    }
  },

  // Delete category
  async deleteCategory(id: string): Promise<void> {
    try {
      await apiClient.delete(
        `/menu/categories/${id}`
      );
    } catch (error) {
      console.error(`Error deleting category ${id}:`, error);
      throw error;
    }
  },

  // Fetch all products
  async getAllProducts(): Promise<MenuItem[]> {
    try {
      console.log('Fetching all products...');
      const response = await apiClient.get('/menu/products');
      console.log('Products response:', response.data);
      // Return the array directly since server doesn't wrap it
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get single product
  async getProduct(id: string): Promise<MenuItem> {
    try {
      const response = await apiClient.get(`/menu/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },

  // Fetch products by category
  async getProductsByCategory(category: string): Promise<MenuItem[]> {
    try {
      console.log('Fetching products for category:', category);
      const response = await apiClient.get(`/menu/categories/${encodeURIComponent(category)}/products`);
      console.log('Category products response:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
      throw error;
    }
  },

  // Add new product
  async addProduct(product: Omit<MenuItem, 'id'>): Promise<MenuItem> {
    try {
      console.log('Adding product with data:', product);
      const response = await apiClient.post(
        '/menu/products',
        product
      );
      return response.data;
    } catch (error: any) {
      console.error('Error adding product:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        requestData: product
      });
      throw error;
    }
  },

  // Update product
  async updateProduct(id: string, product: Partial<MenuItem>): Promise<MenuItem> {
    try {
      const response = await apiClient.put(
        `/menu/products/${id}`,
        product
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw error;
    }
  },

  // Delete product
  async deleteProduct(id: string): Promise<void> {
    try {
      await apiClient.delete(
        `/menu/products/${id}`
      );
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw error;
    }
  }
};
