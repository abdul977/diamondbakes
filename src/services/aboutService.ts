import apiClient from '../utils/apiClient';

export interface AboutFeature {
  icon: 'Users' | 'Clock' | 'Award' | 'Heart';
  title: string;
  description: string;
}

export interface AboutStoryImage {
  url: string;
  alt: string;
}

export interface About {
  _id: string;
  heading: string;
  introduction: string;
  features: AboutFeature[];
  story: {
    title: string;
    content: string[];
    images: AboutStoryImage[];
  };
  commitment: {
    title: string;
    content: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AboutInput {
  heading: string;
  introduction: string;
  features: AboutFeature[];
  story: {
    title: string;
    content: string[];
    images: AboutStoryImage[];
  };
  commitment: {
    title: string;
    content: string;
  };
}

export const getAboutContent = async (): Promise<About> => {
  const response = await apiClient.get('/about');
  return response.data;
};

export const updateAboutContent = async (content: AboutInput): Promise<About> => {
  const response = await apiClient.put('/about', content);
  return response.data;
};

export const deleteAboutContent = async (): Promise<void> => {
  await apiClient.delete('/about');
};
