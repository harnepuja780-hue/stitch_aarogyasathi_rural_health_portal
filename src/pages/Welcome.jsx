import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import BackendStatusBanner from '../components/layout/BackendStatusBanner';
import { useLanguage } from '../hooks/useLanguage';
import { useAuth } from '../hooks/useAuth';

const OTP_ERROR_MESSAGES = {
  INVALID_MOBILE: 'otpErrorInvalidMobile',
  INVALID_OTP_FORMAT: 'otpErrorInvalidCode',
  INVALID_OTP: 'otpErrorInvalidCode',
  OTP_EXPIRED: 'otpErrorExpired',
  TOO_MANY_ATTEMPTS: 'otpErrorTooManyAttempts',
  TOO_MANY_REQUESTS: 'otpErrorTooManyRequests',
  OTP_ALREADY_SENT: 'otpErrorAlreadySent',
  NETWORK_ERROR: 'otpErrorNetwork',
  LOGIN_FAILED: 'otpErrorLoginFailed',
};

const Welcome = () => {
  const { t } = useLanguage();
  const { requestOtp, loginWithOtp, enterGuest } = useAuth();
  const navigate = useNavigate();
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [isReadAloud, setIsReadAloud] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('normal');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpRequested, setOtpRequested] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [devOtpHint, setDevOtpHint] = useState('');
  const [authError, setAuthError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const phoneInputRef = useRef(null);

  const handleGuestContinue = () => {
    enterGuest();
    navigate('/home');
  };

  const openMobileModal = () => {
    setAuthError('');
    setOtpRequested(false);
    setOtp('');
    setMobile('');
    setDevOtpHint('');
    setLoginSuccess(false);
    setIsMobileModalOpen(true);
    setTimeout(() => phoneInputRef.current?.focus(), 50);
  };

  const closeMobileModal = () => {
    if (isSendingOtp || isVerifying) return;
    setIsMobileModalOpen(false);
  };

  const handleSendOtp = async () => {
    setAuthError('');
    setDevOtpHint('');
    setIsSendingOtp(true);
    const result = await requestOtp(mobile);
    setIsSendingOtp(false);
    if (result.ok) {
      setOtpRequested(true);
      if (result.devOtp) setDevOtpHint(result.devOtp);
    } else {
      setAuthError(OTP_ERROR_MESSAGES[result.error] || OTP_ERROR_MESSAGES.LOGIN_FAILED);
    }
  };

  const handleVerifyOtp = async () => {
    setAuthError('');
    setIsVerifying(true);
    const result = await loginWithOtp(mobile, otp);
    setIsVerifying(false);
    if (result.ok) {
      setLoginSuccess(true);
      setTimeout(() => {
        setIsMobileModalOpen(false);
        navigate('/home');
      }, 800);
    } else {
      setAuthError(OTP_ERROR_MESSAGES[result.error] || OTP_ERROR_MESSAGES.LOGIN_FAILED);
    }
  };

  return (
    <div className={`bg-background font-body-lg text-body-lg text-on-surface antialiased min-h-screen flex flex-col ${isHighContrast ? 'contrast-125 brightness-95' : ''}`} style={{ fontSize: fontSize === 'large' ? '18px' : '16px' }}>
      <BackendStatusBanner />
      <Navbar 
        isReadAloud={isReadAloud} 
        setIsReadAloud={setIsReadAloud}
        fontSize={fontSize}
        setFontSize={setFontSize}
        setIsVoiceModalOpen={setIsVoiceModalOpen}
      />

      <main className="w-full pt-24 bg-background flex-grow">
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
                <Link to="/home" onClick={handleGuestContinue} className="mt-space-md w-full min-h-[56px] flex items-center justify-center gap-2 px-space-md py-3.5 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg font-bold shadow-md hover:bg-primary transition-all active:translate-y-0.5 text-center">
                  <span>{t('guestLogin')}</span>
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
                <button type="button" onClick={openMobileModal} className="mt-space-md w-full min-h-[56px] flex items-center justify-center gap-2 px-space-md py-3.5 rounded-xl bg-surface-container-high text-on-secondary-container font-label-lg text-label-lg font-bold shadow-sm hover:bg-secondary-fixed transition-all active:translate-y-0.5 text-center">
                  <span className="material-symbols-outlined text-xl">dialpad</span>
                  <span>{t('mobileLogin')} →</span>
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
      
      <Footer />

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
          <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl p-space-lg shadow-2xl flex flex-col gap-space-md animate-in fade-in duration-200" role="dialog" aria-modal="true" aria-labelledby="mobileLoginTitle">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">verified_user</span>
                <span id="mobileLoginTitle" className="font-headline-md text-headline-md text-on-surface font-bold">{t('otpTitle')}</span>
              </div>
              <button type="button" onClick={closeMobileModal} disabled={isSendingOtp || isVerifying} className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-surface-variant disabled:opacity-40" aria-label="Close">
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-1.5 mt-4">
              <label className="font-label-md text-label-md text-on-surface font-bold" htmlFor="phoneInput">{t('otpPhoneLabel')}</label>
              <div className="flex items-center gap-2 p-2 bg-surface-container-low rounded-xl">
                <span className="font-label-lg text-label-lg font-bold text-on-surface px-2">+91</span>
                <input
                  id="phoneInput"
                  ref={phoneInputRef}
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  maxLength="10"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  disabled={otpRequested}
                  placeholder="98XXXXXXXX"
                  aria-describedby={authError ? 'loginError' : undefined}
                  className="w-full bg-transparent font-headline-md text-headline-md text-on-surface focus:outline-none disabled:text-on-surface-variant"
                />
              </div>
              {!otpRequested && <p className="font-body-md text-body-md text-on-surface-variant">{t('otpEnterPhone')}</p>}
            </div>

            {otpRequested && (
              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-on-surface font-bold" htmlFor="otpInput">{t('otpCodeLabel')}</label>
                <input
                  id="otpInput"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="123456"
                  aria-describedby={authError ? 'loginError' : undefined}
                  className="w-full p-3 bg-surface-container-low rounded-xl font-headline-md text-headline-md text-on-surface focus:outline-none"
                />
                {devOtpHint && (
                  <p className="font-body-md text-body-md text-primary font-semibold" role="status">
                    {t('otpDevHint')}: <span className="tracking-widest">{devOtpHint}</span>
                  </p>
                )}
              </div>
            )}

            {authError && (
              <p id="loginError" role="alert" className="font-body-md text-body-md text-error font-semibold bg-error-container/40 px-3 py-2 rounded-xl">
                {t(authError)}
              </p>
            )}
            {loginSuccess && (
              <p role="status" className="font-body-md text-body-md text-primary font-semibold bg-primary-fixed/30 px-3 py-2 rounded-xl">
                <span className="material-symbols-outlined text-lg align-middle">check_circle</span> {t('otpSuccess')}
              </p>
            )}

            {!otpRequested ? (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={mobile.length !== 10 || isSendingOtp}
                className="w-full min-h-[56px] rounded-xl bg-secondary text-on-secondary font-label-lg text-label-lg font-bold shadow-md hover:bg-on-secondary-container transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{isSendingOtp ? t('otpSending') : t('otpSend')}</span>
                <span className="material-symbols-outlined text-xl">{isSendingOtp ? 'hourglass_top' : 'send'}</span>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={otp.length !== 6 || isVerifying}
                  className="w-full min-h-[56px] rounded-xl bg-secondary text-on-secondary font-label-lg text-label-lg font-bold shadow-md hover:bg-on-secondary-container transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span>{isVerifying ? t('otpVerifying') : t('otpVerify')}</span>
                  <span className="material-symbols-outlined text-xl">{isVerifying ? 'hourglass_top' : 'verified_user'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={isSendingOtp}
                  className="w-full py-2.5 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md font-bold hover:bg-surface-variant disabled:opacity-50"
                >
                  {t('otpResend')}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Welcome;
