import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ReadAloud from '../components/a11y/ReadAloud';
import { useLanguage } from '../hooks/useLanguage';

const ROUTINE_HABITS = [
  { icon: 'water_drop', text: 'रोज किमान ८ ग्लास पाणी प्या' },
  { icon: 'eco', text: 'हिरव्या पालेभाज्या आणि डाळींचे जेवण करा' },
  { icon: 'directions_walk', text: '३० मिनिटे चाला किंवा हलका व्यायाम करा' },
  { icon: 'soap', text: 'जेवणापूर्वी साबणाने हात धुवा' },
  { icon: 'bedtime', text: 'रात्री ७-८ तास पुरेशी झोप घ्या' },
];

const routineDateKey = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const Home = () => {
  const { t } = useLanguage();
  const [routineDone, setRoutineDone] = useState(() => {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(`aarogya-routine-${routineDateKey()}`);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(`aarogya-routine-${routineDateKey()}`, JSON.stringify(routineDone));
  }, [routineDone]);

  const toggleRoutine = (idx) => {
    setRoutineDone((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]));
  };

  const resetRoutine = () => setRoutineDone([]);

  return (
    <div className="bg-background font-body-lg text-body-lg text-on-surface antialiased min-h-screen flex flex-col">
      <Navbar />
      
      <main className="w-full pt-24 bg-background flex-grow">
        <ReadAloud className="w-full max-w-6xl mx-auto px-margin py-space-md sm:py-space-lg flex flex-col gap-space-lg">
          <div className="flex flex-col gap-2 mb-4">
            <h1 className="font-headline-xl text-headline-xl text-primary font-bold">{t('homeTitle')}</h1>
            <p className="font-body-xl text-body-xl text-on-surface-variant">{t('homeSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-md">
            <Link to="/quizzes" className="flex flex-col rounded-2xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-all border border-outline-variant/30">
              <span className="material-symbols-outlined text-4xl text-primary mb-2">quiz</span>
              <span className="font-headline-md text-headline-md font-bold text-on-surface">{t('cardQuizTitle')}</span>
              <span className="font-label-md text-on-surface-variant mt-1">{t('cardQuizSub')}</span>
            </Link>
            
            <Link to="/nutrition" className="flex flex-col rounded-2xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-all border border-outline-variant/30">
              <span className="material-symbols-outlined text-4xl text-secondary mb-2">restaurant</span>
              <span className="font-headline-md text-headline-md font-bold text-on-surface">{t('cardNutritionTitle')}</span>
              <span className="font-label-md text-on-surface-variant mt-1">{t('cardNutritionSub')}</span>
            </Link>

            <Link to="/periods" className="flex flex-col rounded-2xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-all border border-outline-variant/30">
              <span className="material-symbols-outlined text-4xl text-tertiary mb-2">water_drop</span>
              <span className="font-headline-md text-headline-md font-bold text-on-surface">{t('cardPeriodsTitle')}</span>
              <span className="font-label-md text-on-surface-variant mt-1">{t('cardPeriodsSub')}</span>
            </Link>

            <Link to="/pregnancy" className="flex flex-col rounded-2xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-all border border-outline-variant/30">
              <span className="material-symbols-outlined text-4xl text-primary-container mb-2">pregnant_woman</span>
              <span className="font-headline-md text-headline-md font-bold text-on-surface">{t('cardPregnancyTitle')}</span>
              <span className="font-label-md text-on-surface-variant mt-1">{t('cardPregnancySub')}</span>
            </Link>
          </div>

          <section className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-outline-variant/30">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed text-tertiary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-3xl">task_alt</span>
                </div>
                <div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">{t('routineTitle')}</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">{t('routineSub')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-tertiary-fixed text-tertiary font-label-md text-label-md font-bold shrink-0">
                  {t('routineCount', { n: routineDone.length, total: ROUTINE_HABITS.length })}
                </span>
                <button type="button" onClick={resetRoutine} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container-low text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors">
                  <span className="material-symbols-outlined text-lg">restart_alt</span>
                  <span>{t('routineReset')}</span>
                </button>
              </div>
            </div>

            <div className="w-full h-3 rounded-full bg-surface-container-high overflow-hidden mt-4">
              <div className="h-full bg-tertiary rounded-full transition-all duration-500" style={{ width: `${Math.round((routineDone.length / ROUTINE_HABITS.length) * 100)}%` }}></div>
            </div>

            {routineDone.length === ROUTINE_HABITS.length && (
              <div className="mt-4 px-4 py-3 rounded-2xl bg-primary-fixed/40 text-on-primary-fixed font-body-lg text-body-lg font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-2xl">check_circle</span>
                <span>{t('routineDone')}</span>
              </div>
            )}

            <ul className="mt-4 space-y-2">
              {ROUTINE_HABITS.map((habit, idx) => {
                const checked = routineDone.includes(idx);
                return (
                  <li key={habit.text}>
                    <button type="button" onClick={() => toggleRoutine(idx)} className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left font-body-lg text-body-lg transition ${checked ? 'bg-tertiary-fixed/60 text-on-tertiary-fixed' : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'}`}>
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${checked ? 'bg-tertiary text-on-tertiary' : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant'}`}>
                        <span className="material-symbols-outlined text-lg" style={checked ? { fontVariationSettings: "'FILL' 1" } : undefined}>{checked ? 'check' : habit.icon}</span>
                      </span>
                      <span className={checked ? 'line-through opacity-80' : ''}>{habit.text}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className="mt-4 font-label-md text-label-md text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-lg">save</span>
              <span>{t('routineSaveHint')}</span>
            </p>
          </section>
        </ReadAloud>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
