
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Share, 
  Copy, 
  MessageCircle, 
  Mail, 
  Linkedin, 
  Facebook
} from 'lucide-react';
import { toast } from 'sonner';

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  compliment: {
    text: string;
    emoji: string;
  };
}

export const ShareDialog: React.FC<ShareDialogProps> = ({ isOpen, onClose, compliment }) => {
  const shareText = `${compliment.emoji} ${compliment.text}`;
  const shareUrl = window.location.href;
  
  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      toast.success('Compliment copied to clipboard!');
      onClose();
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank');
    onClose();
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(facebookUrl, '_blank');
    onClose();
  };

  const handleLinkedInShare = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`;
    window.open(linkedinUrl, '_blank');
    onClose();
  };

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const handleEmailShare = () => {
    const emailUrl = `mailto:?subject=Daily Compliment&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
    window.open(emailUrl);
    onClose();
  };

  const shareOptions = [
    {
      name: 'Copy to Clipboard',
      icon: Copy,
      action: handleCopyToClipboard,
      color: 'from-gray-400 to-gray-600'
    },
    {
      name: 'Twitter/X',
      icon: Share,
      action: handleTwitterShare,
      color: 'from-blue-400 to-blue-600'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      action: handleFacebookShare,
      color: 'from-blue-600 to-blue-800'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      action: handleLinkedInShare,
      color: 'from-blue-500 to-blue-700'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      action: handleWhatsAppShare,
      color: 'from-green-400 to-green-600'
    },
    {
      name: 'Email',
      icon: Mail,
      action: handleEmailShare,
      color: 'from-red-400 to-red-600'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold text-gray-800">
            Share Your Compliment
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl mb-4">
          <p className="text-center text-lg text-gray-700">
            {compliment.emoji} {compliment.text}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {shareOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.name}
                onClick={option.action}
                className={`flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r ${option.color} text-white transition-all duration-300 hover:scale-105 hover:shadow-lg`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{option.name}</span>
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
