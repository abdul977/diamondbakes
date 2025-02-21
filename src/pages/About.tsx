import React, { useEffect, useState } from 'react';
import { Users, Clock, Award, Heart } from 'lucide-react';
import { getAboutContent, type About as AboutType } from '../services/aboutService';

const iconComponents = {
  Users: <Users className="h-6 w-6 text-yellow-500" />,
  Clock: <Clock className="h-6 w-6 text-yellow-500" />,
  Award: <Award className="h-6 w-6 text-yellow-500" />,
  Heart: <Heart className="h-6 w-6 text-yellow-500" />
};

const About = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [about, setAbout] = useState<AboutType | null>(null);

  useEffect(() => {
    const loadAboutContent = async () => {
      try {
        const data = await getAboutContent();
        setAbout(data);
      } catch (err) {
        console.error('Error loading about content:', err);
        setError('Failed to load about content');
      } finally {
        setLoading(false);
      }
    };

    loadAboutContent();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error || !about) {
    return (
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">
            {error || 'Failed to load about content'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-serif font-bold mb-6">{about.heading}</h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            {about.introduction}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {about.features.map((feature, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-xl text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-4">
                {iconComponents[feature.icon]}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-6">{about.story.title}</h2>
            <div className="space-y-4 text-gray-600">
              {about.story.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {about.story.images.map((image, index) => (
              <div key={index} className={`aspect-w-4 aspect-h-5 ${index > 0 ? 'mt-8' : ''}`}>
                <img 
                  src={image.url} 
                  alt={image.alt}
                  className="rounded-xl object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 p-8 bg-yellow-50 rounded-2xl">
          <h2 className="text-3xl font-serif font-bold mb-4 text-center">{about.commitment.title}</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto">
            {about.commitment.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
