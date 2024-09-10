import Cookies from 'js-cookie';
import { ref } from 'vue';
import { translationsPrivacyPolity } from '../../locales/translationsPrivacyPolicy';

type TranslationsPrivacyPolicy = typeof translationsPrivacyPolity;
type Locale = keyof TranslationsPrivacyPolicy;

const currentLocale = ref<Locale>(Cookies.get('language') as Locale || 'es-ES');

export const useTranslatePrivacyPolicy = () => {
  const t = (key: string): string => {
    const keys = key.split('.');
    let translation: any = translationsPrivacyPolity[currentLocale.value];

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
    currentLocale,
  };
};
