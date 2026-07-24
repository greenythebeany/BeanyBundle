import { createContext, useContext, useEffect, useState } from 'react';
import { I18N } from '../i18n.js';

const LANG_KEY = 'beanybundle-lang';
const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem(LANG_KEY) || 'en');

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  const dict = I18N[lang] || I18N.en;
  const t = (key) => dict[key] ?? key;

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
