
import React, { useState, useEffect, useMemo } from 'react';
import { ComplimentGenerator } from '@/components/ComplimentGenerator';
import { StatsPanel } from '@/components/StatsPanel';
import { HistoryPanel } from '@/components/HistoryPanel';
import { MoodSelector } from '@/components/MoodSelector';
import { Header } from '@/components/Header';
import { useComplimentData } from '@/hooks/useComplimentData';
import { generateCompliment } from '@/utils/complimentGenerator';

// Bubble FX: Generate 100+ bubbles with random properties
const BUBBLE_COUNT = 120;
const bubbleColors = [
  'bg-blue-400', 'bg-pink-500', 'bg-purple-500', 'bg-cyan-400', 'bg-yellow-400',
  'bg-green-400', 'bg-red-500', 'bg-indigo-500', 'bg-fuchsia-500', 'bg-orange-400',
  'bg-white', 'bg-black', 'bg-blue-600', 'bg-pink-700', 'bg-purple-700',
  'bg-cyan-600', 'bg-yellow-500', 'bg-green-600', 'bg-red-700', 'bg-indigo-700',
  'bg-fuchsia-700', 'bg-orange-600'
];
const bubbleAnimations = [
  'animate-bubble1', 'animate-bubble2', 'animate-bubble3', 'animate-bubble4', 'animate-bubble5',
  'animate-bubble-pop1', 'animate-bubble-pop2', 'animate-bubble-pop3', 'animate-bubble-pop4', 'animate-bubble-pop5'
];

function randomBubble(id) {
  const left = Math.random() * 100;
  const bottom = -10 - Math.random() * 20;
  const size = 8 + Math.random() * 24; // px, 8-32
  const color = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
  const opacity = 0.5 + Math.random() * 0.5; // 0.5-1
  const anim = bubbleAnimations[Math.floor(Math.random() * bubbleAnimations.length)];
  const delay = Math.random() * 24; // up to 24s
  return {
    id,
    left,
    bottom,
    size,
    color,
    opacity,
    anim,
    delay,
    blasting: false
  };
}

const Bubble = ({ style, className, onClick, blasting }) => (
  <div
    aria-hidden="true"
    className={`absolute rounded-full pointer-events-auto z-0 transition-transform transition-opacity duration-500 ${className} ${blasting ? 'bubble-blast' : ''}`}
    style={style}
    onMouseDown={onClick}
    onTouchStart={onClick}
  />
);

const Index = () => {
  const {
    currentCompliment,
    setCurrentCompliment,
    stats,
    history,
    favorites,
    addToHistory,
    toggleFavorite,
    incrementDailyCount
  } = useComplimentData();

  const [selectedMood, setSelectedMood] = useState('general');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateCompliment = async () => {
    setIsGenerating(true);
    
    // Simulate AI thinking time for better UX
    setTimeout(() => {
      const newCompliment = generateCompliment(selectedMood);
      setCurrentCompliment(newCompliment);
      addToHistory(newCompliment);
      incrementDailyCount();
      setIsGenerating(false);
    }, 800);
  };

  // Generate initial compliment for new users
  useEffect(() => {
    if (!currentCompliment) {
      const initialCompliment = generateCompliment('general');
      setCurrentCompliment(initialCompliment);
      addToHistory(initialCompliment);
    }
  }, []);

  // Interactive bubbles state
  const [bubbles, setBubbles] = useState(() =>
    Array.from({ length: BUBBLE_COUNT }).map((_, i) => randomBubble(i))
  );

  // Handle bubble blast (click)
  const handleBubbleBlast = (id) => {
    setBubbles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, blasting: true } : b))
    );
    setTimeout(() => {
      setBubbles((prev) => {
        const filtered = prev.filter((b) => b.id !== id);
        // Add a new bubble with a new id
        const newId = Math.max(0, ...filtered.map((b) => b.id)) + 1;
        return [...filtered, randomBubble(newId)];
      });
    }, 500); // match blast animation duration
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 relative overflow-hidden">
      {/* Visual FX: 100+ Floating Bubbles (High Contrast, Interactive, Above All) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-50">
        {bubbles.map((b) => (
          <Bubble
            key={b.id}
            className={`w-[${b.size}px] h-[${b.size}px] ${b.color} opacity-[${b.opacity}] ${b.anim}`}
            style={{
              left: `${b.left}%`,
              bottom: `${b.bottom}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              opacity: b.opacity,
              animationDelay: `${b.delay}s`,
              filter: 'blur(0.5px)',
              boxShadow: '0 0 8px 2px rgba(0,0,0,0.12)'
            }}
            onClick={() => handleBubbleBlast(b.id)}
            blasting={b.blasting}
          />
        ))}
      </div>
      {/* Visual FX: Blurred Color Blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-300 opacity-40 rounded-full filter blur-3xl animate-blob1" />
        <div className="absolute top-[60%] left-[60%] w-96 h-96 bg-pink-300 opacity-40 rounded-full filter blur-3xl animate-blob2" />
        <div className="absolute top-[30%] left-[70%] w-72 h-72 bg-blue-300 opacity-30 rounded-full filter blur-2xl animate-blob3" />
      </div>
      {/* Visual FX: Floating Shapes */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/4 top-1/3 w-8 h-8 bg-white/40 rounded-full shadow-lg animate-float1" />
        <div className="absolute left-2/3 top-2/4 w-6 h-6 bg-white/30 rounded-full shadow-md animate-float2" />
        <div className="absolute left-1/2 top-2/3 w-10 h-10 bg-white/20 rounded-full shadow-xl animate-float3" />
      </div>
      <div className="container mx-auto px-4 py-6 max-w-6xl relative z-10">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Main Generator Section */}
          <div className="lg:col-span-2 space-y-6">
            <ComplimentGenerator
              compliment={currentCompliment}
              onGenerate={handleGenerateCompliment}
              isGenerating={isGenerating}
              isFavorite={currentCompliment ? favorites.includes(currentCompliment.id) : false}
              onToggleFavorite={() => currentCompliment && toggleFavorite(currentCompliment.id)}
            />
            <MoodSelector 
              selectedMood={selectedMood}
              onMoodChange={setSelectedMood}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <StatsPanel stats={stats} />
            <HistoryPanel 
              history={history}
              favorites={favorites}
              onSelectCompliment={(compliment) => {
                setCurrentCompliment(compliment);
                setSelectedMood(compliment.mood);
              }}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
