import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App.jsx';
import { LangProvider } from './contexts/LangContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { BootProvider } from './contexts/BootContext.jsx';
import './style.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/BeanyBundle">
      <ThemeProvider>
        <LangProvider>
          <BootProvider>
            <App />
          </BootProvider>
        </LangProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
