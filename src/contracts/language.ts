/**
 * ArchitectAny AAi - Global Language & Regional Locale Contracts
 */

export interface LanguageContextState {
  code: string; // e.g. 'en-IN'
  locale: string; // e.g. 'en-IN'
  name: string; // e.g. 'English (India)'
  nativeName: string; // e.g. 'English'
  shortLabel: string; // e.g. 'EN'
  countryCode: string; // e.g. 'IN'
  direction?: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageContextState[] = [
  {
    code: 'en-IN',
    locale: 'en-IN',
    name: 'English (India)',
    nativeName: 'English',
    shortLabel: 'EN',
    countryCode: 'IN',
    direction: 'ltr',
  },
  {
    code: 'ta-IN',
    locale: 'ta-IN',
    name: 'Tamil (தமிழ்)',
    nativeName: 'தமிழ்',
    shortLabel: 'TA',
    countryCode: 'IN',
    direction: 'ltr',
  },
  {
    code: 'hi-IN',
    locale: 'hi-IN',
    name: 'Hindi (हिन्दी)',
    nativeName: 'हिन्दी',
    shortLabel: 'HI',
    countryCode: 'IN',
    direction: 'ltr',
  },
  {
    code: 'te-IN',
    locale: 'te-IN',
    name: 'Telugu (తెలుగు)',
    nativeName: 'తెలుగు',
    shortLabel: 'TE',
    countryCode: 'IN',
    direction: 'ltr',
  },
  {
    code: 'kn-IN',
    locale: 'kn-IN',
    name: 'Kannada (ಕನ್ನಡ)',
    nativeName: 'ಕನ್ನಡ',
    shortLabel: 'KN',
    countryCode: 'IN',
    direction: 'ltr',
  },
  {
    code: 'ml-IN',
    locale: 'ml-IN',
    name: 'Malayalam (മലയാളം)',
    nativeName: 'മലയാളം',
    shortLabel: 'ML',
    countryCode: 'IN',
    direction: 'ltr',
  },
];
