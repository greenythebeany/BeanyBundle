import { useEffect, useState } from 'react';
import { I18N } from '../i18n.js';

const LANG_KEY = 'beanybundle-lang';

export function BootOverlay({ onDone }) {
  const [lines, setLines] = useState([]);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const lang = localStorage.getItem(LANG_KEY) || 'en';
    const dict = I18N[lang] || I18N.en;
    const bootLines = [dict['boot.l1'], dict['boot.l2'] + '[||||||||||] 100%', dict['boot.l3'], dict['boot.l4']];
    const timers = [];
    bootLines.forEach((line, i) => {
      timers.push(setTimeout(() => setLines((prev) => [...prev, line]), i * 220));
    });
    const doneAt = bootLines.length * 220;
    timers.push(setTimeout(() => setHidden(true), doneAt + 350));
    timers.push(setTimeout(() => onDone(), doneAt + 800));
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  return (
    <div id="boot-overlay" className={hidden ? 'hidden' : ''}>
      <div id="boot-lines">
        {lines.map((line, i) => (
          <div className="line" key={i}>&gt; {line}</div>
        ))}
      </div>
      <div className="line">&gt; <span className="cursor">_</span></div>
    </div>
  );
}
