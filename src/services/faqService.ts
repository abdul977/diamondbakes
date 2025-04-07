import apiClient from '../utils/apiClient';
import { FAQCategory, FAQQuestion } from '../types';

// Get all FAQ categories
export const getAllFAQCategories = async (): Promise<FAQCategory[]> => {
  try {
    const response = await apiClient.get('/faq');
    return response.data;
  } catch (error) {
    console.error('Error fetching FAQ categories:', error);
    throw error;
  }
};

// Get a single FAQ category by ID
export const getFAQCategory = async (id: string): Promise<FAQCategory> => {
  try {
    const response = await apiClient.get(`/faq/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching FAQ category ${id}:`, error);
    throw error;
  }
};

// Create a new FAQ category
export const createFAQCategory = async (category: Partial<FAQCategory>): Promise<FAQCategory> => {
  try {
    const response = await apiClient.post('/faq', category);
    return response.data;
  } catch (error) {
    console.error('Error creating FAQ category:', error);
    throw error;
  }
};

// Update a FAQ category
export const updateFAQCategory = async (id: string, category: Partial<FAQCategory>): Promise<FAQCategory> => {
  try {
    const response = await apiClient.put(`/faq/${id}`, category);
    return response.data;
  } catch (error) {
    console.error(`Error updating FAQ category ${id}:`, error);
    throw error;
  }
};

// Delete a FAQ category
export const deleteFAQCategory = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/faq/${id}`);
  } catch (error) {
    console.error(`Error deleting FAQ category ${id}:`, error);
    throw error;
  }
};

// Add a question to a FAQ category
export const addQuestion = async (categoryId: string, question: Partial<FAQQuestion>): Promise<FAQCategory> => {
  try {
    const response = await apiClient.post(`/faq/${categoryId}/questions`, question);
    return response.data;
  } catch (error) {
    console.error(`Error adding question to FAQ category ${categoryId}:`, error);
    throw error;
  }
};

// Update a question in a FAQ category
export const updateQuestion = async (
  categoryId: string, 
  questionId: string, 
  question: Partial<FAQQuestion>
): Promise<FAQCategory> => {
  try {
    const response = await apiClient.put(`/faq/${categoryId}/questions/${questionId}`, question);
    return response.data;
  } catch (error) {
    console.error(`Error updating question ${questionId} in FAQ category ${categoryId}:`, error);
    throw error;
  }
};

// Delete a question from a FAQ category
export const deleteQuestion = async (categoryId: string, questionId: string): Promise<void> => {
  try {
    await apiClient.delete(`/faq/${categoryId}/questions/${questionId}`);
  } catch (error) {
    console.error(`Error deleting question ${questionId} from FAQ category ${categoryId}:`, error);
    throw error;
  }
};

export const faqService = {
  getAllFAQCategories,
  getFAQCategory,
  createFAQCategory,
  updateFAQCategory,
  deleteFAQCategory,
  addQuestion,
  updateQuestion,
  deleteQuestion
};

export default faqService;
