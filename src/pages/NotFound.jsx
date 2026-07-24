import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LangContext.jsx';
import { Nav } from '../components/Nav.jsx';
import { Footer } from '../components/Footer.jsx';
import { CrtOverlay } from '../components/CrtOverlay.jsx';

export function NotFound() {
  const { t } = useLang();

  return (
    <>
      <CrtOverlay />
      <Nav />

      <header className="hero">
        <div className="wrap">
          <div className="hero-prompt">
            <span className="chevron">&#10095;</span> ~/greenythebeany $ cd ./nowhere
          </div>
          <h1>
            404<span className="accent">_not_found</span>
            <span className="cursor">&nbsp;</span>
          </h1>
          <p className="hero-tagline">This path doesn't mount to anything.</p>
          <div className="btn-row">
            <Link className="btn" to="/">
              {t('nav.back')}
            </Link>
          </div>
        </div>
      </header>

      <Footer sourceHref="https://github.com/greenythebeany/BeanyBundle" />
    </>
  );
}
