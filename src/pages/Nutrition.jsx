import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ReadAloud from '../components/a11y/ReadAloud';
import { useLanguage } from '../hooks/useLanguage';

const Nutrition = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-background min-h-screen text-on-surface flex flex-col">
      <Navbar /><main className="w-full pt-24 bg-background min-h-screen"><div className="flex flex-col w-full">
<ReadAloud>
{/*  Top Audio Quick Banner  */}
<div className="w-full bg-primary-fixed/40 px-margin py-space-sm shadow-sm">
<div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-primary text-2xl animate-pulse">volume_up</span>
<span className="font-audio-banner text-audio-banner text-on-primary-fixed font-bold">
          ऐका: घरच्या धान्यातून संपूर्ण पोषण कसे मिळवायचे?
        </span>
</div>
<button className="flex items-center gap-2 px-space-md py-2 rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg shadow-md hover:bg-primary transition-all active:scale-95 cursor-pointer" onclick="playVoiceGuide('पोषण थाळीचे महत्त्व: आपल्या घरात उपलब्ध ज्वारी, बाजरी, डाळी, पालेभाज्या आणि गूळ-शेंगदाणे यामुळे संपूर्ण कुटुंबाचे आरोग्य उत्तम राहते.')">
<span className="material-symbols-outlined text-xl">play_circle</span>
<span>आवाजात ऐका</span>
</button>
</div>
</div>
<div className="max-w-7xl mx-auto px-margin py-space-lg w-full flex flex-col gap-space-xl">
{/*  1. Hero & Poshan Thali Interactive Breakdown  */}
<section className="flex flex-col gap-space-md">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
<div>
<div className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md mb-2">
<span className="material-symbols-outlined text-base">restaurant</span>
<span>{t('nutBadge')}</span>
</div>
<h1 className="font-headline-xl text-headline-xl text-primary font-bold tracking-tight">
            {t('nutTitle')}
          </h1>
<p className="font-body-xl text-body-xl text-on-surface-variant max-w-3xl mt-1">
            महागडे पदार्थ नकोत! शेतात आणि गावात मिळणाऱ्या धान्यातूनच संपूर्ण कुटुंबाचे आरोग्य सुदृढ करा.
          </p>
</div>
<button className="self-start md:self-auto flex items-center gap-2 px-space-md py-3 rounded-2xl bg-surface-container-low text-primary font-label-lg text-label-lg shadow-sm hover:bg-surface-container-high transition-all active:translate-y-0.5 border border-outline-variant/30" onclick="speakThaliSummary()">
<span className="material-symbols-outlined text-2xl text-primary">campaign</span>
<span className="font-bold">{t('nutSpeak')}</span>
</button>
</div>
{/*  Main Visual Showcase Bento  */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-stretch">
{/*  Plate Photo Frame with Interactive Overlay Pinpoints  */}
<div className="lg:col-span-7 bg-surface-container-lowest rounded-3xl p-space-sm shadow-md flex flex-col justify-between overflow-hidden relative group">
<div className="relative w-full h-[380px] sm:h-[460px] md:h-[500px] rounded-2xl overflow-hidden bg-surface-container">
<img alt="पोषण थाळी - पारंपारिक मराठी ताट, बाजरीची भाकरी, वरण, उसळ, ताक, कोशिंबीर आणि गूळ शेंगदाणे" className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZbpZJBoiwrx5OQnHPU47phR7WjtwJ3NsZWHbBWcnty7K6I1lh-QIi-7BpEjxYmI9NvErZoTTIzsrbZ-WBLdPvcbiPXYKpW5j87_r0SHgSrJcp-hq_erT1B11yV7zj51hguohpC5iPqH077plAZOB9s4wclKKIREF2WxGwmPFl98lYK02nTntwNJUJJE5NM3z3WvPp6OaEKBuaH_yVJVH6AbS_rpgtGSv0jA3XZiKPmXSAX-nG8qo"/>
<div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
{/*  Visual Badge on Image  */}
<div className="absolute top-4 left-4 bg-surface-container-lowest/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
<span className="font-label-md text-label-md text-on-surface font-bold">पारंपारिक गावरान पोषण थाळी</span>
</div>
{/*  Plate Pin Callouts (Overlay Tags)  */}
<div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
<span className="px-2.5 py-1 bg-surface-container-lowest/90 backdrop-blur-sm rounded-lg text-xs font-bold text-on-surface flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-secondary"></span> भाकरी/भात
              </span>
<span className="px-2.5 py-1 bg-surface-container-lowest/90 backdrop-blur-sm rounded-lg text-xs font-bold text-on-surface flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-primary"></span> डाळ-उसळ
              </span>
<span className="px-2.5 py-1 bg-surface-container-lowest/90 backdrop-blur-sm rounded-lg text-xs font-bold text-on-surface flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-tertiary"></span> कोशिंबीर व भाज्या
              </span>
<span className="px-2.5 py-1 bg-surface-container-lowest/90 backdrop-blur-sm rounded-lg text-xs font-bold text-on-surface flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-surface-tint"></span> ताक / दही
              </span>
<span className="px-2.5 py-1 bg-surface-container-lowest/90 backdrop-blur-sm rounded-lg text-xs font-bold text-on-surface flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-error"></span> गूळ-शेंगदाणे
              </span>
</div>
</div>
<div className="pt-space-sm pb-1 px-space-xs flex items-center justify-between text-on-surface-variant font-label-md text-label-md">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-primary text-sm">verified</span>
              आशा व अंगणवाडी ताई प्रमाणित प्रमाण
            </span>
<span className="text-xs bg-primary-fixed/60 px-2 py-0.5 rounded text-on-primary-fixed font-bold">१००% घरगुती</span>
</div>
</div>
{/*  5 Pillars Accordion/Breakdown Cards  */}
<div className="lg:col-span-5 flex flex-col justify-between gap-space-xs">
{/*  Item 1  */}
<div className="bg-surface-container-lowest p-space-sm rounded-2xl shadow-sm hover:shadow-md transition-all flex items-start gap-space-sm border-l-4 border-secondary">
<div className="w-12 h-12 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex-shrink-0 flex items-center justify-center font-bold">
              १
            </div>
<div className="flex-1">
<div className="flex items-center justify-between">
<h2 className="font-headline-md text-headline-md text-on-surface font-bold">ऊर्जा व शक्ती</h2>
<button className="text-primary hover:text-primary-container p-1" onclick="playVoiceGuide('ऊर्जा आणि शक्तीसाठी ज्वारी किंवा बाजरीची भाकरी आणि हातसडीचा तांदूळ सर्वोत्तम आहेत.')" title="ऐका">
<span className="material-symbols-outlined text-xl">volume_up</span>
</button>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                ज्वारी / बाजरीची गरमागरम भाकरी किंवा हातसडीचा तांदूळ (दिवसभर काम करायला भरपूर ताकद देतो).
              </p>
</div>
</div>
{/*  Item 2  */}
<div className="bg-surface-container-lowest p-space-sm rounded-2xl shadow-sm hover:shadow-md transition-all flex items-start gap-space-sm border-l-4 border-primary">
<div className="w-12 h-12 rounded-xl bg-primary-fixed text-on-primary-fixed flex-shrink-0 flex items-center justify-center font-bold">
              २
            </div>
<div className="flex-1">
<div className="flex items-center justify-between">
<h2 className="font-headline-md text-headline-md text-on-surface font-bold">स्नायू व शरीराची वाढ</h2>
<button className="text-primary hover:text-primary-container p-1" onclick="playVoiceGuide('स्नायूंच्या वाढीसाठी तुरीची किंवा मुगाची डाळ आणि मोड आलेली मटकीची उसळ खावी.')" title="ऐका">
<span className="material-symbols-outlined text-xl">volume_up</span>
</button>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                तुरीची किंवा मुगाची घट्ट डाळ, मोड आलेल्या मटकीची/चण्याची उसळ (प्रथिनांचा मोठा साठा).
              </p>
</div>
</div>
{/*  Item 3  */}
<div className="bg-surface-container-lowest p-space-sm rounded-2xl shadow-sm hover:shadow-md transition-all flex items-start gap-space-sm border-l-4 border-tertiary">
<div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex-shrink-0 flex items-center justify-center font-bold">
              ३
            </div>
<div className="flex-1">
<div className="flex items-center justify-between">
<h2 className="font-headline-md text-headline-md text-on-surface font-bold">प्रतिकारशक्ती व जीवनसत्त्वे</h2>
<button className="text-primary hover:text-primary-container p-1" onclick="playVoiceGuide('रोगप्रतिकारशक्तीसाठी शेवगा, मेथी, पालक आणि लिंबू पिळलेली काकडी कोशिंबीर खावी.')" title="ऐका">
<span className="material-symbols-outlined text-xl">volume_up</span>
</button>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                शेवग्याच्या शेंगा, मेथी, पालक, लिंबू व काकडी-टोमॅटो कोशिंबीर (आजारांपासून संरक्षण).
              </p>
</div>
</div>
{/*  Item 4  */}
<div className="bg-surface-container-lowest p-space-sm rounded-2xl shadow-sm hover:shadow-md transition-all flex items-start gap-space-sm border-l-4 border-surface-tint">
<div className="w-12 h-12 rounded-xl bg-surface-container-high text-on-surface flex-shrink-0 flex items-center justify-center font-bold">
              ४
            </div>
<div className="flex-1">
<div className="flex items-center justify-between">
<h2 className="font-headline-md text-headline-md text-on-surface font-bold">हाडांची बळकटी व पचन</h2>
<button className="text-primary hover:text-primary-container p-1" onclick="playVoiceGuide('हाडांच्या मजबुतीसाठी आणि पोटाच्या आरोग्यासाठी ताजे ताक किंवा एक वाटी दही घ्या.')" title="ऐका">
<span className="material-symbols-outlined text-xl">volume_up</span>
</button>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                ताजे गावरान दही किंवा जिरे घातलेले पातळ ताक (कॅल्शियम आणि पोटासाठी उत्तम जिवाणू).
              </p>
</div>
</div>
{/*  Item 5  */}
<div className="bg-surface-container-lowest p-space-sm rounded-2xl shadow-sm hover:shadow-md transition-all flex items-start gap-space-sm border-l-4 border-error">
<div className="w-12 h-12 rounded-xl bg-error-container text-on-error-container flex-shrink-0 flex items-center justify-center font-bold">
              ५
            </div>
<div className="flex-1">
<div className="flex items-center justify-between">
<h2 className="font-headline-md text-headline-md text-on-surface font-bold">रक्तवाढ (हिमोग्लोबिन)</h2>
<button className="text-primary hover:text-primary-container p-1" onclick="playVoiceGuide('रक्तातील ताकद आणि हिमोग्लोबिन वाढवण्यासाठी जेवणानंतर थोडा गूळ आणि मूठभर शेंगदाणे खावेत.')" title="ऐका">
<span className="material-symbols-outlined text-xl">volume_up</span>
</button>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                एक खडा सेंद्रिय गूळ आणि मूठभर भाजलेले शेंगदाणे (थकवा दूर करण्यासाठी व रक्त वाढवण्यासाठी).
              </p>
</div>
</div>
</div>
</div>
</section>
{/*  2. Life-Stage Nutrition Selector (Interactive Tabs)  */}
<section className="bg-surface-container-low rounded-3xl p-space-md sm:p-space-lg shadow-sm">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm mb-space-md">
<div>
<span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold">{t('nutStageLabel')}</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">
            {t('nutStageTitle')}
          </h2>
</div>
<div className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md bg-surface-container-lowest px-3 py-1.5 rounded-full">
<span className="material-symbols-outlined text-primary text-lg">touch_app</span>
<span>{t('nutSelectHint')}</span>
</div>
</div>
{/*  Tab Buttons  */}
<div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none" id="stageTabs">
<button className="stage-tab flex-shrink-0 px-space-md py-3 rounded-2xl font-label-lg text-label-lg transition-all flex items-center gap-2 bg-primary-container text-on-primary shadow-sm font-bold" id="tab-kids" onclick="switchStage('kids')">
<span className="material-symbols-outlined text-xl">child_friendly</span>
<span>{t('nutKids')}</span>
</button>
<button className="stage-tab flex-shrink-0 px-space-md py-3 rounded-2xl font-label-lg text-label-lg transition-all flex items-center gap-2 bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high" id="tab-women" onclick="switchStage('women')">
<span className="material-symbols-outlined text-xl">female</span>
<span>{t('nutWomen')}</span>
</button>
<button className="stage-tab flex-shrink-0 px-space-md py-3 rounded-2xl font-label-lg text-label-lg transition-all flex items-center gap-2 bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high" id="tab-mothers" onclick="switchStage('mothers')">
<span className="material-symbols-outlined text-xl">pregnant_woman</span>
<span>{t('nutMothers')}</span>
</button>
<button className="stage-tab flex-shrink-0 px-space-md py-3 rounded-2xl font-label-lg text-label-lg transition-all flex items-center gap-2 bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high" id="tab-men" onclick="switchStage('men')">
<span className="material-symbols-outlined text-xl">agriculture</span>
<span>{t('nutMen')}</span>
</button>
<button className="stage-tab flex-shrink-0 px-space-md py-3 rounded-2xl font-label-lg text-label-lg transition-all flex items-center gap-2 bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high" id="tab-elders" onclick="switchStage('elders')">
<span className="material-symbols-outlined text-xl">elderly</span>
<span>{t('nutElders')}</span>
</button>
</div>
{/*  Tab Content Area  */}
<div className="mt-space-md bg-surface-container-lowest rounded-2xl p-space-md sm:p-space-lg shadow-sm">
{/*  Kids Panel  */}
<div className="stage-content flex flex-col md:flex-row gap-space-lg items-center" id="content-kids">
<div className="w-full md:w-1/3 flex flex-col items-center text-center p-space-md bg-surface-container-low rounded-2xl">
<div className="w-20 h-20 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center mb-3">
<span className="material-symbols-outlined text-4xl">toys</span>
</div>
<h3 className="font-headline-md text-headline-md font-bold text-on-surface">लहान बाळांची वाढ व बुद्धी</h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">
              मेंदूची वाढ आणि वजन योग्य राहण्यासाठी हलका पण भरपूर उष्मांक असणारा आहार गरजेचा.
            </p>
<button className="mt-space-sm flex items-center gap-1 text-primary font-bold text-sm bg-primary-fixed/40 px-3 py-1.5 rounded-full" onclick="playVoiceGuide('लहान मुलांसाठी मऊ भात आणि वरणात अर्धा चमचा साजूक तूप घाला. उकडलेले अंडे, केळी आणि नाचणीची लापशी वजन व बुद्धी वाढीसाठी सर्वोत्तम आहेत.')">
<span className="material-symbols-outlined text-base">volume_up</span>
<span>मुलांचा आहार ऐका</span>
</button>
</div>
<div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
<div className="p-space-sm rounded-xl bg-surface-container-low/70 flex items-start gap-3">
<span className="material-symbols-outlined text-primary text-2xl mt-0.5">rice_bowl</span>
<div>
<span className="font-label-lg text-label-lg text-on-surface block font-bold">मऊ भात व साजूक तूप</span>
<span className="font-body-md text-body-md text-on-surface-variant">वरणात तूप मिसळून भरवा, बाळाला सहज पचते आणि वजन वाढते.</span>
</div>
</div>
<div className="p-space-sm rounded-xl bg-surface-container-low/70 flex items-start gap-3">
<span className="material-symbols-outlined text-secondary text-2xl mt-0.5">egg</span>
<div>
<span className="font-label-lg text-label-lg text-on-surface block font-bold">उकडलेले अंडे किंवा नाचणी लापशी</span>
<span className="font-body-md text-body-md text-on-surface-variant">रोज १ अंड किंवा दुधात शिजवलेली नाचणीची पेज हाडे मजबूत करते.</span>
</div>
</div>
<div className="p-space-sm rounded-xl bg-surface-container-low/70 flex items-start gap-3">
<span className="material-symbols-outlined text-tertiary text-2xl mt-0.5">nutrition</span>
<div>
<span className="font-label-lg text-label-lg text-on-surface block font-bold">पिवळी केळी व चिकू</span>
<span className="font-body-md text-body-md text-on-surface-variant">बाजारचे बिस्किट देण्यापेक्षा पिकलेली केळी कुस्करून देणे आरोग्यास पोषक.</span>
</div>
</div>
<div className="p-space-sm rounded-xl bg-surface-container-low/70 flex items-start gap-3">
<span className="material-symbols-outlined text-surface-tint text-2xl mt-0.5">cookie</span>
<div>
<span className="font-label-lg text-label-lg text-on-surface block font-bold">पौष्टिक लाडू (बेसन/शेंगदाणा)</span>
<span className="font-body-md text-body-md text-on-surface-variant">गूळ, तीळ, आणि डाळीच्या पीठाचे लाडू मधल्या वेळेत भूक लागल्यावर द्या.</span>
</div>
</div>
</div>
</div>
{/*  Women Panel (Hidden by default)  */}
<div className="stage-content hidden flex-col md:flex-row gap-space-lg items-center" id="content-women">
<div className="w-full md:w-1/3 flex flex-col items-center text-center p-space-md bg-surface-container-low rounded-2xl">
<div className="w-20 h-20 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center mb-3">
<span className="material-symbols-outlined text-4xl">woman</span>
</div>
<h3 className="font-headline-md text-headline-md font-bold text-on-surface">रक्तवाढ व ताकद</h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">
              मासिक पाळी आणि कामाचा ताण यामुळे महिलांमध्ये रक्ताची कमतरता (ॲनिमिया) होऊ नये म्हणून.
            </p>
<button className="mt-space-sm flex items-center gap-1 text-primary font-bold text-sm bg-primary-fixed/40 px-3 py-1.5 rounded-full" onclick="playVoiceGuide('महिलांसाठी पालक, मेथी, शेवगा, गूळ-शेंगदाणा चिक्की आणि खजूर फार फायदेशीर आहेत. आठवड्यातून लोहाची गोळी नक्की घ्या.')">
<span className="material-symbols-outlined text-base">volume_up</span>
<span>महिलांचा सल्ला ऐका</span>
</button>
</div>
<div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
<div className="p-space-sm rounded-xl bg-surface-container-low/70 flex items-start gap-3">
<span className="material-symbols-outlined text-primary text-2xl mt-0.5">eco</span>
<div>
<span className="font-label-lg text-label-lg text-on-surface block font-bold">हिरव्या पालेभाज्या भरपूर खा</span>
<span className="font-body-md text-body-md text-on-surface-variant">आठवड्यातून किमान ३-४ वेळा मेथी, पालक, शेपू, किंवा माठाची भाजी खा.</span>
</div>
</div>
<div className="p-space-sm rounded-xl bg-surface-container-low/70 flex items-start gap-3">
<span className="material-symbols-outlined text-error text-2xl mt-0.5">medication</span>
<div>
<span className="font-label-lg text-label-lg text-on-surface block font-bold">आशा ताईंकडून लोह गोळ्या (IFA)</span>
<span className="font-body-md text-body-md text-on-surface-variant">शासकीय मोफत मिळणारी लाल आयर्न गोळी दर आठवड्याला न विसरता घ्या.</span>
</div>
</div>
<div className="p-space-sm rounded-xl bg-surface-container-low/70 flex items-start gap-3">
<span className="material-symbols-outlined text-secondary text-2xl mt-0.5">bakery_dining</span>
<div>
<span className="font-label-lg text-label-lg text-on-surface block font-bold">शेंगदाणा-गूळ चिक्की व खजूर</span>
<span className="font-body-md text-body-md text-on-surface-variant">दुपारच्या चहाऐवजी चिक्कीचा तुकडा किंवा २ काळे खजूर खाण्याची सवय ठेवा.</span>
</div>
</div>
<div className="p-space-sm rounded-xl bg-surface-container-low/70 flex items-start gap-3">
<span className="material-symbols-outlined text-surface-tint text-2xl mt-0.5">water_drop</span>
<div>
<span className="font-label-lg text-label-lg text-on-surface block font-bold">भरपूर शुद्ध पाणी (८-१० ग्लास)</span>
<span className="font-body-md text-body-md text-on-surface-variant">उन्हात काम करताना थकवा येऊ नये म्हणून वेळोवेळी पाणी पीत राहा.</span>
</div>
</div>
</div>
</div>
{/*  Mothers Panel (Hidden by default)  */}
<div className="stage-content hidden flex-col md:flex-row gap-space-lg items-center" id="content-mothers">
<div className="w-full md:w-1/3 flex flex-col items-center text-center p-space-md bg-surface-container-low rounded-2xl">
<div className="w-20 h-20 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center mb-3">
<span className="material-symbols-outlined text-4xl">favorite</span>
</div>
<h3 className="font-headline-md text-headline-md font-bold text-on-surface">माता व बाळाचे रक्षण</h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">
              गर्भावस्थेत आईचे १ किलो वजन बाळासाठी अमूल्य असते. रोज एक अतिरिक्त घास आणि आराम महत्त्वाचा.
            </p>
<button className="mt-space-sm flex items-center gap-1 text-primary font-bold text-sm bg-primary-fixed/40 px-3 py-1.5 rounded-full" onclick="playVoiceGuide('गरोदर मातेने दररोज एक वाटी जास्त जेवण करावे. डाळी, दूध, उकडलेले अंडे, फळे आणि सरकारी कॅल्शियम-आयर्न गोळ्या वेळेवर घ्या.')">
<span className="material-symbols-outlined text-base">volume_up</span>
<span>मातेचा सल्ला ऐका</span>
</button>
</div>
<div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
<div className="p-space-sm rounded-xl bg-surface-container-low/70 flex items-start gap-3">
<span className="material-symbols-outlined text-primary text-2xl mt-0.5">add_shopping_cart</span>
<div>
<span className="font-label-lg text-label-lg text-on-surface block font-bold">एक जास्तीची पोळी व वाटीभर वरण</span>
<span className="font-body-md text-body-md text-on-surface-variant">पोटातल्या बाळाच्या योग्य वाढीसाठी नियमित आहारापेक्षा थोडे अधिक खाणे गरजेचे.</span>
</div>
</div>
<div className="p-space-sm rounded-xl bg-surface-container-low/70 flex items-start gap-3">
<span className="material-symbols-outlined text-secondary text-2xl mt-0.5">local_hospital</span>
<div>
<span className="font-label-lg text-label-lg text-on-surface block font-bold">कॅल्शियम व फॉलिक ॲसिड</span>
<span className="font-body-md text-body-md text-on-surface-variant">प्राथमिक आरोग्य केंद्रातील मोफत गोळ्या नियमित वेळेत न चुकता घ्या.</span>
</div>
</div>
<div className="p-space-sm rounded-xl bg-surface-container-low/70 flex items-start gap-3">
<span className="material-symbols-outlined text-tertiary text-2xl mt-0.5">egg_alt</span>
<div>
<span className="font-label-lg text-label-lg text-on-surface block font-bold">दूध, अंडी व मोड आलेली कडधान्ये</span>
<span className="font-body-md text-body-md text-on-surface-variant">बाळाची हाडे व स्नायू मजबूत बनवण्यासाठी घरात सहज उपलब्ध प्रथिने घ्या.</span>
</div>
</div>
<div className="p-space-sm rounded-xl bg-surface-container-low/70 flex items-start gap-3">
<span className="material-symbols-outlined text-error text-2xl mt-0.5">bedtime</span>
<div>
<span className="font-label-lg text-label-lg text-on-surface block font-bold">दुपारी २ तास डाव्या कुशीवर झोप</span>
<span className="font-body-md text-body-md text-on-surface-variant">डाव्या कुशीवर झोपल्याने गर्भाशयाकडे रक्ताभिसरण छान होते.</span>
</div>
</div>
</div>
</div>
{/*  Men / Farmers Panel (Hidden)  */}
<div className="stage-content hidden flex-col md:flex-row gap-space-lg items-center" id="content-men">
<div className="w-full md:w-1/3 flex flex-col items-center text-center p-space-md bg-surface-container-low rounded-2xl">
<div className="w-20 h-20 rounded-full bg-primary-fixed text-primary flex items-center justify-center mb-3">
<span className="material-symbols-outlined text-4xl">fitness_center</span>
</div>
<h3 className="font-headline-md text-headline-md font-bold text-on-surface">कष्टकरी शेतकरी बांधव</h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">
              उन्हातान्हातील शेतकामासाठी आणि घामातून निघून जाणारे क्षार भरून काढण्यासाठी पोलादी खुराक.
            </p>
<button className="mt-space-sm flex items-center gap-1 text-primary font-bold text-sm bg-primary-fixed/40 px-3 py-1.5 rounded-full" onclick="playVoiceGuide('कष्टकरी शेतकऱ्यांसाठी बाजरी, लसणाची चटणी, कांदा, गूळ पाणी आणि ताक शरीरातील उष्णता कमी करून दिवसभर ताकद टिकवून ठेवतात.')">
<span className="material-symbols-outlined text-base">volume_up</span>
<span>शेतकऱ्यांचा सल्ला ऐका</span>
</button>
</div>
<div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
<div className="p-space-sm rounded-xl bg-surface-container-low/70 flex items-start gap-3">
<span className="material-symbols-outlined text-primary text-2xl mt-0.5">grain</span>
<div>
<span className="font-label-lg text-label-lg text-on-surface block font-bold">बाजरीची किंवा ज्वारीची जाड भाकरी</span>
<span className="font-body-md text-body-md text-on-surface-variant">पोटात दीर्घकाळ ऊर्जा टिकवते आणि शेतातील श्रमासाठी सहनशक्ती देते.</span>
</div>
</div>
<div className="p-space-sm rounded-xl bg-surface-container-low/70 flex items-start gap-3">
<span className="material-symbols-outlined text-secondary text-2xl mt-0.5">water_full</span>
<div>
<span className="font-label-lg text-label-lg text-on-surface block font-bold">उन्हाळ्यात गूळ-पाणी व ताक</span>
<span className="font-body-md text-body-md text-on-surface-variant">उष्माघात (Sunstroke) टाळण्यासाठी दुपारच्या वेळी भरपूर ताक आणि गूळ-पाणी प्या.</span>
</div>
</div>
<div className="p-space-sm rounded-xl bg-surface-container-low/70 flex items-start gap-3">
<span className="material-symbols-outlined text-surface-tint text-2xl mt-0.5">restaurant_menu</span>
<div>
<span className="font-label-lg text-label-lg text-on-surface block font-bold">कांदा आणि लसूण चटणी</span>
<span className="font-body-md text-body-md text-on-surface-variant">शरीरातील उष्णता नियंत्रित ठेवते आणि रोगप्रतिकारक शक्ती वाढवते.</span>
</div>
</div>
<div className="p-space-sm rounded-xl bg-surface-container-low/70 flex items-start gap-3">
<span className="material-symbols-outlined text-tertiary text-2xl mt-0.5">block</span>
<div>
<span className="font-label-lg text-label-lg text-on-surface block font-bold">तंबाखू व अति चहा टाळा</span>
<span className="font-body-md text-body-md text-on-surface-variant">उपाशीपोटी कडक चहा व गुटखा टाळावा; त्याऐवजी भाजलेले फुटाणे खावेत.</span>
</div>
</div>
</div>
</div>
{/*  Elders Panel (Hidden)  */}
<div className="stage-content hidden flex-col md:flex-row gap-space-lg items-center" id="content-elders">
<div className="w-full md:w-1/3 flex flex-col items-center text-center p-space-md bg-surface-container-low rounded-2xl">
<div className="w-20 h-20 rounded-full bg-secondary-fixed-dim text-on-secondary-fixed flex items-center justify-center mb-3">
<span className="material-symbols-outlined text-4xl">elderly</span>
</div>
<h3 className="font-headline-md text-headline-md font-bold text-on-surface">ज्येष्ठ आजी-आजोबा</h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">
              वय झाल्यावर दात आणि पचनशक्ती कमकुवत होते. त्यामुळे पचायला हलका आणि हाडे मजबूत ठेवणारा आहार.
            </p>
<button className="mt-space-sm flex items-center gap-1 text-primary font-bold text-sm bg-primary-fixed/40 px-3 py-1.5 rounded-full" onclick="playVoiceGuide('ज्येष्ठ नागरिकांसाठी नाचणीची मऊ आंबील किंवा पेज, मऊ मुगाची खिचडी, पपई आणि कमी मीठ असलेला आहार उत्तम राहतो.')">
<span className="material-symbols-outlined text-base">volume_up</span>
<span>ज्येष्ठांचा सल्ला ऐका</span>
</button>
</div>
<div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
<div className="p-space-sm rounded-xl bg-surface-container-low/70 flex items-start gap-3">
<span className="material-symbols-outlined text-primary text-2xl mt-0.5">soup_kitchen</span>
<div>
<span className="font-label-lg text-label-lg text-on-surface block font-bold">नाचणीची पेज / आंबील</span>
<span className="font-body-md text-body-md text-on-surface-variant">गुडघेदुखी आणि हाडे ठिसूळ होण्यावर नाचणीचे कॅल्शियम रामबाण आहे.</span>
</div>
</div>
<div className="p-space-sm rounded-xl bg-surface-container-low/70 flex items-start gap-3">
<span className="material-symbols-outlined text-secondary text-2xl mt-0.5">ramen_dining</span>
<div>
<span className="font-label-lg text-label-lg text-on-surface block font-bold">मऊ मुगाची डाळ-खिचडी</span>
<span className="font-body-md text-body-md text-on-surface-variant">पचायला अतिशय हलकी, पोट साफ ठेवते आणि गॅसेसचा त्रास होत नाही.</span>
</div>
</div>
<div className="p-space-sm rounded-xl bg-surface-container-low/70 flex items-start gap-3">
<span className="material-symbols-outlined text-error text-2xl mt-0.5">heart_broken</span>
<div>
<span className="font-label-lg text-label-lg text-on-surface block font-bold">कमी मीठ आणि कमी तेल</span>
<span className="font-body-md text-body-md text-on-surface-variant">रक्तदाब (BP) आणि हृदय निरोगी राहण्यासाठी वरून मीठ घेणे बंद करा.</span>
</div>
</div>
<div className="p-space-sm rounded-xl bg-surface-container-low/70 flex items-start gap-3">
<span className="material-symbols-outlined text-tertiary text-2xl mt-0.5">nutrition</span>
<div>
<span className="font-label-lg text-label-lg text-on-surface block font-bold">पपई व पेरूचे मऊ तुकडे</span>
<span className="font-body-md text-body-md text-on-surface-variant">बद्धकोष्ठतेचा त्रास होऊ नये म्हणून रोज थोडे ताजे फळ खावे.</span>
</div>
</div>
</div>
</div>
</div>
</section>
{/*  3. Low-Cost Village Superfoods (कमी खर्चात जास्त पोषण - स्थानिक खजिना)  */}
<section className="flex flex-col gap-space-md">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-xs">
<div>
<span className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold">गावरान सुपरफूड</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">
            कमी खर्चात जास्त पोषण - आपल्या गावचा खजिना
          </h2>
<p className="font-body-md text-body-md text-on-surface-variant">
            महागडी सफरचंद किंवा सुकामेवा नको, आपल्या परसबागेत आणि रानातच आहे अमृताचे पोषण!
          </p>
</div>
<div className="flex items-center gap-2">
<button className="flex items-center gap-1.5 px-space-sm py-2 rounded-full bg-surface-container-low text-primary font-label-md text-label-md hover:bg-surface-container-high transition-all" onclick="playVoiceGuide('शेवगा, नाचणी, गूळ-फुटाणे आणि मोड आलेली कडधान्ये हे आपल्या गावचे सर्वात मोठे सुपरफूड आहेत. कमी पैशात सर्वोत्तम ताकद.')">
<span className="material-symbols-outlined text-lg">volume_up</span>
<span>स्थानिक खजिना ऐका</span>
</button>
</div>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
{/*  Card 1: Shevga  */}
<div className="bg-surface-container-lowest rounded-3xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
<div>
<div className="w-14 h-14 rounded-2xl bg-primary-fixed/60 text-primary flex items-center justify-center mb-space-sm group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-3xl">spa</span>
</div>
<div className="inline-block px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-bold text-xs mb-2">
              परसबागेत मोफत
            </div>
<h3 className="font-headline-md text-headline-md font-bold text-on-surface">सहज मिळणारा शेवगा</h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
              शेवग्याच्या पाल्यात आणि शेंगांमध्ये <strong>दुधापेक्षा ४ पट कॅल्शियम</strong> आणि संत्र्यापेक्षा ७ पट जास्त व्हिटॅमिन सी असते!
            </p>
</div>
<div className="mt-space-md pt-space-xs border-t border-surface-container flex items-center justify-between text-xs text-primary font-bold">
<span>शेवगा आमटी व भाजी खा</span>
<span className="material-symbols-outlined text-base">arrow_forward</span>
</div>
</div>
{/*  Card 2: Nachani  */}
<div className="bg-surface-container-lowest rounded-3xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
<div>
<div className="w-14 h-14 rounded-2xl bg-secondary-fixed text-secondary flex items-center justify-center mb-space-sm group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-3xl">grass</span>
</div>
<div className="inline-block px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-xs mb-2">
              किफायतशीर धान्य
            </div>
<h3 className="font-headline-md text-headline-md font-bold text-on-surface">नाचणी (रागी)</h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
              हाडे पोलादी करण्यासाठी सर्वोत्तम! लहान मुलांचे वजन आणि ज्येष्ठांची हाडे ठिसूळ न होण्यासाठी नाचणीची भाकरी व लापशी अमृतासमान.
            </p>
</div>
<div className="mt-space-md pt-space-xs border-t border-surface-container flex items-center justify-between text-xs text-secondary font-bold">
<span>कॅल्शियमचा सम्राट</span>
<span className="material-symbols-outlined text-base">arrow_forward</span>
</div>
</div>
{/*  Card 3: Gul & Shenga/Harbhare  */}
<div className="bg-surface-container-lowest rounded-3xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
<div>
<div className="w-14 h-14 rounded-2xl bg-error-container text-error flex items-center justify-center mb-space-sm group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-3xl">bloodtype</span>
</div>
<div className="inline-block px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-bold text-xs mb-2">
              रक्तवाढीचा तोडगा
            </div>
<h3 className="font-headline-md text-headline-md font-bold text-on-surface">गूळ आणि हरभरे/शेंगदाणे</h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
              ॲनिमिया (रक्तकमी) वर सर्वात सोपा व रामबाण उपाय. मुली आणि महिलांना चक्कर, दम लागणे थांबवण्यासाठी दररोज एक मूठ द्या.
            </p>
</div>
<div className="mt-space-md pt-space-xs border-t border-surface-container flex items-center justify-between text-xs text-error font-bold">
<span>नैसर्गिक आयर्न टॉनिक</span>
<span className="material-symbols-outlined text-base">arrow_forward</span>
</div>
</div>
{/*  Card 4: Sprouts  */}
<div className="bg-surface-container-lowest rounded-3xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
<div>
<div className="w-14 h-14 rounded-2xl bg-primary-fixed-dim text-on-primary-fixed flex items-center justify-center mb-space-sm group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-3xl">psychology</span>
</div>
<div className="inline-block px-2.5 py-0.5 rounded-full bg-primary-fixed-dim text-on-primary-fixed font-bold text-xs mb-2">
              जीवंत अन्न
            </div>
<h3 className="font-headline-md text-headline-md font-bold text-on-surface">अंकुरित कडधान्ये (Sprouts)</h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
              मोड आलेली मटकी, मूग आणि चणे. मोड आणल्याने त्यातील पोषण दुपटीने वाढते आणि पोटातील पचनशक्ती स्वच्छ राहते.
            </p>
</div>
<div className="mt-space-md pt-space-xs border-t border-surface-container flex items-center justify-between text-xs text-primary font-bold">
<span>प्रथिने आणि फायबर</span>
<span className="material-symbols-outlined text-base">arrow_forward</span>
</div>
</div>
</div>
</section>
{/*  4. Interactive Daily Nutrition Checklist (माझ्या ताटात आज काय होते?)  */}
<section className="bg-surface-container-low rounded-3xl p-space-md sm:p-space-lg shadow-sm">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
{/*  Checklist Form  */}
<div className="lg:col-span-7 flex flex-col gap-space-md">
<div>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md font-bold mb-1.5">
<span className="material-symbols-outlined text-base">fact_check</span>
              रोजचा सोपा हिशोब
            </span>
<h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              माझ्या ताटात आज काय होते? (तपासा)
            </h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">
              आज तुम्ही किंवा तुमच्या मुलांनी काय खाल्ले? खालील चौकोनांवर बोट ठेवून टिक करा:
            </p>
</div>
{/*  Clickable Checklist Tiles  */}
<div className="flex flex-col gap-space-xs">
<label className="flex items-center gap-space-sm p-space-sm bg-surface-container-lowest rounded-2xl shadow-sm cursor-pointer hover:bg-surface-container transition-all active:scale-[0.99]">
<input checked="" className="w-7 h-7 rounded-lg text-primary accent-primary cursor-pointer" id="check-veg" onchange="updatePlateScore()" type="checkbox"/>
<div className="flex-1">
<span className="font-headline-md text-headline-md text-on-surface font-bold block">१. किमान १ हिरवी भाजी किंवा कोशिंबीर खाल्ली?</span>
<span className="font-body-md text-body-md text-on-surface-variant">पालक, मेथी, शेवगा, काकडी किंवा टोमॅटो</span>
</div>
<span className="material-symbols-outlined text-primary text-2xl">eco</span>
</label>
<label className="flex items-center gap-space-sm p-space-sm bg-surface-container-lowest rounded-2xl shadow-sm cursor-pointer hover:bg-surface-container transition-all active:scale-[0.99]">
<input checked="" className="w-7 h-7 rounded-lg text-primary accent-primary cursor-pointer" id="check-dal" onchange="updatePlateScore()" type="checkbox"/>
<div className="flex-1">
<span className="font-headline-md text-headline-md text-on-surface font-bold block">२. १ वाटी घट्ट डाळ, उसळ किंवा अंडे घेतले?</span>
<span className="font-body-md text-body-md text-on-surface-variant">तूर डाळ, मूग, मटकी किंवा उकडलेले अंडे</span>
</div>
<span className="material-symbols-outlined text-secondary text-2xl">soup_kitchen</span>
</label>
<label className="flex items-center gap-space-sm p-space-sm bg-surface-container-lowest rounded-2xl shadow-sm cursor-pointer hover:bg-surface-container transition-all active:scale-[0.99]">
<input checked="" className="w-7 h-7 rounded-lg text-primary accent-primary cursor-pointer" id="check-water" onchange="updatePlateScore()" type="checkbox"/>
<div className="flex-1">
<span className="font-headline-md text-headline-md text-on-surface font-bold block">३. भरपूर शुद्ध पाणी किंवा ताक प्यायले?</span>
<span className="font-body-md text-body-md text-on-surface-variant">किमान ६ ते ८ भांडी/ग्लास स्वच्छ पाणी</span>
</div>
<span className="material-symbols-outlined text-surface-tint text-2xl">water_drop</span>
</label>
<label className="flex items-center gap-space-sm p-space-sm bg-surface-container-lowest rounded-2xl shadow-sm cursor-pointer hover:bg-surface-container transition-all active:scale-[0.99]">
<input checked="" className="w-7 h-7 rounded-lg text-primary accent-primary cursor-pointer" id="check-jaggery" onchange="updatePlateScore()" type="checkbox"/>
<div className="flex-1">
<span className="font-headline-md text-headline-md text-on-surface font-bold block">४. जेवणानंतर गूळ-शेंगदाणे किंवा फळ खाल्ले?</span>
<span className="font-body-md text-body-md text-on-surface-variant">रक्तवाढ आणि तातडीच्या ऊर्जेसाठी आवश्यक</span>
</div>
<span className="material-symbols-outlined text-error text-2xl">nutrition</span>
</label>
</div>
</div>
{/*  Interactive Score Card with Visual Progress Wheel  */}
<div className="lg:col-span-5 bg-surface-container-lowest rounded-3xl p-space-md sm:p-space-lg shadow-md flex flex-col items-center text-center">
<h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-2">आजचा पोषण निकाल</h3>
{/*  Animated Progress Dial (Inline SVG < 2KB)  */}
<div className="relative w-44 h-44 flex items-center justify-center my-space-xs">
<svg className="w-full h-full transform -rotate-90" viewbox="0 0 100 100">
<circle className="text-surface-container-high" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeWidth="10"></circle>
<circle className="text-primary transition-all duration-700" cx="50" cy="50" fill="transparent" id="score-circle" r="40" stroke="currentColor" stroke-dasharray="251.2" stroke-dashoffset="50.24" strokeLinecap="round" strokeWidth="10"></circle>
</svg>
<div className="absolute flex flex-col items-center justify-center">
<span className="font-headline-xl text-headline-xl font-bold text-primary" id="score-percent">१००%</span>
<span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">सकस ताट</span>
</div>
</div>
<div className="mt-2 px-space-md py-2 rounded-2xl bg-primary-fixed/50 text-on-primary-fixed font-bold font-headline-md text-headline-md flex items-center gap-1.5" id="score-badge">
<span className="material-symbols-outlined text-xl">star</span>
<span id="score-message">छान! तुमचे आजचे ताट पूर्ण निरोगी आहे! ⭐</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mt-3 max-w-xs" id="score-tip">
            असेच दररोज खात राहा; डॉक्टरांचा खर्च वाचेल आणि संपूर्ण कुटुंब निरोगी राहील.
          </p>
<button className="mt-space-md w-full py-3 rounded-2xl bg-primary-container text-on-primary font-audio-banner text-audio-banner flex items-center justify-center gap-2 hover:bg-primary transition-all shadow-sm" onclick="readScoreVoice()">
<span className="material-symbols-outlined text-2xl">record_voice_over</span>
<span>हा निकाल मोठ्याने सांगा</span>
</button>
</div>
</div>
</section>
{/*  Bottom Emergency & ASHA Contact Micro-Bar  */}
<section className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col sm:flex-row items-center justify-between gap-space-md border border-outline-variant/30">
<div className="flex items-center gap-space-sm">
<div className="w-12 h-12 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center">
<span className="material-symbols-outlined text-2xl">call</span>
</div>
<div>
<span className="font-headline-md text-headline-md text-on-surface font-bold block">आहार व पोषण शंका आहे?</span>
<span className="font-body-md text-body-md text-on-surface-variant">तुमच्या गावातील आशा ताई किंवा अंगणवाडी सेविकेशी थेट बोला.</span>
</div>
</div>
<div className="flex items-center gap-space-sm w-full sm:w-auto">
<a className="w-full sm:w-auto px-space-md py-3 rounded-xl bg-secondary text-on-secondary font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-sm hover:bg-secondary/90 transition-all" href="tel:104">
<span className="material-symbols-outlined text-xl">medical_services</span>
<span>१०४ आरोग्य सल्ला</span>
</a>
</div>
</section>
</div>
{/*  Audio Toast Element for Voice Guidance Feedback  */}
<div className="fixed bottom-6 right-6 max-w-sm bg-surface-container-highest text-on-surface px-4 py-3 rounded-2xl shadow-xl border border-primary/20 hidden flex-items-center gap-3 z-50" id="audio-toast">
<div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center animate-spin">
<span className="material-symbols-outlined text-sm">music_note</span>
</div>
<div className="flex-1 text-sm font-bold" id="audio-toast-text">
      आवाज चालू आहे...
    </div>
</div>

</ReadAloud>
</div></main><Footer />
    </div>
  );
};

export default Nutrition;
