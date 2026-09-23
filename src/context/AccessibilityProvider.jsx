import { useCallback, useEffect, useState } from 'react';
import { AccessibilityContext } from './AccessibilityContext';
import { readAccessibility, writeAccessibility, DEFAULT_ACCESSIBILITY } from './accessibilityStorage';

export const AccessibilityProvider = ({ children }) => {
  const [settings, setSettings] = useState(() =>
    typeof window === 'undefined'
      ? { ...DEFAULT_ACCESSIBILITY }
      : readAccessibility(window.localStorage)
  );

  const applyClasses = useCallback((next) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.classList.toggle('a11y-large-text', next.largeText);
    root.classList.toggle('a11y-high-contrast', next.highContrast);
  }, []);

  useEffect(() => {
    applyClasses(settings);
    if (typeof window !== 'undefined') writeAccessibility(window.localStorage, settings);
  }, [settings, applyClasses]);

  const toggleLargeText = useCallback(() => {
    setSettings((prev) => ({ ...prev, largeText: !prev.largeText }));
  }, []);

  const toggleHighContrast = useCallback(() => {
    setSettings((prev) => ({ ...prev, highContrast: !prev.highContrast }));
  }, []);

  const resetAccessibility = useCallback(() => {
    setSettings({ ...DEFAULT_ACCESSIBILITY });
  }, []);

  return (
    <AccessibilityContext.Provider
      value={{
        largeText: settings.largeText,
        highContrast: settings.highContrast,
        toggleLargeText,
        toggleHighContrast,
        resetAccessibility,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export default AccessibilityProvider;