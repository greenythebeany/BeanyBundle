import { useLang } from '../contexts/LangContext.jsx';
import { useReveal } from '../hooks/useReveal.js';

function FeatureItem({ html, delay }) {
  const [ref, inView] = useReveal();
  return (
    <li ref={ref} className={inView ? 'in-view' : ''} style={{ transitionDelay: `${delay}ms` }}>
      <span className="chevron">&#9656;</span>
      <span dangerouslySetInnerHTML={{ __html: html }} />
    </li>
  );
}

export function FeatureList({ featureKeys }) {
  const { t } = useLang();
  return (
    <ul className="feature-list">
      {featureKeys.map((key, i) => (
        <FeatureItem key={key} html={t(key)} delay={i * 60} />
      ))}
    </ul>
  );
}
