import apiClient from '../utils/apiClient';

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  image: string;
  category?: string;
  createdAt: string;
}

export const galleryService = {
  // Get all gallery items
  async getAllItems(): Promise<GalleryItem[]> {
    try {
      const response = await apiClient.get('/gallery');
      return response.data;
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      throw error;
    }
  },

  // Get single gallery item
  async getItem(id: string): Promise<GalleryItem> {
    try {
      const response = await apiClient.get(`/gallery/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching gallery item ${id}:`, error);
      throw error;
    }
  },

  // Create gallery item
  async createItem(item: Omit<GalleryItem, 'id' | 'createdAt'>): Promise<GalleryItem> {
    try {
      const response = await apiClient.post('/gallery', item);
      return response.data;
    } catch (error) {
      console.error('Error creating gallery item:', error);
      throw error;
    }
  },

  // Update gallery item
  async updateItem(id: string, item: Partial<GalleryItem>): Promise<GalleryItem> {
    try {
      const response = await apiClient.put(`/gallery/${id}`, item);
      return response.data;
    } catch (error) {
      console.error('Error updating gallery item:', error);
      throw error;
    }
  },

  // Delete gallery item
  async deleteItem(id: string): Promise<void> {
    try {
      await apiClient.delete(`/gallery/${id}`);
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      throw error;
    }
  }
};
