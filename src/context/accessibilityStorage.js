export const A11Y_KEY = 'aarogya-a11y';

export const DEFAULT_ACCESSIBILITY = { largeText: false, highContrast: false };

export const readAccessibility = (storage) => {
  try {
    const raw = storage && storage.getItem(A11Y_KEY);
    if (!raw) return { ...DEFAULT_ACCESSIBILITY };
    const parsed = JSON.parse(raw);
    return {
      largeText: typeof parsed.largeText === 'boolean' ? parsed.largeText : DEFAULT_ACCESSIBILITY.largeText,
      highContrast: typeof parsed.highContrast === 'boolean' ? parsed.highContrast : DEFAULT_ACCESSIBILITY.highContrast,
    };
  } catch {
    return { ...DEFAULT_ACCESSIBILITY };
  }
};

export const writeAccessibility = (storage, settings) => {
  try {
    storage.setItem(A11Y_KEY, JSON.stringify(settings));
  } catch {
    /* storage unavailable */
  }
};