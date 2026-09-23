import { useCallback, useEffect, useRef, useState } from 'react';
import { useLanguage } from './useLanguage';

const LOCALE_BY_LANG = { mr: 'mr-IN', hi: 'hi-IN', en: 'en-IN', mix: 'mr-IN' };

const getSpeechRecognition = () => {
  if (typeof window === 'undefined') return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
};

export const useVoiceSearch = ({ onResult } = {}) => {
  const { language } = useLanguage();
  const recognitionRef = useRef(null);
  const onResultRef = useRef(onResult);
  useEffect(() => {
    onResultRef.current = onResult;
  }, [onResult]);
  const [listening, setListening] = useState(false);
  const [supported] = useState(() => getSpeechRecognition() !== null);
  const [errorKey, setErrorKey] = useState(null);

  const stop = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
      } catch {
        /* ignore */
      }
      try {
        recognitionRef.current.abort();
      } catch {
        /* ignore */
      }
      recognitionRef.current = null;
    }
    setListening(false);
    setErrorKey(null);
  }, []);

  useEffect(
    () => () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          /* ignore */
        }
      }
    },
    []
  );

  const start = useCallback(() => {
    const Recognition = getSpeechRecognition();
    if (!Recognition) {
      setErrorKey('voiceSearchUnsupported');
      return;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        /* ignore */
      }
      recognitionRef.current = null;
    }
    const rec = new Recognition();
    rec.lang = LOCALE_BY_LANG[language] || 'mr-IN';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    recognitionRef.current = rec;
    setErrorKey(null);
    setListening(true);

    rec.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        transcript += event.results[i][0].transcript;
      }
      const finalText = transcript.trim();
      if (finalText && onResultRef.current) onResultRef.current(finalText);
    };
    rec.onerror = (event) => {
      const e = event && event.error;
      if (e === 'not-allowed' || e === 'service-not-allowed') setErrorKey('voiceSearchPermission');
      else setErrorKey('voiceSearchError');
    };
    rec.onend = () => setListening(false);

    try {
      rec.start();
    } catch {
      setListening(false);
      setErrorKey('voiceSearchError');
    }
  }, [language]);

  return { supported, listening, errorKey, setErrorKey, startVoiceSearch: start, stopVoiceSearch: stop };
};