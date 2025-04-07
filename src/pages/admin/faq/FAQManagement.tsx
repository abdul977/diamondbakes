import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ChevronDown, ChevronUp, Move, Save, X } from 'lucide-react';
import { faqService } from '../../../services/faqService';
import { FAQCategory, FAQQuestion } from '../../../types';
import { toast } from 'react-hot-toast';

const FAQManagement = () => {
  const [categories, setCategories] = useState<FAQCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Category state
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<FAQCategory | null>(null);
  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    order: 0
  });
  
  // Question state
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<{
    categoryId: string;
    question: FAQQuestion | null;
  } | null>(null);
  const [questionFormData, setQuestionFormData] = useState({
    question: '',
    answer: '',
    order: 0
  });
  
  // Expanded categories
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await faqService.getAllFAQCategories();
      setCategories(data);
      setLoading(false);
    } catch (err: any) {
      console.error('Error fetching FAQ categories:', err);
      setError(err.message || 'Failed to load FAQ categories');
      setLoading(false);
    }
  };

  // Category handlers
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCategoryFormData({
      ...categoryFormData,
      [name]: name === 'order' ? parseInt(value) || 0 : value
    });
  };

  const resetCategoryForm = () => {
    setEditingCategory(null);
    setCategoryFormData({
      name: '',
      order: categories.length
    });
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await faqService.updateFAQCategory(editingCategory.id, categoryFormData);
        toast.success('FAQ category updated successfully');
      } else {
        await faqService.createFAQCategory(categoryFormData);
        toast.success('FAQ category created successfully');
      }
      setShowCategoryModal(false);
      fetchCategories();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save FAQ category');
    }
  };

  const handleEditCategory = (category: FAQCategory) => {
    setEditingCategory(category);
    setCategoryFormData({
      name: category.name,
      order: category.order
    });
    setShowCategoryModal(true);
  };

  const handleDeleteCategory = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category? All questions in this category will also be deleted.')) {
      try {
        await faqService.deleteFAQCategory(id);
        toast.success('FAQ category deleted successfully');
        fetchCategories();
      } catch (err: any) {
        toast.error(err.message || 'Failed to delete FAQ category');
      }
    }
  };

  // Question handlers
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setQuestionFormData({
      ...questionFormData,
      [name]: name === 'order' ? parseInt(value) || 0 : value
    });
  };

  const resetQuestionForm = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;
    
    setEditingQuestion({
      categoryId,
      question: null
    });
    
    setQuestionFormData({
      question: '',
      answer: '',
      order: category.questions.length
    });
  };

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingQuestion) return;
    
    try {
      if (editingQuestion.question) {
        await faqService.updateQuestion(
          editingQuestion.categoryId,
          editingQuestion.question._id!,
          questionFormData
        );
        toast.success('Question updated successfully');
      } else {
        await faqService.addQuestion(editingQuestion.categoryId, questionFormData);
        toast.success('Question added successfully');
      }
      setShowQuestionModal(false);
      fetchCategories();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save question');
    }
  };

  const handleAddQuestion = (categoryId: string) => {
    resetQuestionForm(categoryId);
    setShowQuestionModal(true);
  };

  const handleEditQuestion = (categoryId: string, question: FAQQuestion) => {
    setEditingQuestion({
      categoryId,
      question
    });
    setQuestionFormData({
      question: question.question,
      answer: question.answer,
      order: question.order
    });
    setShowQuestionModal(true);
  };

  const handleDeleteQuestion = async (categoryId: string, questionId: string) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await faqService.deleteQuestion(categoryId, questionId);
        toast.success('Question deleted successfully');
        fetchCategories();
      } catch (err: any) {
        toast.error(err.message || 'Failed to delete question');
      }
    }
  };

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">FAQ Management</h1>
        <button
          onClick={() => {
            resetCategoryForm();
            setShowCategoryModal(true);
          }}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      ) : error ? (
        <div className="text-red-600 text-center p-4">{error}</div>
      ) : categories.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No FAQ categories found. Create your first category to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="mr-2 text-gray-500 hover:text-gray-700"
                  >
                    {expandedCategories.includes(category.id) ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  <h3 className="font-medium">{category.name}</h3>
                  <span className="ml-2 text-sm text-gray-500">({category.questions.length} questions)</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {expandedCategories.includes(category.id) && (
                <div className="p-4">
                  <div className="flex justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-500">Questions</h4>
                    <button
                      onClick={() => handleAddQuestion(category.id)}
                      className="text-sm text-purple-600 hover:text-purple-800 flex items-center"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Question
                    </button>
                  </div>

                  {category.questions.length === 0 ? (
                    <p className="text-gray-500 text-sm italic">No questions in this category yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {category.questions.map((question) => (
                        <div
                          key={question._id}
                          className="bg-white p-3 border border-gray-100 rounded-md flex justify-between items-start"
                        >
                          <div>
                            <p className="font-medium">{question.question}</p>
                            <p className="text-sm text-gray-500 mt-1">{question.answer}</p>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <button
                              onClick={() => handleEditQuestion(category.id, question)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteQuestion(category.id, question._id!)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingCategory ? 'Edit Category' : 'Add Category'}
              </h2>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCategorySubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={categoryFormData.name}
                  onChange={handleCategoryChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  name="order"
                  value={categoryFormData.order}
                  onChange={handleCategoryChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Question Modal */}
      {showQuestionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingQuestion?.question ? 'Edit Question' : 'Add Question'}
              </h2>
              <button
                onClick={() => setShowQuestionModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleQuestionSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Question
                </label>
                <input
                  type="text"
                  name="question"
                  value={questionFormData.question}
                  onChange={handleQuestionChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Answer
                </label>
                <textarea
                  name="answer"
                  value={questionFormData.answer}
                  onChange={handleQuestionChange}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  name="order"
                  value={questionFormData.order}
                  onChange={handleQuestionChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowQuestionModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQManagement;
