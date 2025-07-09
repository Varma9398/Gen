
interface Compliment {
  id: string;
  text: string;
  emoji: string;
  mood: string;
  timestamp: number;
}

export const generateComplimentCard = (compliment: Compliment): Promise<HTMLCanvasElement> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    
    // Set canvas size for high-quality output
    canvas.width = 800;
    canvas.height = 600;
    
    // Create gradient background based on mood
    const gradients = {
      general: ['#667eea', '#764ba2'],
      motivation: ['#f093fb', '#f5576c'],
      confidence: ['#ffecd2', '#fcb69f'],
      creative: ['#a8edea', '#fed6e3'],
      calm: ['#d299c2', '#fef9d7'],
      grateful: ['#89f7fe', '#66a6ff'],
      strong: ['#fa709a', '#fee140'],
      inspiring: ['#43e97b', '#38f9d7']
    };
    
    const [color1, color2] = gradients[compliment.mood as keyof typeof gradients] || gradients.general;
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    
    // Fill background
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add subtle pattern overlay
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < canvas.width; i += 40) {
      for (let j = 0; j < canvas.height; j += 40) {
        ctx.beginPath();
        ctx.arc(i, j, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Add main content area with rounded rectangle
    const contentX = 80;
    const contentY = 100;
    const contentWidth = canvas.width - 160;
    const contentHeight = canvas.height - 200;
    const cornerRadius = 30;
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.beginPath();
    ctx.roundRect(contentX, contentY, contentWidth, contentHeight, cornerRadius);
    ctx.fill();
    
    // Add shadow to content area
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 10;
    
    // Add emoji
    ctx.font = '80px Arial';
    ctx.textAlign = 'center';
    const emojiY = contentY + 120;
    ctx.fillText(compliment.emoji, canvas.width / 2, emojiY);
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
    
    // Add compliment text
    ctx.fillStyle = '#2d3748';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    
    // Word wrap the text
    const maxWidth = contentWidth - 80;
    const words = compliment.text.split(' ');
    const lines: string[] = [];
    let currentLine = '';
    
    words.forEach(word => {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });
    
    if (currentLine) {
      lines.push(currentLine);
    }
    
    // Draw text lines
    const lineHeight = 45;
    const startY = emojiY + 80;
    
    lines.forEach((line, index) => {
      ctx.fillText(line, canvas.width / 2, startY + (index * lineHeight));
    });
    
    // Add mood badge
    const badgeY = contentY + contentHeight - 60;
    const badgeWidth = 200;
    const badgeHeight = 40;
    const badgeX = (canvas.width - badgeWidth) / 2;
    
    // Badge background
    ctx.fillStyle = color1;
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 20);
    ctx.fill();
    
    // Badge text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(compliment.mood.toUpperCase() + ' MOOD', canvas.width / 2, badgeY + 26);
    
    resolve(canvas);
  });
};
