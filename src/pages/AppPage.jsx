import { Link, useParams } from 'react-router-dom';
import { useLang } from '../contexts/LangContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { Nav } from '../components/Nav.jsx';
import { Footer } from '../components/Footer.jsx';
import { CrtOverlay } from '../components/CrtOverlay.jsx';
import { Reveal } from '../components/Reveal.jsx';
import { FeatureList } from '../components/FeatureList.jsx';
import { ShortcutsTable } from '../components/ShortcutsTable.jsx';
import { OtherApps } from '../components/OtherApps.jsx';
import { APPS } from '../data/apps.js';
import { assetUrl } from '../assetUrl.js';
import { NotFound } from './NotFound.jsx';

export function AppPage() {
  const { slug } = useParams();
  const { t } = useLang();
  const { theme } = useTheme();
  const app = APPS[slug];

  if (!app) return <NotFound />;

  return (
    <>
      <CrtOverlay />
      <Nav />

      <div className="wrap" style={{ paddingTop: '16px' }}>
        <div className="crumb">
          <span className="chevron">&#10095;</span>
          <Link to="/">{t('nav.back')}</Link>
        </div>
      </div>

      <header className="app-hero">
        <div className="wrap">
          <img className="app-hero-icon" src={assetUrl(app.icon)} alt={`${app.termLabel} icon`} />
          <h1>
            <span>{t(app.nameGreyKey)}</span>
            <span className="accentword">{t(app.nameAccentKey)}</span>
          </h1>
          <p className="tagline">{t(app.taglineKey)}</p>
          <div className="btn-row">
            <a className="btn" href={app.downloadHref} target="_blank" rel="noopener">
              {t('download.btn')}
            </a>
            <a className="btn secondary" href={app.sourceHref} target="_blank" rel="noopener">
              {t('source.btn')}
            </a>
          </div>
        </div>
      </header>

      <Reveal as="section" className="section">
        <div className="wrap">
          <p style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', color: 'var(--text-body)', fontSize: '14px' }}>
            {t(app.descKey)}
          </p>
        </div>
      </Reveal>

      <Reveal as="section" className="section">
        <div className="wrap">
          <div className="term-frame">
            <div className="term-frame-bar">
              <span><span className="chevron">&#10095;_</span> {app.termLabel}</span>
              <span className="dots"><span></span><span></span><span></span></span>
            </div>
            <img
              src={assetUrl(theme === 'light' && app.screenshotLight ? app.screenshotLight : app.screenshot)}
              alt={app.screenshotAlt}
            />
          </div>
        </div>
      </Reveal>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="chevron">&#10095;</span>
            <h2>{t('features.head')}</h2>
          </div>
          <FeatureList featureKeys={app.featureKeys} />
        </div>
      </section>

      <Reveal as="section" className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="chevron">&#10095;</span>
            <h2>{t('shortcuts.head')}</h2>
          </div>
          <ShortcutsTable shortcuts={app.shortcuts} />
        </div>
      </Reveal>

      <Reveal as="section" className="section">
        <OtherApps exclude={app.slug} />
      </Reveal>

      <Footer sourceHref={app.sourceHref} />
    </>
  );
}
