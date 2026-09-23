import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReadAloud from '../components/a11y/ReadAloud';
import HealthArticle from '../components/health/HealthArticle';
import { HEALTH_TOPICS } from '../data/healthContent';
import { useLanguage } from '../hooks/useLanguage';

const topicCards = [
  {
    to: '/quizzes',
    icon: 'quiz',
    color: 'text-primary',
    titleKey: 'cardQuizTitle',
    subKey: 'cardQuizSub',
  },
  {
    to: '/nutrition',
    icon: 'restaurant',
    color: 'text-secondary',
    titleKey: 'cardNutritionTitle',
    subKey: 'cardNutritionSub',
  },
  {
    to: '/periods',
    icon: 'water_drop',
    color: 'text-tertiary',
    titleKey: 'cardPeriodsTitle',
    subKey: 'cardPeriodsSub',
  },
  {
    to: '/pregnancy',
    icon: 'pregnant_woman',
    color: 'text-primary-container',
    titleKey: 'cardPregnancyTitle',
    subKey: 'cardPregnancySub',
  },
];

const helperCards = [
  {
    to: '/tips',
    icon: 'lightbulb',
    color: 'text-secondary',
    titleKey: 'htHelpTipsTitle',
    subKey: 'htHelpTipsSub',
  },
  {
    to: '/schemes',
    icon: 'account_balance',
    color: 'text-primary',
    titleKey: 'htHelpSchemesTitle',
    subKey: 'htHelpSchemesSub',
  },
  {
    to: '/ai',
    icon: 'smart_toy',
    color: 'text-tertiary',
    titleKey: 'htHelpAiTitle',
    subKey: 'htHelpAiSub',
  },
  {
    to: '/period-tracker',
    icon: 'calendar_month',
    color: 'text-primary-container',
    titleKey: 'htHelpTrackerTitle',
    subKey: 'htHelpTrackerSub',
  },
];

const HealthTopics = () => {
  const { t } = useLanguage();
  const [activeTopicId, setActiveTopicId] = useState(null);
  const activeTopic = HEALTH_TOPICS.find((topic) => topic.id === activeTopicId);
  return (
    <ReadAloud className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin space-y-space-lg md:space-y-space-xl py-space-md md:py-space-lg">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-fixed via-surface-container-low to-secondary-fixed/40 p-space-md md:p-space-xl shadow-sm">
        <div className="absolute -right-8 -top-8 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
          <div className="space-y-space-xs max-w-3xl">
            <div className="inline-flex items-center gap-2 px-space-sm py-1 rounded-full bg-surface-container-lowest text-primary font-label-md text-label-md shadow-sm">
              <span className="material-symbols-outlined text-lg">menu_book</span>
              <span>{t('htBadge')}</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">
              {t('htTitle')}
            </h1>
            <p className="font-body-xl text-body-xl text-on-surface-variant">
              {t('htSubtitle')}
            </p>
          </div>
          <div className="hidden lg:flex items-center justify-center w-24 h-24 rounded-3xl bg-surface-container-lowest text-primary shadow-sm shrink-0">
            <span className="material-symbols-outlined text-5xl">health_and_safety</span>
          </div>
        </div>
      </section>

      <section className="space-y-space-md">
        <div className="flex flex-col gap-1">
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">{t('htMainTitle')}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">{t('htMainSub')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {topicCards.map((card) => (
            <Link key={card.to} to={card.to} className="flex flex-col rounded-2xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-all border border-outline-variant/30">
              <span className={`material-symbols-outlined text-4xl ${card.color} mb-2`}>{card.icon}</span>
              <span className="font-headline-md text-headline-md font-bold text-on-surface">{t(card.titleKey)}</span>
              <span className="font-label-md text-on-surface-variant mt-1">{t(card.subKey)}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-space-md">
        <div className="flex flex-col gap-1">
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">{t('htMoreTitle')}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">{t('htMoreSub')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {helperCards.map((card) => (
            <Link key={card.to} to={card.to} className="flex flex-col rounded-2xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-all border border-outline-variant/30">
              <span className={`material-symbols-outlined text-4xl ${card.color} mb-2`}>{card.icon}</span>
              <span className="font-headline-md text-headline-md font-bold text-on-surface">{t(card.titleKey)}</span>
              <span className="font-label-md text-on-surface-variant mt-1">{t(card.subKey)}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-space-md">
        <div className="flex flex-col gap-1">
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">{t('hcSectionTitle')}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">{t('hcSectionSub')}</p>
        </div>
        {activeTopic ? (
          <div className="space-y-space-md">
            <button
              type="button"
              onClick={() => setActiveTopicId(null)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-low text-on-surface font-label-lg text-label-lg shadow-sm hover:bg-surface-container-high transition-all active:translate-y-0.5"
            >
              <span className="material-symbols-outlined text-xl">arrow_back</span>
              <span>{t('hcBack')}</span>
            </button>
            <HealthArticle topic={activeTopic} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-space-md">
            {HEALTH_TOPICS.map((topic) => (
              <button
                key={topic.id}
                type="button"
                onClick={() => setActiveTopicId(topic.id)}
                className="flex flex-col items-start text-left gap-2 rounded-2xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-md transition-all border border-outline-variant/30"
              >
                <span className={`w-12 h-12 rounded-2xl flex items-center justify-center ${topic.chip} shrink-0`}>
                  <span className="material-symbols-outlined text-3xl">{topic.icon}</span>
                </span>
                <span className="font-headline-md text-headline-md font-bold text-on-surface">{topic.title}</span>
                <span className="font-label-md text-label-md text-on-surface-variant leading-relaxed">{topic.summary}</span>
              </button>
            ))}
          </div>
        )}
      </section>
    </ReadAloud>
  );
};

export default HealthTopics;