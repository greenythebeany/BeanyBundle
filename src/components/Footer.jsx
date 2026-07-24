import { useLang } from '../contexts/LangContext.jsx';

export function Footer({ sourceHref }) {
  const { t } = useLang();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-links">
          <a href="https://github.com/greenythebeany" target="_blank" rel="noopener">
            <span className="chevron">&#10095;</span> github.com/greenythebeany
          </a>
          <a href={sourceHref} target="_blank" rel="noopener">
            {t('footer.source')}
          </a>
        </div>
        <div>{t('footer.tagline')}</div>
      </div>
    </footer>
  );
}
