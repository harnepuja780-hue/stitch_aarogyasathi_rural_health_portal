import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [isReadAloud, setIsReadAloud] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('normal');

  return (
    <div className={`bg-background font-body-lg text-body-lg text-on-surface antialiased min-h-screen ${isHighContrast ? 'contrast-125 brightness-95' : ''}`} style={{ fontSize: fontSize === 'large' ? '18px' : '16px' }}>
      <header className="fixed top-0 w-full z-50 bg-surface/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(27,131,84,0.08)]">
        <div className="h-24 max-w-7xl mx-auto px-margin flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md">
            <div className="flex items-center gap-space-sm">
              <div className="p-1 bg-surface-container-lowest rounded-xl shadow-[0_2px_6px_-1px_rgba(30,41,59,0.06)]">
                <span className="material-symbols-outlined text-primary text-3xl">health_and_safety</span>
              </div>
              <div>
                <div className="flex items-center gap-space-xs">
                  <span className="font-headline-md text-headline-md text-primary font-bold tracking-tight">आरोग्यसाथी</span>
                  <span className="hidden lg:inline text-outline-variant">|</span>
                  <span className="hidden lg:inline font-headline-md text-headline-md text-secondary font-semibold">AarogyaSathi</span>
                </div>
                <span className="hidden xl:inline-block px-space-xs py-0.5 rounded-full bg-primary-fixed/50 text-on-primary-fixed-variant font-label-md text-label-md font-medium">आरोग्याची माहिती, तुमच्या सोप्या भाषेत.</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-space-sm">
            <button className="hidden sm:flex items-center gap-1.5 px-space-sm py-2 rounded-full bg-surface-container-lowest text-primary font-label-md text-label-md shadow-[0_2px_6px_-1px_rgba(30,41,59,0.06)] hover:bg-surface-container-low transition-all active:translate-y-0.5" type="button" onClick={() => setIsReadAloud(!isReadAloud)}>
              <span className="material-symbols-outlined text-lg text-primary">{isReadAloud ? 'sync' : 'volume_up'}</span>
              <span>{isReadAloud ? 'वाचत आहे...' : 'मोठ्याने ऐका'}</span>
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-low text-on-surface font-label-lg text-label-lg hover:bg-surface-container-high transition-all active:translate-y-0.5" type="button" onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}>
              <span className="font-bold">अ / A+</span>
            </button>
            <button className="flex items-center gap-2 px-space-md py-2.5 rounded-full bg-primary-container text-on-primary font-audio-banner text-audio-banner shadow-[0_4px_16px_-2px_rgba(27,131,84,0.3)] hover:bg-primary transition-all active:translate-y-0.5 animate-pulse" type="button" onClick={() => setIsVoiceModalOpen(true)}>
              <span className="material-symbols-outlined text-2xl">mic</span>
              <span className="hidden md:inline font-bold">माइक दाबा</span>
            </button>
          </div>
        </div>
      </header>

      <main className="w-full pt-24 bg-background min-h-screen">
        <div className="flex flex-col w-full">
          {/* Accessibility & Comfort Control Strip */}
          <div className="w-full bg-surface-container-low py-space-sm px-margin shadow-sm">
            <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-space-sm">
              <div className="flex items-center gap-space-xs">
                <button className={`flex items-center gap-2 px-space-md py-2.5 rounded-full ${isReadAloud ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-primary'} font-label-lg text-label-lg shadow-sm hover:bg-surface-container-high transition-all active:translate-y-0.5`} type="button" onClick={() => setIsReadAloud(!isReadAloud)}>
                  <span className={`material-symbols-outlined text-xl ${isReadAloud ? 'animate-spin' : ''}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                    {isReadAloud ? 'sync' : 'volume_up'}
                  </span>
                  <span className="font-bold">{isReadAloud ? 'वाचत आहे... (Stop)' : 'मोठ्याने ऐका (Listen)'}</span>
                </button>
              </div>
              <div className="flex items-center flex-wrap gap-2">
                <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${isHighContrast ? 'bg-on-surface text-surface' : 'bg-surface-container-lowest text-on-surface-variant'} font-label-md text-label-md shadow-sm transition-all`} type="button" onClick={() => setIsHighContrast(!isHighContrast)}>
                  <span className="material-symbols-outlined text-lg">contrast</span>
                  <span>रंग कॉन्ट्रास्ट</span>
                </button>
              </div>
            </div>
          </div>

          <div className="w-full max-w-6xl mx-auto px-margin py-space-md sm:py-space-lg flex flex-col gap-space-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-space-md bg-surface-container-lowest p-space-md sm:p-space-lg rounded-2xl shadow-sm">
              <div className="flex items-center gap-space-md">
                <img alt="आरोग्यसाथी Logo" className="h-16 w-auto object-contain rounded-md" src="https://lh3.googleusercontent.com/aida/AEtjO1X67sjTEMMppA4-FjK6nNYKLNJXTETiNpUA_rO5ii4QMyB9E91q-LyFpP72sc1IFdC05zdXRNyIv_mvwdUB9pgVCvvu91NpZ9cFYutAmXBw-msWgYqJtU68MutdxyY1fWHgMYhDEwSg4_1jzuIQ1GkaUn3DgOmjQ811ob94cj9ye7pyZdS2b88SbZNx-izocgd39r-JiNG2_3U5PKGjffuX-UX8mrDUg8-mJM3p8DfpDpZNPiO-jDJDlA" />
                <div className="hidden sm:block">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md font-semibold">
                    <span className="material-symbols-outlined text-sm">verified</span>
                    <span>विश्वसनीय आरोग्य मित्र</span>
                  </div>
                  <p className="font-headline-md text-headline-md text-on-surface font-bold mt-1">आरोग्याची माहिती, तुमच्या सोप्या भाषेत.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg items-stretch mt-4">
              {/* CARD 1: Guest Start */}
              <div className="flex flex-col justify-between rounded-2xl bg-surface-container-lowest p-space-lg shadow-md hover:shadow-xl transition-all duration-200 relative group overflow-hidden">
                <div className="h-2 w-full bg-primary-container absolute top-0 left-0"></div>
                <div className="flex flex-col gap-space-sm pt-2">
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold mt-2">
                    Guest म्हणून सुरू करा
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
                    कोणतीही नोंदणी किंवा पासवर्ड नको. थेट मुख्य पानावर जा.
                  </p>
                </div>
                <Link to="/home" className="mt-space-md w-full min-h-[56px] flex items-center justify-center gap-2 px-space-md py-3.5 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg font-bold shadow-md hover:bg-primary transition-all active:translate-y-0.5 text-center">
                  <span>थेट पुढे जा (Go to Home)</span>
                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                </Link>
              </div>

              {/* CARD 2: Login with Mobile */}
              <div className="flex flex-col justify-between rounded-2xl bg-surface-container-lowest p-space-lg shadow-md hover:shadow-xl transition-all duration-200 relative group overflow-hidden">
                <div className="h-2 w-full bg-secondary absolute top-0 left-0"></div>
                <div className="flex flex-col gap-space-sm pt-2">
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold mt-2">
                    मोबाइल नंबरने Login करा
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
                    तुमचा १० अंकी फोन नंबर टाकून सुरक्षित प्रवेश करा.
                  </p>
                </div>
                <button type="button" onClick={() => setIsMobileModalOpen(true)} className="mt-space-md w-full min-h-[56px] flex items-center justify-center gap-2 px-space-md py-3.5 rounded-xl bg-surface-container-high text-on-secondary-container font-label-lg text-label-lg font-bold shadow-sm hover:bg-secondary-fixed transition-all active:translate-y-0.5 text-center">
                  <span className="material-symbols-outlined text-xl">dialpad</span>
                  <span>फोन नंबरने सुरू करा →</span>
                </button>
              </div>

              {/* CARD 3: Voice Assistance */}
              <div className="flex flex-col justify-between rounded-2xl bg-surface-container-lowest p-space-lg shadow-md hover:shadow-xl transition-all duration-200 relative group overflow-hidden">
                <div className="h-2 w-full bg-tertiary-container absolute top-0 left-0"></div>
                <div className="flex flex-col gap-space-sm pt-2">
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold mt-2">
                    व्हॉइस असिस्टंट (बोलून शोधा)
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
                    टाईप करण्याची किंवा वाचण्याची अजिबात गरज नाही! फक्त माईक दाबा आणि विचारा.
                  </p>
                </div>
                <button type="button" onClick={() => setIsVoiceModalOpen(true)} className="mt-space-md w-full min-h-[56px] flex items-center justify-center gap-2 px-space-md py-3.5 rounded-xl bg-tertiary text-on-tertiary font-label-lg text-label-lg font-bold shadow-md hover:bg-tertiary-container transition-all active:translate-y-0.5 text-center">
                  <span className="material-symbols-outlined text-2xl animate-pulse">mic</span>
                  <span>माइक सुरू करा (Start Voice)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Voice Modal */}
      {isVoiceModalOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-lg bg-surface-container-lowest rounded-3xl p-space-lg shadow-2xl flex flex-col items-center text-center gap-space-md animate-in fade-in duration-200">
            <div className="flex items-center justify-between w-full">
              <span className="font-label-lg text-label-lg text-primary font-bold">मराठी व्हॉइस मदत कक्ष</span>
              <button type="button" onClick={() => setIsVoiceModalOpen(false)} className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-surface-variant">
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
            <div className="relative my-4 flex items-center justify-center">
              <div className="absolute w-28 h-28 rounded-full bg-primary-fixed-dim/40 animate-ping"></div>
              <div className="w-24 h-24 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg relative z-10">
                <span className="material-symbols-outlined text-5xl">mic</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-headline-lg text-headline-lg text-on-surface font-bold">आता बोला, आम्ही ऐकत आहोत...</p>
              <p className="font-body-lg text-body-lg text-on-surface-variant">उदा. "माझ्या डोक्यात दुखत आहे"</p>
            </div>
            <button type="button" onClick={() => setIsVoiceModalOpen(false)} className="w-full py-3 rounded-full bg-surface-container text-on-surface font-label-lg text-label-lg font-bold hover:bg-surface-variant">
              थांबवा (Cancel)
            </button>
          </div>
        </div>
      )}

      {/* Mobile Login Modal */}
      {isMobileModalOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl p-space-lg shadow-2xl flex flex-col gap-space-md animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-headline-md text-headline-md text-on-surface font-bold">सुरक्षित प्रवेश (Login)</span>
              </div>
              <button type="button" onClick={() => setIsMobileModalOpen(false)} className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-surface-variant">
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-1.5 mt-4">
              <label className="font-label-md text-label-md text-on-surface font-bold" htmlFor="phoneInput">मोबाइल क्रमांक</label>
              <div className="flex items-center gap-2 p-2 bg-surface-container-low rounded-xl">
                <span className="font-label-lg text-label-lg font-bold text-on-surface px-2">+91</span>
                <input id="phoneInput" type="tel" maxLength="10" placeholder="98XXXXXXXX" className="w-full bg-transparent font-headline-md text-headline-md text-on-surface focus:outline-none" />
              </div>
            </div>
            <button type="button" onClick={() => setIsMobileModalOpen(false)} className="w-full min-h-[56px] rounded-xl bg-secondary text-on-secondary font-label-lg text-label-lg font-bold shadow-md hover:bg-on-secondary-container transition-all flex items-center justify-center gap-2">
              <span>OTP पाठवा (Send OTP)</span>
              <span className="material-symbols-outlined text-xl">send</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Welcome;

