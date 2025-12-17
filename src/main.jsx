import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "animate.css"
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="container mx-auto px-6">
      <App />
    </div>
  </StrictMode>,
)
