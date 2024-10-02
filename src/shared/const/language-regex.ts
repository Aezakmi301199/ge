export const LanguageRegex = {
  RU_WITH_NUMBERS_AND_PUNCTUATION_MARKS: /^[А-Яа-яЁё\s0-9.,!?;:'"(){}[\]–-]+$/,
  EN_WITH_NUMBERS_AND_PUNCTUATION_MARKS: /^[A-Za-z\s0-9.,!?;:'"(){}[\]–-]+$/,
  EN_WITH_NUMBERS_AND_SIGNS: /^[A-Za-z0-9\p{P}\p{S}\s]*$/u,
  RU_WITH_NUMBERS_AND_SIGNS: /^[А-Яа-яЁё0-9\p{P}\p{S}\s]*$/u,
};
