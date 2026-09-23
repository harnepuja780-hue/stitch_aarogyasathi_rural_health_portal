import { useCallback, useEffect, useState } from 'react';
import { LanguageContext } from './LanguageContext';
import { LANGUAGES, DEFAULT_LANGUAGE, translate } from '../data/translations';

const STORAGE_KEY = 'aarogya-language';

const isValidLanguage = (code) => LANGUAGES.some((l) => l.code === code);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored && isValidLanguage(stored) ? stored : DEFAULT_LANGUAGE;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const setLanguage = useCallback((code) => {
    if (isValidLanguage(code)) setLanguageState(code);
  }, []);

  const t = useCallback((key, params) => translate(language, key, params), [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};