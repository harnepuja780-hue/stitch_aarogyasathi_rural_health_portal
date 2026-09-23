import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { useAccessibility } from '../../hooks/useAccessibility';
import { LANGUAGES } from '../../data/translations';

const Navbar = ({ isReadAloud, setIsReadAloud, setIsVoiceModalOpen }) => {
  const { language, setLanguage, t } = useLanguage();
  const { largeText, highContrast, toggleLargeText, toggleHighContrast, resetAccessibility } = useAccessibility();
  const [langOpen, setLangOpen] = useState(false);
  const [a11yOpen, setA11yOpen] = useState(false);
  const current = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  const selectLanguage = (code) => {
    setLanguage(code);
    setLangOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(27,131,84,0.08)]">
      <div className="h-24 max-w-7xl mx-auto px-margin flex items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-md">
          <div className="flex items-center gap-space-sm">
            <Link to="/home" className="p-1 bg-surface-container-lowest rounded-xl shadow-[0_2px_6px_-1px_rgba(30,41,59,0.06)] block hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-primary text-3xl">health_and_safety</span>
            </Link>
            <div>
              <div className="flex items-center gap-space-xs">
                <span className="font-headline-md text-headline-md text-primary font-bold tracking-tight">आरोग्यसाथी</span>
                <span className="hidden lg:inline text-outline-variant">|</span>
                <span className="hidden lg:inline font-headline-md text-headline-md text-secondary font-semibold">AarogyaSathi</span>
              </div>
              <span className="hidden xl:inline-block px-space-xs py-0.5 rounded-full bg-primary-fixed/50 text-on-primary-fixed-variant font-label-md text-label-md font-medium">{t('brandTagline')}</span>
            </div>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1 bg-surface-container-low p-1.5 rounded-2xl">
          <Link to="/home" className="px-space-sm py-2 rounded-xl text-on-surface-variant font-label-lg text-label-lg transition-all hover:bg-surface-container-high hover:text-on-surface">{t('navHome')}</Link>
          <Link to="/health" className="px-space-sm py-2 rounded-xl text-on-surface-variant font-label-lg text-label-lg transition-all hover:bg-surface-container-high hover:text-on-surface">{t('navHealth')}</Link>
          <Link to="/schemes" className="px-space-sm py-2 rounded-xl text-on-surface-variant font-label-lg text-label-lg transition-all hover:bg-surface-container-high hover:text-on-surface">{t('navSchemes')}</Link>
          <Link to="/ai" className="px-space-sm py-2 rounded-xl text-on-surface-variant font-label-lg text-label-lg transition-all hover:bg-surface-container-high hover:text-on-surface">{t('navAi')}</Link>
        </nav>

        <div className="flex items-center gap-space-sm">
          {/* Language Selector */}
          <div className="relative">
            <button
              className="flex items-center gap-1.5 px-space-sm py-2 rounded-full bg-surface-container-low text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-all active:translate-y-0.5"
              type="button"
              onClick={() => setLangOpen(!langOpen)}
              aria-label={t('langLabel')}
            >
              <span className="material-symbols-outlined text-lg text-primary">translate</span>
              <span className="hidden md:inline font-bold">{current.short}</span>
              <span className={`material-symbols-outlined text-base transition-transform ${langOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-surface-container-lowest shadow-lg border border-outline-variant/30 p-1.5 space-y-1 z-50">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => selectLanguage(l.code)}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl font-label-lg text-label-lg transition-all ${
                      l.code === language
                        ? 'bg-primary-container text-on-primary font-bold'
                        : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                    }`}
                  >
                    <span>{l.label}</span>
                    {l.code === language && <span className="material-symbols-outlined text-lg">check</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Accessibility Panel */}
          <div className="relative">
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-all active:translate-y-0.5"
              type="button"
              onClick={() => setA11yOpen(!a11yOpen)}
              aria-label={t('a11yLabel')}
              aria-haspopup="true"
              aria-expanded={a11yOpen}
            >
              <span className="material-symbols-outlined text-lg">accessibility_new</span>
            </button>
            {a11yOpen && (
              <div className="w-64 absolute right-0 top-full mt-2 z-50 bg-surface-container-lowest shadow-lg border border-outline-variant/30 rounded-2xl p-3 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 font-label-lg text-label-lg text-on-surface">
                    <span className="material-symbols-outlined text-lg text-primary">text_increase</span>
                    {t('a11yLargeText')}
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={largeText}
                    aria-label={t('a11yLargeText')}
                    onClick={() => toggleLargeText()}
                    className={`w-11 h-6 rounded-full transition-colors shrink-0 ${largeText ? 'bg-primary' : 'bg-surface-container-highest'}`}
                  >
                    <span className={`block w-5 h-5 rounded-full bg-white shadow transition-transform ${largeText ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 font-label-lg text-label-lg text-on-surface">
                    <span className="material-symbols-outlined text-lg text-primary">contrast</span>
                    {t('a11yHighContrast')}
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={highContrast}
                    aria-label={t('a11yHighContrast')}
                    onClick={() => toggleHighContrast()}
                    className={`w-11 h-6 rounded-full transition-colors shrink-0 ${highContrast ? 'bg-primary' : 'bg-surface-container-highest'}`}
                  >
                    <span className={`block w-5 h-5 rounded-full bg-white shadow transition-transform ${highContrast ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => resetAccessibility()}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-surface-container-low text-on-surface font-label-lg text-label-lg font-bold hover:bg-surface-container-high transition-all active:translate-y-0.5"
                >
                  <span className="material-symbols-outlined text-lg">restore</span>
                  {t('a11yReset')}
                </button>
              </div>
            )}
          </div>
          <button className="hidden sm:flex items-center gap-1.5 px-space-sm py-2 rounded-full bg-surface-container-lowest text-primary font-label-md text-label-md shadow-[0_2px_6px_-1px_rgba(30,41,59,0.06)] hover:bg-surface-container-low transition-all active:translate-y-0.5" type="button" onClick={() => setIsReadAloud && setIsReadAloud(!isReadAloud)}>
            <span className={`material-symbols-outlined text-lg text-primary ${isReadAloud ? 'animate-spin' : ''}`}>{isReadAloud ? 'sync' : 'volume_up'}</span>
            <span>{isReadAloud ? t('reading') : t('readAloud')}</span>
          </button>
          <button className={`flex items-center justify-center w-10 h-10 rounded-full font-label-lg text-label-lg transition-all active:translate-y-0.5 ${largeText ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'}`} type="button" onClick={() => toggleLargeText()} aria-pressed={largeText} aria-label={t('a11yLargeText')}>
            <span className="font-bold">अ / A+</span>
          </button>
          <button className="flex items-center gap-2 px-space-md py-2.5 rounded-full bg-primary-container text-on-primary font-audio-banner text-audio-banner shadow-[0_4px_16px_-2px_rgba(27,131,84,0.3)] hover:bg-primary transition-all active:translate-y-0.5 animate-pulse" type="button" onClick={() => setIsVoiceModalOpen && setIsVoiceModalOpen(true)}>
            <span className="material-symbols-outlined text-2xl">mic</span>
            <span className="hidden md:inline font-bold">{t('micPress')}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;