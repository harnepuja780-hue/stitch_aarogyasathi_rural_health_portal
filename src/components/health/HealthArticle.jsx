import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { HEALTH_SECTIONS } from '../../data/healthContent';

const HealthArticle = ({ topic }) => {
  const { t } = useLanguage();
  return (
    <article className="space-y-space-md">
      <div className="flex items-start gap-space-sm rounded-3xl bg-surface-container-lowest p-space-md md:p-space-lg shadow-sm border border-outline-variant/30">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${topic.chip} shrink-0`}>
          <span className="material-symbols-outlined text-3xl">{topic.icon}</span>
        </div>
        <div>
          <h3 className="font-headline-lg text-headline-lg text-on-surface font-bold leading-snug">{topic.title}</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">{topic.summary}</p>
        </div>
      </div>

      {HEALTH_SECTIONS.map((sec) => {
        const body = topic.sections[sec.key];
        if (!body) return null;
        return (
          <div key={sec.key} className="p-space-md md:p-space-lg rounded-3xl bg-surface-container-lowest shadow-sm border border-outline-variant/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-xl text-primary">{sec.icon}</span>
              <h4 className="font-headline-md text-headline-md text-on-surface font-bold">{t(sec.labelKey)}</h4>
            </div>
            <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">{body}</p>
          </div>
        );
      })}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-3 rounded-2xl bg-surface-container-low text-on-surface-variant font-label-md text-label-md">
        <span className="flex items-center gap-2">
          <span className="material-symbols-outlined text-lg shrink-0">verified_user</span>
          <span>
            <strong>{t('hcSource')}:</strong> {topic.source}
          </span>
        </span>
        <span className="flex items-center gap-2">
          <span className="material-symbols-outlined text-lg shrink-0">update</span>
          <span>
            <strong>{t('hcLastUpdated')}:</strong> {topic.lastUpdated}
          </span>
        </span>
      </div>

      <p className="flex items-start gap-2 px-4 py-3 rounded-2xl bg-primary-fixed/30 text-on-primary-fixed font-body-md text-body-md leading-relaxed">
        <span className="material-symbols-outlined text-lg shrink-0">info</span>
        <span>{t('hcDisclaimer')}</span>
      </p>
    </article>
  );
};

export default HealthArticle;