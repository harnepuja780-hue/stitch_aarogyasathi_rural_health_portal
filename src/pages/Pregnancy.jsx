import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ReadAloud from '../components/a11y/ReadAloud';
import { useLanguage } from '../hooks/useLanguage';

const Pregnancy = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-background min-h-screen text-on-surface flex flex-col">
      <Navbar /><main className="w-full pt-24 bg-background min-h-screen"><div className="flex flex-col w-full">
<ReadAloud>
{/*  Interactive Audio Bar & Top Breadcrumb Banner  */}
<div className="w-full bg-surface-container-low py-space-sm px-margin">
<div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
<span className="material-symbols-outlined text-primary text-xl">pregnancy</span>
<span>आरोग्य मार्गदर्शक</span>
<span className="text-outline-variant">/</span>
<span className="font-bold text-primary">सुरक्षित मातृत्व व प्रसूती काळजी</span>
</div>
<div className="flex items-center gap-space-xs">
<span className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md font-bold">
<span className="material-symbols-outlined text-lg">verified</span>
          महाराष्ट्र आरोग्य विभाग मान्यताप्राप्त
        </span>
</div>
</div>
</div>
{/*  Hero & Narrative Header Section  */}
<section className="max-w-7xl mx-auto w-full px-margin py-space-lg">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
{/*  Left Narrative Column  */}
<div className="lg:col-span-7 flex flex-col gap-space-md">
<div className="inline-flex items-center gap-2 self-start px-space-sm py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md">
<span className="material-symbols-outlined text-tertiary text-lg">favorite</span>
<span>{t('pregBadge')}</span>
</div>
<h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
          {t('pregTitle')}
        </h1>
<p className="font-body-xl text-body-xl text-on-surface-variant leading-relaxed">
          आई आणि बाळ दोघांचे आरोग्य उत्तम राखण्यासाठी आशा ताईंचे अधिकृत मार्गदर्शन. गावपातळीवरील मोफत तपासणी, सकस पोषण आणि सुरक्षित बाळंतपणाची संपूर्ण माहिती.
        </p>
{/*  Prominent Audio Guide Action Bar  */}
<div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-md flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-md">
<div className="flex items-center gap-space-sm">
<div className="w-14 h-14 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm">
<span className="material-symbols-outlined text-3xl">volume_up</span>
</div>
<div>
<span className="block font-headline-md text-headline-md text-on-surface font-bold">{t('pregListenTitle')}</span>
<span className="font-body-md text-body-md text-on-surface-variant">मराठी आवाज मार्गदर्शक (वेळ: ३ मिनिटे)</span>
</div>
</div>
<button className="h-14 px-space-lg rounded-full bg-primary-container text-on-primary font-audio-banner text-audio-banner flex items-center justify-center gap-2 hover:bg-primary transition-all active:translate-y-0.5 shadow-md" id="audioPlayBtn" type="button">
<span className="material-symbols-outlined text-2xl" id="playIcon">play_arrow</span>
<span id="playText">{t('pregListen')}</span>
</button>
</div>
{/*  Trust Badges Bar  */}
<div className="grid grid-cols-3 gap-space-sm pt-space-xs">
<div className="bg-surface-container-low p-space-sm rounded-xl flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-2xl">event_available</span>
<div>
<span className="block font-label-md text-label-md font-bold text-on-surface">४ मोफत तपासण्या</span>
<span className="block text-xs text-on-surface-variant">सोनोग्राफी मोफत</span>
</div>
</div>
<div className="bg-surface-container-low p-space-sm rounded-xl flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-2xl">medication</span>
<div>
<span className="block font-label-md text-label-md font-bold text-on-surface">लोह व कॅल्शियम</span>
<span className="block text-xs text-on-surface-variant">१८० दिवस गोळ्या</span>
</div>
</div>
<div className="bg-surface-container-low p-space-sm rounded-xl flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary text-2xl">savings</span>
<div>
<span className="block font-label-md text-label-md font-bold text-on-surface">₹६,००० अनुदान</span>
<span className="block text-xs text-on-surface-variant">थेट बँक खात्यात</span>
</div>
</div>
</div>
</div>
{/*  Right Visual Column with Clinic Photo  */}
<div className="lg:col-span-5 flex flex-col">
<div className="relative rounded-3xl overflow-hidden shadow-xl bg-surface-container-lowest">
<img alt="ग्रामीण प्राथमिक आरोग्य केंद्रात आशा ताई गर्भवती मातेचा रक्तदाब तपासताना" className="w-full h-80 sm:h-96 object-cover object-center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAU0JghFWSvaccXeJq5MnBogTuWucqfWo_qXdgb2InLxbuPO-pwpy0Mfsudp7gqT6dQkKH9nmZsXD7EvyV2CdT8tAjqS2HYTMMTc3HC21jmAG3bso6eF_i_oGiWmeDj3SJfwkaoeHlS1hTBQrF0A5SF49OCOnDZKMC9RmqTAV8-9BxRps3tplo5K9AUlSu-UMLK5AroIsls11iBePObufMBY9TSS_OGHs49050Eq4qNPzTAgjwPD-w"/>
<div className="p-space-md bg-surface-container-lowest">
<div className="flex items-start gap-space-sm">
<span className="material-symbols-outlined text-primary text-2xl shrink-0 mt-0.5">verified_user</span>
<p className="font-body-md text-body-md text-on-surface font-semibold">
                प्राथमिक आरोग्य केंद्रातील मोफत तपासणी - सुरक्षित बाळंतपण हा तुमचा अधिकार आहे.
              </p>
</div>
<div className="mt-space-sm flex items-center justify-between text-on-surface-variant font-label-md text-label-md pt-space-xs">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-base">location_on</span>
                उपकेंद्र / PHC केंद्र
              </span>
<span className="text-primary font-bold">प्रत्येक महिन्याची ९ तारीख (PMSMA)</span>
</div>
</div>
</div>
</div>
</div>
</section>
{/*  Interactive 4-Stage Pregnancy & Motherhood Timeline  */}
<section className="w-full bg-surface-container-lowest py-space-xl">
<div className="max-w-7xl mx-auto px-margin">
{/*  Section Header  */}
<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
<div>
<span className="font-label-lg text-label-lg text-primary font-bold uppercase tracking-wider block mb-1">{t('pregStageLabel')}</span>
<h2 className="font-headline-xl text-headline-xl text-on-surface">{t('pregTimelineTitle')}</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-1">आपल्या चालू महिन्यावर दाबा आणि आवश्यक तपासण्या, औषधे व आहार जाणून घ्या.</p>
</div>
<div className="inline-flex p-1 bg-surface-container-low rounded-2xl shrink-0" role="tablist">
<button className="stage-tab px-space-md py-2.5 rounded-xl font-label-lg text-label-lg font-bold transition-all bg-primary-container text-on-primary shadow-sm" id="tab-1" onclick="showStage(1)" type="button">
            {t('pregStage1')}
          </button>
<button className="stage-tab px-space-md py-2.5 rounded-xl font-label-lg text-label-lg font-bold transition-all text-on-surface-variant hover:text-on-surface" id="tab-2" onclick="showStage(2)" type="button">
            {t('pregStage2')}
          </button>
<button className="stage-tab px-space-md py-2.5 rounded-xl font-label-lg text-label-lg font-bold transition-all text-on-surface-variant hover:text-on-surface" id="tab-3" onclick="showStage(3)" type="button">
            {t('pregStage3')}
          </button>
<button className="stage-tab px-space-md py-2.5 rounded-xl font-label-lg text-label-lg font-bold transition-all text-on-surface-variant hover:text-on-surface" id="tab-4" onclick="showStage(4)" type="button">
            {t('pregStage4')}
          </button>
</div>
</div>
{/*  Stage Cards Grid: Default view displays all 4 clearly with active highlighting  */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
{/*  Stage 1 Card  */}
<div className="stage-card p-space-md rounded-2xl bg-surface-container-low flex flex-col justify-between shadow-sm transition-all duration-300" id="card-stage-1">
<div>
<div className="flex items-center justify-between mb-space-sm">
<span className="w-10 h-10 rounded-full bg-primary-container text-on-primary font-bold flex items-center justify-center font-headline-md text-headline-md">१</span>
<span className="px-space-xs py-1 rounded-full bg-primary-fixed/60 text-on-primary-fixed font-label-md text-label-md font-semibold">१ ते १२ आठवडे</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface font-bold mb-space-xs">पहिले ३ महिने</h3>
<span className="block font-label-md text-label-md text-primary font-semibold mb-space-md">Early Pregnancy Care</span>
<ul className="space-y-space-sm font-body-md text-body-md text-on-surface">
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">medication_liquid</span>
<span><strong>फोलिक ऍसिड गोळ्या रोज घेणे:</strong> बाळामध्ये व्यंग येऊ नये म्हणून पहिली गोळी त्वरित सुरू करा.</span>
</li>
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">how_to_reg</span>
<span><strong>सरकारी दवाखान्यात नोंदणी:</strong> आशा ताईंकडे किंवा PHC मध्ये 'माता-बाल संरक्षण कार्ड' (MCP Card) तयार करा.</span>
</li>
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">restaurant</span>
<span><strong>मळमळ व उलटीसाठी आहार:</strong> तेलकट व तिखट पदार्थ टाळून मुगाचे वरण, राजगिरा लाडू व हलका आहार घ्या.</span>
</li>
</ul>
</div>
<div className="mt-space-md pt-space-sm bg-surface-container-lowest/80 p-space-sm rounded-xl">
<span className="block text-xs font-bold text-on-surface-variant uppercase">आशा ताईंचा सल्ला</span>
<p className="font-label-md text-label-md text-on-surface mt-0.5">सकाळी उठल्यावर सुका खाऊ (बिस्किट/भाजलेले दाणे) खाल्ल्यास मळमळ कमी होते.</p>
</div>
</div>
{/*  Stage 2 Card  */}
<div className="stage-card p-space-md rounded-2xl bg-surface-container-low flex flex-col justify-between shadow-sm transition-all duration-300" id="card-stage-2">
<div>
<div className="flex items-center justify-between mb-space-sm">
<span className="w-10 h-10 rounded-full bg-secondary text-on-secondary font-bold flex items-center justify-center font-headline-md text-headline-md">२</span>
<span className="px-space-xs py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md font-semibold">१३ ते २८ आठवडे</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface font-bold mb-space-xs">मधले ३ महिने</h3>
<span className="block font-label-md text-label-md text-secondary font-semibold mb-space-md">Second Trimester Care</span>
<ul className="space-y-space-sm font-body-md text-body-md text-on-surface">
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-secondary text-xl shrink-0 mt-0.5">vaccines</span>
<span><strong>टीटी (TT) लस व लोह गोळ्या:</strong> धनुर्वात प्रतिबंधक २ लसी आणि रोज रात्री लोहाची (IFA) लाल गोळी + कॅल्शियम गोळी.</span>
</li>
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-secondary text-xl shrink-0 mt-0.5">child_friendly</span>
<span><strong>बाळाची पहिली हालचाल:</strong> ५ व्या महिन्यापासून बाळाची हालचाल जाणवू लागते. दिवसातून नियमित लक्ष ठेवा.</span>
</li>
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-secondary text-xl shrink-0 mt-0.5">monitor_heart</span>
<span><strong>वजन व रक्तदाब (BP) तपासणी:</strong> महिन्याला किमान १ ते २ किलो वजन वाढणे निरोगी बाळाचे लक्षण आहे.</span>
</li>
</ul>
</div>
<div className="mt-space-md pt-space-sm bg-surface-container-lowest/80 p-space-sm rounded-xl">
<span className="block text-xs font-bold text-on-surface-variant uppercase">गोळी घेण्याचा नियम</span>
<p className="font-label-md text-label-md text-on-surface mt-0.5">लोहाची लाल गोळी चहा/दुधासोबत घेऊ नका; लिंबू पाणी किंवा पाण्यासोबत घ्या.</p>
</div>
</div>
{/*  Stage 3 Card  */}
<div className="stage-card p-space-md rounded-2xl bg-surface-container-low flex flex-col justify-between shadow-sm transition-all duration-300" id="card-stage-3">
<div>
<div className="flex items-center justify-between mb-space-sm">
<span className="w-10 h-10 rounded-full bg-tertiary-container text-on-tertiary-container font-bold flex items-center justify-center font-headline-md text-headline-md">३</span>
<span className="px-space-xs py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md font-semibold">२९ ते ४० आठवडे</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface font-bold mb-space-xs">शेवटचे ३ महिने</h3>
<span className="block font-label-md text-label-md text-tertiary font-semibold mb-space-md">Third Trimester &amp; Preparation</span>
<ul className="space-y-space-sm font-body-md text-body-md text-on-surface">
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-tertiary text-xl shrink-0 mt-0.5">local_hospital</span>
<span><strong>बाळंतपणाची पूर्वतयारी:</strong> प्रसूती सरकारी ग्रामीण रुग्णालय किंवा उपजिल्हा रुग्णालयातच करण्याचे निश्चित करा.</span>
</li>
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-tertiary text-xl shrink-0 mt-0.5">call</span>
<span><strong>१०८ रुग्णवाहिका क्रमांक:</strong> गाडीचा १०८ नंबर घरात सर्वांच्या नजरेस पडेल अशा भिंतीवर लिहून ठेवा.</span>
</li>
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-tertiary text-xl shrink-0 mt-0.5">bloodtype</span>
<span><strong>रक्ताची टक्केवारी (Hb &gt; ११):</strong> प्रसूतीदरम्यान धोका टाळण्यासाठी हिमोग्लोबिन किमान ११ ग्रॅम असावे.</span>
</li>
</ul>
</div>
<div className="mt-space-md pt-space-sm bg-surface-container-lowest/80 p-space-sm rounded-xl">
<span className="block text-xs font-bold text-on-surface-variant uppercase">बाळंतपणाची पिशवी</span>
<p className="font-label-md text-label-md text-on-surface mt-0.5">आधार कार्ड, बँक पासबुक, ममता कार्ड व बाळाचे सुती कपडे आधीच पिशवीत ठेवा.</p>
</div>
</div>
{/*  Stage 4 Card  */}
<div className="stage-card p-space-md rounded-2xl bg-surface-container-low flex flex-col justify-between shadow-sm transition-all duration-300" id="card-stage-4">
<div>
<div className="flex items-center justify-between mb-space-sm">
<span className="w-10 h-10 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center font-headline-md text-headline-md">४</span>
<span className="px-space-xs py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md font-semibold">पहिले ४२ दिवस</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface font-bold mb-space-xs">बाळंतपणानंतरची काळजी</h3>
<span className="block font-label-md text-label-md text-primary font-semibold mb-space-md">Postnatal Mother &amp; Newborn</span>
<ul className="space-y-space-sm font-body-md text-body-md text-on-surface">
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">breastfeeding</span>
<span><strong>पहिले घट्ट चिकट दूध (Colostrum):</strong> जन्मानंतर एका तासाच्या आत बाळाला पाजा; ही बाळाची पहिली नैसर्गिक लस आहे.</span>
</li>
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">soup_kitchen</span>
<span><strong>मातेचा सकस गरम आहार:</strong> डिंक लाडू, सुकामेवा, बाजरीची पेज आणि भरपूर पाणी. पुरेशी विश्रांती आवश्यक.</span>
</li>
<li className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">healing</span>
<span><strong>जन्मतःच लसीकरण:</strong> हॉस्पिटलमधून निघण्यापूर्वी बीसीजी (BCG), पोलिओ डोस (Zero OPV) व हेपॅटायटिस-बी पूर्ण करा.</span>
</li>
</ul>
</div>
<div className="mt-space-md pt-space-sm bg-surface-container-lowest/80 p-space-sm rounded-xl">
<span className="block text-xs font-bold text-on-surface-variant uppercase">६ महिने फक्त स्तनपान</span>
<p className="font-label-md text-label-md text-on-surface mt-0.5">पहिले ६ महिने बाळाला गुटी, मध, पाणी काहीही न देता फक्त आईचे दूध द्यावे.</p>
</div>
</div>
</div>
</div>
</section>
{/*  Danger Signals Alert & Emergency Quick-Call Bar  */}
<section className="max-w-7xl mx-auto w-full px-margin py-space-xl">
<div className="rounded-3xl bg-error-container text-on-error-container p-space-lg md:p-space-xl shadow-lg relative overflow-hidden">
{/*  Decorative Backdrop Graphic  */}
<div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
<span className="material-symbols-outlined text-[240px]">emergency_share</span>
</div>
<div className="relative z-10">
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pb-space-md border-b-0">
<div className="flex items-center gap-space-sm">
<div className="w-16 h-16 rounded-2xl bg-error text-on-error flex items-center justify-center shrink-0 shadow-md animate-pulse">
<span className="material-symbols-outlined text-3xl">warning</span>
</div>
<div>
<span className="px-space-xs py-0.5 rounded-full bg-error text-on-error font-label-md text-label-md font-bold uppercase tracking-wider">अतिदक्षतेचा इशारा</span>
<h2 className="font-headline-xl text-headline-xl text-on-error-container font-extrabold mt-1">धोक्याची चिन्हे - त्वरित १०८ वर फोन करा!</h2>
</div>
</div>
<a className="inline-flex items-center justify-center gap-space-sm px-space-xl py-space-md rounded-2xl bg-error text-on-error font-headline-md text-headline-md font-bold shadow-xl hover:bg-on-error-container transition-all active:translate-y-0.5 text-center" href="tel:108">
<span className="material-symbols-outlined text-3xl">call</span>
<span>तातडीने १०८ रुग्णवाहिका बोलवा</span>
</a>
</div>
<p className="font-body-xl text-body-xl text-on-error-container/90 mt-space-sm font-medium">
          गरोदरपणाच्या कोणत्याही महिन्यात खालीलपैकी एक जरी लक्षण दिसले, तरी क्षणाचाही विलंब न करता सरकारी दवाखान्यात पोहोचा:
        </p>
{/*  4 Major Danger Sign Blocks  */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mt-space-md">
<div className="p-space-md rounded-2xl bg-surface-container-lowest text-on-surface shadow-sm flex flex-col gap-2">
<div className="flex items-center gap-2 text-error">
<span className="material-symbols-outlined text-2xl font-bold">water_drop</span>
<span className="font-headline-md text-headline-md font-bold">१. रक्तस्त्राव / पाणी</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">
              अंगावरून अचानक लाल रक्तस्त्राव होणे किंवा कळा न येताच योनीमार्गातून पाणी वाहू लागणे.
            </p>
</div>
<div className="p-space-md rounded-2xl bg-surface-container-lowest text-on-surface shadow-sm flex flex-col gap-2">
<div className="flex items-center gap-2 text-error">
<span className="material-symbols-outlined text-2xl font-bold">do_not_touch</span>
<span className="font-headline-md text-headline-md font-bold">२. बाळाची हालचाल</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">
              पोटात बाळाची हालचाल अचानक मंदावणे किंवा पूर्णपणे थांबणे (१२ तासांत १० पेक्षा कमी हालचाली).
            </p>
</div>
<div className="p-space-md rounded-2xl bg-surface-container-lowest text-on-surface shadow-sm flex flex-col gap-2">
<div className="flex items-center gap-2 text-error">
<span className="material-symbols-outlined text-2xl font-bold">visibility_off</span>
<span className="font-headline-md text-headline-md font-bold">३. डोळ्यांसमोर अंधारी</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">
              तीव्र डोकेदुखी, डोळ्यांसमोर काजवे चमकणे किंवा चेहरा, हात व पायांवर अचानक जास्त सूज येणे.
            </p>
</div>
<div className="p-space-md rounded-2xl bg-surface-container-lowest text-on-surface shadow-sm flex flex-col gap-2">
<div className="flex items-center gap-2 text-error">
<span className="material-symbols-outlined text-2xl font-bold">thermometer</span>
<span className="font-headline-md text-headline-md font-bold">४. तीव्र ताप व कळ</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">
              थंडी वाजून तीव्र ताप येणे किंवा पोटात व कमरेत असह्य कळ मारणे आणि चक्कर येऊन भोवळ पडणे.
            </p>
</div>
</div>
<div className="mt-space-md p-space-sm rounded-xl bg-surface-container-lowest/60 flex items-center gap-space-sm">
<span className="material-symbols-outlined text-error text-2xl shrink-0">info</span>
<span className="font-label-lg text-label-lg font-bold">
            १०८ ही शासकीय रुग्णवाहिका विनामूल्य आहे. फोन करताना मातेचे नाव व गावाचे अचूक ठिकाण सांगावे.
          </span>
</div>
</div>
</div>
</section>
{/*  Government Welfare Schemes for Pregnant Women  */}
<section className="max-w-7xl mx-auto w-full px-margin py-space-lg mb-space-xl">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm mb-space-md">
<div>
<div className="flex items-center gap-2 mb-1">
<span className="material-symbols-outlined text-secondary text-2xl">account_balance</span>
<span className="font-label-lg text-label-lg text-secondary font-bold uppercase">शासकीय आर्थिक मदत आणि मोफत हक्क</span>
</div>
<h2 className="font-headline-xl text-headline-xl text-on-surface">गरोदर महिलांसाठी सरकारी योजना</h2>
</div>
<button className="h-12 px-space-md rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-lg text-label-lg font-bold flex items-center gap-2 hover:bg-secondary hover:text-on-secondary transition-all" type="button">
<span className="material-symbols-outlined text-xl">record_voice_over</span>
<span>माझ्या हक्काचे पैसे कसे मिळवायचे? (मार्गदर्शन ऐका)</span>
</button>
</div>
{/*  3 Core Schemes Cards Grid  */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
{/*  Scheme 1: PMMVY  */}
<div className="p-space-lg rounded-3xl bg-surface-container-low flex flex-col justify-between shadow-sm">
<div>
<div className="w-12 h-12 rounded-2xl bg-secondary text-on-secondary flex items-center justify-center mb-space-md shadow-sm">
<span className="material-symbols-outlined text-2xl">currency_rupee</span>
</div>
<span className="px-space-xs py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md font-bold">केंद्र व राज्य शासन</span>
<h3 className="font-headline-md text-headline-md text-on-surface font-bold mt-space-xs mb-space-xs">
            प्रधानमंत्री मातृ वंदना योजना (PMMVY)
          </h3>
<div className="font-headline-lg text-headline-lg text-secondary font-extrabold mb-space-sm">
            ₹५,००० ते ₹६,००० थेट मदत
          </div>
<p className="font-body-md text-body-md text-on-surface-variant">
            पहिल्या बाळाच्या वेळी ₹५,००० (दोन हप्त्यांत) आणि दुसरे बाळ मुलगी झाल्यास थेट ₹६,००० मातेच्या स्वतःच्या आधार लिंक बँक खात्यात जमा केले जातात.
          </p>
<div className="mt-space-md p-space-sm rounded-xl bg-surface-container-lowest font-label-md text-label-md text-on-surface">
<strong>आवश्यक कागदपत्रे:</strong> आधार कार्ड, बँक पासबुक, पतीचे आधार व एमसीपी कार्ड.
          </div>
</div>
<div className="mt-space-lg pt-space-sm flex items-center justify-between">
<span className="font-label-md text-label-md text-primary font-bold">नोंदणी: आशा ताई / अंगणवाडी</span>
<span className="material-symbols-outlined text-outline">arrow_forward</span>
</div>
</div>
{/*  Scheme 2: Janani Suraksha Yojana  */}
<div className="p-space-lg rounded-3xl bg-surface-container-low flex flex-col justify-between shadow-sm">
<div>
<div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center mb-space-md shadow-sm">
<span className="material-symbols-outlined text-2xl">health_metrics</span>
</div>
<span className="px-space-xs py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md font-bold">राष्ट्रीय आरोग्य अभियान (NHM)</span>
<h3 className="font-headline-md text-headline-md text-on-surface font-bold mt-space-xs mb-space-xs">
            जननी सुरक्षा योजना (JSY)
          </h3>
<div className="font-headline-lg text-headline-lg text-primary font-extrabold mb-space-sm">
            मोफत प्रसूती + ₹७०० प्रवास भत्ता
          </div>
<p className="font-body-md text-body-md text-on-surface-variant">
            शासकीय रुग्णालयात (PHC/RH/उपजिल्हा रुग्णालय) प्रसूती पूर्णपणे मोफत होते. सिझेरियन शस्त्रक्रिया, रक्त आणि औषधांचा सर्व खर्च सरकार करते.
          </p>
<div className="mt-space-md p-space-sm rounded-xl bg-surface-container-lowest font-label-md text-label-md text-on-surface">
<strong>निसर्गोपचार लाभ:</strong> ग्रामीण भागातील दारिद्र्यरेषेखालील (BPL/SC/ST) महिलांना ₹७०० थेट रोख मदत.
          </div>
</div>
<div className="mt-space-lg pt-space-sm flex items-center justify-between">
<span className="font-label-md text-label-md text-primary font-bold">नोंदणी: सरकारी दवाखाना</span>
<span className="material-symbols-outlined text-outline">arrow_forward</span>
</div>
</div>
{/*  Scheme 3: Anganwadi Nutrition  */}
<div className="p-space-lg rounded-3xl bg-surface-container-low flex flex-col justify-between shadow-sm">
<div>
<div className="w-12 h-12 rounded-2xl bg-tertiary text-on-tertiary flex items-center justify-center mb-space-md shadow-sm">
<span className="material-symbols-outlined text-2xl">nutrition</span>
</div>
<span className="px-space-xs py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md font-bold">एकात्मिक बाल विकास (ICDS)</span>
<h3 className="font-headline-md text-headline-md text-on-surface font-bold mt-space-xs mb-space-xs">
            मोफत पोषण आहार व अमृत आहार
          </h3>
<div className="font-headline-lg text-headline-lg text-tertiary font-extrabold mb-space-sm">
            दरमहा पौष्टिक लाडू व धान्य
          </div>
<p className="font-body-md text-body-md text-on-surface-variant">
            अंगणवाडीमार्फत गर्भवती व स्तनदा मातेला घरपोच पोषण आहार (THR) - डाळ, तांदूळ, सोयाबीन तेल, अंडी, शेंगदाणा चिक्की आणि लाडू नियमित दिले जातात.
          </p>
<div className="mt-space-md p-space-sm rounded-xl bg-surface-container-lowest font-label-md text-label-md text-on-surface">
<strong>एपीजे अब्दुल कलाम योजना:</strong> आदिवासी भागात १ वेळचे संपूर्ण गरम चौरस जेवण मोफत.
          </div>
</div>
<div className="mt-space-lg pt-space-sm flex items-center justify-between">
<span className="font-label-md text-label-md text-primary font-bold">नोंदणी: स्थानिक अंगणवाडी सेविका</span>
<span className="material-symbols-outlined text-outline">arrow_forward</span>
</div>
</div>
</div>
{/*  Community Assistance Callout  */}
<div className="mt-space-lg p-space-md rounded-2xl bg-surface-container flex flex-col sm:flex-row items-center justify-between gap-space-md">
<div className="flex items-center gap-space-sm">
<div className="w-12 h-12 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-2xl">support_agent</span>
</div>
<div>
<span className="font-headline-md text-headline-md text-on-surface font-bold">कागदपत्रे काढण्यात किंवा योजना मिळण्यात अडचण आहे?</span>
<span className="block font-body-md text-body-md text-on-surface-variant">आपल्या गावच्या आशा ताई किंवा अंगणवाडी मदतनीस यांना भेटा अथवा १०४ आरोग्य हेल्पलाईनवर कॉल करा.</span>
</div>
</div>
<a className="px-space-lg py-2.5 rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg font-bold flex items-center gap-2 shrink-0 hover:bg-primary transition-all shadow-sm" href="tel:104">
<span className="material-symbols-outlined text-xl">phone_in_talk</span>
<span>१०४ डायल करा</span>
</a>
</div>
</section>
</ReadAloud>
</div>
</main><Footer />
    </div>
  );
};

export default Pregnancy;
