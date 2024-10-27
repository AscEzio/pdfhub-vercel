import { createRoot } from 'react-dom/client'
import { RouterView } from 'oh-router-react'
import { router } from './router'

createRoot(document.getElementById('root')!).render(
  <RouterView router={router} />
)
