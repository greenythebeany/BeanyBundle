import { useLang } from '../contexts/LangContext.jsx';
import { useBoot } from '../contexts/BootContext.jsx';
import { BootOverlay } from '../components/BootOverlay.jsx';
import { Nav } from '../components/Nav.jsx';
import { Footer } from '../components/Footer.jsx';
import { CrtOverlay } from '../components/CrtOverlay.jsx';
import { TypedLine } from '../components/TypedLine.jsx';
import { Carousel } from '../components/Carousel.jsx';
import { AppCard, ComingSoonCard } from '../components/AppCard.jsx';
import { APPS, APP_ORDER } from '../data/apps.js';

const NAME_NODES = {
  beanybox: <>Beany<span className="accentword">Box</span></>,
  beanydrive: <>Beany<span className="accentword">Drive</span></>,
  questmaker: <>Beany's Quest<span className="accentword"> Maker</span></>,
};

export function Home() {
  const { t } = useLang();
  const { booting, setBooting } = useBoot();

  return (
    <>
      {booting && <BootOverlay onDone={() => setBooting(false)} />}
      <CrtOverlay />
      <Nav />

      <header className="hero">
        <div className="wrap">
          <div className="hero-prompt">
            <span className="chevron">&#10095;</span> {t('hero.prompt')}
          </div>
          <h1>
            Beany<span className="accent">Bundle</span>
            <span className="cursor">&nbsp;</span>
          </h1>
          <p className="hero-tagline">{t('hero.tagline')}</p>
          <p className="hero-sub">{t('hero.sub')}</p>
          <div className="typed-line">
            <TypedLine />
          </div>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="chevron">&#10095;</span>
            <h2>{t('apps.head')}</h2>
            <span className="count">{t('apps.count')}</span>
          </div>

          <Carousel>
            {APP_ORDER.map((slug) => (
              <AppCard key={slug} app={APPS[slug]} nameNode={NAME_NODES[slug]} />
            ))}
            <ComingSoonCard key="soon" />
          </Carousel>
        </div>
      </section>

      <Footer sourceHref="https://github.com/greenythebeany/BeanyBundle" />
    </>
  );
}
