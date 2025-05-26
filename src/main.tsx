import './index.css'

import Home from './pages/home.tsx'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { ThemeProvider } from './components/theme-provider.tsx'
import Auth from './pages/auth.tsx'
import Profile from './pages/profile.tsx'
import Browse from './pages/browse.tsx'
import Game from './pages/game.tsx'
import News from './pages/news.tsx'
import Subscription from './pages/subscription.tsx'
import { SonnerToaster } from './components/sonner-toaster.tsx'
import DeveloperHub from './pages/developer-hub.tsx'
import DeveloperGameForm from './pages/developer-game-form.tsx'
import AdminHub from './pages/admin-hub.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RedirectIfAuthenticated, RequireAuth } from './components/middleware.tsx'
import { AuthProvider } from './context/auth-context.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={
                <RedirectIfAuthenticated>
                  <Auth />
                </RedirectIfAuthenticated>
              } />

              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/news" element={<News />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/game/:id" element={<Game />} />

              <Route path="/profile" element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              } />

              <Route path="/developer" element={
                <RequireAuth allowedRoles={["Developer"]}>
                  <DeveloperHub />
                </RequireAuth>
              } />
              <Route path="/developer/game/:id?" element={
                <RequireAuth allowedRoles={["Developer"]}>
                  <DeveloperGameForm />
                </RequireAuth>
              } />

              <Route path="/admin" element={
                <RequireAuth allowedRoles={["Admin"]}>
                  <AdminHub />
                </RequireAuth>
              } />
            </Routes>
            <SonnerToaster />
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
