import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ThemeProvider from './context/ThemeContext.jsx'
import { createBrowserRouter, Router, RouterProvider } from 'react-router'

const router = createBrowserRouter([
  {
    path: '/*',
    element: (
      <ThemeProvider>
        <App />
      </ThemeProvider>
    ),
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
