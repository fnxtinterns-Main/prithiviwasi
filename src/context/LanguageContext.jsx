import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const LANGUAGE_STORAGE_KEY = 'prithviwasi_site_language';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  // Default to English ('en') as requested by the user, with option to switch to Hindi ('hi')
  const [language, setLanguageState] = useState(() => {
    try {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      return stored === 'hi' ? 'hi' : 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = useCallback((lang) => {
    const nextLang = lang === 'hi' ? 'hi' : 'en';
    setLanguageState(nextLang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLang);
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => {
      const next = prev === 'en' ? 'hi' : 'en';
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
      } catch {
        // Ignore
      }
      return next;
    });
  }, []);

  // Helper function to pick English or Hindi
  const t = useCallback(
    (enValue, hiValue) => {
      if (typeof enValue === 'object' && enValue !== null) {
        return language === 'hi' ? enValue.hi || enValue.en : enValue.en || enValue.hi;
      }
      return language === 'hi' ? hiValue || enValue : enValue || hiValue;
    },
    [language]
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        isHindi: language === 'hi',
        isEnglish: language === 'en',
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
