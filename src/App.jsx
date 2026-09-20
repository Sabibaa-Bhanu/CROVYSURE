import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './routes/AppRouter'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <div className="h-full bg-stone-50 text-stone-900">
      <BrowserRouter>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App