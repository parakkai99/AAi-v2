/**
 * ArchitectAny AAi - Multi-Language Translation Service
 * Supports English (en-IN), Tamil (ta-IN), Hindi (hi-IN), Telugu (te-IN), Kannada (kn-IN), Malayalam (ml-IN)
 */

export interface TranslationDictionary {
  [key: string]: {
    [langCode: string]: string;
  };
}

export const TRANSLATIONS: TranslationDictionary = {
  // Brand & Header
  app_name: {
    'en-IN': 'ArchitectAny AAi',
    'ta-IN': 'ஆர்க்கிடெக்ட் எனி ஏஏஐ',
    'hi-IN': 'आर्किटेक्ट एनी एएआई',
    'te-IN': 'ఆర్కిటెక్ట్ ఎనీ ఏఏఐ',
    'kn-IN': 'ಆರ್ಕಿಟೆಕ್ಟ್ ಎನಿ ಎಎಐ',
    'ml-IN': 'ആർക്കിടെക്റ്റ് എനി എഎഐ',
  },
  app_tagline: {
    'en-IN': 'One Platform. Infinite Solutions.',
    'ta-IN': 'ஒரே தளம். எல்லையற்ற தீர்வுகள்.',
    'hi-IN': 'एक मंच। अनंत समाधान।',
    'te-IN': 'ఒకే వేదిక. అనంత పరిష్కారాలు.',
    'kn-IN': 'ಒಂದೇ ವೇದಿಕೆ. ಅನಂತ ಪರಿಹಾರಗಳು.',
    'ml-IN': 'ഒരു വേദി. അനന്തമായ പരിഹാരങ്ങൾ.',
  },
  search_placeholder: {
    'en-IN': "Ask anything... (e.g., 'Catering in Coimbatore', 'Cold storage setup', 'Solar farm')",
    'ta-IN': "எதையும் கேளுங்கள்... (எ.கா. 'கோயம்புத்தூரில் கேட்டரிங்', 'குளிர்சாதன கிடங்கு அமைப்பு')",
    'hi-IN': "कुछ भी पूछें... (उदा., 'कोयंबटूर में खानपान', 'कोल्ड स्टोरेज सेटअप', 'सोलर फार्म')",
    'te-IN': "ఏదైనా అడగండి... (ఉదా., 'కోయంబత్తూరులో క్యాటరింగ్', 'కోల్డ్ స్టోరేజ్ సెటప్')",
    'kn-IN': "ಏನನ್ನಾದರೂ ಕೇಳಿ... (ಉದಾ., 'ಕೊಯಮತ್ತೂರಿನಲ್ಲಿ ಕ್ಯಾಟರಿಂಗ್', 'ಕೋಲ್ಡ್ ಸ್ಟೋರೇಜ್')",
    'ml-IN': "എന്തും ചോദിക്കുക... (ഉദാ., 'കോയമ്പത്തൂരിൽ കാറ്ററിംഗ്', 'കോൾഡ് സ്റ്റോറേജ്')",
  },
  find_location: {
    'en-IN': 'Find Location',
    'ta-IN': 'இருப்பிடத்தைக் கண்டுபிடி',
    'hi-IN': 'स्थान खोजें',
    'te-IN': 'స్థానాన్ని కనుగొనండి',
    'kn-IN': 'ಸ್ಥಳವನ್ನು ಹುಡುಕಿ',
    'ml-IN': 'ലൊക്കേഷൻ കണ്ടെത്തുക',
  },
  near_me: {
    'en-IN': 'Near Me',
    'ta-IN': 'என் அருகில்',
    'hi-IN': 'मेरे पास',
    'te-IN': 'నా దగ్గర',
    'kn-IN': 'ನನ್ನ ಹತ್ತಿರ',
    'ml-IN': 'എന്റെ അടുത്ത്',
  },
  use_current_location: {
    'en-IN': 'Use My Current Location (Near Me)',
    'ta-IN': 'என் தற்போதைய இருப்பிடத்தைப் பயன்படுத்து (அருகில்)',
    'hi-IN': 'मेरे वर्तमान स्थान का उपयोग करें (मेरे पास)',
    'te-IN': 'నా ప్రస్తుత స్థానాన్ని ఉపయోగించండి (నా దగ్గర)',
    'kn-IN': 'ನನ್ನ ಪ್ರಸ್ತುತ ಸ್ಥಳವನ್ನು ಬಳಸಿ (ನನ್ನ ಹತ್ತಿರ)',
    'ml-IN': 'എന്റെ നിലവിലെ ലൊക്കേഷൻ ഉപയോഗിക്കുക (അടുത്ത്)',
  },
  resolving: {
    'en-IN': 'Resolving...',
    'ta-IN': 'கண்டுபிடிக்கிறது...',
    'hi-IN': 'खोज रहा है...',
    'te-IN': 'పరిష్కరిస్తోంది...',
    'kn-IN': 'ಹುಡುಕಲಾಗುತ್ತಿದೆ...',
    'ml-IN': 'കണ്ടെത്തുന്നു...',
  },
  resolve: {
    'en-IN': 'Resolve',
    'ta-IN': 'தேடு',
    'hi-IN': 'खोजें',
    'te-IN': 'శోధించండి',
    'kn-IN': 'ಹುಡುಕಿ',
    'ml-IN': 'തിരയുക',
  },
  view_spatial_map: {
    'en-IN': 'View Spatial Map Layer',
    'ta-IN': 'இடஞ்சார்ந்த வரைபட அடுக்கைக் காண்க',
    'hi-IN': 'स्थानिक मानचित्र परत देखें',
    'te-IN': 'స్పేషియల్ మ్యాప్ లేయర్ చూడండి',
    'kn-IN': 'ಪ್ರಾದೇಶಿಕ ನಕ್ಷೆ ಲೇಯರ್ ವೀಕ್ಷಿಸಿ',
    'ml-IN': 'സ്പേഷ്യൽ മാപ്പ് ലെയർ കാണുക',
  },
  spatial_service_layer: {
    'en-IN': 'ArchitectAny Spatial Service Layer',
    'ta-IN': 'ஆர்க்கிடெக்ட் எனி இடஞ்சார்ந்த சேவை அடுக்கு',
    'hi-IN': 'आर्किटेक्ट एनी स्थानिक सेवा परत',
    'te-IN': 'ఆర్కిటెక్ట్ ఎనీ స్పేషియల్ సర్వీస్ లేయర్',
    'kn-IN': 'ಆರ್ಕಿಟೆಕ್ಟ್ ಎನಿ ಪ್ರಾದೇಶಿಕ ಸೇವಾ ಲೇಯರ್',
    'ml-IN': 'ആർക്കിടെക്റ്റ് എനി സ്പേഷ്യൽ സർവീസ് ലെയർ',
  },
  live_indian_gis: {
    'en-IN': 'Live Indian GIS',
    'ta-IN': 'நேரடி இந்திய ஜிஐஎஸ்',
    'hi-IN': 'लाइव भारतीय जीआईएस',
    'te-IN': 'లైవ్ ఇండియన్ జిఐఎస్',
    'kn-IN': 'ಲೈವ್ ಭಾರತೀಯ ಜಿಐಎಸ್',
    'ml-IN': 'തത്സമയ ഇന്ത്യൻ ജിഐഎസ്',
  },
  india_post_osm_resolver: {
    'en-IN': 'Direct India Post API & OpenStreetMap GeoData Resolver',
    'ta-IN': 'நேரடி இந்தியா போஸ்ட் ஏபிஐ & ஓபன்ஸ்ட்ரீட்மேப் புவித் தரவு தீர்வி',
    'hi-IN': 'प्रत्यक्ष इंडिया पोस्ट एपीआई और ओपनस्ट्रीटमैप भू-डेटा समाधान',
    'te-IN': 'ప్రత్యక్ష ఇండియా పోస్ట్ ఏపీఐ & ఓపెన్‌స్ట్రీట్‌మ్యాప్ జియోడేటా రిసాల్వర్',
    'kn-IN': 'ನೇರ ಭಾರತೀಯ ಪೋಸ್ಟ್ API ಮತ್ತು ಓಪನ್‌ಸ್ಟ್ರೀಟ್‌ಮ್ಯಾಪ್ ಜಿಯೋಡೇಟಾ',
    'ml-IN': 'നേരിട്ടുള്ള ഇന്ത്യ പോസ്റ്റ് API & ഓപ്പൺസ്ട്രീറ്റ്മാപ്പ് ജിയോഡേറ്റ',
  },
  map_search_placeholder: {
    'en-IN': 'Type place name or 6-digit PIN (e.g. Coimbatore, Gandhipuram, 641001)...',
    'ta-IN': 'இடத்தின் பெயர் அல்லது 6-இலக்க பின் குறியீட்டைத் தட்டச்சு செய்க (எ.கா. கோயம்புத்தூர், 641001)...',
    'hi-IN': 'स्थान का नाम या 6-अंकीय पिन टाइप करें (उदा. कोयंबटूर, 641001)...',
    'te-IN': 'ప్రదేశం పేరు లేదా 6-అంకెల పిన్ టైప్ చేయండి (ఉదా. కోయంబత్తూరు, 641001)...',
    'kn-IN': 'ಸ್ಥಳದ ಹೆಸರು ಅಥವಾ 6-ಅಂಕಿಯ ಪಿನ್ ಟೈಪ್ ಮಾಡಿ (ಉದಾ. ಕೊಯಮತ್ತೂರು, 641001)...',
    'ml-IN': 'സ്ഥലത്തിന്റെ പേര് അല്ലെങ്കിൽ 6-അക്ക പിൻ ടൈപ്പ് ചെയ്യുക (ഉദാ. കോയമ്പത്തൂർ, 641001)...',
  },
  apply_and_close: {
    'en-IN': 'Apply & Close',
    'ta-IN': 'பயன்படுத்தி மூடு',
    'hi-IN': 'लागू करें और बंद करें',
    'te-IN': 'వర్తింపజేసి మూసివేయండి',
    'kn-IN': 'ಅನ್ವಯಿಸಿ ಮತ್ತು ಮುಚ್ಚಿ',
    'ml-IN': 'പ്രയോഗിച്ച് അടയ്ക്കുക',
  },
  active_coordinates: {
    'en-IN': 'Active Coordinates',
    'ta-IN': 'செயலில் உள்ள ஆயத்தொலைவுகள்',
    'hi-IN': 'सक्रिय निर्देशांक',
    'te-IN': 'యాక్టివ్ కోఆర్డినేట్స్',
    'kn-IN': 'ಸಕ್ರಿಯ ನಿರ್ದೇಶಾಂಕಗಳು',
    'ml-IN': 'സജീവ കോർഡിനേറ്റുകൾ',
  },
  global_location_region: {
    'en-IN': 'Global Location & Region',
    'ta-IN': 'உலகளாவிய இருப்பிடம் & பிராந்தியம்',
    'hi-IN': 'वैश्विक स्थान और क्षेत्र',
    'te-IN': 'గ్లోబల్ లొకేషన్ & ప్రాంతం',
    'kn-IN': 'ಜಾಗತಿಕ ಸ್ಥಳ ಮತ್ತು ಪ್ರದೇಶ',
    'ml-IN': 'ആഗോള ലൊക്കേഷനും പ്രദേശവും',
  },
  authoritative_regional_hubs: {
    'en-IN': 'Authoritative Regional Hubs',
    'ta-IN': 'அங்கீகரிக்கப்பட்ட பிராந்திய மையங்கள்',
    'hi-IN': 'प्राधिकृत क्षेत्रीय केंद्र',
    'te-IN': 'ప్రామాణిక ప్రాంతీయ కేంద్రాలు',
    'kn-IN': 'ಪ್ರಾಧಿಕೃತ ಪ್ರಾದೇಶಿಕ ಕೇಂದ್ರಗಳು',
    'ml-IN': 'അധികാരപ്പെടുത്തിയ റീജിയണൽ ഹബ്ബുകൾ',
  },
  filters: {
    'en-IN': 'Filters',
    'ta-IN': 'வடிகட்டிகள்',
    'hi-IN': 'फ़िल्टर',
    'te-IN': 'ఫిల్టర్లు',
    'kn-IN': 'ಫಿಲ್ಟರ್‌ಗಳು',
    'ml-IN': 'ഫിൽട്ടറുകൾ',
  },
  all_categories: {
    'en-IN': 'All Categories',
    'ta-IN': 'அனைத்து வகைகள்',
    'hi-IN': 'सभी श्रेणियां',
    'te-IN': 'అన్ని వర్గాలు',
    'kn-IN': 'ಎಲ್ಲಾ ವರ್ಗಗಳು',
    'ml-IN': 'എല്ലാ വിഭാഗങ്ങളും',
  },
  book_service: {
    'en-IN': 'Book Service',
    'ta-IN': 'சேவையை முன்பதிவு செய்',
    'hi-IN': 'सेवा बुक करें',
    'te-IN': 'సేవను బుక్ చేయండి',
    'kn-IN': 'ಸೇವೆ ಕಾಯ್ದಿರಿಸಿ',
    'ml-IN': 'സേവനം ബുക്ക് ചെയ്യുക',
  },
  view_map: {
    'en-IN': 'View Map',
    'ta-IN': 'வரைபடத்தைக் காண்க',
    'hi-IN': 'मानचित्र देखें',
    'te-IN': 'మ్యాప్ చూడండి',
    'kn-IN': 'ನಕ್ಷೆ ವೀಕ್ಷಿಸಿ',
    'ml-IN': 'മാപ്പ് കാണുക',
  },
  explore: {
    'en-IN': 'Explore',
    'ta-IN': 'ஆராய்க',
    'hi-IN': 'अन्वेषण करें',
    'te-IN': 'అన్వేషించండి',
    'kn-IN': 'ಅನ್ವೇಷಿಸಿ',
    'ml-IN': 'പര്യവേക്ഷണം ചെയ്യുക',
  },
  intent: {
    'en-IN': 'Intent',
    'ta-IN': 'நோக்கம்',
    'hi-IN': 'इरादा',
    'te-IN': 'ఉద్దేశ్యం',
    'kn-IN': 'ಉದ್ದೇಶ',
    'ml-IN': 'ഉദ്ദേശ്യം',
  },
  core_vector: {
    'en-IN': 'Core Vector',
    'ta-IN': 'மைய திசையன்',
    'hi-IN': 'मुख्य वेक्टर',
    'te-IN': 'కోర్ వెక్టర్',
    'kn-IN': 'ಕೋರ್ ವೆಕ್ಟರ್',
    'ml-IN': 'കോർ വെക്ടർ',
  },
  active_vector: {
    'en-IN': 'Active Vector',
    'ta-IN': 'செயலில் உள்ள திசை',
    'hi-IN': 'सक्रिय वेक्टर',
    'te-IN': 'యాక్టివ్ వెక్టర్',
    'kn-IN': 'ಸಕ್ರಿಯ ವೆಕ್ಟರ್',
    'ml-IN': 'സജീവ വെക്ടർ',
  },
  active_domain: {
    'en-IN': 'Active Domain',
    'ta-IN': 'செயலில் உள்ள துறை',
    'hi-IN': 'सक्रिय डोमेन',
    'te-IN': 'యాక్టివ్ డొమైన్',
    'kn-IN': 'ಸಕ್ರಿಯ ಡೊಮೇನ್',
    'ml-IN': 'സജീവ ഡൊമെയ്ൻ',
  },
  subdomains: {
    'en-IN': 'Subdomains',
    'ta-IN': 'துணைத் துறைகள்',
    'hi-IN': 'उप-डोमेन',
    'te-IN': 'ఉప డొమైన్లు',
    'kn-IN': 'ಉಪ ಡೊಮೇನ್‌ಗಳು',
    'ml-IN': 'ഉപ ഡൊമെയ്നുകൾ',
  },
  solutions: {
    'en-IN': 'Solutions',
    'ta-IN': 'தீர்வுகள்',
    'hi-IN': 'समाधान',
    'te-IN': 'పరిష్కారాలు',
    'kn-IN': 'ಪರಿಹಾರಗಳು',
    'ml-IN': 'പരിഹാരങ്ങൾ',
  },
  available_solutions_in: {
    'en-IN': 'Available Solutions in',
    'ta-IN': 'இதில் கிடைக்கும் தீர்வுகள்:',
    'hi-IN': 'में उपलब्ध समाधान:',
    'te-IN': 'లో అందుబాటులో ఉన్న పరిష్కారాలు:',
    'kn-IN': 'ನಲ್ಲಿ ಲಭ್ಯವಿರುವ ಪರಿಹಾರಗಳು:',
    'ml-IN': 'ൽ ലഭ്യമായ പരിഹാരങ്ങൾ:',
  },
  click_solution_inspect: {
    'en-IN': 'Click solution to inspect architecture →',
    'ta-IN': 'கட்டமைப்பை ஆய்வு செய்ய தீர்வை கிளிக் செய்க →',
    'hi-IN': 'संरचना देखने के लिए समाधान पर क्लिक करें →',
    'te-IN': 'ఆర్కిటెక్చర్ చూడటానికి పరిష్కారంపై క్లిక్ చేయండి →',
    'kn-IN': 'ರಚನೆ ವೀಕ್ಷಿಸಲು ಪರಿಹಾರದ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ →',
    'ml-IN': 'ആർക്കിടെക്ചർ കാണാൻ പരിഹാരത്തിൽ ക്ലിക്ക് ചെയ്യുക →',
  },
  back_to_universe: {
    'en-IN': 'Back to Solution Universe',
    'ta-IN': 'தீர்வு பிரபஞ்சத்திற்குத் திரும்பு',
    'hi-IN': 'समाधान ब्रह्मांड पर वापस जाएं',
    'te-IN': 'పరిష్కార విశ్వానికి తిరిగి వెళ్ళు',
    'kn-IN': 'ಪರಿಹಾರ ವಿಶ್ವಕ್ಕೆ ಹಿಂತಿರುಗಿ',
    'ml-IN': 'പരിഹാര പ്രപഞ്ചത്തിലേക്ക് മടങ്ങുക',
  },
  bound_domains: {
    'en-IN': 'Bound Domains:',
    'ta-IN': 'இணைக்கப்பட்ட துறைகள்:',
    'hi-IN': 'संबद्ध डोमेन:',
    'te-IN': 'అనుసంధానించబడిన డొమైన్లు:',
    'kn-IN': 'ಸಂಯೋಜಿತ ಡೊಮೇನ್‌ಗಳು:',
    'ml-IN': 'ബന്ധിപ്പിച്ച ഡൊമെയ്നുകൾ:',
  },
  launch_solution: {
    'en-IN': 'Launch Architecture',
    'ta-IN': 'கட்டமைப்பைத் தொடங்கு',
    'hi-IN': 'संरचना लॉन्च करें',
    'te-IN': 'ఆర్కిటెక్చర్ ప్రారంభించండి',
    'kn-IN': 'ರಚನೆಯನ್ನು ಪ್ರಾರಂಭಿಸಿ',
    'ml-IN': 'ആർക്കിടെക്ചർ ആരംഭിക്കുക',
  },
  verified_services_nearby: {
    'en-IN': 'Verified Services Nearby',
    'ta-IN': 'அருகிலுள்ள சரிபார்க்கப்பட்ட சேவைகள்',
    'hi-IN': 'पास की सत्यापित सेवाएं',
    'te-IN': 'సమీపంలోని ధృవీకరించబడిన సేవలు',
    'kn-IN': 'ಹತ್ತಿರದ ಪರಿಶೀಲಿಸಿದ ಸೇವೆಗಳು',
    'ml-IN': 'സമീപത്തുള്ള പരിശോധിച്ച സേവനങ്ങൾ',
  },
  distance: {
    'en-IN': 'Distance',
    'ta-IN': 'தொலைவு',
    'hi-IN': 'दूरी',
    'te-IN': 'దూరం',
    'kn-IN': 'ದೂರ',
    'ml-IN': 'ദൂരം',
  },
  universe_nav: {
    'en-IN': 'Universe',
    'ta-IN': 'பிரபஞ்சம்',
    'hi-IN': 'ब्रह्मांड',
    'te-IN': 'విశ్వం',
    'kn-IN': 'ವಿಶ್ವ',
    'ml-IN': 'പ്രപഞ്ചം',
  },
  domains_nav: {
    'en-IN': 'Domains',
    'ta-IN': 'துறைகள்',
    'hi-IN': 'डोमेन',
    'te-IN': 'డొమైన్లు',
    'kn-IN': 'ಡೊಮೇನ್‌ಗಳು',
    'ml-IN': 'ഡൊമെയ്നുകൾ',
  },
  services_nav: {
    'en-IN': 'Services',
    'ta-IN': 'சேவைகள்',
    'hi-IN': 'सेवाएं',
    'te-IN': 'సేవలు',
    'kn-IN': 'ಸೇವೆಗಳು',
    'ml-IN': 'സേവനങ്ങൾ',
  },
  gis_map_nav: {
    'en-IN': 'GIS Map',
    'ta-IN': 'ஜிஐஎஸ் வரைபடம்',
    'hi-IN': 'जीआईएस मैप',
    'te-IN': 'జిఐఎస్ మ్యాప్',
    'kn-IN': 'ಜಿಐಎಸ್ ನಕ್ಷೆ',
    'ml-IN': 'ജിഐഎസ് മാപ്പ്',
  },
  copyright_note: {
    'en-IN': '© 2026 ArchitectAny AAi. One Platform. Infinite Solutions.',
    'ta-IN': '© 2026 ஆர்க்கிடெக்ட் எனி ஏஏஐ. ஒரே தளம். எல்லையற்ற தீர்வுகள்.',
    'hi-IN': '© 2026 आर्किटेक्ट एनी एएआई। एक मंच। अनंत समाधान।',
    'te-IN': '© 2026 ఆర్కిటెక్ట్ ఎనీ ఏఏఐ. ఒకే వేదిక. అనంత పరిష్కారాలు.',
    'kn-IN': '© 2026 ಆರ್ಕಿಟೆಕ್ಟ್ ಎನಿ ಎಎಐ. ಒಂದೇ ವೇದಿಕೆ. ಅನಂತ ಪರಿಹಾರಗಳು.',
    'ml-IN': '© 2026 ആർക്കിടെക്റ്റ് എനി എഎഐ. ഒരു വേദി. അനന്തമായ പരിഹാരങ്ങൾ.',
  },
};

// Domain Names Translated by ID
export const DOMAIN_TRANSLATIONS: {
  [domainId: string]: {
    [langCode: string]: { name: string; description?: string };
  };
} = {
  D01: {
    'en-IN': { name: 'Enterprise Architecture & Governance', description: 'Foundational enterprise frameworks, cloud governance, and architectural blueprint management' },
    'ta-IN': { name: 'நிறுவன கட்டமைப்பு & மேலாண்மை', description: 'நிறுவன கட்டமைப்புகள், கிளவுட் மேலாண்மை மற்றும் கட்டமைப்பு வரைபடங்கள்' },
    'hi-IN': { name: 'एंटरप्राइज आर्किटेक्चर और गवर्नेंस', description: 'बुनियादी उद्यम ढांचे, क्लाउड प्रशासन और ब्लूप्रिंट प्रबंधन' },
    'te-IN': { name: 'ఎంటర్‌ప్రైజ్ ఆర్కిటెక్చర్ & గవర్నెన్స్', description: 'ఎంటర్‌ప్రైజ్ ఫ్రేమ్‌వర్క్‌లు, క్లౌడ్ పాలన మరియు బ్లూప్రింట్ నిర్వహణ' },
    'kn-IN': { name: 'ಉದ್ಯಮ ವಾಸ್ತುಶಿಲ್ಪ & ಆಡಳಿತ', description: 'ಮೂಲ ಉದ್ಯಮ ಚೌಕಟ್ಟುಗಳು ಮತ್ತು ಕ್ಲೌಡ್ ಆಡಳಿತ' },
    'ml-IN': { name: 'എന്റർപ്രൈസ് ആർക്കിടെക്ചർ & ഗവേണൻസ്', description: 'എന്റർപ്രൈസ് ചട്ടക്കൂടുകൾ, ക്ലൗഡ് ഗവേണൻസ്' },
  },
  D02: {
    'en-IN': { name: 'FinTech & Digital Payments', description: 'Unified payments, UPI settlement rails, escrow protocols, and automated financial accounting' },
    'ta-IN': { name: 'ஃபின்டெக் & டிஜிட்டல் கொடுப்பனவுகள்', description: 'UPI கட்டணங்கள், எஸ்க்ரோ நெறிமுறைகள் மற்றும் தானியங்கி நிதி கணக்கியல்' },
    'hi-IN': { name: 'फिनटेक और डिजिटल भुगतान', description: 'एकीकृत भुगतान, यूपीआई निपटान, एस्क्रो प्रोटोकॉल और लेखांकन' },
    'te-IN': { name: 'ఫిన్‌టెక్ & డిజిటల్ చెల్లింపులు', description: 'యూపీఐ చెల్లింపులు, ఎస్క్రో ప్రోటోకాల్‌లు మరియు ఆటోమేటెడ్ అకౌంటింగ్' },
    'kn-IN': { name: 'ಫಿನ್‌ಟೆಕ್ & ಡಿಜಿಟಲ್ ಪಾವತಿಗಳು', description: 'ಯುಪಿಐ ಪಾವತಿಗಳು, ಎಸ್ಕ್ರೋ ಪ್ರೋಟೋಕಾಲ್‌ಗಳು ಮತ್ತು ಲೆಕ್ಕಪತ್ರ ನಿರ್ವಹಣೆ' },
    'ml-IN': { name: 'ഫിൻടെക് & ഡിജിറ്റൽ പേയ്‌മെന്റുകൾ', description: 'യുപിഐ പേയ്‌മെന്റുകൾ, എസ്‌ക്രോ പ്രോട്ടോക്കോളുകൾ' },
  },
  D03: {
    'en-IN': { name: 'HealthTech & Telemedicine', description: 'Digital health records, clinical triage systems, diagnostic labs, and doctor booking rails' },
    'ta-IN': { name: 'ஹெல்த்டெக் & டெலிமெடிசின்', description: 'டிஜிட்டல் சுகாதார பதிவுகள், மருத்துவ பரிசோதனை மற்றும் மருத்துவர் முன்பதிவு' },
    'hi-IN': { name: 'हेल्थटेक और टेलीमेडिसिन', description: 'डिजिटल स्वास्थ्य रिकॉर्ड, नैदानिक जांच और डॉक्टर बुकिंग' },
    'te-IN': { name: 'హెల్త్‌టెక్ & టెలిమెడిసిన్', description: 'డిజిటల్ హెల్త్ రికార్డులు, క్లినికల్ ట్రయాజ్ మరియు డాక్టర్ బుకింగ్' },
    'kn-IN': { name: 'ಹೆಲ್ತ್‌ಟೆಕ್ & ಟೆಲಿಮೆಡಿಸಿನ್', description: 'ಡಿಜಿಟಲ್ ಆರೋಗ್ಯ ದಾಖಲೆಗಳು ಮತ್ತು ವೈದ್ಯರ ಬುಕಿಂಗ್' },
    'ml-IN': { name: 'ഹെൽത്ത്‌ടെക് & ടെലിമെഡിസിൻ', description: 'ഡിജിറ്റൽ ആരോഗ്യ രേഖകൾ, ഡോക്ടർ ബുക്കിംഗ്' },
  },
  D04: {
    'en-IN': { name: 'Emerging Technology & Intelligent Systems', description: 'Process automation, robotics, semiconductor chip design, quantum tech, and advanced AI systems' },
    'ta-IN': { name: 'வளர்ந்து வரும் தொழில்நுட்பம் & நுண்ணறிவு அமைப்புகள்', description: 'ரோபாட்டிக்ஸ், குவாண்டம் தொழில்நுட்பம் மற்றும் மேம்பட்ட ஏஐ அமைப்புகள்' },
    'hi-IN': { name: 'उभरती प्रौद्योगिकी और इंटेलिजेंट सिस्टम', description: 'रोबोटिक्स, सेमीकंडक्टर डिजाइन, क्वांटम और उन्नत एआई सिस्टम' },
    'te-IN': { name: 'ఎమర్జింగ్ టెక్నాలజీ & ఇంటెలిజెంట్ సిస్టమ్స్', description: 'రోబోటిక్స్, క్వాంటం టెక్ మరియు అధునాతన ఏఐ సిస్టమ్స్' },
    'kn-IN': { name: 'ಉದಯೋನ್ಮುಖ ತಂತ್ರಜ್ಞಾನ & ಬುದ್ಧಿವಂತ ವ್ಯವಸ್ಥೆಗಳು', description: 'ರೋಬೋಟಿಕ್ಸ್, ಕ್ವಾಂಟಮ್ ತಂತ್ರಜ್ಞಾನ ಮತ್ತು ಎಐ' },
    'ml-IN': { name: 'എമർജിംഗ് ടെക്നോളജി & ഇന്റലിജന്റ് സിസ്റ്റംസ്', description: 'റോബോട്ടിക്സ്, ക്വാണ്ടം ടെക്, എഐ സിസ്റ്റംസ്' },
  },
  D05: {
    'en-IN': { name: 'Supply Chain & Logistics', description: 'Multimodal freight logistics, warehouse management, fleet telematics, and last-mile dispatch' },
    'ta-IN': { name: 'விநியோக சங்கிலி & தளவாடங்கள்', description: 'சரக்கு போக்குவரத்து, கிடங்கு மேலாண்மை மற்றும் வாகன டெலிமேட்டிக்ஸ்' },
    'hi-IN': { name: 'सप्लाई चेन और लॉजिस्टिक्स', description: 'मल्टीमॉडल फ्रेट, वेयरहाउस प्रबंधन, फ्लीट टेलीमैटिक्स और डिलीवरी' },
    'te-IN': { name: 'సప్లై చైన్ & లాజిస్టిక్స్', description: 'మల్టీమోడల్ ఫ్రైట్, వేర్‌హౌస్ మేనేజ్‌మెంట్ మరియు ఫ్లీట్ టెలిమాటిక్స్' },
    'kn-IN': { name: 'ಸರಬರಾಜು ಸರಪಳಿ & ಲಾಜಿಸ್ಟಿಕ್ಸ್', description: 'ಸರಕು ಸಾಗಣೆ, ಗೋದಾಮು ನಿರ್ವಹಣೆ ಮತ್ತು ವಿತರಣೆ' },
    'ml-IN': { name: 'സപ്ലൈ ചെയിൻ & ലോജിസ്റ്റിക്സ്', description: 'ചരക്ക് ഗതാഗതം, വെയർഹൗസ് മാനേജ്‌മെന്റ്' },
  },
  D06: {
    'en-IN': { name: 'Marketplace & Commerce', description: 'Hyperlocal service discovery, multivendor marketplace operating models, B2B networks, and platform adapters' },
    'ta-IN': { name: 'சந்தை & வர்த்தகம்', description: 'உள்ளூர் சேவைகள், பல விற்பனையாளர் சந்தை மற்றும் வர்த்தக தளங்கள்' },
    'hi-IN': { name: 'मार्केटप्लेस और वाणिज्य', description: 'हाइपरलोकल सेवा खोज, मल्टी-वेंडर मार्केटप्लेस और ई-कॉमर्स प्लेटफॉर्म' },
    'te-IN': { name: 'మార్కెట్ ప్లేస్ & కామర్స్', description: 'హైపర్‌లోకల్ సర్వీస్ డిస్కవరీ, మల్టీ-వెండర్ మార్కెట్‌ప్లేస్' },
    'kn-IN': { name: 'ಮಾರುಕಟ್ಟೆ & ವಾಣಿಜ್ಯ', description: 'ಸ್ಥಳೀಯ ಸೇವೆಗಳು, ಬಹು-ಮಾರಾಟಗಾರ ಮಾರುಕಟ್ಟೆ' },
    'ml-IN': { name: 'മാർക്കറ്റ് പ്ലേസ് & കൊമേഴ്സ്', description: 'ഹൈപ്പർലോക്കൽ സേവനങ്ങൾ, മൾട്ടി-വെണ്ടർ മാർക്കറ്റ്‌പ്ലേസ്' },
  },
  D07: {
    'en-IN': { name: 'Smart Mobility & Transport', description: 'Intelligent transit routing, EV charging networks, micro-mobility, and urban fleet dispatch' },
    'ta-IN': { name: 'ஸ்மார்ட் இயக்கம் & போக்குவரத்து', description: 'நுண்ணறிவு போக்குவரத்து, EV சார்ஜிங் நெட்வொர்க் மற்றும் நகர வாகன இயக்கம்' },
    'hi-IN': { name: 'स्मार्ट मोबिलिटी और परिवहन', description: 'स्मार्ट ट्रांजिट, ईवी चार्जिंग नेटवर्क और शहरी फ्लीट' },
    'te-IN': { name: 'స్మార్ట్ మొబిలిటీ & రవాణా', description: 'ఇంటెలిజెంట్ ట్రాన్సిట్, ఈవీ ఛార్జింగ్ మరియు అర్బన్ ఫ్లీట్' },
    'kn-IN': { name: 'ಸ್ಮಾರ್ಟ್ ಮೊಬಿಲಿಟಿ & ಸಾರಿಗೆ', description: 'ಬುದ್ಧಿವಂತ ಸಾರಿಗೆ, ಇವಿ ಚಾರ್ಜಿಂಗ್ ಮತ್ತು ವಾಹನ ನಿರ್ವಹಣೆ' },
    'ml-IN': { name: 'സ്മാർട്ട് മൊബിലിറ്റി & ട്രാൻസ്പോർട്ട്', description: 'സ്മാർട്ട് ട്രാൻസിറ്റ്, ഇവി ചാർജിംഗ് നെറ്റ്‌വർക്കുകൾ' },
  },
  D08: {
    'en-IN': { name: 'EdTech & Learning Networks', description: 'Adaptive tutoring engines, micro-credentialing verification, and interactive cohort spaces' },
    'ta-IN': { name: 'எட்டெக் & கற்றல் நெட்வொர்க்குகள்', description: 'தனிப்பயனாக்கப்பட்ட கல்வி, சான்றிதழ் சரிபார்ப்பு மற்றும் கற்றல் மையங்கள்' },
    'hi-IN': { name: 'एडटेक और लर्निंग नेटवर्क', description: 'अनुकूली शिक्षण, डिजिटल क्रेडेंशियल और इंटरैक्टिव शिक्षा' },
    'te-IN': { name: 'ఎడ్‌టెక్ & లెర్నింగ్ నెట్‌వర్క్‌లు', description: 'అడాప్టివ్ ట్యూటరింగ్, డిజిటల్ సర్టిఫికేషన్ మరియు లెర్నింగ్ ల్యాబ్స్' },
    'kn-IN': { name: 'ಎಡ್‌ಟೆಕ್ & ಕಲಿಕಾ ಜಾಲಗಳು', description: 'ಹೊಂದಾಣಿಕೆಯ ಬೋಧನೆ, ಡಿಜಿಟಲ್ ರುಜುವಾತುಗಳು' },
    'ml-IN': { name: 'എഡ്‌ടെക് & ലേണിംഗ് നെറ്റ്‌വർക്കുകൾ', description: 'അഡാപ്റ്റീവ് ട്യൂട്ടറിംഗ്, ഡിജിറ്റൽ സർട്ടിഫിക്കേഷൻ' },
  },
  D09: {
    'en-IN': { name: 'Media, Community & Creative Arts', description: 'Digital content networks, event broadcasting, decentralized media, and creator economy hubs' },
    'ta-IN': { name: 'ஊடகம், சமூகம் & படைப்புக் கலைகள்', description: 'டிஜிட்டல் உள்ளடக்க நெட்வொர்க்குகள் மற்றும் படைப்பாளி மையங்கள்' },
    'hi-IN': { name: 'मीडिया, समुदाय और रचनात्मक कला', description: 'डिजिटल कंटेंट नेटवर्क, इवेंट ब्रॉडकास्टिंग और क्रिएटर हब' },
    'te-IN': { name: 'మీడియా, కమ్యూనిటీ & క్రియేటివ్ ఆర్ట్స్', description: 'డిజిటల్ కంటెంట్ నెట్‌వర్క్‌లు మరియు క్రియేటర్ హబ్స్' },
    'kn-IN': { name: 'ಮಾಧ್ಯಮ, ಸಮುದಾಯ & ಸೃಜನಶೀಲ ಕಲೆಗಳು', description: 'ಡಿಜಿಟಲ್ ಕಂಟೆಂಟ್ ನೆಟ್‌ವರ್ಕ್‌ಗಳು' },
    'ml-IN': { name: 'മീഡിയ, കമ്മ്യൂണിറ്റി & ക്രിയേറ്റീവ് ആർട്സ്', description: 'ഡിജിറ്റൽ കണ്ടന്റ് നെറ്റ്‌വർക്കുകൾ' },
  },
  D10: {
    'en-IN': { name: 'Travel, Hospitality & Leisure', description: 'Smart resort management, dynamic tour itineraries, and travel discovery engines' },
    'ta-IN': { name: 'பயணம், விருந்தோம்பல் & ஓய்வு', description: 'ஸ்மார்ட் ரிசார்ட் மேலாண்மை, பயணத் திட்டங்கள் மற்றும் சுற்றுலா' },
    'hi-IN': { name: 'यात्रा, आतिथ्य और अवकाश', description: 'स्मार्ट रिसॉर्ट प्रबंधन, टूर यात्रा कार्यक्रम और यात्रा खोज' },
    'te-IN': { name: 'ట్రావెల్, హాస్పిటాలిటీ & విశ్రాంతి', description: 'స్మార్ట్ రిసార్ట్ నిర్వహణ మరియు ప్రయాణ ఆవిష్కరణ' },
    'kn-IN': { name: 'ಪ್ರವಾಸ, ಆತಿಥ್ಯ & ವಿರಾಮ', description: 'ಸ್ಮಾರ್ಟ್ ರೆಸಾರ್ಟ್ ನಿರ್ವಹಣೆ ಮತ್ತು ಪ್ರವಾಸ ಯೋಜನೆ' },
    'ml-IN': { name: 'യാത്ര, ഹോസ്പിറ്റാലിറ്റി & വിനോദം', description: 'സ്മാർട്ട് റിസോർട്ട് മാനേജ്‌മെന്റ്' },
  },
  D11: {
    'en-IN': { name: 'Smart Energy & CleanTech', description: 'Renewable microgrid orchestration, smart meter telematics, and carbon offset tracking' },
    'ta-IN': { name: 'ஸ்மார்ட் ஆற்றல் & க்ளீன்டெக்', description: 'புதுப்பிக்கத்தக்க மைக்ரோ கிரிட், ஸ்மார்ட் மீட்டர் மற்றும் கார்பன் கண்காணிப்பு' },
    'hi-IN': { name: 'स्मार्ट एनर्जी और क्लीनटेक', description: 'नवीकरणीय माइक्रोग्रिड, स्मार्ट मीटर टेलीमैटिक्स और कार्बन ट्रैकिंग' },
    'te-IN': { name: 'స్మార్ట్ ఎనర్జీ & క్లీన్‌టెక్', description: 'పునరుత్పాదక మైక్రోగ్రిడ్, స్మార్ట్ మీటర్ టెలిమాటిక్స్' },
    'kn-IN': { name: 'ಸ್ಮಾರ್ಟ್ ಶಕ್ತಿ & ಕ್ಲೀನ್‌ಟೆಕ್', description: 'ನವೀಕರಿಸಬಹುದಾದ ಗ್ರಿಡ್ ಮತ್ತು ಇಂಧನ ನಿರ್ವಹಣೆ' },
    'ml-IN': { name: 'സ്മാർട്ട് എനർജി & ക്ലീൻടെക്', description: 'പുനരുപയോഗ ഊർജ്ജം, സ്മാർട്ട് മീറ്ററിംഗ്' },
  },
  D12: {
    'en-IN': { name: 'Real Estate & Smart Infrastructure', description: 'Building telemetry, smart HVAC automation, digital twins, and property tenant management' },
    'ta-IN': { name: 'ரியல் எஸ்டேட் & ஸ்மார்ட் உள்கட்டமைப்பு', description: 'கட்டிட டெலிமெட்ரி, ஸ்மார்ட் HVAC மற்றும் சொத்து குத்தகைதாரர் மேலாண்மை' },
    'hi-IN': { name: 'रियल एस्टेट और स्मार्ट इन्फ्रास्ट्रक्चर', description: 'बिल्डिंग टेलीमेट्री, स्मार्ट एचवीएसी, डिजिटल ट्विन्स और संपत्ति प्रबंधन' },
    'te-IN': { name: 'రియల్ ఎస్టేట్ & స్మార్ట్ ఇన్‌ఫ్రాస్ట్రక్చర్', description: 'బిల్డింగ్ టెలిమెట్రీ, స్మార్ట్ హెచ్‌విఎసి మరియు ప్రాపర్టీ మేనేజ్‌మెంట్' },
    'kn-IN': { name: 'ರಿಯಲ್ ಎಸ್ಟೇಟ್ & ಸ್ಮಾರ್ಟ್ ಮೂಲಸೌಕರ್ಯ', description: 'ಕಟ್ಟಡ ನಿರ್ವಹಣೆ ಮತ್ತು ಆಸ್ತಿ ನಿರ್ವಹಣೆ' },
    'ml-IN': { name: 'റിയൽ എസ്റ്റേറ്റ് & സ്മാർട്ട് ഇൻഫ്രാസ്ട്രക്ചർ', description: 'കെട്ടിട മാനേജ്‌മെന്റ്, പ്രോപ്പർട്ടി' },
  },
  D13: {
    'en-IN': { name: 'Public Governance & Citizen Services', description: 'E-governance document verification, civic grievance redressal, and public benefits registry' },
    'ta-IN': { name: 'பொது நிர்வாகம் & குடிமக்கள் சேவைகள்', description: 'மின்னணு ஆளுமை, பொதுமக்கள் குறைதீர்ப்பு மற்றும் நலத்திட்டங்கள்' },
    'hi-IN': { name: 'सार्वजनिक शासन और नागरिक सेवाएं', description: 'ई-गवर्नेंस दस्तावेज सत्यापन, नागरिक शिकायत निवारण' },
    'te-IN': { name: 'పబ్లిక్ గవర్నెన్స్ & సిటిజన్ సర్వీసెస్', description: 'ఇ-గవర్నెన్స్, పౌర సమస్యల పరిష్కారం మరియు ప్రజా సేవలు' },
    'kn-IN': { name: 'ಸಾರ್ವಜನಿಕ ಆಡಳಿತ & ನಾಗರಿಕ ಸೇವೆಗಳು', description: 'ಇ-ಆಡಳಿತ ಮತ್ತು ನಾಗರಿಕ ಸೇವೆಗಳು' },
    'ml-IN': { name: 'പബ്ലിക് ഗവേണൻസ് & സിറ്റിസൺ സർവീസസ്', description: 'ഇ-ഗവേണൻസ്, പൗര സേവനങ്ങൾ' },
  },
  D14: {
    'en-IN': { name: 'BioTech & Life Sciences', description: 'Genomic data pipelines, bio-computational modeling, and clinical trials management' },
    'ta-IN': { name: 'பயோடெக் & பயோ சயின்ஸ்', description: 'மரபணு தரவு, கணக்கீட்டு உயிரியல் மற்றும் மருத்துவ பரிசோதனைகள்' },
    'hi-IN': { name: 'बायोटेक और लाइफ साइंसेज', description: 'जीनोमिक डेटा पाइपलाइन, कम्प्यूटेशनल बायोलॉजी और क्लिनिकल परीक्षण' },
    'te-IN': { name: 'బయోటెక్ & లైఫ్ సైన్సెస్', description: 'జెనోమిక్ డేటా పైప్‌లైన్లు మరియు క్లినికల్ ట్రయల్స్' },
    'kn-IN': { name: 'ಬಯೋಟೆಕ್ & ಲೈಫ್ ಸೈನ್ಸಸ್', description: 'ಜೆನೊಮಿಕ್ ಡೇಟಾ ಮತ್ತು ಕ್ಲಿನಿಕಲ್ ಪ್ರಯೋಗಗಳು' },
    'ml-IN': { name: 'ബയോടെക് & ലൈഫ് സയൻസസ്', description: 'ജീനോമിക് ഡാറ്റ, ക്ലിനിക്കൽ ട്രയലുകൾ' },
  },
};

/**
 * Translate helper function
 */
export function t(key: string, langCode: string = 'en-IN'): string {
  const entry = TRANSLATIONS[key];
  if (!entry) return key;
  return entry[langCode] || entry['en-IN'] || key;
}

/**
 * Get translated Domain info
 */
export function getTranslatedDomain(
  domainId: string,
  fallbackName: string,
  fallbackDesc?: string,
  langCode: string = 'en-IN',
): { name: string; description: string } {
  const trans = DOMAIN_TRANSLATIONS[domainId];
  if (trans && trans[langCode]) {
    return {
      name: trans[langCode].name,
      description: trans[langCode].description || fallbackDesc || '',
    };
  }
  return {
    name: fallbackName,
    description: fallbackDesc || '',
  };
}
