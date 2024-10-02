export function useLanguageFromLocalStorage() {
  return localStorage.getItem('i18nextLng') || 'en';
}
