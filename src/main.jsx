import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './context/LanguageProvider.jsx'
import { AccessibilityProvider } from './context/AccessibilityProvider.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <AccessibilityProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </AccessibilityProvider>
    </LanguageProvider>
  </StrictMode>,
)
