import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles.css'
import Layout from './components/Layout.tsx'
import About from './pages/About.tsx'
import ComingSoon from './pages/ComingSoon.tsx'
import Scrapbook from './pages/Scrapbook.tsx'
import Experience from './pages/Experience.tsx'
import Home from './pages/Home.tsx'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'experience', element: <Experience /> },
      { path: 'scrapbook', element: <Scrapbook /> },
      { path: '*', element: <ComingSoon title="Not found" /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
