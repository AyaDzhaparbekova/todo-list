import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // The StrictMode component is a tool for highlighting potential problems in an application.
  
  <StrictMode>
    <App />
  </StrictMode>,
)
