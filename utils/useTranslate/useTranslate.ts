import Cookies from 'js-cookie';
import { ref } from 'vue';
import { translations } from '../../locales/translations';

type Translations = typeof translations;
type Locale = keyof Translations;

const currentLocale = ref<Locale>(Cookies.get('language') as Locale || 'es-ES');

export const useTranslate = () => {
  const t = (key: string): string => {
    const keys = key.split('.');
    let translation: any = translations[currentLocale.value];

    for (const k of keys) {
      if (translation && translation[k] !== undefined) {
        translation = translation[k];
      } else {
        return `Missing translation: ${key}`;
      }
    }

    return translation || `Missing translation: ${key}`; 
  };

  return {
    t,
    currentLocale
  };
};
