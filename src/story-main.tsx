import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/baloo-2/700.css'
import '@fontsource/baloo-2/800.css'
import '@fontsource/outfit/400.css'
import '@fontsource/outfit/500.css'
import '@fontsource/outfit/700.css'
import './index.css'
import StoryPage from './StoryPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoryPage />
  </StrictMode>,
)
