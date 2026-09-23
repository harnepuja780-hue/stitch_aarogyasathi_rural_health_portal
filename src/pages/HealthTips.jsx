import React, { useState } from 'react';
import ReadAloud from '../components/a11y/ReadAloud';
import { useLanguage } from '../hooks/useLanguage';

const tips = [
  {
    icon: 'water_drop',
    title: 'रोज भरपूर पाणी प्या',
    description: 'दिवसातून किमान ८ ग्लास पाणी प्या. शरीरातील आर्द्रता कायम राहते आणि थकवा कमी होतो.',
  },
  {
    icon: 'restaurant',
    title: 'संतुलित आहार घ्या',
    description: 'जेवणात ज्वारी, बाजरी, डाळी, पालेभाज्या, फळे आणि मका समाविष्ट करा. प्रत्येक जेवणात एक वाटी भाजी नक्की.',
  },
  {
    icon: 'exercise',
    title: 'दिवसातून ३० मिनिटे सक्रिय राहा',
    description: 'चालणे, शेतीचे काम किंवा साधे व्यायाम — दररोज थोडा वेळ शरीर हालवत राहा.',
  },
  {
    icon: 'clean_hands',
    title: 'स्वच्छता ठेवा',
    description: 'जेवणापूर्वी आणि शौचालयानंतर हात साबणाने धुवा. स्वच्छतेमुळे अनेक संसर्गजन्य आजार टळतात.',
  },
  {
    icon: 'bedtime',
    title: 'पुरेशी झोप घ्या',
    description: 'रोज रात्री ७ ते ८ तास झोपण्याचा नियम ठेवा. झोप शरीर आणि मन दोन्ही ताजे ठेवते.',
  },
  {
    icon: 'stethoscope',
    title: 'नियमित आरोग्य तपासणी',
    description: 'रक्तदाब, मधुमेह आणि वजन यांची दर ६ महिन्यांनी ग्राम आरोग्य केंद्रात मोफत तपासणी करून घ्या.',
  },
];

const goldenRules = [
  'लक्षणे दिसताच त्वरित डॉक्टरांना भेट द्या, स्वतःहून गोळ्या घेऊ नका.',
  'लसीकरणाच्या सर्व डोसा वेळेवर घ्या — विशेषतः मुले आणि गरोदर माता.',
  'मच्छरांचा प्रादुर्भाव कमी करण्यासाठी रोज घरातील गुंडाळलेले पाणी तपासा.',
];

const HealthTips = () => {
  const { t } = useLanguage();
  const [thoughtIndex, setThoughtIndex] = useState(0);
  const thought = tips[thoughtIndex % tips.length];
  const nextThought = () => setThoughtIndex((prev) => (prev + 1) % tips.length);
  return (
    <ReadAloud className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin space-y-space-lg md:space-y-space-xl py-space-md md:py-space-lg">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-secondary-fixed via-surface-container-low to-primary-fixed/30 p-space-md md:p-space-xl shadow-sm">
        <div className="absolute -right-8 -top-8 w-64 h-64 bg-tertiary-container/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
          <div className="space-y-space-xs max-w-3xl">
            <div className="inline-flex items-center gap-2 px-space-sm py-1 rounded-full bg-surface-container-lowest text-secondary font-label-md text-label-md shadow-sm">
              <span className="material-symbols-outlined text-lg">lightbulb</span>
              <span>{t('tipsBadge')}</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">
              {t('tipsTitle')}
            </h1>
            <p className="font-body-xl text-body-xl text-on-surface-variant">
              {t('tipsSubtitle')}
            </p>
          </div>
          <div className="hidden lg:flex items-center justify-center w-24 h-24 rounded-3xl bg-surface-container-lowest text-secondary shadow-sm shrink-0">
            <span className="material-symbols-outlined text-5xl">local_pharmacy</span>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-tertiary-fixed/40 to-surface-container-lowest rounded-3xl p-space-md md:p-space-lg shadow-sm border border-outline-variant/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-tertiary text-on-tertiary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-3xl">tips_and_updates</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">{t('thoughtTitle')}</h2>
          </div>
          <button type="button" onClick={nextThought} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface-container-lowest text-secondary font-label-lg text-label-lg shadow-sm hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-xl">autorenew</span>
            <span>{t('thoughtButton')}</span>
          </button>
        </div>
        <div key={thoughtIndex} className="mt-4 flex items-start gap-3 p-4 rounded-2xl bg-surface-container-low transition-all">
          <span className="material-symbols-outlined text-secondary text-3xl shrink-0">{thought.icon}</span>
          <div>
            <p className="font-headline-md text-headline-md text-on-surface font-bold">{thought.title}</p>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mt-1">{thought.description}</p>
          </div>
        </div>
      </section>

      <section className="space-y-space-md">
        <div className="flex flex-col gap-1">
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">{t('tipsMainTitle')}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">{t('tipsMainSub')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
          {tips.map((tip) => (
            <div key={tip.title} className="flex flex-col rounded-3xl bg-surface-container-lowest p-space-md md:p-space-lg shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-3xl">{tip.icon}</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">{tip.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">{tip.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="p-space-md md:p-space-lg rounded-3xl bg-surface-container-lowest shadow-sm">
        <div className="flex items-center gap-space-sm mb-space-sm">
          <span className="material-symbols-outlined text-primary text-3xl">stars</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">{t('tipsGoldTitle')}</h2>
        </div>
        <div className="flex flex-col gap-space-sm">
          {goldenRules.map((rule, index) => (
            <div key={rule} className="flex items-start gap-space-sm p-3 rounded-2xl bg-surface-container-low">
              <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-lg text-label-lg font-bold shrink-0">
                {index + 1}
              </span>
              <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">{rule}</p>
            </div>
          ))}
        </div>
      </section>
    </ReadAloud>
  );
};

export default HealthTips;