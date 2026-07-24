import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import { AppPage } from './pages/AppPage.jsx';
import { NotFound } from './pages/NotFound.jsx';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:slug" element={<AppPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
