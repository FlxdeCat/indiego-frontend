import './index.css'

import Home from './pages/home.tsx'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { ThemeProvider } from './components/theme-provider.tsx'
import Auth from './pages/auth.tsx'
import Profile from './pages/profile.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>  
    </ThemeProvider>
  </StrictMode>,
)
