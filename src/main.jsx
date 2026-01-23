import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ProjectDetail from './pages/ProjectDetail/ProjectDetail.jsx'
import "animate.css"
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={
          <div className="container mx-auto px-6">
            <App />
          </div>
        } />
        <Route path="/project/:slug" element={<ProjectDetail />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)

