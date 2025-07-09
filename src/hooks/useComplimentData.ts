
import { useState, useEffect } from 'react';

interface Compliment {
  id: string;
  text: string;
  emoji: string;
  mood: string;
  timestamp: number;
}

interface Stats {
  dailyCount: number;
  totalCount: number;
  favoriteCount: number;
  streak: number;
  mostUsedMood: string;
  lastVisit: string;
}

const STORAGE_KEYS = {
  COMPLIMENTS: 'compliment_history',
  FAVORITES: 'compliment_favorites',
  STATS: 'compliment_stats',
  CURRENT: 'current_compliment'
};

export const useComplimentData = () => {
  const [currentCompliment, setCurrentCompliment] = useState<Compliment | null>(null);
  const [history, setHistory] = useState<Compliment[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [stats, setStats] = useState<Stats>({
    dailyCount: 0,
    totalCount: 0,
    favoriteCount: 0,
    streak: 0,
    mostUsedMood: '',
    lastVisit: new Date().toDateString()
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const savedHistory = localStorage.getItem(STORAGE_KEYS.COMPLIMENTS);
        const savedFavorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
        const savedStats = localStorage.getItem(STORAGE_KEYS.STATS);
        const savedCurrent = localStorage.getItem(STORAGE_KEYS.CURRENT);

        if (savedHistory) {
          setHistory(JSON.parse(savedHistory));
        }

        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }

        if (savedCurrent) {
          setCurrentCompliment(JSON.parse(savedCurrent));
        }

        if (savedStats) {
          const parsedStats = JSON.parse(savedStats);
          const today = new Date().toDateString();
          
          // Reset daily count if it's a new day
          if (parsedStats.lastVisit !== today) {
            const wasYesterday = new Date(parsedStats.lastVisit).getTime() === 
              new Date(Date.now() - 24 * 60 * 60 * 1000).getTime();
            
            setStats({
              ...parsedStats,
              dailyCount: 0,
              lastVisit: today,
              streak: wasYesterday ? parsedStats.streak : 0
            });
          } else {
            setStats(parsedStats);
          }
        }
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
      }
    };

    loadData();
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPLIMENTS, JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    if (currentCompliment) {
      localStorage.setItem(STORAGE_KEYS.CURRENT, JSON.stringify(currentCompliment));
    }
  }, [currentCompliment]);

  const addToHistory = (compliment: Compliment) => {
    setHistory(prev => {
      const newHistory = [compliment, ...prev.filter(c => c.id !== compliment.id)];
      return newHistory.slice(0, 100); // Keep only last 100 compliments
    });
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(id) 
        ? prev.filter(fId => fId !== id)
        : [...prev, id];
      
      // Update favorite count in stats
      setStats(prevStats => ({
        ...prevStats,
        favoriteCount: newFavorites.length
      }));
      
      return newFavorites;
    });
  };

  const incrementDailyCount = () => {
    setStats(prev => {
      const newStats = {
        ...prev,
        dailyCount: prev.dailyCount + 1,
        totalCount: prev.totalCount + 1
      };

      // Update streak if this is the first compliment of the day
      if (prev.dailyCount === 0) {
        newStats.streak = prev.streak + 1;
      }

      return newStats;
    });
  };

  const updateMostUsedMood = (mood: string) => {
    const moodCounts = history.reduce((acc, compliment) => {
      acc[compliment.mood] = (acc[compliment.mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostUsed = Object.entries(moodCounts).reduce((a, b) => 
      moodCounts[a[0]] > moodCounts[b[0]] ? a : b
    )?.[0] || mood;

    setStats(prev => ({
      ...prev,
      mostUsedMood: mostUsed
    }));
  };

  // Update most used mood when history changes
  useEffect(() => {
    if (history.length > 0) {
      const moodCounts = history.reduce((acc, compliment) => {
        acc[compliment.mood] = (acc[compliment.mood] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const mostUsed = Object.entries(moodCounts).reduce((a, b) => 
        moodCounts[a[0]] > moodCounts[b[0]] ? a : b
      )?.[0] || '';

      setStats(prev => ({
        ...prev,
        mostUsedMood: mostUsed
      }));
    }
  }, [history]);

  return {
    currentCompliment,
    setCurrentCompliment,
    history,
    favorites,
    stats,
    addToHistory,
    toggleFavorite,
    incrementDailyCount,
    updateMostUsedMood
  };
};
