import { useState, useEffect } from 'react';

export function useFontSize(initialSize = 16) {
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('fontSize');
    return saved ? parseInt(saved) : initialSize;
  });

  useEffect(() => {
    document.documentElement.style.fontSize = fontSize + 'px';
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  const increase = () => setFontSize(prev => Math.min(prev + 1, 24));
  const decrease = () => setFontSize(prev => Math.max(prev - 1, 12));
  const reset = () => setFontSize(initialSize);

  return { fontSize, increase, decrease, reset };
}
