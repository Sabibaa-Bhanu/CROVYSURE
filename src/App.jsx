import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './routes/AppRouter'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <div style={{ height: '100%', background: 'var(--cs-paper)', color: '#1a1a1a' }}>
      <BrowserRouter>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App