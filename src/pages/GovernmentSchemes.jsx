import React, { useState } from 'react';
import ReadAloud from '../components/a11y/ReadAloud';
import { SCHEME_CATEGORIES, SCHEME_FIELDS, SCHEMES } from '../data/schemes';
import { useLanguage } from '../hooks/useLanguage';

const GovernmentSchemes = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? SCHEMES : SCHEMES.filter((scheme) => scheme.categories.includes(filter));
  return (
    <ReadAloud className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin space-y-space-lg md:space-y-space-xl py-space-md md:py-space-lg">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-surface-container-low via-surface-container-lowest to-primary-fixed/30 p-space-md md:p-space-xl shadow-sm">
        <div className="absolute -left-8 -top-8 w-64 h-64 bg-secondary-fixed/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
          <div className="space-y-space-xs max-w-3xl">
            <div className="inline-flex items-center gap-2 px-space-sm py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md shadow-sm">
              <span className="material-symbols-outlined text-lg">account_balance</span>
              <span>{t('gsBadge')}</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">
              {t('gsTitle')}
            </h1>
            <p className="font-body-xl text-body-xl text-on-surface-variant">
              {t('gsSubtitle')}
            </p>
          </div>
          <div className="hidden lg:flex items-center justify-center w-24 h-24 rounded-3xl bg-surface-container-lowest text-primary shadow-sm shrink-0">
            <span className="material-symbols-outlined text-5xl">verified_user</span>
          </div>
        </div>
      </section>

      <section className="space-y-space-md">
        <div className="flex flex-col gap-1">
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">{t('gsMainTitle')}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">{t('gsMainSub')}</p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wide">{t('filterLabel')}</span>
          <div className="flex flex-wrap gap-2">
            {SCHEME_CATEGORIES.map((cat) => {
              const active = filter === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFilter(cat.id)}
                  className={`px-3.5 py-2 rounded-full font-label-lg text-label-lg transition shadow-sm ${
                    active
                      ? 'bg-primary text-on-primary font-bold'
                      : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  {t(cat.lblKey)}
                </button>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
          {filtered.map((scheme) => (
            <div key={scheme.title} className="flex flex-col rounded-3xl bg-surface-container-lowest p-space-md md:p-space-lg shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start justify-between gap-space-sm mb-3">
                <div className={`w-12 h-12 rounded-2xl ${scheme.color} flex items-center justify-center ${scheme.iconColor} shrink-0`}>
                  <span className="material-symbols-outlined text-3xl">{scheme.icon}</span>
                </div>
                <span className={`px-2.5 py-1 rounded-full font-label-md text-label-md ${scheme.tagColor} shrink-0`}>{scheme.tag}</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">{scheme.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">{scheme.description}</p>
              <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-outline-variant/30">
                {SCHEME_FIELDS.map((field) => {
                  const value = scheme.details[field.key];
                  return (
                    <div key={field.key} className="rounded-xl bg-surface-container-low px-3 py-2">
                      <span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-base shrink-0">{field.icon}</span>
                        {t(field.labelKey)}
                      </span>
                      {value ? (
                        typeof value === 'string' ? (
                          <p className="font-body-md text-body-md text-on-surface leading-relaxed">{value}</p>
                        ) : (
                          <ul className="mt-1 list-disc list-inside space-y-0.5 font-body-md text-body-md text-on-surface leading-relaxed">
                            {value.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        )
                      ) : (
                        <p className="font-label-md text-label-md text-on-surface-variant italic flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-base shrink-0">hourglass_empty</span>
                          <span>{t('hcOfficialInfo')}</span>
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-space-sm p-space-md rounded-2xl bg-surface-container-low">
          <span className="material-symbols-outlined text-primary text-2xl shrink-0">emergency</span>
          <p className="font-body-lg text-body-lg text-on-surface">
            <strong>आपत्कालीन स्थितीत:</strong> रुग्णवाहिकेसाठी <strong>१०८</strong> आणि माता–बाल आरोग्यासाठी <strong>१०९८</strong> डायल करा.
          </p>
        </div>
        <p className="flex items-start gap-2 px-4 py-3 rounded-2xl bg-primary-fixed/30 text-on-primary-fixed font-body-md text-body-md leading-relaxed">
          <span className="material-symbols-outlined text-lg shrink-0">info</span>
          <span>{t('hcDisclaimer')}</span>
        </p>
      </section>
    </ReadAloud>
  );
};

export default GovernmentSchemes;