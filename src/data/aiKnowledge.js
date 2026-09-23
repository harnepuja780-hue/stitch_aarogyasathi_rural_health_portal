// ---------------------------------------------------------------------------
// AarogyaSathi AI — offline, rule-based knowledge engine (no backend / no API).
// This is a "helper" that answers AarogyaSathi-related health-awareness and
// website-navigation questions. It NEVER diagnoses, prescribes doses,
// recommends medicines, or replaces a qualified health professional. Serious
// or emergency symptoms always point to a doctor / PHC / CHC / 108.
//
// All knowledge strings are authored per-language (mr / hi / en / mix) so the
// whole feature stays 100% offline inside the 4-language system.
// ---------------------------------------------------------------------------

// Language codes used across the app (mr / hi / en / mix).
export const LANGS = ['mr', 'hi', 'en', 'mix'];

// ----------------------------- helper: matching -----------------------------
// Keywords are matched on the lower-cased, punctuation-stripped input. A user
// may type in ANY of the four languages regardless of the UI language, so
// every intent carries keyword lists in all languages and we score over them.

const normalizeText = (input) =>
  String(input || '')
    .toLowerCase()
    .replace(/[.,!?"“”'’`~#%^&*()_=+[\]{}|\\:;<>/@$-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const countMatches = (text, keywords) =>
  keywords.reduce((sum, k) => (k && text.includes(k.toLowerCase()) ? sum + 1 : sum), 0);

export const matchBest = (input, candidates) => {
  const text = normalizeText(input);
  let best = null;
  let bestScore = 0;
  for (const cand of candidates) {
    if (!cand.keywords) continue;
    const score = countMatches(text, cand.keywords);
    if (score > bestScore) {
      bestScore = score;
      best = cand;
    }
  }
  return { intent: best, score: bestScore };
};

// ------------------------------- intents: chrome chrome chrome ---------------
// Every catch phrase shown in the chat has a per-language line so the rural
// Marathi/Hindi/English/"mix" user always receives guidance in the UI language.

const L = (mr, hi, en, mix) => ({ mr, hi, en, mix });

export const EMERGENCY_ANSWER = L(
  [
    'ताबडतोब मदत घ्या! ही आपत्कालीन (emergency) परिस्थिती असू शकते.',
    '108 (रुग्णवाहिका) वर लगेच कॉल करा किंवा जवळच्या PHC / CHC / रुग्णालयात जा. प्रतीक्षा करू नका.',
    'स्वतः काहीही औषध, उपाय किंवा डोस घेऊ नका / देऊ नका.',
    'रुग्णाला शांत ठेवा; ताप/बर्फ नको, एकट्याला सोडू नका. जास्त रक्तस्त्राव असल्यास मऊ कापडाने हलके दाबून धरा.',
    'साप चावला असेल तर साप पकडण्याचा प्रयत्न नको — रुग्णाला शांत ठेवून लगेच रुग्णालयात न्या.',
    'ही कळकळीची सूचना आहे — मी डॉक्टर नाही. त्वरित पात्र आरोग्य व्यावसायिकांकडे जा.',
  ],
  [
    'तुरंत मदद लें! यह आपातकालीन (emergency) स्थिति हो सकती है।',
    '108 (एम्बुलेंस) पर तुरंत कॉल करें या पास के PHC / CHC / अस्पताल में जाएं। इंतज़ार न करें।',
    'खुद से कोई दवा, उपाय या डोस न लें / न दें।',
    'मरीज़ को शांत रखें; अकेले न छोड़ें। अधिक खून बह रहा हो तो मुलायम कपड़े से हल्का दबाव रखें।',
    'साँप काटा हो तो साँप पकड़ने की कोशिश न करें — मरीज़ को शांत रखकर तुरंत अस्पताल ले जाएं।',
    'यह एक हार्दिक सूचना है — मैं डॉक्टर नहीं हूँ। तुरंत योग्य स्वास्थ्य पेशेवर के पास जाएं।',
  ],
  [
    'Get help immediately! This could be an emergency.',
    'Call 108 (ambulance) right away, or go to the nearest PHC / CHC / hospital. Do not wait.',
    'Do not take or give any medicine, home remedy, or dose on your own.',
    'Keep the person calm; do not leave them alone. If there is heavy bleeding, press gently with a clean soft cloth.',
    'If a snake bit them, do not try to catch the snake — keep the person still and take them to a hospital immediately.',
    'This is a caring reminder — I am not a doctor. Seek a qualified health professional immediately.',
  ],
  [
    'ताबडतोब मदत घ्या (Get help immediately)! 108 वर कॉल करा (call 108) किंवा (or) जवळच्या PHC/CHC/रुग्णालयात (nearest facility) जा.',
    'स्वतः औषध/डोस घेऊ नका (do not self-medicate). रुग्णाला शांत ठेवा (keep calm), एकट्याला सोडू नका.',
    'हा डॉक्टरांचा सल्ला नव्हे (not medical advice) — त्वरित व्यावसायिक मदत घ्या (seek care now).',
  ],
);

export const MEDICINE_ANSWER = L(
  [
    'तुमच्या आरोग्याची काळजी घेतल्याबद्दल धन्यवाद.',
    'मी औषधाचे नाव, घेण्याची रीत, डोस किंवा उपचार सांगू/लिहून देऊ शकत नाही — हे फक्त डॉक्टर किंवा प्रशिक्षित आरोग्य कर्मचारीच ठरवू शकतात.',
    'स्वतः औषध घेऊ नका, बदलू नका किंवा दुसऱ्याला देऊ नका. दोन औषधे/औषधं मिसळू नका.',
    'लक्षणे असल्यास जवळच्या PHC / CHC किंवा ग्राम आरोग्य केंद्रातील डॉक्टरांना भेटा तपासणीसाठी.',
    'गंभीर लक्षणे असल्यास 108 वर कॉल करा किंवा थेट रुग्णालयात जा.',
    'ही माहिती फक्त मार्गदर्शक आहे — औषधांबाबत नेहमी डॉक्टरांच्या सल्ल्यानुसारच व्यवहार करा.',
  ],
  [
    'आपके स्वास्थ्य की चिंता करने के लिए धन्यवाद।',
    'मैं दवा का नाम, तरीका, डोस या उपचार नहीं बता/लिख सकता — यह केवल डॉक्टर या प्रशिक्षित स्वास्थ्य कर्मचारी ही तय कर सकते हैं।',
    'खुद दवा न लें, न बदलें, और न ही किसी और को दें। दवाइयाँ आपस में न मिलाएँ।',
    'लक्षण हों तो पास के PHC / CHC या ग्राम स्वास्थ्य केंद्र के डॉक्टर से जाँच कराएँ।',
    'गंभीर लक्षण हों तो 108 पर कॉल करें या सीधे अस्पताल जाएं।',
    'यह जानकारी केवल मार्गदर्शन है — दवाओं के लिए हमेशा डॉक्टर की सलाह मानें।',
  ],
  [
    'Thank you for caring about your health.',
    'I cannot name medicines, give instructions, doses, or treatments — only a doctor or a trained health worker can decide that.',
    'Do not self-medicate, change, or share medicines徒 unnecessarily. Never mix medicines.',
    'If you have symptoms, visit a doctor at the nearest PHC / CHC or village health centre for a check-up.',
    'For serious symptoms call 108 or go straight to a hospital.',
    'This is general guidance only — for medicines, always follow your doctor.',
  ],
  [
    'मी औषध/डोस/उपचार लिहून देऊ शकत नाही (cannot prescribe) — फक्त डॉक्टर/प्रशिक्षित कर्मचारी (only a doctor) ठरवतात.',
    'स्वतः औषध घेऊ/बदलू/देऊ नका (do not self-medicate).',
    'लक्षणे असल्यास PHC/CHC डॉक्टरांना भेटा; गंभीर लक्षणांसाठी 108 (call 108).',
  ],
);

export const DIAGNOSIS_ANSWER = L(
  [
    'मी रोगाचे निदान (diagnosis) करू शकत नाही; ही फक्त सामान्य माहिती/मार्गदर्शन आहे.',
    'तुमच्या लक्षणांची खात्रीलायक तपासणी PHC / CHC किंवा जवळच्या डॉक्टरांकडून करून घ्या.',
    'स्वतः औषध किंवा घरगुती उपाय वापरू नका; लक्षणे गंभीर असल्यास प्रतीक्षा करू नका.',
    'गंभीर लक्षणे असल्यास 108 वर कॉल करा किंवा थेट रुग्णालयात जा.',
    'ही माहिती डॉक्टरांच्या तपासणीची जागा घेत नाही.',
  ],
  [
    'मैं रोग का निदान (diagnosis) नहीं कर सकता; यह केवल सामान्य जानकारी/मार्गदर्शन है।',
    'अपने लक्षणों की पक्की जाँच PHC / CHC या पास के डॉक्टर से कराएं।',
    'खुद दवा या घरेलू उपाय न अपनाएं; लक्षण गंभीर हों तो इंतज़ार न करें।',
    'गंभीर लक्षण हों तो 108 पर कॉल करें या सीधे अस्पताल जाएं।',
    'यह जानकारी डॉक्टर की जाँच की जगह नहीं लेती।',
  ],
  [
    'I cannot make a diagnosis; this is only general awareness and guidance.',
    'Have your symptoms properly checked by the PHC / CHC or a nearby doctor.',
    'Do not self-medicate or use home remedies blindly; if symptoms are serious, do not wait.',
    'For serious symptoms call 108 or go directly to a hospital.',
    'This information does not replace a doctor’s examination.',
  ],
  [
    'मी निदान (diagnosis) करू/शकत नाही — PHC/CHC किंवा डॉक्टरांकडे तपासणी (get checked) करा.',
    'स्वतः औषध/उपाय नको (no self-medication); गंभीर लक्षणांसाठी 108 (call 108).',
    'ही माहिती तपासणीची जागा घेत नाही (not a replacement).',
  ],
);

export const GREETING_ANSWER = L(
  [
    'नमस्कार! मी आरोग्यसाथी (AI) आहे — तुमचा मदतनीस.',
    'तुम्ही मला ताप, सर्दी-खोकला, मासिक पाळी, गरोदरपण, पोषण, योजना, ट्रॅकर, क्विझ अशा विषयांबद्दल विचारू शकता.',
    'उदाहरणे: "ताप आला तर काय करावे?", "पाळी ट्रॅकर कुठे आहे?", "गरोदरपणात नोंदणी कशी?"',
    'लक्षात ठेवा: ही माहिती मार्गदर्शक आहे, डॉक्टरांच्या सल्ल्याची जागा घेत नाही.',
  ],
  [
    'नमस्ते! मैं आरोग्यसाथी (AI) हूँ — आपका सहायक।',
    'आप मुझसे बुखार, सर्दी-खांसी, मासिक धर्म, गर्भावस्था, पोषण, योजना, ट्रैकर, क्विज के बारे में पूछ सकते हैं।',
    'उदाहरण: "बुखार आए तो क्या करें?", "पीरियड ट्रैकर कहाँ है?", "गर्भावस्था में पंजीकरण कैसे?"',
    'याद रखें: यह जानकारी मार्गदर्शन है, डॉक्टर की सलाह की जगह नहीं लेती।',
  ],
  [
    'Namaskar! I am AarogyaSathi (AI), your helper.',
    'Ask me about fever, cold-cough, periods, pregnancy, nutrition, government schemes, trackers, or quizzes.',
    'Examples: "What should I do if I have fever?", "Where is the period tracker?", "How to register in pregnancy?"',
    'Remember: this is guidance, not a replacement for your doctor.',
  ],
  [
    'नमस्कार! मी आरोग्यसाथी (AI) — आरोग्य, योजना, ट्रॅकर, पोषण, क्विझ (health, schemes, tracker, nutrition, quizzes) बद्दल विचारा.',
    'उदा. (e.g.) "ताप आला तर काय?", "ट्रॅकर कुठे?", "योजना कोणती?"',
    'हे मार्गदर्शन आहे (guidance), डॉक्टरांचा सल्ला नव्हे.',
  ],
);

export const THANKS_ANSWER = L(
  [
    'काही सांगायला नको! आणखी आरोग्याचा प्रश्न असल्यास नक्की विचारा.',
    'आरोग्याची काळजी घ्या आणि कुटुंबाचीही. सोपी सवय, स्वच्छता आणि मोबदला — आरोग्यासाठी पुरेसे.',
  ],
  [
    'कोई बात नहीं! और स्वास्थ्य सवाल हो तो ज़रूर पूछें।',
    'अपना और परिवार का ख्याल रखें। सादगी, सफाई और नियमितता — सेहत के लिए काफी।',
  ],
  [
    'You are welcome! Feel free to ask any more health questions.',
    'Take care of your health and your family. Simplicity, cleanliness and routine — enough for good health.',
  ],
  [
    'काही सांगायला नको (welcome)! आणखी प्रश्न विचारा. स्वच्छता + नियमितपणा (cleanliness + routine) = आरोग्य.',
  ],
);

export const FALLBACK_ANSWER = L(
  [
    'मला तुमचा प्रश्न नीट समजला नाही — कृपया थोडा सोपा/स्पष्ट शब्दात विचारा.',
    'मी या वेबसाइटच्या आरोग्य विषय, योजना, ट्रॅकर, पोषण, क्विझ आणि टिप्सविषयी मदत करतो.',
    'खालील सुचवलेल्या प्रश्नांपैकी एक निवडा किंवा डॉक्टर/आरोग्य कर्मचाऱ्याला भेटा.',
    'गंभीर लक्षणे असल्यास 108 किंवा जवळच्या PHC/CHC/रुग्णालयात जा. ही माहिती मार्गदर्शक आहे.',
  ],
  [
    'मुझे आपका सवाल समझ नहीं आया — कृपया थोड़ा आसान/स्पष्ट शब्दों में पूछें।',
    'मैं इस वेबसाइट के स्वास्थ्य विषय, योजना, ट्रैकर, पोषण, क्विज और टिप्स के बारे में मदद करता हूँ।',
    'नीचे सुझाए गए प्रश्नों में से एक चुनें या डॉक्टर/स्वास्थ्य कर्मचारी से मिलें।',
    'गंभीर लक्षण हों तो 108 या पास के PHC/CHC/अस्पताल जाएं। यह जानकारी मार्गदर्शन है।',
  ],
  [
    'I could not understand your question — please ask a little more simply or clearly.',
    'I can help with this website’s health topics, schemes, trackers, nutrition, quizzes and tips.',
    'Pick one of the suggested questions below, or visit a doctor / health worker.',
    'For serious symptoms call 108 or go to the nearest PHC/CHC/hospital. This is guidance only.',
  ],
  [
    'प्रश्न नीट समजला नाही (not understood) — सोपे/स्पष्ट विचारा.',
    'विषय: आरोग्य, योजना, ट्रॅकर, पोषण, क्विझ, टिप्स (topics). खालील प्रश्न निवडा.',
    'गंभीर लक्षणांसाठी 108 (call 108) किंवा PHC/CHC — हे मार्गदर्शन आहे.',
  ],
);

// ----------------------------- intents: navigation --------------------------
// Navigation answers include a route the page turns into a button.

export const NAV_INTENTS = [
  {
    id: 'home',
    route: '/home',
    title: L('मुख्य पान', 'होम पेज', 'Home', 'मुख्य पान (Home)'),
    keywords: ['मुख्य पान', 'होम', 'home page', 'मुख्यपान', 'होम पेज', 'homepage'],
  },
  {
    id: 'health-topics',
    route: '/health',
    title: L('आरोग्य विषय', 'स्वास्थ्य विषय', 'Health Topics', 'आरोग्य विषय (Health Topics)'),
    keywords: ['आरोग्य विषय', 'विषय कोणते', 'health topics', 'विषयांची यादी', 'हेल्थ टॉपिक', 'विषय सर्व'],
  },
  {
    id: 'schemes',
    route: '/schemes',
    title: L('सरकारी योजना', 'सरकारी योजनाएं', 'Government Schemes', 'सरकारी योजना (Schemes)'),
    keywords: ['योजना', 'सरकारी योजना', 'योजने', 'scheme', 'schemes', 'स्कीम', 'योजनांची यादी'],
  },
  {
    id: 'period-tracker',
    route: '/period-tracker',
    title: L('पाळी ट्रॅकर', 'पीरियड ट्रैकर', 'Period Tracker', 'पाळी ट्रॅकर (Period Tracker)'),
    keywords: ['पाळी ट्रॅकर', 'ट्रॅकर', 'पीरियड ट्रैकर', 'period tracker', 'tracker', 'पाळी मोठा', 'मासिक ट्रॅकर'],
  },
  {
    id: 'period-health',
    route: '/periods',
    title: L('मासिक पाळी आरोग्य', 'मासिक धर्म स्वास्थ्य', 'Period Health', 'मासिक पाळी आरोग्य (Period Health)'),
    keywords: ['मासिक पाळी', 'पाळी आरोग्य', 'पीरियड', 'पाळी कशी', 'मासिक धर्म', 'period health', 'periods', 'ऋतुस्राव'],
  },
  {
    id: 'pregnancy',
    route: '/pregnancy',
    title: L('गरोदरपण काळजी', 'गर्भावस्था देखभाल', 'Pregnancy Care', 'गरोदरपण काळजी (Pregnancy Care)'),
    keywords: ['गरोदर', 'गर्भावस्था', 'गर्भधारणा', 'pregnancy', 'बाळंतपण', 'गरोदरपणात', 'गर्भवती', 'गरोदरपण'],
  },
  {
    id: 'nutrition',
    route: '/nutrition',
    title: L('पोषण', 'पोषण', 'Nutrition', 'पोषण (Nutrition)'),
    keywords: ['पोषण', 'पौष्टिक', 'आहार', 'nutrition', 'पौष्टिक आहार', 'डाएट'],
  },
  {
    id: 'quizzes',
    route: '/quizzes',
    title: L('आरोग्य क्विझ', 'स्वास्थ्य क्विज़', 'Health Quizzes', 'आरोग्य क्विझ (Quizzes)'),
    keywords: ['क्विझ', 'क्विज', 'quiz', 'quizzes', 'प्रश्नमंजुषा', 'टेस्ट', 'आरोग्य क्विझ'],
  },
  {
    id: 'tips',
    route: '/tips',
    title: L('आरोग्य टिप्स', 'स्वास्थ्य टिप्स', 'Health Tips', 'आरोग्य टिप्स (Tips)'),
    keywords: ['टिप्स', 'टीपा', 'tips', 'आरोग्य टिप्स', 'सूचना', 'सल्ले'],
  },
  {
    id: 'profile',
    route: '/profile',
    title: L('माझे प्रोफाइल', 'मेरी प्रोफ़ाइल', 'My Profile', 'माझे प्रोफाइल (Profile)'),
    keywords: ['प्रोफाइल', 'प्रोफ़ाइल', 'profile', 'माझे खाते', 'माझी माहिती', 'my account'],
  },
  {
    id: 'ai-help',
    route: '/ai',
    title: L('AI आरोग्यसाथी', 'AI आरोग्यसाथी', 'AI AarogyaSathi', 'AI आरोग्यसाथी (AI)'),
    keywords: ['एआय', 'ai', 'आरोग्यसाथी', 'बॉट', 'bot', 'रोबोट', 'ऍसिस्टंट', 'साहाय्यक AI'],
  },
];

export const NAV_HELP = {
  home: L(
    'मुख्य पानावर तुम्हाला आरोग्य, योजना, ट्रॅकर, पोषण, क्विझ आणि टिप्स यांची संपूर्ण दिशा/कडे मिळते. खालील बटण दाबून जा.',
    'होम पेज पर आपको स्वास्थ्य, योजना, ट्रैकर, पोषण, क्विज़ और टिप्स की दिशा मिलती है। नीचे बटन दबाकर जाएं।',
    'The Home page gives you the whole direction to health, schemes, trackers, nutrition, quizzes and tips. Use the button below to go there.',
    'मुख्य पान (Home) — सर्व विषयांची दिशा. बटण दाबा (open).',
  ),
  'health-topics': L(
    'आरोग्य विषय पानावर गरोदरपण, मुलांचे आरोग्य, पोषण, सामान्य आजार, ज्येष्ठ नागरिक असे ११+ विषय आहेत — प्रत्येकात सोपी मराठी माहिती. खालील बटण दाबून जा.',
    'स्वास्थ्य विषय पेज पर गर्भावस्था, बच्चों का स्वास्थ्य, पोषण, सामान्य बीमारी, वरिष्ठ नागरिक जैसे 11+ विषय हैं। नीचे बटन दबाकर जाएं।',
    'The Health Topics page has 11+ topics — pregnancy, child health, nutrition, common illnesses, elderly care — each with simple guidance. Use the button below.',
    'आरोग्य विषय (Health Topics) — 11+ विषय. बटण दाबा (open).',
  ),
  schemes: L(
    'सरकारी योजना पानावर आयुष्मान भारत, जननी शिशु सुरक्षा, PM-JAY, पोषण योजना अशा सर्व योजनांची नावे, पात्रता आणि संपर्क आहे. खालील बटण दाबून जा.',
    'सरकारी योजना पेज पर आयुष्मान भारत, जननी शिशु सुरक्षा, PM-JAY, पोषण योजना आदि का नाम, पात्रता और संपर्क है। नीचे बटन दबाकर जाएं।',
    'The Government Schemes page lists Ayushman Bharat, Janani Shishu Suraksha, PM-JAY, nutrition schemes — with eligibility and contact details. Use the button below.',
    'सरकारी योजना (Schemes) — नावे/पात्रता/संपर्क. बटण दाबा (open).',
  ),
  'period-tracker': L(
    'पाळी ट्रॅकरवर तुम्ही तुमची मासिक पाळी नोंदवून शकता — पुढील पाळी/नकाशा पाहा. व्यक्तिगत माहिती फक्त तुमच्या फोनवर राहते. खालील बटण दाबून जा.',
    'पीरियड ट्रैकर पर आप अपनी मासिक अवधि दर्ज कर सकते हैं — अगली अवधि/नक्शा देखें। जानकारी सिर्फ आपके फोन में रहती है। नीचे बटन दबाकर जाएं।',
    'On the Period Tracker you can record your monthly period and see the next date/pattern. Your data stays only on your phone. Use the button below.',
    'पाळी ट्रॅकर (Period Tracker) — नोंदवा आणि पुढील पाळी पाहा. बटण दाबा (open).',
  ),
  'period-health': L(
    'मासिक पाळी आरोग्य पानावर स्वच्छतेच्या सवयी, पाळीदरम्यान आहार, वेदना आणि डॉक्टरांना कधी भेटावे याची माहिती आहे. खालील बटण दाबून जा.',
    'मासिक धर्म स्वास्थ्य पेज पर सफाई की आदतें, अवधि के दौरान आहार, दर्द और डॉक्टर से कब मिलें यह जानकारी है। नीचे बटन दबाकर जाएं।',
    'The Period Health page covers hygiene habits, diet during periods, pain, and when to see a doctor. Use the button below.',
    'मासिक पाळी आरोग्य (Period Health) — स्वच्छता/वेदना/डॉक्टर. बटण दाबा (open).',
  ),
  pregnancy: L(
    'गरोदरपण पानावर नोंदणी, तपासणी यादी, आहार, लसीकरण आणि धोक्याची लक्षणे यांची माहिती आहे. गरोदर मातांसाठी खूप उपयुक्त. खालील बटण दाबून जा.',
    'गर्भावस्था पेज पर पंजीकरण, जाँच सूची, आहार, टीकाकरण और खतरे के लक्षण की जानकारी है। नीचे बटन दबाकर जाएं।',
    'The Pregnancy page has registration, check-up schedule, diet, immunisation and danger-sign information. Very useful for expectant mothers. Use the button below.',
    'गरोदरपण (Pregnancy) — नोंदणी/तपासणी/आहार/लक्षणे. बटण दाबा (open).',
  ),
  nutrition: L(
    'पोषण पानावर संतुलित आहार, लोह-आयोडीन गरज, पोषक सल्ला आहे — विशेषतः गरोदरपण आणि मुलांसाठी. खालील बटण दाबून जा.',
    'पोषण पेज पर संतुलित आहार, आयरन-आयोडीन ज़रूरत, पोषण सलाह है — खासकर गर्भावस्था और बच्चों के लिए। नीचे बटन दबाकर जाएं।',
    'The Nutrition page has balanced diet, iron-iodine needs and nutrition tips — especially for pregnancy and children. Use the button below.',
    'पोषण (Nutrition) — संतुलित आहार/लोह/सल्ला. बटण दाबा (open).',
  ),
  quizzes: L(
    'आरोग्य क्विझ पानावर तुम्ही तुमचे ज्ञान तपासू शकता — गरोदरपण, पोषण, लसीकरण, स्वच्छता अशा विषयांवर. निकाल तुम्हालाच दिसतो. खालील बटण दाबून जा.',
    'स्वास्थ्य क्विज़ पेज पर आप अपना ज्ञान जाँच सकते हैं — गर्भावस्था, पोषण, टीकाकरण, सफाई आदि विषयों पर। नीचे बटन दबाकर जाएं।',
    'On the Quizzes page you can test your knowledge on pregnancy, nutrition, immunisation, cleanliness and more. Results are only shown to you. Use the button below.',
    'आरोग्य क्विझ (Quizzes) — ज्ञान तपासा. बटण दाबा (open).',
  ),
  tips: L(
    'आरोग्य टिप्स पानावर दररोजच्या आरोग्यासाठी लहान-लहान सोप्या टिप्स आहेत. खालील बटण दाबून जा.',
    'स्वास्थ्य टिप्स पेज पर रोज़ की सेहत के लिए छोटी-छोटी आसान टिप्स हैं। नीचे बटन दबाकर जाएं।',
    'The Health Tips page has small, simple daily health tips. Use the button below.',
    'आरोग्य टिप्स (Tips) — रोजच्या उपयुक्त सवयी. बटण दाबा (open).',
  ),
  profile: L(
    'माझे प्रोफाइल पानावर तुमची नाव, ग्राम आणि आरोग्य संबंधी माहिती आहे — ती फक्त तुमच्या फोनवर राहते. खालील बटण दाबून जा.',
    'मेरी प्रोफ़ाइल पेज पर आपका नाम, गाँव और स्वास्थ्य जानकारी है — सिर्फ आपके फोन में। नीचे बटन दबाकर जाएं।',
    'The Profile page holds your name, village and health details — kept only on your phone. Use the button below.',
    'माझे प्रोफाइल (Profile) — माहिती फक्त फोनवर. बटण दाबा (open).',
  ),
  'ai-help': L(
    'तुम्ही आत्ता AI आरोग्यसाथी पानावरच आहात — इथे बोलून किंवा टाईप करून आरोग्याचे प्रश्न विचारा. खालील बटण तुम्हालाच दाखवते.',
    'आप अभी AI आरोग्यसाथी पेज पर ही हैं — यहाँ बोलकर या टाइप करके स्वास्थ्य सवाल पूछें।',
    'You are already on the AI AarogyaSathi page — ask health questions here by voice or by typing.',
    'तुम्ही AI पानावर आहात (you are here). बोला/टाईप करा (speak/type).',
  ),
};

// -------------------------------- intents: health topics --------------------
// Each topic reuses a HEALTH_TOPICS id (verified content lives in
// healthContent.js). The engine returns the topicId; the page renders the
// verified sections plus a per-language intro/seek line from here.

export const TOPIC_INTENTS = [
  {
    id: 'aarogya-vishay',
    keywords: ['आरोग्य', 'स्वास्थ्य', 'health', 'आरोग्याविषयी', 'मला आरोग्य', 'आजार'],
  },
  {
    id: 'mahila-arogya',
    keywords: ['महिला आरोग्य', 'स्त्री आरोग्य', 'महिलांचे आरोग्य', 'women health', 'स्त्री'],
  },
  {
    id: 'masik-pali',
    keywords: ['मासिक पाळी', 'पाळी', 'पीरियड', 'मासिक धर्म', 'ऋतुस्राव', 'period', 'टाइम्स पाळी'],
  },
  {
    id: 'garbhavastha',
    keywords: ['गरोदर', 'गर्भावस्था', 'गर्भधारणा', 'pregnancy', 'बाळंतपण', 'गर्भवती', 'गरोदरपण'],
  },
  {
    id: 'mulanche-arogya',
    keywords: ['मुलांचे आरोग्य', 'बाल आरोग्य', 'लसीकरण', 'लस', 'बाळ', 'मुलं', 'बालक', 'child health', 'vaccine', 'बाळगणं', 'मुलांची'],
  },
  {
    id: 'purushanche-arogya',
    keywords: ['पुरुष आरोग्य', 'पुरुषांचे आरोग्य', 'मनुष्य आरोग्य', 'men health'],
  },
  {
    id: 'jyestha-nagarik',
    keywords: ['ज्येष्ठ नागरिक', 'ज्येष्ठ', 'वृद्ध', 'म्हातारपण', 'मोठी माणसं', 'elderly', 'वयस्क', 'बुजुर्ग'],
  },
  {
    id: 'poshan',
    keywords: ['पोषण', 'आहार', 'पौष्टिक', 'nutrition', 'पौष्टिक आहार', 'आहार कसा'],
  },
  {
    id: 'samanya-ajara',
    keywords: ['ताप', 'ज्वर', 'सर्दी', 'खोकला', 'खोकल', 'डोके दुखणे', 'डोकेदुखी', 'अंगदुखी', 'जुलाब', 'अतिसार', 'उलटी', 'fever', 'cold', 'cough', 'headache', 'diarrhea', 'पोटदुखी', 'छातीत धडधड'],
  },
  {
    id: 'doctor-kevha',
    keywords: ['केरव्हा डॉक्टरांना भेटावे', 'डॉक्टरांना कधी', 'कोणत्या परिस्थितीत डॉक्टर', 'डॉक्टर केव्हा', 'when to see doctor', 'डॉक्टरांकडे जावे'],
  },
  {
    id: 'ek-minit',
    keywords: ['एक मिनिट', 'जरतूर सल्ला', 'quick', 'नव्या सवयी', 'आरोग्य नियम'],
  },
];

export const TOPIC_INTRO = {
  'aarogya-vishay': L(
    'हा विषय तुम्हाला संपूर्ण आरोग्याची पायाभूत माहिती देतो — शरीर, स्वच्छता आणि जागरूकता.',
    'यह विषय आपको सम्पूर्ण स्वास्थ्य की बुनियादी जानकारी देता है — शरीर, सफाई और जागरूकता।',
    'This topic gives you the fundamentals of health — body, hygiene and awareness.',
    'मूलभूत आरोग्य माहिती (basic health awareness): शरीर + स्वच्छता. खाली पूर्ण माहिती.',
  ),
  'mahila-arogya': L(
    'महिलांच्या आरोग्यासाठी पोषण, लोह, स्वच्छता आणि नियमित तपासणी महत्त्वाची आहे.',
    'महिलाओं के स्वास्थ्य के लिए पोषण, आयरन, सफाई और नियमित जाँच महत्वपूर्ण है।',
    'For women’s health, nutrition, iron, hygiene and regular check-ups are very important.',
    'महिला आरोग्य (Women’s Health): पोषण + लोह + स्वच्छता + तपासणी. खाली पूर्ण माहिती.',
  ),
  'masik-pali': L(
    'मासिक पाळी ही साधारण गोष्ट आहे. स्वच्छता, आराम आणि वेदना व्यवस्थापन कसे करावे — पहा.',
    'मासिक धर्म एक सामान्य बात है। सफाई, आराम और दर्द प्रबंधन कैसे करें — देखें।',
    'A period is a normal thing. See how to manage hygiene, rest and pain.',
    'मासिक पाळी (Periods): स्वच्छता + आराम + वेदना. खाली पूर्ण माहिती.',
  ),
  garbhavastha: L(
    'गरोदरपणात लवकर नोंदणी, नियमित तपासणी, पौष्टिक आहार आणि लसीकरण — ही काळजी घ्या.',
    'गर्भावस्था में जल्द पंजीकरण, नियमित जाँच, पौष्टिक आहार और टीकाकरण — यह देखभाल लें।',
    'In pregnancy, register early, keep regular check-ups, eat well and get immunised.',
    'गरोदरपण (Pregnancy): नोंदणी + तपासणी + पोषण. खाली पूर्ण माहिती.',
  ),
  'mulanche-arogya': L(
    'बालकांच्या आरोग्यासाठी मातृ दूध, लसीकरण, स्वच्छता आणि रोग लक्षणे लक्षात घ्या.',
    'बच्चों के स्वास्थ्य के लिए मां का दूध, टीकाकरण, सफाई और बीमारी के लक्षण ध्यान रखें।',
    'For child health: breast milk, immunisation, hygiene and watch for illness signs.',
    'मुलांचे आरोग्य (Child Health): आईचे दूध + लसीकरण + स्वच्छता. खाली पूर्ण माहिती.',
  ),
  'purushanche-arogya': L(
    'पुरुषांचे आरोग्य — धूम्रपान/दारू टाळा, नियमित व्यायाम आणि तपासणी गांभीर्याने घ्या.',
    'पुरुषों का स्वास्थ्य — धूम्रपान/शराब टालें, नियमित व्यायाम और जाँच गंभीरता से लें।',
    'Men’s health — avoid tobacco/alcohol, exercise regularly and keep up check-ups.',
    'पुरुष आरोग्य (Men’s Health): तंबाखू/दारू टाळा + व्यायाम + तपासणी. खाली पूर्ण माहिती.',
  ),
  'jyestha-nagarik': L(
    'ज्येष्ठ नागरिकांसाठी संतुलित आहार, हलका व्यायाम, औषधांबाबत काळजी आणि नियमित तपासणी.',
    'वरिष्ठ नागरिकों के लिए संतुलित आहार, हल्का व्यायाम, दवाओं की सावधानी और नियमित जाँच।',
    'For elders: balanced diet, gentle exercise, safe medication use and regular check-ups.',
    'ज्येष्ठ नागरिक (Elders): आहार + व्यायाम + तपासणी. खाली पूर्ण माहिती.',
  ),
  poshan: L(
    'संतुलित आहार, भरपूर पाणी, फळे-भाज्या आणि लोह बाबतीत सोपा पोषण सल्ला.',
    'संतुलित आहार, भरपूर पानी, फल-सब्ज़ियाँ और आयरन के बारे में आसान पोषण सलाह।',
    'Simple nutrition advice: balanced meals, plenty of water, fruits-vegetables and iron.',
    'पोषण (Nutrition): संतुलित आहार + पाणी + फळे. खाली पूर्ण माहिती.',
  ),
  'samanya-ajara': L(
    'सामान्य आजार — ताप, सर्दी, खोकला, डोके दुखणे यातील घरगुती काळजी आणि डॉक्टरांना कधी भेटावे.',
    'सामान्य बीमारी — बुखार, सर्दी, खांसी, सिरदर्द में घरेलू देखभाल और डॉक्टर से कब मिलें।',
    'Common illnesses — home care for fever, cold, cough, headache and when to see a doctor.',
    'सामान्य आजार (Common Ailments): घरगुती काळजी + डॉक्टर केव्हा. खाली पूर्ण माहिती.',
  ),
  'doctor-kevha': L(
    'गंभीर लक्षणे, सतत ताप, रक्तस्त्राव, श्वास त्रास किंवा बदल असल्यास त्वरित डॉक्टरांना भेटा.',
    'गंभीर लक्षण, लगातार बुखार, खून, सांस में तकलीफ या बदलाव हों तो तुरंत डॉक्टर से मिलें।',
    'See a doctor right away for serious symptoms, lasting fever, bleeding, breathing trouble or changes.',
    'डॉक्टरांना कधी (When to see a Doctor): गंभीरता लक्षणांवर. खाली पूर्ण माहिती.',
  ),
  'ek-minit': L(
    'एका मिनिटात लक्षात ठेवण्यासारखी आरोग्य सवय — दररोज लावा.',
    'एक मिनट में याद रखने लायक स्वास्थ्य आदत — रोज़ अपनाएं।',
    'A one-minute health habit to remember every day.',
    'एक मिनिट सवय (One-minute habit) — दररोज पाळा. खाली पूर्ण माहिती.',
  ),
};

export const TOPIC_SEEK_LINE = L(
  'लक्षणे गंभीर असल्यास (तीव्र ताप, रक्तस्त्राव, श्वास त्रास, बेशुद्धी) त्वरित 108 वर कॉल करा किंवा जवळच्या PHC/CHC/रुग्णालयात जा.',
  'लक्षण गंभीर हों तो (तीव्र बुखार, खून, सांस में तकलीफ, बेहोशी) तुरंत 108 पर कॉल करें या पास के PHC/CHC/अस्पताल जाएं।',
  'If symptoms are serious (high fever, bleeding, breathing trouble, unconsciousness) call 108 right away or go to the nearest PHC/CHC/hospital.',
  'गंभीर लक्षणांसाठी (serious symptoms) 108 वर कॉल करा (call 108) — ही मार्गदर्शक माहिती आहे.',
);

// ------------------------------- main resolver ------------------------------
export const resolveAnswer = (input, language) => {
  const text = normalizeText(input);
  if (!text) return { kind: 'fallback', lines: FALLBACK_ANSWER[language === 'mix' ? 'mix' : language] };

  const pick = (obj) => {
    const lang = obj && obj[language] ? language : 'mr';
    const merged = language === 'mix' && obj.mix ? obj.mix : obj[lang];
    return Array.isArray(merged) ? merged : obj.mr;
  };

  // 1. Emergency words — always win.
  const emergencyHit = matchBest(text, [
    {
      keywords: [
        '108', 'अपघात', 'accident', 'गंभीर', 'आपत्कालीन', 'emergency', 'बेशुद्ध', 'अचेतन',
        'रक्तस्त्राव', 'bleeding', 'खूप रक्त', 'छातीत दुख', 'chest pain', 'श्वास घेता येत नाही',
        'श्वास घ्यायला त्रास', 'breathing', 'गुदमरलं', 'साप चावला', 'snake', 'बुडाले',
        'बुडाला', 'भयंकर', 'विजेचा धक्का', 'बेशुद्ध पडलं', 'ताप खूप जास्त', 'जास्त ताप',
        'गरम लागलं', 'भाजलं', 'जळले', 'अपार्ट..', 'अकस्मात बेहोश', 'बेहोश',
      ],
    },
  ]);
  if (emergencyHit.score >= 1) return { kind: 'emergency', lines: pick(EMERGENCY_ANSWER) };

  // 2. Medicine request — polite refusal.
  const medicineHit = matchBest(text, [
    {
      keywords: [
        'औषध', 'दवा', 'गोळी', 'टॅब्लेट', 'गोळ्या', 'डोस', 'औषधे', 'medicine', 'tablet',
        'दवे', 'किती गोळ्या', 'औषध काय', 'दवाई', 'इंजेक्शन', 'औषधाची यादी', 'दवा द्या',
        'औषध लिहा', 'रोगाचे नाव', 'दवाघर', 'दवा कसा घ्यावा',
      ],
    },
  ]);
  if (medicineHit.score >= 1) return { kind: 'medicine', lines: pick(MEDICINE_ANSWER) };

  // 3. Diagnosis questions — refuse diagnosis.
  const diagnosisHit = matchBest(text, [
    {
      keywords: [
        'काय झाले', 'मला काय झाले', 'कोणता आजार', 'निदान काय', 'diagnosis', 'माझा रोग काय',
        'काय आजार', 'का आजार', 'रोगाचे निदान', 'काय झालंय', 'मी आजारी', 'बीमार क्या',
        'मला काय होतंय', 'रोग झिकल्यास', 'बीमारी', 'का होतो', 'काय करू',
      ],
    },
  ]);
  if (diagnosisHit.score >= 1) return { kind: 'diagnosis', lines: pick(DIAGNOSIS_ANSWER) };

  // 4. Greetings / thanks (typed alone).
  const isGreeting = /^(namaskar|नमस्कार|नमस्ते|hello|hi|हॅलो|हाय|नमस्कार!|good morning|शुभ|स्वागत)[\s!]*$/i.test(text);
  const isThanks = /(धन्यवाद|थँक्स|thank|आभार|धन्यवाद!|thanks)/i.test(text) && text.length < 25;
  if (isGreeting) return { kind: 'greeting', lines: pick(GREETING_ANSWER) };
  if (isThanks) return { kind: 'thanks', lines: pick(THANKS_ANSWER) };

  // 5. Navigation questions with route keywords.
  const nav = matchBest(text, NAV_INTENTS.map((n) => ({ ...n, title: undefined, keywords: n.keywords })));
  if (nav.score >= 1) {
    const intent = NAV_INTENTS.find((n) => n.id === nav.intent.id);
    return {
      kind: 'nav',
      route: intent.route,
      title: intent.title[language === 'mix' ? 'mix' : language] || intent.title.mr,
      lines: pick(NAV_HELP[intent.id]),
    };
  }

  // 6. Health-topic questions.
  const topic = matchBest(text, TOPIC_INTENTS);
  if (topic.score >= 1) {
    const intent = TOPIC_INTENTS.find((t) => t.id === topic.intent.id);
    return {
      kind: 'topic',
      topicId: intent.id,
      intro: pick(TOPIC_INTRO[intent.id]),
    };
  }

  // 7. Fallback.
  return { kind: 'fallback', lines: pick(FALLBACK_ANSWER) };
};

export const SUGGESTED_QUESTIONS = L(
  ['ताप आला तर काय करावे?', 'मासिक पाळीत स्वच्छता कशी ठेवावी?', 'गरोदरपणात नोंदणी कशी करावी?', 'पाळी ट्रॅकर कुठे आहे?'],
  ['बुखार आए तो क्या करें?', 'पीरियड में सफाई कैसे रखें?', 'गर्भावस्था में पंजीकरण कैसे करें?', 'पीरियड ट्रैकर कहाँ है?'],
  ['What to do if I have fever?', 'How to stay clean during periods?', 'How to register in pregnancy?', 'Where is the period tracker?'],
  ['ताप आला तर काय (fever)?', 'पाळी स्वच्छता (period hygiene)?', 'गरोदरपण नोंदणी (pregnancy)?', 'ट्रॅकर कुठे (tracker)?'],
);
