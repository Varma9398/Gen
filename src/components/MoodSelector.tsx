
import React from 'react';
import { 
  Smile, 
  Zap, 
  Crown, 
  Palette, 
  Leaf, 
  Heart, 
  Shield, 
  Star 
} from 'lucide-react';

const moods = [
  { id: 'general', name: 'General', icon: Smile, color: 'from-blue-400 to-cyan-400' },
  { id: 'motivation', name: 'Motivation', icon: Zap, color: 'from-orange-400 to-red-400' },
  { id: 'confidence', name: 'Confidence', icon: Crown, color: 'from-yellow-400 to-orange-400' },
  { id: 'creative', name: 'Creative', icon: Palette, color: 'from-purple-400 to-pink-400' },
  { id: 'calm', name: 'Calm', icon: Leaf, color: 'from-green-400 to-teal-400' },
  { id: 'grateful', name: 'Grateful', icon: Heart, color: 'from-pink-400 to-rose-400' },
  { id: 'strong', name: 'Strong', icon: Shield, color: 'from-indigo-400 to-purple-400' },
  { id: 'inspiring', name: 'Inspiring', icon: Star, color: 'from-amber-400 to-yellow-400' },
];

interface MoodSelectorProps {
  selectedMood: string;
  onMoodChange: (mood: string) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onMoodChange }) => {
  return (
    <div className="bg-gradient-to-br from-white to-cyan-50 rounded-[2.5rem] p-8 shadow-[16px_16px_48px_#d1e7ef,_-16px_-16px_48px_#fff] border border-white/70">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center drop-shadow-sm">
        Choose Your Mood
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {moods.map((mood) => {
          const Icon = mood.icon;
          const isSelected = selectedMood === mood.id;
          
          return (
            <button
              key={mood.id}
              onClick={() => onMoodChange(mood.id)}
              className={`
                relative p-5 rounded-2xl transition-all duration-300 transform hover:scale-105 border-2
                shadow-[8px_8px_32px_#e0e7ef,_-8px_-8px_32px_#fff] border-white/60
                ${isSelected 
                  ? `scale-105 border-white/80 bg-gradient-to-br ${mood.color}`
                  : 'border-transparent bg-gradient-to-br from-white/90 to-slate-50/80'
                }
              `}
            >
              <div className="flex flex-col items-center space-y-2 relative z-10">
                <Icon 
                  className={`w-7 h-7 transition-colors duration-300 ${
                    isSelected ? 'text-white drop-shadow-sm' : 'text-gray-600'
                  }`} 
                />
                <span 
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isSelected ? 'text-white drop-shadow-sm' : 'text-gray-700'
                  }`}
                >
                  {mood.name}
                </span>
              </div>
              
              {isSelected && (
                <div className="absolute inset-0 rounded-2xl ring-2 ring-white/60 ring-offset-2 ring-offset-transparent"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
