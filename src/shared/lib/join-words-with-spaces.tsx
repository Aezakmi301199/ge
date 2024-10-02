import { Punctuation } from '../enums/punctuation';

/**
 * Соединяет слова в строке с использованием знака препинания.
 *
 * @param str - Исходная строка для обработки
 * @param delimiter - Знак препинания для разделения слов
 * @returns Строка, где слова соединены с использованием delimiter
 */
export const joinWordsWithPunctuation = (str: string, delimiter: Punctuation): string => {
  return str.split(' ').join(delimiter);
};

/**
 * Соединяет слова в строке с использованием символа подчеркивания.
 *
 * @param str - Исходная строка для обработки
 * @returns Строка, где слова соединены с использованием символа подчеркивания
 */
export const joinWordsWithUnderscore = (str: string): string => {
  return joinWordsWithPunctuation(str, Punctuation.UNDERSCORE);
};
