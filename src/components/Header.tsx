
import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export const Header = () => {
  return (
    <header className="text-center py-8">
      <div className="inline-flex items-center justify-center mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
        Daily Compliment Generator
      </h1>
      
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Start your day with a personalized compliment designed to boost your mood and confidence. 
        <Heart className="inline w-5 h-5 text-pink-500 mx-1" />
        Choose your mood and let AI create the perfect words for you.
      </p>
    </header>
  );
};
