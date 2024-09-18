import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './Index.css'
import { Providers } from './store/provider.js'
import { Toaster } from 'react-hot-toast'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster
      position="bottom-right"
    />
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
)
