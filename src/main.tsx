import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './Index.css'
import { Providers } from './store/provider.js'
import { Toaster } from 'react-hot-toast'
import { ChakraProvider } from '@chakra-ui/react'
createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <ChakraProvider>
      <Toaster
        position="bottom-right"
      />
      <Providers>
        <div className='max-w-[100vw] overflow-x-hidden'>
          <App />
        </div>
      </Providers>
    </ChakraProvider>
  </StrictMode>,

)
