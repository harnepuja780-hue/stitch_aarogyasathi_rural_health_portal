import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useLanguage } from '../hooks/useLanguage';
import { LANGUAGES } from '../data/translations';

const TOTAL = 5;

const LETTERS = ['अ', 'ब', 'क', 'ड'];

const QUES = [
  {
    q: 'प्रश्न: ६ महिन्यांपर्यंत बाळाला आईच्या दुधाव्यतिरिक्त वरचे पाणी किंवा मध पाजावे का?',
    options: [
      'होय, बाळाला तहान लागते म्हणून पाणी द्यावे.',
      'नाही, ६ महिने फक्त आईचे दूध द्यावे (पाणीही नको).',
      'फक्त मध आणि पाणी देऊ शकतो.',
      'दिवसातून दोनदा पाणी द्यावे.',
    ],
    correct: 1,
    expl: 'पहिले ६ महिने आईच्या दुधातच बाळासाठी लागणारे सर्व पाणी आणि पोषण असते. वरचे पाणी दिल्यास संसर्ग व जुलाब होण्याचा मोठा धोका असतो.',
    source: 'राष्ट्रीय बाल आरोग्य कार्यक्रम (RBSK)',
  },
  {
    q: 'प्रश्न: जेवणापूर्वी आणि हाताने खाण्यापूर्वी हात धुण्याचा सर्वात चांगला मार्ग कोणता?',
    options: [
      'फक्त पाण्याने धुवावे.',
      'साबणाने किमान २० सेकंद चोळून धुवावे.',
      'कपड्याने पुसून वेळ वाचवावा.',
      'हात पाण्यात भिजवणे पुरेसे आहे.',
    ],
    correct: 1,
    expl: 'साबण आणि पाण्याने किमान २० सेकंद हात चोळल्यास जंतू नष्ट होतात आणि जुलाब व संसर्ग टळतात.',
    source: 'जागतिक आरोग्य संघटना (WHO)',
  },
  {
    q: 'प्रश्न: रक्तवाढ (हिमोग्लोबिन वाढवणे) आणि शक्तीसाठी कोणता घरगुती पदार्थ सर्वात उत्तम आहे?',
    options: [
      'गूळ, शेंगदाणे आणि हिरव्या पालेभाज्या.',
      'फक्त मैद्याची भाकरी.',
      'फक्त चहा.',
      'तांदळाचे पाणी.',
    ],
    correct: 0,
    expl: 'गूळ-शेंगदाणे आणि हिरव्या पालेभाज्यांत लोह भरपूर असते; शरीरात रक्तवाढ आणि शक्तीसाठी ते उत्तम पोषण देतात.',
    source: 'राष्ट्रीय पोषण मिशन',
  },
  {
    q: 'प्रश्न: डेंग्यू आणि मलेरियापासून कुटुंबाचा बचाव करण्यासाठी काय करावे?',
    options: [
      'घरात जास्त पाणी जमा ठेवावे.',
      'आठवड्यातून एकदा पाणी बदलून भांडी झाकून ठेवावी.',
      'कचरा मोकळा सोडावा.',
      'मच्छरांकडे दुर्लक्ष करावे.',
    ],
    correct: 1,
    expl: 'मच्छर उभ्या पाण्यात अंडी घालतात; भांडी झाकणे, पाणी बदलणे आणि साचलेले पाणी काढून टाकणे यामुळे डेंग्यू-मलेरिया टळतो.',
    source: 'राष्ट्रीय रोगवाहकजन्य रोग नियंत्रण कार्यक्रम',
  },
  {
    q: 'प्रश्न: मासिक पाळीत स्वच्छता राखण्यासाठी योग्य पद्धत कोणती?',
    options: [
      'दर ४-६ तासांनी नॅपकिन बदलावा.',
      'दिवसभर एकच नॅपकिन वापरावा.',
      'ओलसर जागेत नॅपकिन ठेवावा.',
      'हात न धुता नॅपकिन बदलावा.',
    ],
    correct: 0,
    expl: 'दर ४-६ तासांनी नॅपकिन बदलल्यास संसर्ग टळतो; सुती कापड वापरत असल्यास ते कडक उन्हात वाळवावे.',
    source: 'राष्ट्रीय किशोर स्वास्थ्य कार्यक्रम',
  },
];

const Quizzes = () => {
  const { t, language, setLanguage } = useLanguage();
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  const currentQ = QUES[qIndex];
  const answeredCount = Object.keys(answers).length;
  const percent = finished ? 100 : Math.round((answeredCount / TOTAL) * 100);
  const isCurrentAnswered = answers[qIndex] !== undefined;
  const isCurrentCorrect = isCurrentAnswered && answers[qIndex] === currentQ.correct;
  const canNext = qIndex < TOTAL - 1 || answeredCount === TOTAL;
  const score = QUES.reduce((sum, q, i) => (answers[i] === q.correct ? sum + 1 : sum), 0);

  const selectOption = (oi) => {
    if (answers[qIndex] !== undefined || finished) return;
    setAnswers((prev) => ({ ...prev, [qIndex]: oi }));
  };

  const goPrev = () => {
    if (qIndex > 0) setQIndex(qIndex - 1);
  };

  const goNext = () => {
    if (qIndex < TOTAL - 1) {
      setQIndex(qIndex + 1);
    } else if (answeredCount === TOTAL) {
      setFinished(true);
    }
  };

  const restartQuiz = () => {
    setAnswers({});
    setQIndex(0);
    setFinished(false);
  };
  return (
    <div className="bg-background min-h-screen text-on-surface flex flex-col">
      <Navbar /><main className="w-full pt-24 bg-background min-h-screen"><div className="flex flex-col w-full">
<div className="max-w-7xl mx-auto w-full px-margin-mobile md:px-margin space-y-space-lg md:space-y-space-xl py-space-md">
{/*  Top Section: Accessibility & Display Controls  */}
<section className="bg-surface-container-lowest rounded-3xl p-space-md md:p-space-lg shadow-[0_4px_20px_-4px_rgba(27,131,84,0.08)]">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm pb-space-sm">
<div className="flex items-center gap-space-sm">
<div className="w-12 h-12 rounded-2xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
<span className="material-symbols-outlined text-3xl">accessibility_new</span>
</div>
<div>
<span className="inline-block px-space-xs py-0.5 rounded-full bg-primary-fixed/50 text-on-primary-fixed-variant font-label-md text-label-md">{t('quBadge')}</span>
<h1 className="font-headline-lg text-headline-lg text-on-surface">{t('quTitle')}</h1>
</div>
</div>
<button className="self-start md:self-auto flex items-center gap-1.5 px-space-sm py-2 rounded-xl text-primary font-label-lg text-label-lg hover:bg-surface-container-low transition-colors" id="reset-settings-btn" type="button">
<span className="material-symbols-outlined text-xl">restart_alt</span>
<span>{t('resetSettings')}</span>
</button>
</div>
{/*  Quick Toggle Matrix  */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md pt-space-xs">
{/*  Text Size Control  */}
<div className="bg-surface-container-low p-space-md rounded-2xl flex flex-col justify-between gap-space-sm">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-2xl">format_size</span>
<span className="font-headline-md text-headline-md text-on-surface">{t('quCardFont')}</span>
</div>
<div className="inline-flex p-1 rounded-xl bg-surface-container-high w-full gap-1">
<button className="font-size-btn flex-1 py-2 rounded-lg font-label-md text-label-md font-semibold bg-surface-container-lowest text-primary shadow-sm text-center" data-font="normal" type="button">{t('fontNormal')}</button>
<button className="font-size-btn flex-1 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface text-center" data-font="large" type="button">{t('fontLarge')}</button>
<button className="font-size-btn flex-1 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface text-center" data-font="xl" type="button">{t('fontXl')}</button>
</div>
</div>
{/*  Color Contrast  */}
<div className="bg-surface-container-low p-space-md rounded-2xl flex flex-col justify-between gap-space-sm">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-2xl">contrast</span>
<span className="font-headline-md text-headline-md text-on-surface">{t('quCardContrast')}</span>
</div>
<div className="inline-flex p-1 rounded-xl bg-surface-container-high w-full gap-1">
<button className="flex-1 py-2 rounded-lg font-label-md text-label-md font-semibold bg-surface-container-lowest text-primary shadow-sm text-center" id="contrast-normal" type="button">{t('fontNormal')}</button>
<button className="flex-1 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface text-center flex items-center justify-center gap-1" id="contrast-high" type="button">
<span className="w-3 h-3 rounded-full bg-amber-400"></span>
<span>{t('contrastLabel')}</span>
</button>
</div>
</div>
{/*  Auto Read Aloud  */}
<div className="bg-surface-container-low p-space-md rounded-2xl flex flex-col justify-between gap-space-sm">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-2xl">volume_up</span>
<span className="font-headline-md text-headline-md text-on-surface">{t('quCardAudio')}</span>
</div>
<div className="inline-flex p-1 rounded-xl bg-surface-container-high w-full gap-1">
<button className="flex-1 py-2 rounded-lg font-label-md text-label-md font-semibold bg-primary-container text-on-primary shadow-sm text-center" id="audio-toggle-on" type="button">{t('quOn')}</button>
<button className="flex-1 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface text-center" id="audio-toggle-off" type="button">{t('quOff')}</button>
</div>
</div>
{/*  Language Selector  */}
<div className="bg-surface-container-low p-space-md rounded-2xl flex flex-col justify-between gap-space-sm">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-2xl">translate</span>
<span className="font-headline-md text-headline-md text-on-surface">{t('quCardLang')}</span>
</div>
<div className="inline-flex p-1 rounded-xl bg-surface-container-high w-full gap-1 flex-wrap">
{LANGUAGES.map((l) => (
<button className={`flex-1 py-2 rounded-lg font-label-md text-label-md font-semibold text-center ${l.code === language ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`} key={l.code} type="button" onClick={() => setLanguage(l.code)}>{l.short}</button>
))}
</div>
</div>
</div>
</section>
{/*  Interactive Gamified Health Quiz Section  */}
<section className="relative bg-surface-container-lowest rounded-3xl p-space-md md:p-space-xl shadow-[0_8px_30px_rgba(27,131,84,0.1)] overflow-hidden">
{/*  Decorative Backdrop Ambience  */}
<div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-primary-fixed/20 blur-3xl pointer-events-none"></div>
<div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-secondary-fixed/30 blur-3xl pointer-events-none"></div>
{/*  Header with Score & Progress  */}
<div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-space-md pb-space-lg">
<div>
<div className="inline-flex items-center gap-2 px-space-sm py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md mb-space-xs">
<span className="material-symbols-outlined text-lg">military_tech</span>
<span>🎉 {t('quizBadge')}</span>
</div>
<h2 className="font-headline-xl text-headline-xl text-primary font-bold">{t('quizTitle')}</h2>
<p className="font-body-xl text-body-xl text-on-surface-variant pt-1">{t('quizSubtitle')}</p>
</div>
{/*  Quiz Progress Card  */}
<div className="flex flex-col sm:flex-row gap-2 items-stretch">
<div className="bg-surface-container-low px-space-md py-space-sm rounded-2xl flex flex-col gap-2 min-w-[240px]">
<div className="flex items-center justify-between font-label-lg text-label-lg">
<span className="text-on-surface font-bold">{t('quizQNum', { cur: finished ? TOTAL : qIndex + 1, total: TOTAL })}</span>
<span className="text-primary font-bold">{t('quizPercent', { n: percent })}</span>
</div>
<div className="w-full h-3 rounded-full bg-surface-container-high overflow-hidden">
<div className="h-full bg-primary-container rounded-full transition-all duration-500" style={{ width: `${percent}%` }}></div>
</div>
{finished && (
<span className="font-label-md text-label-md text-on-surface-variant">{t('quizResultTitle')}</span>
)}
</div>
<button className="bg-surface-container-low px-space-md py-space-sm rounded-2xl flex flex-col items-center justify-center gap-1 text-secondary font-label-md text-label-md hover:bg-surface-container-high transition-colors" type="button" onClick={restartQuiz}>
<span className="material-symbols-outlined text-xl">restart_alt</span>
<span>{t('restartQuiz')}</span>
</button>
</div>
</div>
{/*  Question Box  */}
{finished ? (
<div className="relative z-10 bg-surface-container-low rounded-3xl p-space-md md:p-space-lg space-y-space-md shadow-sm">
<div className="flex flex-col items-center text-center gap-space-sm py-space-md">
<div className="w-16 h-16 rounded-2xl bg-tertiary-fixed text-tertiary flex items-center justify-center">
<span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
</div>
<span className="font-headline-lg text-headline-lg text-on-surface font-bold">{t('quizResultTitle')}</span>
<div className="text-5xl font-bold text-primary">{t('quizScoreLabel', { n: score, total: TOTAL })}</div>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">{t('quGoodKnowledge')}</p>
<button className="mt-2 min-h-[56px] px-space-xl py-3.5 rounded-full bg-primary text-on-primary font-headline-md text-headline-md shadow-[0_4px_16px_rgba(0,104,64,0.35)] hover:bg-primary-container transition-all active:scale-95 flex items-center justify-center gap-2" type="button" onClick={restartQuiz}>
<span className="material-symbols-outlined text-2xl">restart_alt</span>
<span>{t('restartQuiz')}</span>
</button>
</div>
</div>
) : (
<div className="relative z-10 bg-surface-container-low rounded-3xl p-space-md md:p-space-lg space-y-space-md shadow-sm">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
<span className="font-headline-md text-headline-md text-secondary font-bold tracking-wide">{t('quizQNo', { n: qIndex + 1 })}</span>
<button className="inline-flex items-center justify-center gap-2 px-space-md py-2.5 rounded-full bg-primary-container text-on-primary font-audio-banner text-audio-banner shadow-[0_2px_8px_rgba(27,131,84,0.25)] hover:bg-primary transition-transform active:scale-95" id="voice-question-btn" type="button">
<span className="material-symbols-outlined text-2xl">volume_up</span>
<span>{t('listenQuestion')}</span>
</button>
</div>
<p className="font-headline-lg text-headline-lg text-on-surface font-bold leading-snug">
{currentQ.q}
</p>
<div className="space-y-space-sm pt-space-xs" id="quiz-options-container">
{currentQ.options.map((option, oi) => {
const selected = answers[qIndex];
const revealed = selected !== undefined;
const isCorrect = oi === currentQ.correct;
const isSelected = oi === selected;
let classes = 'bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container-high active:translate-y-0.5';
let letterClass = 'bg-surface-container text-on-surface-variant';
let icon = 'radio_button_unchecked';
let iconClass = 'text-outline-variant';
if (revealed) {
if (isCorrect) {
classes = 'bg-primary-container text-on-primary shadow-[0_4px_16px_rgba(27,131,84,0.25)] scale-[1.01]';
letterClass = 'bg-surface-container-lowest text-primary';
icon = 'check_circle';
iconClass = 'text-primary';
} else if (isSelected) {
classes = 'bg-error-container text-on-error-container shadow-[0_4px_16px_rgba(186,26,26,0.18)]';
letterClass = 'bg-surface-container-lowest text-on-error-container';
icon = 'cancel';
iconClass = 'text-on-error-container';
} else {
classes = 'bg-surface-container-lowest text-on-surface opacity-50';
}
}
return (
<button key={oi} type="button" disabled={revealed} onClick={() => selectOption(oi)} className={`quiz-option-btn group w-full min-h-[64px] text-left p-space-md rounded-2xl transition-all flex items-center justify-between gap-space-sm ${classes}`}>
<div className="flex items-center gap-space-md min-w-0">
<span className={`w-10 h-10 rounded-xl flex items-center justify-center font-headline-md text-headline-md font-bold flex-shrink-0 ${letterClass}`}>{LETTERS[oi]}</span>
<span className={`font-body-xl text-body-xl ${revealed && isSelected && isCorrect ? 'font-bold' : ''}`}>{option}</span>
</div>
<span className={`material-symbols-outlined text-2xl flex-shrink-0 ${iconClass}`} style={revealed && isCorrect ? { fontVariationSettings: "'FILL' 1" } : undefined}>{icon}</span>
</button>
);
})}
</div>
{isCurrentAnswered && (
<div className={`mt-space-md rounded-2xl p-space-md flex flex-col sm:flex-row items-start gap-space-md ${isCurrentCorrect ? 'bg-primary-fixed/40' : 'bg-error-container/30'}`}>
<div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${isCurrentCorrect ? 'bg-primary-container text-on-primary' : 'bg-error text-on-error'}`}>
<span className="material-symbols-outlined text-3xl">{isCurrentCorrect ? 'celebration' : 'error'}</span>
</div>
<div className="space-y-1">
<div className="flex items-center gap-2 flex-wrap">
<span className={`font-headline-md text-headline-md font-bold ${isCurrentCorrect ? 'text-on-primary-fixed' : 'text-on-error-container'}`}>{isCurrentCorrect ? t('feedbackCorrect') : t('feedbackWrong')}</span>
{isCurrentCorrect && (
<span className="px-space-xs py-0.5 rounded-md bg-primary-container text-on-primary font-label-md text-label-md">{t('pointsEarned')}</span>
)}
</div>
<p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
{currentQ.expl}
</p>
<div className="pt-2 flex items-center gap-2 text-on-surface-variant font-label-md text-label-md">
<span className="material-symbols-outlined text-primary text-base">verified</span>
<span>मार्गदर्शन: {currentQ.source}</span>
</div>
</div>
</div>
)}
<div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-xs">
<button className={`w-full sm:w-auto px-space-md py-3 rounded-full bg-surface-container-high text-on-surface font-label-lg text-label-lg flex items-center justify-center gap-2 hover:bg-surface-variant transition-colors ${qIndex === 0 ? 'opacity-40 pointer-events-none' : ''}`} type="button" onClick={goPrev}>
<span className="material-symbols-outlined">arrow_back</span>
<span>{t('prevQuestion')}</span>
</button>
<button className={`w-full sm:w-auto min-h-[56px] px-space-xl py-3.5 rounded-full font-headline-md text-headline-md transition-all active:scale-95 flex items-center justify-center gap-2 ${canNext ? 'bg-primary text-on-primary shadow-[0_4px_16px_rgba(0,104,64,0.35)] hover:bg-primary-container' : 'bg-surface-container-high text-on-surface-variant'}`} type="button" onClick={goNext}>
<span>{t('nextQuestion', { cur: qIndex + 1, total: TOTAL })}</span>
<span className="material-symbols-outlined text-2xl">arrow_forward</span>
</button>
</div>
</div>
)}
</section>
{/*  Visual Richness Breakout: Gamification Stats & Visualizer  */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
{/*  User Badge Status  */}
<div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex items-center gap-space-md">
<div className="w-16 h-16 rounded-2xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-4xl" style={{ "fontVariationSettings": "\'FILL\' 1" }}>workspace_premium</span>
</div>
<div>
<span className="font-label-md text-label-md text-on-surface-variant block">{t('quLevelLabel')}</span>
<span className="font-headline-md text-headline-md text-secondary font-bold block">आरोग्य दूत (सिल्व्हर)</span>
<span className="font-body-md text-body-md text-primary font-medium">पुढील स्तरासाठी १ अचूक उत्तर हवे</span>
</div>
</div>
{/*  SVG Progress Donut  */}
<div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex items-center justify-between">
<div>
<span className="font-label-md text-label-md text-on-surface-variant block">{t('quAccuracyLabel')}</span>
<span className="font-headline-xl text-headline-xl text-primary font-bold">८५%</span>
<span className="font-body-md text-body-md text-on-surface-variant block">{t('quGoodKnowledge')}</span>
</div>
<div className="relative w-16 h-16 flex items-center justify-center">
<svg className="w-16 h-16 transform -rotate-90" viewbox="0 0 36 36">
<path className="text-surface-container-high" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"></path>
<path className="text-primary-container" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="85, 100" strokeLinecap="round" strokeWidth="4"></path>
</svg>
<span className="absolute font-label-md text-label-md font-bold text-primary">१७/२०</span>
</div>
</div>
{/*  Instant Certificate Teaser  */}
<div className="bg-gradient-to-br from-surface-container-low to-surface-variant/40 p-space-md rounded-2xl shadow-sm flex items-center gap-space-md">
<div className="w-16 h-16 rounded-2xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-4xl">verified_user</span>
</div>
<div>
<span className="font-label-md text-label-md text-tertiary font-bold block">{t('quCertUnlock')}</span>
<span className="font-body-lg text-body-lg text-on-surface font-semibold block">३ पैकी ३ पूर्ण होताच डाउनलोड करा</span>
<span className="font-label-md text-label-md text-outline">शासकीय डिजिटल बॅज</span>
</div>
</div>
</div>
{/*  Category Selection for More Quizzes  */}
<section className="space-y-space-md">
<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-xs">
<div>
<div className="flex items-center gap-2 text-secondary font-label-lg text-label-lg font-bold">
<span className="material-symbols-outlined text-xl">menu_book</span>
<span>इतर विषयांवर क्विझ खेळा</span>
</div>
<h3 className="font-headline-lg text-headline-lg text-on-surface font-bold">कुटुंबाच्या उत्तम आरोग्यासाठी नवीन विषय निवडा</h3>
</div>
<span className="font-label-md text-label-md text-on-surface-variant">प्रत्येक संचात ५ महत्त्वाची माहितीपूर्ण प्रश्न</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
{/*  Card 1: Vaccination  */}
<div className="group relative bg-surface-container-lowest rounded-3xl p-space-md shadow-sm transition-all hover:shadow-[0_8px_20px_-4px_rgba(0,95,175,0.15)] hover:-translate-y-1 flex flex-col justify-between overflow-hidden">
<div className="h-2 w-full absolute top-0 left-0 bg-secondary"></div>
<div>
<div className="w-full h-36 rounded-2xl overflow-hidden mb-space-sm relative">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="A warm illustration of an Indian rural mother holding her healthy baby at a local village health clinic, assisted by a smiling Anganwadi worker in a saree with a vaccine chart in the background in soft green and earth tones" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBa1ziOZIDwQELwCQTOje_CrqJ4_xE9uFCT5xQSsmMwT63dOtEPNsY5rSJ20YA_ZPfJ6RySfRwRr9j__WwjcL_PnDb-2wB7vcPvXqIcfx_ybU95nr9hRdryw7qUtMsMmMS01PijgQHH9v2XAuqzvyhrqWs7JAREmaFMNErHeFT-LZnxqvpxCghJyADXEytXgRJyls7bYmZm4hEz29mCDYtfyn3mwlydyzdHGigC9-dp0lRxZRj-nj4"/>
<span className="absolute top-2 right-2 px-space-xs py-0.5 rounded-full bg-surface-container-lowest/90 text-secondary font-label-md text-label-md font-bold">५ प्रश्न</span>
</div>
<h4 className="font-headline-md text-headline-md text-on-surface font-bold leading-tight group-hover:text-secondary transition-colors">
              १. नवजात बालकांचे लसीकरण क्विझ
            </h4>
<p className="font-body-md text-body-md text-on-surface-variant pt-1.5">
              बीसीजी, पोलिओ आणि पेंटाव्हॅलेंट लस वेळेवर देण्याचे महत्व जाणून घ्या.
            </p>
</div>
<div className="pt-space-md">
<button className="w-full min-h-[48px] rounded-xl bg-surface-container-low group-hover:bg-secondary group-hover:text-on-secondary text-secondary font-label-lg text-label-lg font-bold flex items-center justify-center gap-1 transition-all" type="button">
<span>खेळायला सुरू करा</span>
<span className="material-symbols-outlined text-lg">play_arrow</span>
</button>
</div>
</div>
{/*  Card 2: Menstrual Hygiene  */}
<div className="group relative bg-surface-container-lowest rounded-3xl p-space-md shadow-sm transition-all hover:shadow-[0_8px_20px_-4px_rgba(181,0,76,0.15)] hover:-translate-y-1 flex flex-col justify-between overflow-hidden">
<div className="h-2 w-full absolute top-0 left-0 bg-tertiary"></div>
<div>
<div className="w-full h-36 rounded-2xl overflow-hidden mb-space-sm relative">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Compassionate illustration of young Indian rural women and an ASHA worker talking together comfortably about hygiene and wellness in a sunny courtyard with potted plants and warm light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHuLGiytjJ2-Li8x18_L6Ak3urfvIRjKyiXidf_D2_V2PEMFdhKxn7SYFuCWFRg79xiHGLx1Ylp1jwMxdpVD4Hg8efYGvLR6wCgMSciwp_efRWRyb8Qmvdl-muhPtTmALxM91rCHAP7FG8pKwzZ_1HXzE5UAYsGwz3yRZy_6llEpvPIHdr8LWmyeCFlC5Z9INXPDbMTX3kEehqoqi-gJYLFCw9Gd-sF9fgV9GJmr4DF_srn-Otq98"/>
<span className="absolute top-2 right-2 px-space-xs py-0.5 rounded-full bg-surface-container-lowest/90 text-tertiary font-label-md text-label-md font-bold">५ प्रश्न</span>
</div>
<h4 className="font-headline-md text-headline-md text-on-surface font-bold leading-tight group-hover:text-tertiary transition-colors">
              २. मासिक पाळी स्वच्छता समज-गैरसमज
            </h4>
<p className="font-body-md text-body-md text-on-surface-variant pt-1.5">
              योग्य काळजी, सॅनिटरी नॅपकिन विल्हेवाट आणि आहार याविषयी शास्त्रीय सत्य.
            </p>
</div>
<div className="pt-space-md">
<button className="w-full min-h-[48px] rounded-xl bg-surface-container-low group-hover:bg-tertiary group-hover:text-on-tertiary text-tertiary font-label-lg text-label-lg font-bold flex items-center justify-center gap-1 transition-all" type="button">
<span>खेळायला सुरू करा</span>
<span className="material-symbols-outlined text-lg">play_arrow</span>
</button>
</div>
</div>
{/*  Card 3: Government Schemes  */}
<div className="group relative bg-surface-container-lowest rounded-3xl p-space-md shadow-sm transition-all hover:shadow-[0_8px_20px_-4px_rgba(27,131,84,0.15)] hover:-translate-y-1 flex flex-col justify-between overflow-hidden">
<div className="h-2 w-full absolute top-0 left-0 bg-primary"></div>
<div>
<div className="w-full h-36 rounded-2xl overflow-hidden mb-space-sm relative">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="An Indian farmer family happily showing their Ayushman Arogya card outside a Primary Health Centre with clean green surroundings and warm community hospital setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSk5iFE6TFVYKSvRCzDPI9qd5c-vKt9ggJoyKlIxFTFAUIVlp7L_f9cc48sbXvOeCOU-wDJQiIxBLXBIYOjWbcqChJd3oppziaVmVbRlL2cIiKpEPwJbCYbI3-Kc_kE-AI1mQo7Z8MpRsoqIorTHkcsJMP-7Awr3TAA9PcuzpZoxpvW3A9dXFq5PQKdTYpeTWJaDKGXuezBpoc-I4c897R2iHV3Zdt-7Dt5Jzcyc5FAcVTwQtGEXA"/>
<span className="absolute top-2 right-2 px-space-xs py-0.5 rounded-full bg-surface-container-lowest/90 text-primary font-label-md text-label-md font-bold">५ प्रश्न</span>
</div>
<h4 className="font-headline-md text-headline-md text-on-surface font-bold leading-tight group-hover:text-primary transition-colors">
              ३. सरकारी योजना ओळख क्विझ
            </h4>
<p className="font-body-md text-body-md text-on-surface-variant pt-1.5">
              महात्मा फुले जन आरोग्य योजना व आयुष्यमान भारत मोफत उपचारांचे निकष.
            </p>
</div>
<div className="pt-space-md">
<button className="w-full min-h-[48px] rounded-xl bg-surface-container-low group-hover:bg-primary group-hover:text-on-primary text-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-1 transition-all" type="button">
<span>खेळायला सुरू करा</span>
<span className="material-symbols-outlined text-lg">play_arrow</span>
</button>
</div>
</div>
{/*  Card 4: Healthy Nutrition  */}
<div className="group relative bg-surface-container-lowest rounded-3xl p-space-md shadow-sm transition-all hover:shadow-[0_8px_20px_-4px_rgba(234,138,0,0.15)] hover:-translate-y-1 flex flex-col justify-between overflow-hidden">
<div className="h-2 w-full absolute top-0 left-0 bg-amber-600"></div>
<div>
<div className="w-full h-36 rounded-2xl overflow-hidden mb-space-sm relative">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Fresh local Indian traditional healthy food arrangement showing jowar roti, green leafy vegetables, sprouts, drumsticks, and jaggery on a clean rustic thali plate" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoofJflOV9V_Kl-6ZObzJA_2TUhvxs_vy9iRx5NnNMmFG93z4C9twQk0uGIlCuIa4JWImrZrSJYkOOnl_k96MkWit5soalKWAGFXTQVM3ojQoF3qMubM9zcxO2RVLRJU4eFHXC5LQ8JqwM0FbJ9bQjKh0txAeFZwzpG_afzXR9w1AZH0taRb-mva4ifoGuLxsH3eyTSfgb30bwDs5Bm5LXDlY_5SRqXOClF9g-Osu2lQHBqqUUQjc"/>
<span className="absolute top-2 right-2 px-space-xs py-0.5 rounded-full bg-surface-container-lowest/90 text-amber-700 font-label-md text-label-md font-bold">५ प्रश्न</span>
</div>
<h4 className="font-headline-md text-headline-md text-on-surface font-bold leading-tight group-hover:text-amber-700 transition-colors">
              ४. निरोगी आहार व पोषण क्विझ
            </h4>
<p className="font-body-md text-body-md text-on-surface-variant pt-1.5">
              रक्तवाढीसाठी घरगुती पौष्टिक पदार्थ, हिरव्या पालेभाज्या आणि गूळ-शेंगदाणे.
            </p>
</div>
<div className="pt-space-md">
<button className="w-full min-h-[48px] rounded-xl bg-surface-container-low group-hover:bg-amber-600 group-hover:text-white text-amber-700 font-label-lg text-label-lg font-bold flex items-center justify-center gap-1 transition-all" type="button">
<span>खेळायला सुरू करा</span>
<span className="material-symbols-outlined text-lg">play_arrow</span>
</button>
</div>
</div>
</div>
</section>
{/*  Support & ASHA Helpline Banner  */}
<section className="bg-surface-container-low rounded-3xl p-space-md md:p-space-lg flex flex-col lg:flex-row items-center justify-between gap-space-md shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
<div className="flex items-center gap-space-md">
<div className="w-16 h-16 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center flex-shrink-0 shadow-sm">
<span className="material-symbols-outlined text-3xl">support_agent</span>
</div>
<div>
<h4 className="font-headline-md text-headline-md text-on-surface font-bold">कोणतीही आरोग्य शंका असल्यास घाबरू नका!</h4>
<p className="font-body-lg text-body-lg text-on-surface-variant">काही शंका असल्यास लगेच १०४ वर मोफत बोला किंवा आशा ताईंशी थेट संपर्क साधा.</p>
</div>
</div>
<div className="flex flex-wrap items-center gap-space-sm w-full lg:w-auto">
<a className="flex-1 sm:flex-none min-h-[56px] px-space-lg py-3 rounded-full bg-primary-container text-on-primary font-headline-md text-headline-md flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(27,131,84,0.3)] hover:bg-primary transition-all active:scale-95" href="tel:104">
<span className="material-symbols-outlined text-2xl">call</span>
<span>१०४ मोफत सल्ला</span>
</a>
<button className="flex-1 sm:flex-none min-h-[56px] px-space-lg py-3 rounded-full bg-surface-container-lowest text-secondary font-headline-md text-headline-md flex items-center justify-center gap-2 shadow-sm hover:bg-surface-container-high transition-all active:scale-95" type="button">
<span className="material-symbols-outlined text-2xl">chat</span>
<span>आशा ताईंशी गप्पा</span>
</button>
</div>
</section>
</div>
</div>
</main><Footer />
    </div>
  );
};

export default Quizzes;
