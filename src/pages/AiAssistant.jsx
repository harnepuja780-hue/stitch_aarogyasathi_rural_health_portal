import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useVoiceSearch } from '../hooks/useVoiceSearch';
import ReadAloud from '../components/a11y/ReadAloud';
import { resolveAnswer, SUGGESTED_QUESTIONS } from '../data/aiKnowledge';

const navLabelKeyByRoute = {
  '/': 'navHome',
  '/health': 'navHealth',
  '/schemes': 'navSchemes',
  '/ai': 'navAi',
};

const Welcome = ({ t }) => (
  <div className="flex items-start gap-3">
    <div className="w-9 h-9 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shrink-0">
      <span className="material-symbols-outlined text-xl">smart_toy</span>
    </div>
    <div className="flex flex-col gap-1">
      <span className="font-label-lg text-label-lg text-tertiary font-bold">{t('aiHelperTitle')}</span>
      <div className="self-start max-w-[90%] bg-surface-container-lowest text-on-surface p-3 rounded-2xl rounded-tl-md font-body-md text-body-md">
        {t('aiSubtitle')}
      </div>
    </div>
  </div>
);

const AiAssistant = () => {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const scrollRef = useRef(null ^ null);

  const onVoiceResult = useCallback((text) => setMessage(text), []);
  const { supported, listening, errorKey, startVoiceSearch, stopVoiceSearch } = useVoiceSearch({
    onResult: onVoiceResult,
  });
  const suggestions = SUGGESTED_QUESTIONS[language] ?? SUGGESTED_QUESTIONS.mr;

  const send = useCallback(
    (raw) => {
      const text = String(raw || message).trim();
      if (!text) return;
      const user = { id: Date.now(), role: 'user', text };
      const answer = resolveAnswer(text, language);
      const bot = { id: Date.now() + 1, role: 'ai', text, ...answer };
      setMessages((prev) => {
        const next = [...prev, user, bot];
        return next.length > 400 ? next.slice(next.length - 400) : next;
      });
      setMessage('');
    },
    [message, language]
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const clear = useCallback(() => setMessages([]), []);

  return (
    <div className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin space-y-space-lg md:space-y-space-xl py-space-md md:py-space-lg">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-tertiary-fixed via-surface-container-low to-secondary-fixed/40 p-space-md md:p-space-xl shadow-sm">
        <div className="absolute -left-8 -bottom-8 w-64 h-64 bg-tertiary-container/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -right-6 -top-6 w-48 h-48 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
          <div className="flex items-start gap-space-sm">
            <div className="w-12 h-12 rounded-2xl bg-tertiary text-on-tertiary flex items-center justify-center shadow-md shrink-0">
              <span className="material-symbols-outlined text-2xl">smart_toy</span>
            </div>
            <div className="space-y-space-xs max-w-3xl">
              <span className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-lowest text-tertiary font-label-md text-label-md shadow-sm">
                <span className="material-symbols-outlined text-lg">verified</span>
                <span>{t('aiBadge')}</span>
              </span>
              <h1 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">
                {t('aiTitle')}
              </h1>
              <p className="font-body-xl text-body-xl text-on-surface-variant">
                {t('aiSubtitle')}
              </p>
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center w-24 h-24 rounded-full bg-tertiary text-on-tertiary shadow-md shrink-0">
            <span className="material-symbols-outlined text-5xl">support_agent</span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        <div className="lg:col-span-8 bg-surface-container-low p-space-md md:p-space-lg rounded-3xl shadow-sm flex flex-col gap-space-md">
          <div className="flex items-center justify-between gap-space-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">smart_toy</span>
              </div>
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">{t('aiHelperTitle')}</h2>
                <span className="font-label-md text-label-md text-on-surface-variant">{t('aiHelperSub')}</span>
              </div>
            </div>
            {messages.length > 0 && (
              <button
                type="button"
                onClick={clear}
                className="inline-flex items-center gap-1.5 px-space-sm py-2 rounded-xl bg-surface-container-lowest text-on-surface-variant font-label-md text-label-md font-bold hover:bg-surface-container-high transition active:translate-y-0.5 shrink-0"
              >
                <span className="material-symbols-outlined text-lg">delete</span>
                <span className="hidden sm:inline">{t('aiClear')}</span>
              </button>
            )}
          </div>

          <div
            ref={scrollRef}
            className="flex flex-col gap-space-sm overflow-y-auto max-h-[28rem] min-h-[22rem] pr-1"
            role="log"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.length === 0 && <Welcome t={t} />}

            {messages.map((m) =>
              m.role === 'user' ? (
                <div key={m.id} className="self-end max-w-[85%] bg-primary-container text-on-primary-container p-3 rounded-2xl rounded-tr-md font-body-md text-body-md">
                  {m.text}
                </div>
              ) : (
                <div key={m.id} className="flex items-start gap-2.5 w-full max-w-[92%]">
                  <div className="w-8 h-8 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-lg">smart_toy</span>
                  </div>
                  <div className="flex flex-col gap-2 min-w-0">
                    <div
                      className={`self-start bg-surface-container-lowest text-on-surface p-3 rounded-2xl rounded-tl-md font-body-md text-body-md ${
                        m.kind === 'emergency' ? '!bg-error-container !text-on-error-container ring-2 ring-error' : ''
                      }`}
                    >
                      <ReadAloud className="flex flex-col gap-space-sm">
                        {m.kind === 'emergency' && (
                          <span className="flex items-center gap-2 font-label-lg text-label-lg font-bold text-error">
                            <span className="material-symbols-outlined">warning</span>
                            <span>{t('emergencyTitle')}</span>
                          </span>
                        )}
                        {m.kind === 'nav' && m.lines && (
                          <span className="flex items-center gap-2 font-label-lg text-label-lg font-bold text-primary">
                            <span className="material-symbols-outlined">open_in_new</span>
                            <span>{m.title}</span>
                          </span>
                        )}
                        {m.kind === 'topic' && m.intro && (
                          <span className="flex items-center gap-2 font-label-lg text-label-lg font-bold text-tertiary">
                            <span className="material-symbols-outlined">menu_book</span>
                            <span>{m.intro[0]}</span>
                          </span>
                        )}
                        {m.lines
                          ? m.lines.map((line, i) => (
                              <p key={i} className={line ? 'font-body-md text-body-md' : 'font-label-md text-label-md text-on-surface-variant'}>
                                {line}
                              </p>
                            ))
                          : m.text && <p className="font-body-md text-body-md">{m.text}</p>}
                      </ReadAloud>
                    </div>

                    {(m.kind === 'nav' || m.kind === 'topic') && (
                      <Link
                        to={m.kind === 'nav' ? m.route : '/health'}
                        className="inline-flex items-center gap-2 self-start px-space-md py-2.5 rounded-xl bg-tertiary text-on-tertiary font-label-lg text-label-lg font-bold shadow-sm hover:bg-tertiary transition-all active:translate-y-0.5"
                      >
                        <span className="material-symbols-outlined text-lg">
                          {m.kind === 'nav' ? 'route' : 'menu_book'}
                        </span>
                        <span>
                          {m.kind === 'nav'
                            ? t(navLabelKeyByRoute[m.route] || 'navHealth')
                            : t('aiComingSoon')}
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              )
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="text-left font-label-md text-label-md text-on-surface-variant bg-surface-container-lowest hover:bg-surface-container-high transition px-2.5 py-1.5 rounded-full shrink-0"
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="flex items-stretch gap-2 p-2 rounded-2xl bg-surface-container-lowest">
              <button
                type="button"
                onClick={listening ? stopVoiceSearch : startVoiceSearch}
                disabled={!supported}
                aria-label={t('voiceSearchLabel')}
                title={supported ? t('voiceSearchLabel') : t('voiceSearchUnsupported')}
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-tertiary text-on-tertiary shadow-sm hover:bg-tertiary transition-all active:translate-y-0.5 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-2xl">{listening ? 'mic' : 'mic_none'}</span>
              </button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') send();
                }}
                placeholder={t('aiPlaceholder')}
                className="w-full bg-transparent font-body-lg text-body-lg text-on-surface focus:outline-none placeholder:text-on-surface-variant/60 px-2"
              />
              <button
                type="button"
                onClick={() => send()}
                aria-label={t('aiSend')}
                className="flex items-center justify-center px-space-md rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-sm hover:bg-primary transition-all active:translate-y-0.5 shrink-0"
              >
                <span className="material-symbols-outlined text-xl">{t('aiSend')}</span>
              </button>
            </div>

            {(errorKey || !supported) && (
              <span className="px-2 font-label-md text-label-md text-error" role="status">
                {errorKey ? t(errorKey) : t('voiceSearchUnsupported')}
              </span>
            )}
          </div>

          <span className="font-label-md text-label-md text-on-surface-variant">{t('hcDisclaimer')}</span>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-space-md">
          <div className="bg-surface-container-lowest p-space-md rounded-3xl shadow-sm">
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold mb-space-sm">{t('aiSuggestTitle')}</h3>
            <div className="flex flex-col gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="text-left font-body-md text-body-md text-on-surface-variant bg-surface-container-low hover:bg-surface-container-high transition p-2.5 rounded-xl"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-tertiary-fixed/60 p-space-md rounded-3xl shadow-sm flex items-start gap-space-sm">
            <span className="material-symbols-outlined text-tertiary text-3xl shrink-0">hearing</span>
            <div>
              <h3 className="font-headline-md text-headline-md text-tertiary font-bold">{t('aiVoiceTitle')}</h3>
              <p className="font-body-md text-body-md text-on-tertiary-fixed mt-1">{t('aiVoiceSub')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AiAssistant;
