import { useLang } from '../contexts/LangContext.jsx';
import { AppCard } from './AppCard.jsx';
import { APPS, APP_ORDER } from '../data/apps.js';

const NAME_NODES = {
  beanybox: <>Beany<span className="accentword">Box</span></>,
  beanydrive: <>Beany<span className="accentword">Drive</span></>,
  questmaker: <>Beany's Quest<span className="accentword"> Maker</span></>,
};

export function OtherApps({ exclude }) {
  const { t } = useLang();
  const others = APP_ORDER.filter((slug) => slug !== exclude);

  return (
    <div className="wrap">
      <div className="section-head">
        <span className="chevron">&#10095;</span>
        <h2>{t('other.head')}</h2>
      </div>
      <div className="other-apps">
        {others.map((slug) => (
          <AppCard key={slug} app={APPS[slug]} nameNode={NAME_NODES[slug]} />
        ))}
      </div>
    </div>
  );
}
