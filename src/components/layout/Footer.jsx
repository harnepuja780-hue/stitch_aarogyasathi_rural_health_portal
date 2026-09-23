import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-surface-container-lowest mt-space-xl shadow-[0_-1px_8px_rgba(27,131,84,0.05)]">
      <div className="max-w-7xl mx-auto px-margin py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg mb-space-lg items-center">
          <div className="bg-surface-container-low p-space-md rounded-2xl flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-full bg-error-container text-on-error-container flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">emergency</span>
            </div>
            <div>
              <span className="block font-headline-md text-headline-md text-error font-bold">१०८ / १०४ रुग्णवाहिका</span>
              <span className="font-body-md text-body-md text-on-surface-variant">मोफत २४ तास शासकीय आपत्कालीन सेवा</span>
            </div>
          </div>
          <div className="bg-surface-container-low p-space-md rounded-2xl flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">record_voice_over</span>
            </div>
            <div>
              <span className="block font-headline-md text-headline-md text-primary font-bold">आवाज मार्गदर्शन उपलब्ध</span>
              <span className="font-body-md text-body-md text-on-surface-variant">कोणत्याही पानावर वरचा हिरवा माइक दाबा</span>
            </div>
          </div>
          <div className="bg-surface-container-low p-space-md rounded-2xl flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">child_care</span>
            </div>
            <div>
              <span className="block font-headline-md text-headline-md text-secondary font-bold">१०९८ बाल मदत केंद्र</span>
              <span className="font-body-md text-body-md text-on-surface-variant">माता आणि बाल आरोग्य सल्लागार</span>
            </div>
          </div>
        </div>
        <div className="p-space-md rounded-2xl bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-primary text-2xl">volunteer_activism</span>
            <span className="font-body-lg text-body-lg text-on-surface font-medium">आरोग्य ज्ञानातून सक्षम कुटुंब आणि संपन्न गाव. आपल्या हक्काची सोपी आरोग्य माहिती.</span>
          </div>
          <div className="font-label-md text-label-md text-on-surface-variant text-center md:text-right">
            © २०२४ आरोग्यसाथी (AarogyaSathi) | सार्वजनिक आरोग्य जागरूकता व्यासपीठ
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
