import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './index.css'
import App from './App.jsx'
import ProjectDetail from './pages/ProjectDetail/ProjectDetail.jsx'
import ShowcaseGallery from './pages/ShowcaseGallery/ShowcaseGallery.jsx'
import "animate.css"
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init()

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <div className="container mx-auto px-6">
            <App />
          </div>
        } />
        <Route path="/project/:slug" element={<ProjectDetail />} />
        <Route path="/showcase" element={<ShowcaseGallery />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)

