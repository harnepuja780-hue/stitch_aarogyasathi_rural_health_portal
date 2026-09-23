import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ReadAloud from '../components/a11y/ReadAloud';
import { useLanguage } from '../hooks/useLanguage';

const PeriodHealth = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-background min-h-screen text-on-surface flex flex-col">
      <Navbar /><main className="w-full pt-24 bg-background min-h-screen"><div className="flex flex-col w-full">
<ReadAloud className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin space-y-space-lg md:space-y-space-xl pb-16">
{/*  Top Banner: Warm, Respectful & Audio Guided  */}
<div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-tertiary-fixed via-surface-container-low to-tertiary-fixed/30 p-space-md md:p-space-xl shadow-sm">
<div className="absolute -right-8 -top-8 w-64 h-64 bg-tertiary-container/10 rounded-full blur-3xl pointer-events-none"></div>
<div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
<div className="space-y-space-xs max-w-3xl">
<div className="inline-flex items-center gap-2 px-space-sm py-1 rounded-full bg-surface-container-lowest text-tertiary font-label-md text-label-md shadow-sm">
<span className="material-symbols-outlined text-lg" style={{ "fontVariationSettings": "\'FILL\' 1" }}>spa</span>
<span>{t('phBadge')}</span>
</div>
<h1 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">
            {t('phTitle')}
          </h1>
<p className="font-body-xl text-body-xl text-on-surface-variant">
            {t('phSubtitle')}
          </p>
</div>
<div className="flex flex-col sm:flex-row lg:flex-col gap-space-xs shrink-0">
<button className="flex items-center justify-center gap-3 px-space-lg py-4 rounded-2xl bg-tertiary text-on-tertiary font-audio-banner text-audio-banner shadow-md hover:bg-tertiary-container transition-all active:translate-y-0.5" id="masterAudioBtn" onclick="toggleAudio('संपूर्ण पाळी आरोग्य माहिती वाचून दाखवली जात आहे')">
<span className="material-symbols-outlined text-2xl">volume_up</span>
<span>{t('phListenAll')}</span>
</button>
<span className="text-center font-label-md text-label-md text-on-surface-variant flex items-center justify-center gap-1">
<span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
            {t('phAudioOn')}
          </span>
</div>
</div>
</div>
{/*  Cycle Tracker & Audio Assistant Grid  */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
{/*  Interactive Easy Cycle Tracker (Left 7 Cols)  */}
<div className="lg:col-span-7 bg-surface-container-lowest p-space-md md:p-space-lg rounded-3xl shadow-sm space-y-space-md">
<div className="flex items-center justify-between pb-space-xs">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-2xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined text-2xl" style={{ "fontVariationSettings": "\'FILL\' 1" }}>calendar_month</span>
</div>
<div>
<h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">{t('ptTrackerTitle')}</h2>
<span className="font-label-md text-label-md text-on-surface-variant">{t('ptTrackerSub')}</span>
</div>
</div>
<button className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-surface-container-low text-tertiary font-label-md text-label-md hover:bg-tertiary-fixed transition" onclick="toggleAudio('ट्रॅकर वापरण्यासाठी शेवटच्या पाळीची तारीख निवडा')">
<span className="material-symbols-outlined text-base">volume_up</span>
<span>{t('phListen')}</span>
</button>
</div>
<div className="p-space-md rounded-2xl bg-surface-container-low space-y-space-sm">
<label className="block font-headline-md text-headline-md text-on-surface">
            {t('ptQuestion')}
          </label>
<span className="block font-body-md text-body-md text-on-surface-variant">{t('ptHint')}</span>
{/*  Big Touch Date Options  */}
<div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1" id="datePickerOptions">
<button className="cycle-pill active flex flex-col items-center justify-center py-3.5 px-2 rounded-2xl bg-primary text-on-primary font-label-lg text-label-lg transition shadow-sm" onclick="selectDateOption(this, 1)" type="button">
<span className="text-xs opacity-80">{t('ptOpt1Lbl')}</span>
<span className="font-bold">{t('ptOpt1Sub')}</span>
</button>
<button className="cycle-pill flex flex-col items-center justify-center py-3.5 px-2 rounded-2xl bg-surface-container-lowest text-on-surface font-label-lg text-label-lg hover:bg-surface-container-high transition shadow-sm" onclick="selectDateOption(this, 3)" type="button">
<span className="text-xs opacity-75">{t('ptOpt3Lbl')}</span>
<span className="font-bold">{t('ptOpt3Sub')}</span>
</button>
<button className="cycle-pill flex flex-col items-center justify-center py-3.5 px-2 rounded-2xl bg-surface-container-lowest text-on-surface font-label-lg text-label-lg hover:bg-surface-container-high transition shadow-sm" onclick="selectDateOption(this, 7)" type="button">
<span className="text-xs opacity-75">{t('ptOpt7Lbl')}</span>
<span className="font-bold">{t('ptOpt7Sub')}</span>
</button>
<button className="cycle-pill flex flex-col items-center justify-center py-3.5 px-2 rounded-2xl bg-surface-container-lowest text-on-surface font-label-lg text-label-lg hover:bg-surface-container-high transition shadow-sm" onclick="selectDateOption(this, 14)" type="button">
<span className="text-xs opacity-75">{t('ptOpt14Lbl')}</span>
<span className="font-bold">{t('ptOpt14Sub')}</span>
</button>
</div>
</div>
{/*  Result Card / Prediction Badge  */}
<div className="p-space-md rounded-2xl bg-tertiary-fixed/60 space-y-space-sm transition-all duration-300">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary text-2xl" style={{ "fontVariationSettings": "\'FILL\' 1" }}>event_upcoming</span>
<span className="font-headline-md text-headline-md text-on-tertiary-fixed font-bold">{t('ptNextLabel')}</span>
</div>
<span className="px-3 py-1 rounded-full bg-tertiary text-on-tertiary font-label-md text-label-md font-bold shrink-0 self-start sm:self-auto" id="daysLeftBadge">
               {t('ptDaysLeft', { n: 7 })}
            </span>
</div>
<div className="text-2xl font-bold text-tertiary" id="predictedDateText">
            २२ नोव्हेंबर २०२४
          </div>
<div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-lowest/80 text-on-surface font-body-md text-body-md">
<span className="material-symbols-outlined text-tertiary text-xl shrink-0" style={{ "fontVariationSettings": "\'FILL\' 1" }}>clean_hands</span>
<span><strong>{t('ptReady')}</strong> कापड किंवा नॅपकिन स्वच्छ ठेवून प्रवास व कामाचे नियोजन करा.</span>
</div>
</div>
{/*  Direct Asha Notification Action  */}
<div className="flex flex-col sm:flex-row gap-space-xs pt-1">
<button className="flex-1 min-h-[56px] px-space-md py-3 rounded-2xl bg-primary-container text-on-primary font-headline-md text-headline-md flex items-center justify-center gap-2 shadow-sm hover:bg-primary transition active:translate-y-0.5" onclick="sendSmsAlert()">
<span className="material-symbols-outlined text-2xl">sms</span>
<span>{t('phSms')}</span>
</button>
<button className="min-h-[56px] px-space-md py-3 rounded-2xl bg-surface-container-low text-on-surface font-label-lg text-label-lg flex items-center justify-center gap-1.5 hover:bg-surface-container-high transition" onclick="toggleAudio('तुमची नोंद सुरक्षित ठेवली गेली आहे. दरमहा SMS द्वारे आठवण येईल.')">
<span className="material-symbols-outlined text-xl text-primary">hearing</span>
<span>{t('phListenInfo')}</span>
</button>
</div>
</div>
{/*  Quick Illustrated Visualizer (Right 5 Cols)  */}
<div className="lg:col-span-5 bg-surface-container-lowest p-space-md md:p-space-lg rounded-3xl shadow-sm flex flex-col justify-between h-full space-y-space-md">
<div className="space-y-space-xs">
<div className="flex items-center justify-between">
<span className="px-space-xs py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md font-semibold">
              {t('phBodyCare')}
            </span>
<span className="text-xs text-on-surface-variant font-label-md">{t('phCycleDays')}</span>
</div>
<h3 className="font-headline-lg text-headline-lg text-on-surface font-bold">{t('phCycleTitle')}</h3>
<p className="font-body-md text-body-md text-on-surface-variant">
            {t('phCycleSub')}
          </p>
</div>
{/*  Custom SVG Cycle Wheel Diagram  */}
<div className="relative w-full aspect-square max-w-[280px] mx-auto my-2 flex items-center justify-center">
<svg className="w-full h-full transform -rotate-90" viewbox="0 0 200 200">
{/*  Background Ring  */}
<circle className="text-surface-container-high" cx="100" cy="100" fill="none" r="76" stroke="currentColor" strokeWidth="18"></circle>
{/*  Period Phase (Days 1-5)  */}
<circle className="text-tertiary" cx="100" cy="100" fill="none" r="76" stroke="currentColor" stroke-dasharray="80 400" stroke-dashoffset="0" strokeWidth="18"></circle>
{/*  Safe/Folate Phase  */}
<circle className="text-secondary" cx="100" cy="100" fill="none" r="76" stroke="currentColor" stroke-dasharray="140 400" stroke-dashoffset="-85" strokeWidth="18"></circle>
{/*  Preparation Phase  */}
<circle className="text-primary-container" cx="100" cy="100" fill="none" r="76" stroke="currentColor" stroke-dasharray="140 400" stroke-dashoffset="-230" strokeWidth="18"></circle>
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
<span className="material-symbols-outlined text-3xl text-tertiary" style={{ "fontVariationSettings": "\'FILL\' 1" }}>favorite</span>
<span className="font-headline-md text-headline-md font-bold text-on-surface mt-1">निरोगी चक्र</span>
<span className="font-label-md text-label-md text-on-surface-variant">२१ ते ३५ दिवस</span>
</div>
</div>
<div className="grid grid-cols-3 gap-2 text-center pt-2">
<div className="p-2 rounded-xl bg-tertiary-fixed/40">
<span className="block w-2.5 h-2.5 mx-auto rounded-full bg-tertiary mb-1"></span>
<span className="block font-label-md text-label-md font-bold text-tertiary">पाळीचे दिवस</span>
<span className="text-xs text-on-surface-variant">१ ते ५ दिवस</span>
</div>
<div className="p-2 rounded-xl bg-secondary-fixed/50">
<span className="block w-2.5 h-2.5 mx-auto rounded-full bg-secondary mb-1"></span>
<span className="block font-label-md text-label-md font-bold text-secondary">ऊर्जा दिवस</span>
<span className="text-xs text-on-surface-variant">६ ते १४ दिवस</span>
</div>
<div className="p-2 rounded-xl bg-primary-fixed/50">
<span className="block w-2.5 h-2.5 mx-auto rounded-full bg-primary mb-1"></span>
<span className="block font-label-md text-label-md font-bold text-primary">विश्रांती वेळ</span>
<span className="text-xs text-on-surface-variant">१५ ते २८ दिवस</span>
</div>
</div>
</div>
</div>
{/*  Hygiene Steps: 4 Golden Rules (४ सुवर्ण नियम)  */}
<div className="space-y-space-md">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
<div>
<div className="flex items-center gap-2">
<span className="px-space-xs py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md font-bold">
              आरोग्य रक्षण
            </span>
<h2 className="font-headline-xl text-headline-xl text-on-surface font-bold">मासिक पाळीतील स्वच्छता — ४ सुवर्ण नियम</h2>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">
            संसर्ग टाळण्यासाठी आणि ताजेतवाने राहण्यासाठी या ४ गोष्टी न चुकता करा:
          </p>
</div>
<button className="self-start sm:self-auto flex items-center gap-2 px-space-md py-2 rounded-full bg-surface-container-lowest text-primary font-label-lg text-label-lg shadow-sm hover:bg-surface-container-low transition" onclick="toggleAudio('पाळीच्या स्वच्छतेचे चार महत्त्वाचे नियम एकामागून एक ऐका')">
<span className="material-symbols-outlined text-xl">volume_up</span>
<span>सर्व नियम ऐका</span>
</button>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
{/*  Card 1  */}
<div className="relative bg-surface-container-lowest p-space-md rounded-3xl shadow-sm flex flex-col justify-between space-y-space-md">
<div className="space-y-space-sm">
<div className="flex items-center justify-between">
<span className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md font-bold">
                महत्त्वाचे
              </span>
<button className="w-10 h-10 rounded-full bg-surface-container-low text-primary flex items-center justify-center hover:bg-surface-container-high transition" onclick="toggleAudio('नियम पहिला: दर चार ते सहा तासांनी पॅड बदला, यामुळे जंतुसंसर्ग होत नाही.')">
<span className="material-symbols-outlined text-xl">volume_up</span>
</button>
</div>
<div className="w-14 h-14 rounded-2xl bg-secondary-fixed text-secondary flex items-center justify-center">
<span className="material-symbols-outlined text-3xl">schedule</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface font-bold">
              १. दर ४ ते ६ तासांनी पॅड बदला
            </h3>
<p className="font-body-md text-body-md text-on-surface-variant">
              रक्तस्त्राव कमी असला तरीही संसर्ग आणि दुर्गंधी टाळण्यासाठी वेळेत पॅड बदलणे अत्यंत आवश्यक आहे.
            </p>
</div>
<div className="p-2.5 rounded-xl bg-surface-container-low text-xs text-on-surface-variant flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-base">verified</span>
<span>जंतू संसर्गापासून रक्षण</span>
</div>
</div>
{/*  Card 2  */}
<div className="relative bg-surface-container-lowest p-space-md rounded-3xl shadow-sm flex flex-col justify-between space-y-space-md">
<div className="space-y-space-sm">
<div className="flex items-center justify-between">
<span className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md font-bold">
                महत्त्वाचे
              </span>
<button className="w-10 h-10 rounded-full bg-surface-container-low text-primary flex items-center justify-center hover:bg-surface-container-high transition" onclick="toggleAudio('नियम दुसरा: सुती कापड वापरत असल्यास साबणाने धुवून कडक उन्हात वाळवा. सावलीत वाळवू नका.')">
<span className="material-symbols-outlined text-xl">volume_up</span>
</button>
</div>
<div className="w-14 h-14 rounded-2xl bg-tertiary-fixed text-tertiary flex items-center justify-center">
<span className="material-symbols-outlined text-3xl">wb_sunny</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface font-bold">
              २. सुती कापड उन्हात कडक वाळवा
            </h3>
<p className="font-body-md text-body-md text-on-surface-variant">
              घरातील कापड वापरत असल्यास ते स्वच्छ धुवून लपवून न ठेवता थेट सूर्यप्रकाशात वाळवा, जेणेकरून सूक्ष्मजंतू मरतील.
            </p>
</div>
<div className="p-2.5 rounded-xl bg-surface-container-low text-xs text-on-surface-variant flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary text-base">sunny</span>
<span>उन्हामुळे निर्जंतुकीकरण</span>
</div>
</div>
{/*  Card 3  */}
<div className="relative bg-surface-container-lowest p-space-md rounded-3xl shadow-sm flex flex-col justify-between space-y-space-md">
<div className="space-y-space-sm">
<div className="flex items-center justify-between">
<span className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md font-bold">
                महत्त्वाचे
              </span>
<button className="w-10 h-10 rounded-full bg-surface-container-low text-primary flex items-center justify-center hover:bg-surface-container-high transition" onclick="toggleAudio('नियम तिसरा: स्वच्छता करताना साधे पाणी वापरा. तीव्र सुगंधित रसायने वापरू नका.')">
<span className="material-symbols-outlined text-xl">volume_up</span>
</button>
</div>
<div className="w-14 h-14 rounded-2xl bg-surface-container-high text-primary flex items-center justify-center">
<span className="material-symbols-outlined text-3xl">water_drop</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface font-bold">
              ३. कोमट पाण्याने शरीराची स्वच्छता
            </h3>
<p className="font-body-md text-body-md text-on-surface-variant">
              शौचास किंवा लघवीला जाऊन आल्यानंतर स्वच्छ पाण्याने धुवा. सुवासिक पावडर किंवा कडक साबणाचा अतिवापर टाळा.
            </p>
</div>
<div className="p-2.5 rounded-xl bg-surface-container-low text-xs text-on-surface-variant flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-base">check</span>
<span>नैसर्गिक पीएच संतुलन</span>
</div>
</div>
{/*  Card 4  */}
<div className="relative bg-surface-container-lowest p-space-md rounded-3xl shadow-sm flex flex-col justify-between space-y-space-md">
<div className="space-y-space-sm">
<div className="flex items-center justify-between">
<span className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md font-bold">
                महत्त्वाचे
              </span>
<button className="w-10 h-10 rounded-full bg-surface-container-low text-primary flex items-center justify-center hover:bg-surface-container-high transition" onclick="toggleAudio('नियम चौथा: वापरलेले नॅपकिन कागदात नीट गुंडाळून कचरापेटीत टाका. उघड्यावर फेकू नका.')">
<span className="material-symbols-outlined text-xl">volume_up</span>
</button>
</div>
<div className="w-14 h-14 rounded-2xl bg-secondary-fixed-dim text-on-secondary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-3xl">delete_outline</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface font-bold">
              ४. पॅड कागदात गुंडाळून कचऱ्यात टाका
            </h3>
<p className="font-body-md text-body-md text-on-surface-variant">
              वापरलेले नॅपकिन कधीही उघड्यावर फेकू नका किंवा शौचालयात फ्लश करू नका. जुन्या वर्तमानपत्रात गुंडाळून डस्टबिनमध्ये टाका.
            </p>
</div>
<div className="p-2.5 rounded-xl bg-surface-container-low text-xs text-on-surface-variant flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-base">eco</span>
<span>परिसर व गटार स्वच्छता</span>
</div>
</div>
</div>
</div>
{/*  Myths vs Facts (अंधश्रद्धा निवारण)  */}
<div className="bg-surface-container-lowest p-space-md md:p-space-xl rounded-3xl shadow-sm space-y-space-lg">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
<div>
<span className="px-3 py-1 rounded-full bg-tertiary-fixed text-tertiary font-label-md text-label-md font-bold inline-block">
            वैज्ञानिक दृष्टिकोन
          </span>
<h2 className="font-headline-xl text-headline-xl text-on-surface font-bold mt-1">
            गैरसमज आणि खरे सत्य — अंधश्रद्धा निवारण
          </h2>
<p className="font-body-md text-body-md text-on-surface-variant">
            पूर्वजांच्या काळातील जुन्या समजुती सोडून विज्ञानाची खरी माहिती जाणून घ्या:
          </p>
</div>
<button className="flex items-center gap-2 px-space-md py-2.5 rounded-2xl bg-surface-container-low text-on-surface font-label-lg text-label-lg hover:bg-surface-container-high transition self-start md:self-auto" onclick="toggleAudio('चला मासिक पाळीबद्दलचे गैरसमज आणि त्यामागचे खरे सत्य समजून घेऊया.')">
<span className="material-symbols-outlined text-primary text-xl">record_voice_over</span>
<span>सत्य ऐका</span>
</button>
</div>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md">
{/*  Myth Pair 1  */}
<div className="flex flex-col rounded-2xl overflow-hidden bg-surface-container-low">
<div className="p-space-md bg-error-container/60 space-y-space-xs">
<div className="flex items-center gap-2 text-error font-label-lg text-label-lg font-bold">
<span className="material-symbols-outlined text-xl">cancel</span>
<span>गैरसमज (खोटे)</span>
</div>
<p className="font-body-lg text-body-lg text-on-surface font-medium">
              "पाळीच्या वेळी लोणच्याला किंवा झाडाला हात लावल्यास ते खराब किंवा सुकते."
            </p>
</div>
<div className="p-space-md bg-primary-fixed/40 space-y-space-xs flex-1 flex flex-col justify-between">
<div>
<div className="flex items-center gap-2 text-primary font-label-lg text-label-lg font-bold">
<span className="material-symbols-outlined text-xl">check_circle</span>
<span>वैज्ञानिक सत्य (खरे)</span>
</div>
<p className="font-body-md text-body-md text-on-surface mt-1">
<strong>नाही!</strong> लोणचे बुरशीमुळे खराब होते, पाळीमुळे नाही. पाळी ही एक नैसर्गिक शारीरिक प्रक्रिया आहे, कोणताही विटाळ किंवा अशुद्धता नाही.
              </p>
</div>
<button className="mt-3 text-left font-label-md text-label-md text-primary font-bold flex items-center gap-1 hover:underline" onclick="toggleAudio('खोटे! पाळी ही केवळ शारीरिक प्रक्रिया आहे. लोणचे खराब होत नाही.')">
<span className="material-symbols-outlined text-base">volume_up</span> ऐका
            </button>
</div>
</div>
{/*  Myth Pair 2  */}
<div className="flex flex-col rounded-2xl overflow-hidden bg-surface-container-low">
<div className="p-space-md bg-error-container/60 space-y-space-xs">
<div className="flex items-center gap-2 text-error font-label-lg text-label-lg font-bold">
<span className="material-symbols-outlined text-xl">cancel</span>
<span>गैरसमज (खोटे)</span>
</div>
<p className="font-body-lg text-body-lg text-on-surface font-medium">
              "पाळीत आंघोळ करू नये किंवा कोपऱ्यात एका जागी बसून विश्रांतीच घेतली पाहिजे."
            </p>
</div>
<div className="p-space-md bg-primary-fixed/40 space-y-space-xs flex-1 flex flex-col justify-between">
<div>
<div className="flex items-center gap-2 text-primary font-label-lg text-label-lg font-bold">
<span className="material-symbols-outlined text-xl">check_circle</span>
<span>वैज्ञानिक सत्य (खरे)</span>
</div>
<p className="font-body-md text-body-md text-on-surface mt-1">
<strong>उलट आंघोळ करावी!</strong> कोमट पाण्याने स्वच्छ आंघोळ केल्याने शरीराचे स्नायू शिथिल होतात, कंबरदुखी कमी होते आणि ताजेतवाने वाटते.
              </p>
</div>
<button className="mt-3 text-left font-label-md text-label-md text-primary font-bold flex items-center gap-1 hover:underline" onclick="toggleAudio('स्वच्छ आंघोळ केल्याने अंग ताजेतवाने राहते आणि स्नायूंचा ताण कमी होतो.')">
<span className="material-symbols-outlined text-base">volume_up</span> ऐका
            </button>
</div>
</div>
{/*  Myth Pair 3  */}
<div className="flex flex-col rounded-2xl overflow-hidden bg-surface-container-low">
<div className="p-space-md bg-error-container/60 space-y-space-xs">
<div className="flex items-center gap-2 text-error font-label-lg text-label-lg font-bold">
<span className="material-symbols-outlined text-xl">cancel</span>
<span>गैरसमज (खोटे)</span>
</div>
<p className="font-body-lg text-body-lg text-on-surface font-medium">
              "पाळीचे रक्त अशुद्ध, घाणेरडे किंवा शरीरातील विषारी घटक असते."
            </p>
</div>
<div className="p-space-md bg-primary-fixed/40 space-y-space-xs flex-1 flex flex-col justify-between">
<div>
<div className="flex items-center gap-2 text-primary font-label-lg text-label-lg font-bold">
<span className="material-symbols-outlined text-xl">check_circle</span>
<span>वैज्ञानिक सत्य (खरे)</span>
</div>
<p className="font-body-md text-body-md text-on-surface mt-1">
<strong>अजिबात नाही!</strong> हे रक्त शरीराच्या इतर रक्तासारखेच शुद्ध असते. बाळाच्या वाढीसाठी गर्भाशयात तयार झालेला थर गर्भधारणा न झाल्याने बाहेर पडतो.
              </p>
</div>
<button className="mt-3 text-left font-label-md text-label-md text-primary font-bold flex items-center gap-1 hover:underline" onclick="toggleAudio('नाही! हे गर्भाशयाच्या अस्तराचे नैसर्गिक रक्त असते, कोणताही विषारी घटक नाही.')">
<span className="material-symbols-outlined text-base">volume_up</span> ऐका
            </button>
</div>
</div>
</div>
</div>
{/*  Red Flag Symptoms & Direct Help (धोक्याची लक्षणे)  */}
<div className="rounded-3xl bg-surface-container-high/60 p-space-md md:p-space-xl space-y-space-md">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-2xl bg-error-container text-error flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-2xl">medical_services</span>
</div>
<div>
<h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              डॉक्टरांना किंवा आशा ताईंना कधी दाखवावे?
            </h2>
<span className="font-label-md text-label-md text-error font-semibold">ही ३ धोक्याची लक्षणे दिसल्यास अंगावर काढू नका:</span>
</div>
</div>
<button className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-container-low transition self-start sm:self-auto" onclick="toggleAudio('धोक्याची लक्षणे: अतिरक्तस्त्राव, असह्य पोटदुखी किंवा दोन महिन्यांपेक्षा जास्त दिवस पाळी न येणे.')">
<span className="material-symbols-outlined text-base text-error">volume_up</span>
<span>लक्षणे ऐका</span>
</button>
</div>
{/*  Symptoms 3-Card Stack  */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm">
<div className="p-space-md rounded-2xl bg-surface-container-lowest flex items-start gap-space-sm shadow-sm">
<div className="w-10 h-10 rounded-full bg-error-container text-error flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-xl">bloodtype</span>
</div>
<div className="space-y-1">
<span className="block font-headline-md text-headline-md text-on-surface font-bold">अतिप्रमाणात रक्तस्त्राव</span>
<span className="font-body-md text-body-md text-on-surface-variant">दर १ ते २ तासांत पॅड पूर्ण ओले होणे आणि मोठे रक्ताचे गोळे पडणे.</span>
</div>
</div>
<div className="p-space-md rounded-2xl bg-surface-container-lowest flex items-start gap-space-sm shadow-sm">
<div className="w-10 h-10 rounded-full bg-error-container text-error flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-xl">sentiment_very_dissatisfied</span>
</div>
<div className="space-y-1">
<span className="block font-headline-md text-headline-md text-on-surface font-bold">तीव्र पोटदुखी</span>
<span className="font-body-md text-body-md text-on-surface-variant">घरगुती शेकण्याने किंवा विश्रांतीनेही असह्य वेदना कमी न होणे.</span>
</div>
</div>
<div className="p-space-md rounded-2xl bg-surface-container-lowest flex items-start gap-space-sm shadow-sm">
<div className="w-10 h-10 rounded-full bg-error-container text-error flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-xl">hourglass_disabled</span>
</div>
<div className="space-y-1">
<span className="block font-headline-md text-headline-md text-on-surface font-bold">अनियमित चक्र</span>
<span className="font-body-md text-body-md text-on-surface-variant">दोन ते तीन महिन्यांपेक्षा जास्त दिवस पाळी न येणे किंवा सतत येणे.</span>
</div>
</div>
</div>
{/*  Direct Assistance Actions  */}
<div className="flex flex-col sm:flex-row items-center gap-space-sm pt-2">
<a className="w-full sm:w-auto flex-1 min-h-[56px] px-space-lg py-3 rounded-2xl bg-primary-container text-on-primary font-headline-md text-headline-md flex items-center justify-center gap-3 shadow-md hover:bg-primary transition active:translate-y-0.5" href="tel:104">
<span className="material-symbols-outlined text-2xl">call</span>
<span>आशा ताईंना विचारा (थेट संपर्क)</span>
</a>
<a className="w-full sm:w-auto min-h-[56px] px-space-lg py-3 rounded-2xl bg-surface-container-lowest text-secondary font-headline-md text-headline-md flex items-center justify-center gap-3 shadow-sm hover:bg-surface-container-low transition active:translate-y-0.5" href="tel:104">
<span className="material-symbols-outlined text-2xl text-secondary">support_agent</span>
<span>१०४ शासकीय आरोग्य सल्ला (मोफत)</span>
</a>
</div>
</div>
{/*  Government Support Banner (अस्मिता योजना)  */}
<div className="relative overflow-hidden rounded-3xl bg-surface-container-lowest p-space-md md:p-space-lg shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-lg">
<div className="flex items-center gap-space-md">
<div className="w-16 h-16 rounded-2xl bg-tertiary-fixed text-tertiary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-4xl" style={{ "fontVariationSettings": "\'FILL\' 1" }}>card_membership</span>
</div>
<div className="space-y-1">
<div className="flex items-center gap-2">
<span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md font-bold">
              महाराष्ट्र शासन योजना
            </span>
<span className="font-label-md text-label-md text-tertiary font-semibold">अस्मिता योजना</span>
</div>
<h3 className="font-headline-lg text-headline-lg text-on-surface font-bold">
            अंगणवाडीतून मिळणारे ₹१ चे अनुदानित सॅनिटरी नॅपकिन्स
          </h3>
<p className="font-body-md text-body-md text-on-surface-variant">
            गावातील जिल्हा परिषद शाळांतील मुली आणि महिलांसाठी अस्मिता कार्डवर अत्यंत माफक दरात दर्जेदार पॅड्स उपलब्ध.
          </p>
</div>
</div>
<div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-auto shrink-0">
<button className="min-h-[50px] px-space-md py-2.5 rounded-2xl bg-surface-container-high text-on-surface font-label-lg text-label-lg hover:bg-surface-container-highest transition flex items-center justify-center gap-2" onclick="alert('तुमच्या गावातील अंगणवाडी सेविका किंवा आशा ताईंशी संपर्क करून अस्मिता योजनेचा लाभ घ्या.')">
<span className="material-symbols-outlined text-primary text-xl">info</span>
<span>पात्रता व माहिती पहा</span>
</button>
<button className="min-h-[50px] px-space-md py-2.5 rounded-2xl bg-surface-container-low text-primary font-label-md text-label-md hover:bg-primary-fixed transition flex items-center justify-center gap-1.5" onclick="toggleAudio('अस्मिता योजनेअंतर्गत अंगणवाडीमध्ये सॅनिटरी नॅपकिन फक्त एक रुपयात मिळतात.')">
<span className="material-symbols-outlined text-lg">volume_up</span>
<span>योजना माहिती ऐका</span>
</button>
</div>
</div>
</ReadAloud>
{/*  Audio Floating Feedback SnackBar  */}
<div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 hidden bg-inverse-surface text-inverse-on-surface px-space-md py-3 rounded-full shadow-2xl flex items-center gap-3 max-w-md w-[90%] sm:w-auto" id="audioToast">
<div className="w-3 h-3 rounded-full bg-primary-fixed animate-ping"></div>
<span className="material-symbols-outlined text-primary-fixed text-xl">graphic_eq</span>
<span className="font-body-md text-body-md truncate" id="audioToastText">आवाज मार्गदर्शक सुरू आहे...</span>
<button className="ml-auto text-xs px-2 py-1 rounded-full bg-surface-container-highest text-on-surface font-bold" onclick="dismissToast()">थांबवा</button>
</div>
</div>
</main><Footer />
    </div>
  );
};

export default PeriodHealth;
