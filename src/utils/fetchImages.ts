import axios from 'axios';

const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: 'Client-ID a36P8_gh54qoYAebDmKpwJfp3pNiZBxOxDTbGLObfdg'
  }
});

type UnsplashImage = {
  id: string;
  urls: {
    regular: string;
  };
};

const searchQueries = {
  cakes: [
    'birthday cake',
    'wedding cake',
    'chocolate cake',
    'celebration cake',
    'cupcakes display'
  ],
  bread: [
    'freshly baked bread',
    'artisan bread',
    'bread loaf',
    'bakery bread',
    'banana bread'
  ],
  pies: [
    'meat pie',
    'chicken pie',
    'nigerian meat pie',
    'savory pie',
    'hand pie'
  ],
  smallChops: [
    'spring rolls',
    'samosa',
    'puff puff',
    'finger food',
    'appetizers'
  ],
  shawarma: [
    'chicken shawarma',
    'beef shawarma',
    'shawarma wrap',
    'gyro sandwich',
    'doner kebab'
  ],
  pastries: [
    'sausage roll',
    'fresh croissants',
    'doughnuts display',
    'scotch egg',
    'pastry display'
  ],
  gallery: [
    'bakery display',
    'professional bakery',
    'pastry chef',
    'baking process',
    'bakery kitchen',
    'bread making',
    'cake decoration',
    'pastry making'
  ]
};

export const fetchImagesForCategory = async (category: keyof typeof searchQueries): Promise<string[]> => {
  const images: string[] = [];
  
  for (const query of searchQueries[category]) {
    try {
      const response = await unsplashApi.get<{ results: UnsplashImage[] }>('/search/photos', {
        params: {
          query,
          orientation: 'landscape',
          per_page: 1
        }
      });
      
      if (response.data.results.length > 0) {
        images.push(response.data.results[0].urls.regular);
      }
    } catch (error) {
      console.error(`Error fetching image for query "${query}":`, error);
    }
    
    // Delay to respect rate limits
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return images;
};

export const fetchAllImages = async () => {
  const allImages: Record<string, string[]> = {};
  
  for (const category of Object.keys(searchQueries) as Array<keyof typeof searchQueries>) {
    allImages[category] = await fetchImagesForCategory(category);
  }
  
  return allImages;
};
