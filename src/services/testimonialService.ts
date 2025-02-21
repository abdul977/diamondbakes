import apiClient from '../utils/apiClient';

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface TestimonialInput {
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

export const getTestimonials = async (): Promise<Testimonial[]> => {
  const response = await apiClient.get('/testimonials');
  return response.data;
};

export const createTestimonial = async (testimonial: TestimonialInput): Promise<Testimonial> => {
  const response = await apiClient.post('/testimonials', testimonial);
  return response.data;
};

export const updateTestimonial = async (id: string, testimonial: TestimonialInput): Promise<Testimonial> => {
  const response = await apiClient.put(`/testimonials/${id}`, testimonial);
  return response.data;
};

export const deleteTestimonial = async (id: string): Promise<void> => {
  await apiClient.delete(`/testimonials/${id}`);
};
