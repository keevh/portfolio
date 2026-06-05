import { useStore } from '@nanostores/react';
import { $language, toggleLanguage } from '../stores/language';
import { translations } from '../i18n/translations';

type TranslationKey = keyof typeof translations['es'];

export function useLanguage() {
  const language = useStore($language);
  const t = (key: TranslationKey) => translations[language][key] ?? key;
  return { language, toggleLanguage, t };
}
