
import React, { useState } from 'react';
import { History, Heart, RefreshCw } from 'lucide-react';

interface Compliment {
  id: string;
  text: string;
  emoji: string;
  mood: string;
  timestamp: number;
}

interface HistoryPanelProps {
  history: Compliment[];
  favorites: string[];
  onSelectCompliment: (compliment: Compliment) => void;
  onToggleFavorite: (id: string) => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({
  history,
  favorites,
  onSelectCompliment,
  onToggleFavorite,
}) => {
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const displayedHistory = showFavoritesOnly 
    ? history.filter(item => favorites.includes(item.id))
    : history.slice(0, 10);

  return (
    <div className="bg-gradient-to-br from-white to-pink-50 rounded-[2.5rem] p-8 shadow-[16px_16px_48px_#e0e7ef,_-16px_-16px_48px_#fff] border border-white/70">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center drop-shadow-sm">
          <History className="w-5 h-5 mr-2" />
          History
        </h3>
        
        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`p-2 rounded-xl transition-all duration-300 shadow-[4px_4px_16px_#e0e7ef,_-4px_-4px_16px_#fff] border border-white/60 ${
            showFavoritesOnly 
              ? 'bg-gradient-to-r from-red-400 to-pink-400 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
        </button>
      </div>

      {displayedHistory.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>{showFavoritesOnly ? 'No favorites yet' : 'No history yet'}</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {displayedHistory.map((item) => (
            <div
              key={item.id}
              className="group p-4 bg-gradient-to-r from-white/80 to-pink-100/60 rounded-2xl shadow-[8px_8px_32px_#e0e7ef,_-8px_-8px_32px_#fff] border border-white/60 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => onSelectCompliment(item)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg">{item.emoji}</span>
                    <span className="text-xs text-gray-500 capitalize">
                      {item.mood}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {item.text}
                  </p>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 ml-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(item.id);
                    }}
                    className={`p-1 rounded-lg transition-all duration-300 shadow-[4px_4px_16px_#e0e7ef,_-4px_-4px_16px_#fff] border border-white/60 ${
                      favorites.includes(item.id)
                        ? 'text-red-500'
                        : 'text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(item.id) ? 'fill-current' : ''}`} />
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCompliment(item);
                    }}
                    className="p-1 text-gray-400 hover:text-blue-500 transition-colors duration-300 opacity-0 group-hover:opacity-100 shadow-[4px_4px_16px_#e0e7ef,_-4px_-4px_16px_#fff] border border-white/60"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
