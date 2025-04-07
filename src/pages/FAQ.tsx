import React, { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { faqService } from '../services/faqService';
import { FAQCategory } from '../types';

const FAQ = () => {
  const [faqCategories, setFaqCategories] = useState<FAQCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const data = await faqService.getAllFAQCategories();
        setFaqCategories(data);
        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching FAQs:', err);
        setError('Failed to load FAQs. Please try again later.');
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const toggleQuestion = (index: number) => {
    if (openQuestions.includes(index)) {
      setOpenQuestions(openQuestions.filter(i => i !== index));
    } else {
      setOpenQuestions([...openQuestions, index]);
    }
  };

  let questionIndex = 0;

  return (
    <div className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-gray-600 text-lg">
            Find answers to common questions about our products and services.
            Can not find what you are looking for? Contact us directly.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading FAQs...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 p-4 bg-red-50 rounded-lg">
            {error}
          </div>
        ) : faqCategories.length === 0 ? (
          <div className="text-center text-gray-600 p-4">
            No FAQs found. Please check back later.
          </div>
        ) : (
          <div className="space-y-12">
            {faqCategories.map((category) => (
              <div key={category.id}>
                <h2 className="text-2xl font-serif font-bold mb-6">{category.name}</h2>
                <div className="space-y-4">
                  {category.questions.map((faq) => {
                    const currentIndex = questionIndex++;
                    const isOpen = openQuestions.includes(currentIndex);

                    return (
                      <div
                        key={faq._id}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleQuestion(currentIndex)}
                          className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-lg font-medium">{faq.question}</span>
                          {isOpen ? (
                            <Minus className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                          ) : (
                            <Plus className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="p-6 pt-0 text-gray-600">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-16 p-6 bg-yellow-50 rounded-xl text-center">
          <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            Cannot find the answer you are looking for? We are here to help.
          </p>
          <a
            href="https://wa.me/2348027408760"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors font-medium"
          >
            Contact Us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
