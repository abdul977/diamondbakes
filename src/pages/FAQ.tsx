import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      category: 'Ordering & Delivery',
      questions: [
        {
          q: 'How do I place an order?',
          a: 'You can place an order through our WhatsApp line at +234 802 740 8760. Simply click on any product and use the "Order on WhatsApp" button to start your order.'
        },
        {
          q: 'What is the lead time for orders?',
          a: 'Regular orders need at least 24 hours notice. For custom cakes and large events, we recommend placing orders 3-5 days in advance. Bulk orders for events may require longer lead times.'
        },
        {
          q: 'Do you offer delivery?',
          a: 'Yes, we offer delivery within Lagos. Delivery fees vary based on location. You can discuss delivery options and fees when placing your order.'
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept bank transfers, mobile money, and cash payments. Payment details will be provided when you place your order.'
        }
      ]
    },
    {
      category: 'Products & Customization',
      questions: [
        {
          q: 'Can I customize my cake design?',
          a: 'Yes! We offer custom cake designs for all occasions. Please provide your requirements and reference images when placing your order.'
        },
        {
          q: 'Do you cater for dietary restrictions?',
          a: 'We can accommodate some dietary requirements like eggless or sugar-free options. Please discuss your specific needs when ordering.'
        },
        {
          q: 'What is your most popular product?',
          a: 'Our celebration cakes and meat pies are among our most popular items. For events, our small chops packages are frequently ordered.'
        },
        {
          q: 'How long do your products stay fresh?',
          a: 'Most of our products are best consumed within 24-48 hours. Bread and pastries are freshly baked daily. Storage instructions will be provided with your order.'
        }
      ]
    },
    {
      category: 'Events & Bulk Orders',
      questions: [
        {
          q: 'Do you cater for events?',
          a: 'Yes, we provide catering services for all types of events including weddings, birthdays, and corporate functions. Contact us for custom quotes.'
        },
        {
          q: 'Is there a minimum order for events?',
          a: 'Minimum orders vary by product. For small chops, we typically require a minimum of 50 pieces. For other products, please inquire when ordering.'
        },
        {
          q: 'Do you offer discounts for bulk orders?',
          a: 'Yes, we offer special pricing for bulk orders. The discount depends on the quantity and products ordered. Contact us for a custom quote.'
        },
        {
          q: 'Can you set up a dessert table for my event?',
          a: 'Yes, we offer dessert table setup services for events. This includes display setup, labeling, and arrangement of your ordered items.'
        }
      ]
    },
    {
      category: 'Quality & Storage',
      questions: [
        {
          q: 'What ingredients do you use?',
          a: 'We use high-quality, fresh ingredients in all our products. Our ingredients are sourced from trusted suppliers to ensure the best taste and quality.'
        },
        {
          q: 'How should I store my ordered items?',
          a: 'Storage instructions vary by product. Generally, bread and pastries should be stored at room temperature if consuming within 24 hours, or refrigerated for longer storage. Detailed instructions will be provided with your order.'
        },
        {
          q: 'Do you use preservatives?',
          a: 'We minimize the use of preservatives in our products. This is why we recommend consuming them fresh within the recommended timeframe.'
        },
        {
          q: "What if I'm not satisfied with my order?",
          a: "Customer satisfaction is our priority. If you're not satisfied with your order, please contact us within 24 hours of receiving it, and we'll work to resolve the issue."
        }
      ]
    }
  ];

  const [openQuestions, setOpenQuestions] = useState<number[]>([]);

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

        <div className="space-y-12">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-serif font-bold mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((faq) => {
                  const currentIndex = questionIndex++;
                  const isOpen = openQuestions.includes(currentIndex);

                  return (
                    <div
                      key={currentIndex}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(currentIndex)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-lg font-medium">{faq.q}</span>
                        {isOpen ? (
                          <Minus className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                        ) : (
                          <Plus className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="p-6 pt-0 text-gray-600">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

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
