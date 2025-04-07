import { CategoryCard } from '../types';
import apiClient from '../utils/apiClient';

// Function to fetch categories from MongoDB using the existing API
export const fetchCategories = async (): Promise<CategoryCard[]> => {
  try {
    console.log('Fetching categories from API...');
    // Use the existing menu API endpoint
    const response = await apiClient.get('/menu/categories');

    if (!response.data) {
      return [];
    }

    // Map the API data to the CategoryCard type
    return response.data.map(mapCategoryData);
  } catch (error) {
    console.error('Error fetching categories from MongoDB:', error);
    throw error;
  }
};

// Helper function to map MongoDB data to CategoryCard type
const mapCategoryData = (category: any): CategoryCard => ({
  id: category.id || String(category._id),
  name: category.name,
  image: category.image,
  description: category.description,
  link: category.link
});

// MongoDB MCP service
export const mongodbService = {
  fetchCategories
};

export default mongodbService;
