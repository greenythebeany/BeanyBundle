import { useNavigate } from 'react-router-dom';
import { useLang } from '../contexts/LangContext.jsx';
import { assetUrl } from '../assetUrl.js';

export function AppCard({ app, nameNode }) {
  const navigate = useNavigate();
  const { t } = useLang();

  return (
    <article
      className="app-card"
      tabIndex={0}
      onClick={() => navigate(`/${app.slug}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(`/${app.slug}`);
        }
      }}
    >
      <img className="app-card-icon" src={assetUrl(app.icon)} alt={`${app.termLabel} icon`} />
      <div className="app-card-name">{nameNode}</div>
      <p className="app-card-desc">{t(app.cardDescKey)}</p>
      <div className="app-card-cta">
        <span>{app.termLabel}</span>
        <span>{t('card.cta.open')}</span>
      </div>
    </article>
  );
}

export function ComingSoonCard() {
  const { t } = useLang();
  return (
    <article className="app-card soon" tabIndex={-1}>
      <div
        className="app-card-icon"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '34px',
          color: 'var(--text-dimmer)',
          border: '1px dashed var(--border-soft)',
        }}
      >
        ?
      </div>
      <div className="app-card-name">{t('card.soon.name')}</div>
      <p className="app-card-desc">{t('card.soon.desc')}</p>
      <div className="app-card-cta">
        <span>&mdash;</span>
        <span>{t('card.cta.soon')}</span>
      </div>
    </article>
  );
}
