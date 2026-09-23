import React, { useEffect, useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';

const STORAGE_KEY = 'aarogya-period';

const dateOptions = [
  { daysAgo: 1, lblKey: 'ptOpt1Lbl', subKey: 'ptOpt1Sub' },
  { daysAgo: 3, lblKey: 'ptOpt3Lbl', subKey: 'ptOpt3Sub' },
  { daysAgo: 7, lblKey: 'ptOpt7Lbl', subKey: 'ptOpt7Sub' },
  { daysAgo: 14, lblKey: 'ptOpt14Lbl', subKey: 'ptOpt14Sub' },
];

const cycleOptions = [21, 24, 26, 28, 30, 32, 35];

const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

const formatDate = (date, locale) =>
  date.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });

const startOfToday = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

const toISO = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const fromISO = (str) => {
  const parts = str.split('-').map(Number);
  return new Date(parts[0], parts[1] - 1, parts[2]);
};

const localeFor = (lang) => {
  if (lang === 'hi') return 'hi-IN';
  if (lang === 'en') return 'en-IN';
  return 'mr-IN';
};

const buildMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstWeekday; i += 1) cells.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(new Date(year, month, d));
  return cells;
};

const isSameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const defaultStartISO = () => toISO(addDays(startOfToday(), -28));

const PeriodTracker = () => {
  const { t, language } = useLanguage();
  const today = startOfToday();

  const [lastStartStr, setLastStartStr] = useState(() => {
    if (typeof window === 'undefined') return defaultStartISO();
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.lastStart) return parsed.lastStart;
      } catch {
        return defaultStartISO();
      }
    }
    return defaultStartISO();
  });

  const [cycleLength, setCycleLength] = useState(() => {
    if (typeof window === 'undefined') return 28;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.cycleLength === 'number') return parsed.cycleLength;
      } catch {
        return 28;
      }
    }
    return 28;
  });

  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ lastStart: lastStartStr, cycleLength }));
  }, [lastStartStr, cycleLength]);

  const lastStartDate = fromISO(lastStartStr);
  const predicted = addDays(lastStartDate, cycleLength);
  const daysLeft = Math.max(0, Math.round((predicted - today) / (1000 * 60 * 60 * 24)));
  const calendarCells = buildMonth(predicted);
  const weekdayHeaders = Array.from({ length: 7 }, (_, i) =>
    new Date(2024, 0, 7 + i).toLocaleDateString(localeFor(language), { weekday: 'short' })
  );

  const handleDateInput = (value) => {
    if (value) {
      setLastStartStr(value);
      flashSaved();
    }
  };

  const handleQuickSelect = (days) => {
    setLastStartStr(toISO(addDays(today, -days)));
    flashSaved();
  };

  const flashSaved = () => {
    setShowSaved(true);
    window.setTimeout(() => setShowSaved(false), 1500);
  };

  const handleDelete = () => {
    localStorage.removeItem(STORAGE_KEY);
    setLastStartStr(defaultStartISO());
    setCycleLength(28);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin space-y-space-lg md:space-y-space-xl py-space-md md:py-space-lg pb-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-tertiary-fixed via-surface-container-low to-tertiary-fixed/30 p-space-md md:p-space-xl shadow-sm">
        <div className="absolute -right-8 -top-8 w-64 h-64 bg-tertiary-container/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
          <div className="space-y-space-xs max-w-3xl">
            <div className="inline-flex items-center gap-2 px-space-sm py-1 rounded-full bg-surface-container-lowest text-tertiary font-label-md text-label-md shadow-sm">
              <span className="material-symbols-outlined text-lg">calendar_month</span>
              <span>{t('ptBadge')}</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">
              {t('ptTitle')}
            </h1>
            <p className="font-body-xl text-body-xl text-on-surface-variant">
              {t('ptSubtitle')}
            </p>
          </div>
          <div className="hidden lg:flex items-center justify-center w-24 h-24 rounded-full bg-tertiary text-on-tertiary shadow-md shrink-0">
            <span className="material-symbols-outlined text-5xl">water_drop</span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        <section className="lg:col-span-7 bg-surface-container-lowest p-space-md md:p-space-lg rounded-3xl shadow-sm space-y-space-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
            </div>
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">{t('ptTrackerTitle')}</h2>
              <span className="font-label-md text-label-md text-on-surface-variant">{t('ptTrackerSub')}</span>
            </div>
          </div>

          <div className="p-space-md rounded-2xl bg-surface-container-low space-y-space-sm">
            <label htmlFor="pt-last-date" className="block font-headline-md text-headline-md text-on-surface">
              {t('ptQuestion')}
            </label>
            <span className="block font-body-md text-body-md text-on-surface-variant">{t('ptHint')}</span>
            <input
              id="pt-last-date"
              type="date"
              value={lastStartStr}
              onChange={(e) => handleDateInput(e.target.value)}
              aria-label={t('ptLastDateLabel')}
              className="w-full sm:w-auto rounded-xl bg-surface-container-lowest text-on-surface px-3 py-2 font-body-lg text-body-lg border border-outline-variant focus:outline-none focus:ring-2 focus:ring-tertiary"
            />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {dateOptions.map((option) => {
                const active = toISO(addDays(today, -option.daysAgo)) === lastStartStr;
                return (
                  <button
                    key={option.daysAgo}
                    type="button"
                    onClick={() => handleQuickSelect(option.daysAgo)}
                    className={`flex flex-col items-center justify-center py-3.5 px-2 rounded-2xl font-label-lg text-label-lg transition shadow-sm ${
                      active
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    <span className={`text-xs ${active ? 'opacity-80' : 'opacity-75'}`}>{t(option.lblKey)}</span>
                    <span className="font-bold">{t(option.subKey)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-space-md rounded-2xl bg-surface-container-low space-y-space-sm">
            <span className="flex items-center gap-2 font-headline-md text-headline-md text-on-surface">
              <span className="material-symbols-outlined text-tertiary text-xl">sync_alt</span>
              {t('ptCycleLabel')}
            </span>
            <span className="block font-body-md text-body-md text-on-surface-variant">{t('ptCycleHint')}</span>
            <div className="flex flex-wrap gap-2 pt-1">
              {cycleOptions.map((cycle) => {
                const active = cycleLength === cycle;
                return (
                  <button
                    key={cycle}
                    type="button"
                    onClick={() => { setCycleLength(cycle); flashSaved(); }}
                    className={`flex items-center gap-1 px-3.5 py-2 rounded-full font-label-lg text-label-lg transition shadow-sm ${
                      active
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    <span className="font-bold">{cycle}</span>
                    <span className={active ? 'opacity-80 text-xs' : 'opacity-70 text-xs'}>दिवस</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-space-md rounded-2xl bg-tertiary-fixed/60 space-y-space-sm transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>event_upcoming</span>
                <span className="font-headline-md text-headline-md text-on-tertiary-fixed font-bold">{t('ptNextLabel')}</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-tertiary text-on-tertiary font-label-md text-label-md font-bold shrink-0 self-start sm:self-auto">
                {daysLeft === 0 ? t('ptToday') : t('ptDaysLeft', { n: daysLeft })}
              </span>
            </div>
            <div className="text-2xl font-bold text-tertiary">
              {formatDate(predicted, localeFor(language))}
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-lowest/80 text-on-surface font-body-md text-body-md">
              <span className="material-symbols-outlined text-tertiary text-xl shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>clean_hands</span>
              <span><strong>{t('ptReady')}</strong> कापड किंवा नॅपकिन स्वच्छ ठेवून प्रवास व कामाचे नियोजन करा.</span>
            </div>
          </div>

          <div className="p-space-md rounded-2xl bg-surface-container-low space-y-space-sm">
            <div className="flex items-center justify-between gap-space-sm">
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">{t('ptCalendarTitle')}</h3>
                <span className="font-label-md text-label-md text-on-surface-variant">{t('ptCalendarSub')}</span>
              </div>
              <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-2xl bg-tertiary-fixed text-tertiary shrink-0">
                <span className="material-symbols-outlined text-3xl">calendar_month</span>
              </div>
            </div>
            <div className="font-headline-md text-headline-md text-on-surface font-bold">
              {predicted.toLocaleDateString(localeFor(language), { month: 'long', year: 'numeric' })}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {weekdayHeaders.map((header, i) => (
                <div key={`h${i}`} className="text-center text-xs font-bold text-tertiary py-1">{header}</div>
              ))}
              {calendarCells.map((cell, i) => {
                if (!cell) return <div key={`e${i}`} className="aspect-square" />;
                const isPredicted = isSameDay(cell, predicted);
                const isToday = isSameDay(cell, today);
                return (
                  <div
                    key={cell.toISOString()}
                    className={`relative aspect-square flex items-center justify-center font-label-md text-label-md transition ${
                      isPredicted
                        ? 'bg-tertiary text-on-tertiary font-bold rounded-full shadow'
                        : isToday
                          ? 'border-2 border-tertiary text-on-surface rounded-full'
                          : 'text-on-surface-variant'
                    }`}
                  >
                    {cell.getDate()}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-space-sm font-label-md text-label-md text-on-surface-variant">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-tertiary inline-block" />
                पुढील पाळी
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full border-2 border-tertiary inline-block" />
                आज
              </span>
            </div>
          </div>

          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            {t('ptDisclaimer')}
          </p>

          <div className="flex items-center justify-between gap-space-sm pt-1">
            {showSaved ? (
              <span className="inline-flex items-center gap-1 font-label-md text-label-md text-tertiary">
                <span className="material-symbols-outlined text-lg">check_circle</span>
                {t('ptSaved')}
              </span>
            ) : (
              <span />
            )}
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-error-container text-on-error-container font-label-md text-label-md font-bold transition hover:opacity-90"
            >
              <span className="material-symbols-outlined text-lg">delete</span>
              {t('ptDeleteLabel')}
            </button>
          </div>
        </section>

        <aside className="lg:col-span-5 flex flex-col gap-space-md">
          <div className="bg-surface-container-lowest p-space-md md:p-space-lg rounded-3xl shadow-sm space-y-space-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary text-3xl shrink-0">spa</span>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">{t('ptCareTitle')}</h3>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              दर ४–६ तासांनी नॅपकिन बदला, सुती कापड वापरत असल्यास कडक उन्हात वाळवा आणि हलका, पौष्टिक आहार घ्या.
            </p>
          </div>
          <div className="bg-surface-container-lowest p-space-md md:p-space-lg rounded-3xl shadow-sm space-y-space-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary text-3xl shrink-0">menu_book</span>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">{t('ptMoreTitle')}</h3>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              पाळीशी संबंधित गैरसमज, स्वच्छता आणि आरोग्याची संपूर्ण माहिती <strong>&quot;मासिक पाळी आरोग्य&quot;</strong> पानावर वाचा.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PeriodTracker;