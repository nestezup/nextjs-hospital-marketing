'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';

type FontFamily = 'pretendard' | 'gmarket' | 'paperlogy';

interface FontContextType {
  font: FontFamily;
  setFont: (font: FontFamily) => void;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export function FontProvider({ children }: { children: React.ReactNode }) {
  const [font, setFont] = useState<FontFamily>('pretendard');
  const [mounted, setMounted] = useState(false);

  // Load saved font preference from localStorage
  useEffect(() => {
    setMounted(true);
    const savedFont = localStorage.getItem('font-family') as FontFamily;
    if (savedFont && ['pretendard', 'gmarket', 'paperlogy'].includes(savedFont)) {
      setFont(savedFont);
    }
  }, []);

  // Apply font to body element
  useEffect(() => {
    if (!mounted) return;

    // Remove all font classes
    document.body.classList.remove('font-pretendard', 'font-gmarket', 'font-paperlogy');

    // Add selected font class
    document.body.classList.add(`font-${font}`);

    // Save to localStorage
    localStorage.setItem('font-family', font);
  }, [font, mounted]);

  const value = {
    font,
    setFont,
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <>{children}</>;
  }

  return <FontContext.Provider value={value}>{children}</FontContext.Provider>;
}

export function useFont() {
  const context = useContext(FontContext);
  if (context === undefined) {
    // Return default values if used outside FontProvider (e.g., in not-found pages)
    return {
      font: 'pretendard' as FontFamily,
      setFont: () => {},
    };
  }
  return context;
}
