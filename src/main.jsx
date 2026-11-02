import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Cache Configuration
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // Data remains fresh for 5 minutes (will not refetch)
            gcTime: 1000 * 60 * 10, // Unused data is kept in memory for 10 minutes
            refetchOnWindowFocus: false, // Do not refetch simply when switching browser tabs
        },
    },
})

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </StrictMode>,
)
