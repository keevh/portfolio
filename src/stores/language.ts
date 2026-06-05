import { atom } from 'nanostores';

type Language = 'es' | 'en';

export const $language = atom<Language>('es');

export function toggleLanguage() {
  $language.set($language.get() === 'es' ? 'en' : 'es');
}
