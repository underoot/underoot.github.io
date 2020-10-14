import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import * as ru from '../locales/ru';
import * as en from '../locales/en';
import { Home } from '../components/Home';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ru, en
    },
    lng: (typeof window !== 'undefined' && navigator.language) || 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default Home;