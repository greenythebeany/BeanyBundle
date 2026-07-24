import { useEffect, useState } from 'react';
import { useLang } from '../contexts/LangContext.jsx';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function TypedLine() {
  const { lang, t } = useLang();
  const [text, setText] = useState('');
  const full = t('hero.typed');

  useEffect(() => {
    if (prefersReduced) {
      setText(full);
      return;
    }
    setText('');
    let i = 0;
    const iv = setInterval(() => {
      setText(full.slice(0, i));
      i++;
      if (i > full.length) clearInterval(iv);
    }, 45);
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return <span className="accent">{text}</span>;
}
