import { useCallback, useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

const LOCALE_BY_LANG = { mr: 'mr-IN', hi: 'hi-IN', en: 'en-IN', mix: 'mr-IN' };
const FALLBACK_LOCALE = 'mr-IN';

const pickVoice = (lang) => {
  const voices = window.speechSynthesis.getVoices();
  const wishLang = lang.toLowerCase();
  const exact = voices.find((v) => v.lang && v.lang.toLowerCase() === wishLang);
  if (exact) return exact;
  const prefix = wishLang.split('-')[0];
  return voices.find((v) => v.lang && v.lang.toLowerCase().startsWith(prefix)) || null;
};

const ReadAloud = ({ className = '', children }) => {
  const { language, t } = useLanguage();
  const containerRef = useRef(null);
  const currentUtterance = useRef(null);
  const [speaking, setSpeaking] = useState(false);
  const [supported] = useState(
    () =>
      typeof window !== 'undefined' &&
      'speechSynthesis' in window &&
      typeof window.SpeechSynthesisUtterance !== 'undefined'
  );

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    currentUtterance.current = null;
    setSpeaking(false);
  }, [supported]);

  useEffect(() => stop, [stop]);

  const speak = useCallback(() => {
    if (!supported || !containerRef.current) return;
    const text = (containerRef.current.innerText || '').replace(/\s+/g, ' ').trim();
    if (!text) return;

    const locale = LOCALE_BY_LANG[language] || FALLBACK_LOCALE;
    window.speechSynthesis.cancel();

    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = locale;
    utter.rate = 0.92;
    const voice = pickVoice(locale);
    if (voice) utter.voice = voice;
    utter.onstart = () => setSpeaking(true);
    const finish = () => {
      if (currentUtterance.current === utter) setSpeaking(false);
    };
    utter.onend = finish;
    utter.onerror = (event) => {
      if (currentUtterance.current === utter && (!event || event.error !== 'canceled')) finish();
    };
    currentUtterance.current = utter;
    window.speechSynthesis.speak(utter);
  }, [supported, language]);

  const toggle = () => {
    if (speaking) stop();
    else speak();
  };

  return (
    <div className={className} ref={containerRef}>
      <div className="flex items-center justify-end gap-2 py-2">
        {speaking && (
          <span className="font-label-md text-label-md text-on-surface-variant">{t('reading')}</span>
        )}
        <button
          type="button"
          aria-pressed={speaking}
          aria-label={speaking ? t('readAloudStop') : t('readAloud')}
          title={supported ? t('readAloud') : t('readAloudUnsupported')}
          onClick={toggle}
          disabled={!supported}
          className="inline-flex items-center gap-2 px-space-sm py-2 rounded-full bg-primary-container text-on-primary font-label-md text-label-md font-bold shadow-sm hover:bg-primary transition-all active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-lg">
            {speaking ? 'stop_circle' : 'volume_up'}
          </span>
          <span>{speaking ? t('readAloudStop') : t('readAloud')}</span>
        </button>
        {!supported && (
          <span className="font-label-md text-label-md text-on-surface-variant">{t('readAloudUnsupported')}</span>
        )}
      </div>
      {children}
    </div>
  );
};

export default ReadAloud;