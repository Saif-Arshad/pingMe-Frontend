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
      <div className='max-w-[100vw] overflow-x-hidden'>
        <App />
      </div>
    </Providers>
  </StrictMode>,
)
