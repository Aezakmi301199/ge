import { useLanguageFromLocalStorage } from '../../i18n/hooks/use-default-language';
import { LanguageLowercase } from '../enums/languages.enum';

const language = useLanguageFromLocalStorage();

export const getItemDeclension = (number: number, words: string[]) => {
  if (number === 0 && language === LanguageLowercase.RU) {
    return `${number} объектов`;
  }

  const wordIndex =
    number % 100 > 4 && number % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5];
  const declension = words[wordIndex];

  return `${number} ${declension}`;
};
