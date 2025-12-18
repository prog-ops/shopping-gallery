import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Cache Configuration
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // Data dianggap "segar" selama 5 menit (tidak akan fetch ulang)
            cacheTime: 1000 * 60 * 10, // Data disimpan di memori 10 menit
            refetchOnWindowFocus: false, // Jangan fetch ulang cuma gara-gara ganti tab browser
        },
    },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <App />
      </QueryClientProvider>
  </React.StrictMode>,
)
