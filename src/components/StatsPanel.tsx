
import React from 'react';
import { Calendar, Target, Heart, Flame } from 'lucide-react';

interface Stats {
  dailyCount: number;
  totalCount: number;
  favoriteCount: number;
  streak: number;
  mostUsedMood: string;
}

interface StatsPanelProps {
  stats: Stats;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  const statItems = [
    {
      label: 'Today',
      value: stats.dailyCount,
      icon: Calendar,
      color: 'from-blue-400 to-cyan-400'
    },
    {
      label: 'Total',
      value: stats.totalCount,
      icon: Target,
      color: 'from-purple-400 to-pink-400'
    },
    {
      label: 'Favorites',
      value: stats.favoriteCount,
      icon: Heart,
      color: 'from-red-400 to-pink-400'
    },
    {
      label: 'Streak',
      value: stats.streak,
      icon: Flame,
      color: 'from-orange-400 to-red-400'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-[2.5rem] p-8 shadow-[16px_16px_48px_#cbd5e1,_-16px_-16px_48px_#fff] border border-white/70">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center drop-shadow-sm">
        Your Stats
      </h3>
      
      <div className="grid grid-cols-2 gap-6">
        {statItems.map((item, index) => {
          const Icon = item.icon;
          
          return (
            <div
              key={index}
              className="text-center p-5 bg-gradient-to-br from-white/80 to-blue-100/60 rounded-2xl shadow-[8px_8px_32px_#e0e7ef,_-8px_-8px_32px_#fff] border border-white/60"
            >
              <div 
                className={`inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r ${item.color} mb-2 shadow-[inset_4px_4px_16px_#fff8,0_4px_16px_#d1d5db]`}
              >
                <Icon className="w-7 h-7 text-white drop-shadow" />
              </div>
              <div className="text-2xl font-bold text-gray-800 drop-shadow-sm">
                {item.value}
              </div>
              <div className="text-sm text-gray-600">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>

      {stats.mostUsedMood && (
        <div className="mt-5 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl shadow-[4px_4px_16px_#e0e7ef,_-4px_-4px_16px_#fff] border border-white/60">
          <div className="text-center">
            <div className="text-sm text-gray-600">Most Used Mood</div>
            <div className="text-lg font-semibold text-purple-800 capitalize">
              {stats.mostUsedMood}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
