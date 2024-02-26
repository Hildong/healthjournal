import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { UserProvider } from './Context/UserContext';

const queryClient = new QueryClient()
axios.defaults.baseURL = "http://localhost:8000"
axios.defaults.withCredentials = true

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
