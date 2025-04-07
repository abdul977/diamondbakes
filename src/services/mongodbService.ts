import { CategoryCard } from '../types';

// Function to fetch categories from MongoDB using MCP server
export const fetchCategories = async (): Promise<CategoryCard[]> => {
  try {
    // Make a request to the MongoDB MCP server endpoint
    const response = await fetch('https://mcp.pipedream.net/0615735e-782f-4d7c-8475-a54bf3d98dfc/mongodb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        database: 'diamondbakes',
        collectionName: 'categories',
        filter: '{}'
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    const result = await response.json();

    if (!result.ret || !Array.isArray(result.ret)) {
      // If we got a single document instead of an array
      if (result.ret && typeof result.ret === 'object') {
        return [mapCategoryData(result.ret)];
      }
      return [];
    }

    // Map the MongoDB data to the CategoryCard type
    return result.ret.map(mapCategoryData);
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
