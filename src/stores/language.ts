import { atom } from 'nanostores';

type Language = 'es' | 'en';

const STORAGE_KEY = 'portfolio-language';
const DEFAULT_LANGUAGE: Language = 'es';

function isLanguage(value: string | null): value is Language {
  return value === 'es' || value === 'en';
}

function getStoredLanguage(): Language {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE;
  }

  const storedLanguage = window.localStorage.getItem(STORAGE_KEY);
  return isLanguage(storedLanguage) ? storedLanguage : DEFAULT_LANGUAGE;
}

export const $language = atom<Language>(getStoredLanguage());

export function setLanguage(language: Language) {
  $language.set(language);

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, language);
  }
}

export function toggleLanguage() {
  setLanguage($language.get() === 'es' ? 'en' : 'es');
}
