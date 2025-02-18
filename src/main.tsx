
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createClient } from '@supabase/supabase-js'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

const supabase = createClient(
  'https://jjshsfsmgbrhypotcwvx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impqc2hzZnNtZ2JyaHlwb3Rjd3Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM2MzA0MDksImV4cCI6MjA0OTIwNjQwOX0.f4hLGrX8ZeYe6L4GpfpOnCnnA7NzxdJne3eLrbLQGHw'
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>,
)
