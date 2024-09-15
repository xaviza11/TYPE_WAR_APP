// utils/useTranslateSuccess.ts
import Cookies from 'js-cookie';
import { ref } from 'vue';
import { successTranslations } from '../../locales/translationSuccess';

const currentLocale = ref<string>(Cookies.get('language') || 'es-ES');

export const useTranslateSuccess = () => {
  const translateSuccess = (successMessage: string): string => {
    const translations = successTranslations[currentLocale.value] || {};
    return translations[successMessage] || successMessage;
  };

  return {
    translateSuccess,
    currentLocale
  };
};
