import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Oluwaseun Adebayo',
    role: 'Event Planner',
    image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&q=80', /* Nigerian businessman */
    content: 'The small chops from Diamond Elite Bites are always the highlight at my events. Their service is reliable and the quality is consistently excellent.',
    rating: 5
  },
  {
    id: 2,
    name: 'Chidinma Okonkwo',
    role: 'Business Owner',
    image: 'https://images.unsplash.com/photo-1613053341085-db794820ce43?auto=format&fit=crop&q=80', /* Nigerian businesswoman */
    content: 'I order their meat pies regularly for my office meetings. They\'re always fresh, well-seasoned, and delivered on time. Highly recommended!',
    rating: 5
  },
  {
    id: 3,
    name: 'Aisha Ibrahim',
    role: 'Wedding Planner',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80', /* Nigerian woman portrait */
    content: 'Their wedding cakes are absolutely beautiful! The attention to detail and taste is outstanding. My clients are always impressed.',
    rating: 5
  },
  {
    id: 4,
    name: 'Babajide Ogunleye',
    role: 'Restaurant Owner',
    image: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80', /* Nigerian man portrait */
    content: 'The quality of their bread is exceptional. I\'ve been ordering from them for my restaurant for over a year now. Great consistency!',
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Customer Reviews</h2>
          <p className="text-gray-600">
            Don't just take our word for it. Here's what our customers have to say about our products and services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://wa.me/2348027408760"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg hover:bg-yellow-500 transition-colors font-medium"
          >
            Order Now on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
