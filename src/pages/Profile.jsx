import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useAuth } from '../hooks/useAuth';
import { LANGUAGES } from '../data/translations';


const Profile = () => {
  const { t, language } = useLanguage();
  const { user, logout } = useAuth();
  const [isReadAloud, setIsReadAloud] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('normal');
  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  const displayName = user?.name?.trim() ? user.name.trim() : 'गेस्ट वापरकर्ता';
  const displayMobile = user?.mobile ? `+91 ${user.mobile}` : '+91 98XXXXXXXX';

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className={`w-full max-w-7xl mx-auto px-margin-mobile md:px-margin space-y-space-lg md:space-y-space-xl py-space-md md:py-space-lg ${isHighContrast ? 'contrast-125 brightness-95' : ''}`} style={{ fontSize: fontSize === 'large' ? '18px' : '16px' }}>
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-surface-container-low via-surface-container-lowest to-primary-fixed/30 p-space-md md:p-space-xl shadow-sm">
        <div className="absolute -right-8 -top-8 w-64 h-64 bg-secondary-fixed/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-space-lg">
          <div className="w-20 h-20 rounded-3xl bg-primary-container text-on-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-5xl">person</span>
          </div>
          <div className="space-y-space-xs flex-1">
            <div className="inline-flex items-center gap-2 px-space-sm py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md shadow-sm">
              <span className="material-symbols-outlined text-lg">verified</span>
              <span>{t('profileBadge')}</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">
              {t('profileTitle')}
            </h1>
            <p className="font-body-xl text-body-xl text-on-surface-variant">
              {t('profileSubtitle')}
            </p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        <section className="lg:col-span-5 bg-surface-container-lowest p-space-md md:p-space-lg rounded-3xl shadow-sm space-y-space-md">
          <div className="flex items-center gap-3 pb-space-xs">
            <div className="w-12 h-12 rounded-2xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">badge</span>
            </div>
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">{t('profileInfoTitle')}</h2>
              <span className="font-label-md text-label-md text-on-surface-variant">{t('profileInfoSub')}</span>
            </div>
          </div>
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-container-low">
              <span className="font-label-md text-label-md text-on-surface-variant">{t('labelName')}</span>
              <span className="font-headline-md text-headline-md text-on-surface font-bold">{displayName}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-container-low">
              <span className="font-label-md text-label-md text-on-surface-variant">{t('labelMobile')}</span>
              <span className="font-headline-md text-headline-md text-on-surface font-bold">{displayMobile}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-container-low">
              <span className="font-label-md text-label-md text-on-surface-variant">{t('labelLanguage')}</span>
              <span className="font-headline-md text-headline-md text-on-surface font-bold">{currentLang.label} ({currentLang.short})</span>
            </div>
          </div>
          {user && (
            <button
              type="button"
              onClick={handleLogout}
              className="w-full py-3 rounded-xl bg-surface-container-high text-on-surface font-label-lg text-label-lg font-bold hover:bg-surface-variant transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-xl">logout</span>
              <span>{t('otpLogout')}</span>
            </button>
          )}
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            {t('profileNote')}
          </p>
        </section>

        <section className="lg:col-span-7 bg-surface-container-lowest p-space-md md:p-space-lg rounded-3xl shadow-sm space-y-space-md">
          <div className="flex items-center gap-3 pb-space-xs">
            <div className="w-12 h-12 rounded-2xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">accessibility_new</span>
            </div>
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">{t('profileAccessTitle')}</h2>
              <span className="font-label-md text-label-md text-on-surface-variant">{t('profileAccessSub')}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div className="bg-surface-container-low p-space-md rounded-2xl flex flex-col justify-between gap-space-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-2xl">volume_up</span>
                <span className="font-headline-md text-headline-md text-on-surface">{t('readAloudTitle')}</span>
              </div>
              <button type="button" onClick={() => setIsReadAloud(!isReadAloud)} className={`w-full py-2 rounded-xl font-label-md text-label-md font-bold transition ${isReadAloud ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container-high text-on-surface-variant'}`}>
                {isReadAloud ? t('readAloudOn') : t('readAloudOff')}
              </button>
            </div>
            <div className="bg-surface-container-low p-space-md rounded-2xl flex flex-col justify-between gap-space-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-2xl">format_size</span>
                <span className="font-headline-md text-headline-md text-on-surface">{t('fontSizeLabel')}</span>
              </div>
              <div className="inline-flex p-1 rounded-xl bg-surface-container-high w-full gap-1">
                <button type="button" onClick={() => setFontSize('normal')} className={`flex-1 py-2 rounded-lg font-label-md text-label-md font-semibold text-center ${fontSize === 'normal' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant'}`}>{t('fontNormal')}</button>
                <button type="button" onClick={() => setFontSize('large')} className={`flex-1 py-2 rounded-lg font-label-md text-label-md font-semibold text-center ${fontSize === 'large' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant'}`}>{t('fontLarge')}</button>
              </div>
            </div>
            <div className="bg-surface-container-low p-space-md rounded-2xl flex flex-col justify-between gap-space-sm md:col-span-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-2xl">contrast</span>
                <span className="font-headline-md text-headline-md text-on-surface">{t('contrastLabel')}</span>
              </div>
              <button type="button" onClick={() => setIsHighContrast(!isHighContrast)} className={`w-full py-2 rounded-xl font-label-md text-label-md font-bold transition ${isHighContrast ? 'bg-on-surface text-surface shadow-sm' : 'bg-surface-container-high text-on-surface-variant'}`}>
                {isHighContrast ? t('contrastOn') : t('contrastOff')}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;