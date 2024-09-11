// utils/useTranslateErrors.ts
import Cookies from 'js-cookie';
import { ref } from 'vue';
import { errorTranslations } from '../../locales/translationsErrors';
import type { ErrorTranslations } from '../../locales/translationsErrors';

const currentLocale = ref<string>(Cookies.get('language') || 'es-ES');

export const useTranslateErrors = () => {
  const translateError = (errorMessage: string): string => {
    const translations = errorTranslations[currentLocale.value] || {};
    return translations[errorMessage] || `Error translation missing: ${errorMessage}`;
  };

  return {
    translateError,
    currentLocale
  };
};
