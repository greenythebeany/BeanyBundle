import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LangContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { assetUrl } from '../assetUrl.js';

export function Nav() {
  const { lang, setLang, t } = useLang();
  const { theme, setTheme } = useTheme();

  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="brand">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img className="brand-icon" src={assetUrl('/assets/icons/beanybundle-mark.png')} alt="BeanyBundle icon" />
            <b>{t('nav.home')}</b>
          </Link>
        </div>
        <div className="nav-controls">
          <div className="lang-group">
            <button
              className={`toggle-btn lang-btn${lang === 'en' ? ' active' : ''}`}
              onClick={() => setLang('en')}
            >
              EN
            </button>
            <button
              className={`toggle-btn lang-btn${lang === 'sk' ? ' active' : ''}`}
              onClick={() => setLang('sk')}
            >
              SK
            </button>
          </div>
          <div className="theme-group">
            <button
              className={`toggle-btn theme-btn${theme === 'dark' ? ' active' : ''}`}
              onClick={() => setTheme('dark')}
            >
              DARK
            </button>
            <button
              className={`toggle-btn theme-btn${theme === 'light' ? ' active' : ''}`}
              onClick={() => setTheme('light')}
            >
              LIGHT
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
