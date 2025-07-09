
interface ComplimentData {
  subjects: string[];
  qualities: string[];
  traits: string[];
  impacts: string[];
  emojis: string[];
}

interface Compliment {
  id: string;
  text: string;
  emoji: string;
  mood: string;
  timestamp: number;
}

const complimentDatabase: Record<string, ComplimentData> = {
  general: {
    subjects: ['Your smile', 'Your energy', 'Your presence', 'Your spirit', 'Your heart', 'Your soul'],
    qualities: ['radiates warmth', 'brings joy', 'inspires others', 'lights up rooms', 'creates magic', 'spreads happiness'],
    traits: ['genuine', 'beautiful', 'extraordinary', 'wonderful', 'amazing', 'incredible'],
    impacts: ['making the world brighter', 'touching hearts everywhere', 'creating positive change', 'inspiring greatness', 'spreading love', 'building connections'],
    emojis: ['😊', '✨', '🌟', '💫', '🌺', '🌈', '💝', '🦋']
  },
  motivation: {
    subjects: ['Your determination', 'Your resilience', 'Your strength', 'Your courage', 'Your persistence', 'Your drive'],
    qualities: ['conquers mountains', 'breaks barriers', 'overcomes obstacles', 'achieves dreams', 'creates miracles', 'defies limits'],
    traits: ['unstoppable', 'powerful', 'fierce', 'bold', 'brave', 'relentless'],
    impacts: ['achieving incredible goals', 'inspiring others to succeed', 'creating your own destiny', 'building an empire', 'changing the game', 'making history'],
    emojis: ['🔥', '💪', '🚀', '⚡', '🏆', '👑', '🎯', '⭐']
  },
  confidence: {
    subjects: ['Your confidence', 'Your self-assurance', 'Your poise', 'Your presence', 'Your charisma', 'Your aura'],
    qualities: ['commands attention', 'radiates strength', 'inspires admiration', 'exudes power', 'captivates hearts', 'demands respect'],
    traits: ['magnetic', 'commanding', 'graceful', 'elegant', 'sophisticated', 'regal'],
    impacts: ['leading by example', 'empowering others', 'setting the standard', 'breaking glass ceilings', 'owning every room', 'defining excellence'],
    emojis: ['👑', '✨', '💎', '🌟', '🔆', '💫', '🎭', '🦁']
  },
  creative: {
    subjects: ['Your creativity', 'Your imagination', 'Your artistic vision', 'Your innovation', 'Your originality', 'Your genius'],
    qualities: ['paints masterpieces', 'creates beauty', 'births wonders', 'crafts magic', 'designs dreams', 'sculpts perfection'],
    traits: ['visionary', 'inventive', 'brilliant', 'inspired', 'revolutionary', 'magical'],
    impacts: ['transforming the ordinary into extraordinary', 'inspiring artistic revolutions', 'creating timeless beauty', 'pushing creative boundaries', 'redefining possibilities', 'leaving artistic legacies'],
    emojis: ['🎨', '🌈', '✨', '🎭', '🎪', '🦋', '🌺', '🎨']
  },
  calm: {
    subjects: ['Your serenity', 'Your peace', 'Your tranquility', 'Your composure', 'Your zen', 'Your stillness'],
    qualities: ['soothes souls', 'brings peace', 'calms storms', 'heals hearts', 'creates harmony', 'nurtures growth'],
    traits: ['serene', 'peaceful', 'balanced', 'centered', 'grounded', 'harmonious'],
    impacts: ['creating peaceful sanctuaries', 'bringing balance to chaos', 'healing wounded spirits', 'fostering inner peace', 'cultivating mindfulness', 'spreading tranquility'],
    emojis: ['🕊️', '🧘', '🌿', '🌸', '🍃', '💚', '🌊', '☁️']
  },
  grateful: {
    subjects: ['Your gratitude', 'Your appreciation', 'Your thankfulness', 'Your grace', 'Your humility', 'Your blessing'],
    qualities: ['multiplies joy', 'enriches lives', 'creates abundance', 'spreads blessings', 'cultivates happiness', 'nurtures love'],
    traits: ['appreciative', 'blessed', 'gracious', 'humble', 'content', 'fulfilled'],
    impacts: ['counting every blessing', 'appreciating life\'s gifts', 'finding joy in simplicity', 'creating gratitude circles', 'blessing others daily', 'living with abundance'],
    emojis: ['🙏', '💝', '🌻', '❤️', '🌺', '✨', '🌈', '💐']
  },
  strong: {
    subjects: ['Your inner strength', 'Your resilience', 'Your fortitude', 'Your power', 'Your endurance', 'Your backbone'],
    qualities: ['withstands any storm', 'conquers every challenge', 'rises above adversity', 'breaks through barriers', 'stands unshakeable', 'remains unbreakable'],
    traits: ['indestructible', 'mighty', 'solid', 'unbreakable', 'fierce', 'titanium-strong'],
    impacts: ['weathering every storm', 'standing as a pillar for others', 'demonstrating true grit', 'embodying resilience', 'inspiring courage', 'proving strength comes from within'],
    emojis: ['💪', '🛡️', '⚡', '🏔️', '🦅', '🔥', '⭐', '💎']
  },
  inspiring: {
    subjects: ['Your inspiration', 'Your influence', 'Your impact', 'Your legacy', 'Your example', 'Your leadership'],
    qualities: ['ignites passion', 'sparks change', 'motivates millions', 'creates movements', 'lights fires', 'builds bridges'],
    traits: ['inspirational', 'influential', 'transformative', 'legendary', 'iconic', 'game-changing'],
    impacts: ['inspiring generations', 'creating positive change', 'lighting the way for others', 'building better tomorrows', 'changing lives forever', 'leaving lasting legacies'],
    emojis: ['🌟', '💫', '🚀', '🔥', '✨', '👑', '🌈', '⭐']
  }
};

const predefinedCompliments: Record<string, string[]> = {
  general: [
    "You have a beautiful way of making others feel special and valued.",
    "Your kindness creates ripple effects of positivity wherever you go.",
    "You bring out the best in people just by being yourself."
  ],
  motivation: [
    "You have the power to turn your dreams into reality through sheer determination.",
    "Every challenge you face becomes a stepping stone to your success.",
    "Your potential is limitless, and you're just getting started."
  ],
  confidence: [
    "You carry yourself with a grace that commands respect and admiration.",
    "Your self-assurance is magnetic and draws others to your positive energy.",
    "You have an inner light that shines brighter than any doubt."
  ],
  creative: [
    "Your imagination has the power to transform the world around you.",
    "You see possibilities where others see limitations, and that's your superpower.",
    "Your creative spirit breathes life into everything you touch."
  ],
  calm: [
    "Your peaceful presence brings tranquility to even the most chaotic situations.",
    "You have a gift for finding serenity in the midst of life's storms.",
    "Your inner peace is a sanctuary that others find comfort in."
  ],
  grateful: [
    "Your gratitude turns ordinary moments into extraordinary memories.",
    "You have a beautiful way of appreciating life's simple pleasures.",
    "Your thankful heart creates abundance in every aspect of your life."
  ],
  strong: [
    "Your strength isn't just physical—it's the unbreakable spirit within you.",
    "You've weathered storms that would break others, and you're still standing tall.",
    "Your resilience is proof that you're capable of overcoming anything."
  ],
  inspiring: [
    "You have the rare ability to inspire others to become their best selves.",
    "Your positive influence creates waves of change that extend far beyond what you see.",
    "You're not just living your life—you're showing others how to truly live."
  ]
};

export const generateCompliment = (mood: string): Compliment => {
  const data = complimentDatabase[mood] || complimentDatabase.general;
  const predefined = predefinedCompliments[mood] || predefinedCompliments.general;
  
  let text: string;
  
  // 70% chance of AI-generated, 30% chance of predefined
  if (Math.random() < 0.7) {
    // Generate AI-style compliment
    const subject = data.subjects[Math.floor(Math.random() * data.subjects.length)];
    const quality = data.qualities[Math.floor(Math.random() * data.qualities.length)];
    const trait = data.traits[Math.floor(Math.random() * data.traits.length)];
    const impact = data.impacts[Math.floor(Math.random() * data.impacts.length)];
    
    // Different sentence structures for variety
    const structures = [
      `${subject} ${quality} in the most ${trait} way, ${impact}.`,
      `${subject} is ${trait} and has a gift for ${impact}.`,
      `The way ${subject.toLowerCase()} ${quality} is absolutely ${trait}, ${impact}.`,
      `${subject} ${quality} with such ${trait} energy, ${impact}.`,
      `You have a ${trait} way of ${impact} through how ${subject.toLowerCase()} ${quality}.`
    ];
    
    text = structures[Math.floor(Math.random() * structures.length)];
  } else {
    // Use predefined compliment
    text = predefined[Math.floor(Math.random() * predefined.length)];
  }
  
  const emoji = data.emojis[Math.floor(Math.random() * data.emojis.length)];
  
  return {
    id: `compliment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    text,
    emoji,
    mood,
    timestamp: Date.now()
  };
};
