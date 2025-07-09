
import React, { useState } from 'react';
import { RefreshCw, Heart, Share, Download, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { generateComplimentCard } from '@/utils/cardGenerator';
import { ShareDialog } from './ShareDialog';

interface Compliment {
  id: string;
  text: string;
  emoji: string;
  mood: string;
  timestamp: number;
}

interface ComplimentGeneratorProps {
  compliment: Compliment | null;
  onGenerate: () => void;
  isGenerating: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const ComplimentGenerator: React.FC<ComplimentGeneratorProps> = ({
  compliment,
  onGenerate,
  isGenerating,
  isFavorite,
  onToggleFavorite,
}) => {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  const handleShare = () => {
    if (!compliment) return;
    setIsShareDialogOpen(true);
  };

  const handleCopy = async () => {
    if (!compliment) return;
    
    try {
      await navigator.clipboard.writeText(`${compliment.emoji} ${compliment.text}`);
      toast.success('Compliment copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy compliment');
    }
  };

  const handleDownload = async () => {
    if (!compliment) return;
    
    try {
      const canvas = await generateComplimentCard(compliment);
      const link = document.createElement('a');
      link.download = `compliment-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
      toast.success('Compliment card downloaded!');
    } catch (error) {
      toast.error('Failed to generate card');
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-white to-purple-50 rounded-[2.5rem] p-10 shadow-[16px_16px_48px_#e0e7ef,_-16px_-16px_48px_#fff] border border-white/70">
        {/* Compliment Display */}
        <div className="text-center mb-8">
          {compliment ? (
            <div className="space-y-4">
              <div className="text-6xl mb-4 animate-bounce drop-shadow">
                {compliment.emoji}
              </div>
              <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed drop-shadow-sm">
                "{compliment.text}"
              </blockquote>
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full shadow-[4px_4px_16px_#e0e7ef,_-4px_-4px_16px_#fff] border border-white/60">
                <span className="text-sm font-medium text-purple-800 capitalize">
                  {compliment.mood} Mood
                </span>
              </div>
            </div>
          ) : (
            <div className="animate-pulse">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <div className="h-8 bg-gray-200 rounded mx-auto mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={onGenerate}
            disabled={isGenerating}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-[4px_4px_16px_#e0e7ef,_-4px_-4px_16px_#fff] border border-white/60 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Generating...' : 'New Compliment'}</span>
          </button>

          {compliment && (
            <>
              <button
                onClick={onToggleFavorite}
                className={`p-3 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-[4px_4px_16px_#e0e7ef,_-4px_-4px_16px_#fff] border border-white/60 ${
                  isFavorite 
                    ? 'bg-gradient-to-r from-red-400 to-pink-400 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={handleCopy}
                className="p-3 bg-gray-100 text-gray-600 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:bg-gray-200 shadow-[4px_4px_16px_#e0e7ef,_-4px_-4px_16px_#fff] border border-white/60"
              >
                <Copy className="w-5 h-5" />
              </button>

              <button
                onClick={handleShare}
                className="p-3 bg-gradient-to-r from-blue-400 to-cyan-400 text-white rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-[4px_4px_16px_#e0e7ef,_-4px_-4px_16px_#fff] border border-white/60"
              >
                <Share className="w-5 h-5" />
              </button>

              <button
                onClick={handleDownload}
                className="p-3 bg-gradient-to-r from-green-400 to-teal-400 text-white rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-[4px_4px_16px_#e0e7ef,_-4px_-4px_16px_#fff] border border-white/60"
              >
                <Download className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>

      {compliment && (
        <ShareDialog
          isOpen={isShareDialogOpen}
          onClose={() => setIsShareDialogOpen(false)}
          compliment={compliment}
        />
      )}
    </>
  );
};
