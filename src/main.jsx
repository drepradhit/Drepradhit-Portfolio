import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ProjectDetail from './pages/ProjectDetail/ProjectDetail.jsx'
import ShowcaseGallery from './pages/ShowcaseGallery/ShowcaseGallery.jsx'
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

export function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    const restoreHome = sessionStorage.getItem("should_restore_home_scroll");
    const restoreMobileHome = sessionStorage.getItem("should_restore_mobile_home_scroll");
    const restoreShowcase = sessionStorage.getItem("should_restore_showcase_scroll");

    // If it's a BACK navigation (POP), let the browser or our manual restoration handle it
    if (navType === 'POP') return;

    // Only scroll to top if we AREN'T explicitly trying to restore a position
    if (pathname === '/' && (restoreHome === 'true' || restoreMobileHome === 'true')) return;
    if (pathname === '/showcase' && restoreShowcase === 'true') return;

    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, navType]);

  return null;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
        <Route path="/showcase" element={<ShowcaseGallery />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
