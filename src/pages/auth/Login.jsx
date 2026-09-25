import React, { useState } from 'react'
import { Eye, EyeOff, User, AlertCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    email: 'district.officer@pmfby.gov.in',
    password: 'password123',
    role: 'district_officer'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const roles = [
    { value: 'state_admin', label: 'State Admin', color: 'bg-red-500', email: 'state.admin@pmfby.gov.in' },
    { value: 'district_officer', label: 'District Officer', color: 'bg-blue-500', email: 'district.officer@pmfby.gov.in' },
    { value: 'block_officer', label: 'Block Officer', color: 'bg-green-500', email: 'block.officer@pmfby.gov.in' },
    { value: 'insurance_staff', label: 'Insurance Staff', color: 'bg-purple-500', email: 'insurance.staff@pmfby.gov.in' }
  ]

  const handleRoleSelect = (role) => {
    setFormData({
      email: role.email,
      password: 'password123',
      role: role.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      console.log('Submitting login form...')
      const result = await login(formData.email, formData.password)
      console.log('Login result:', result)
      
      if (result.success) {
        console.log('Login successful, navigating to dashboard...')
        navigate('/dashboard', { replace: true })
      } else {
        setError(result.error || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-14 w-14 rounded flex items-center justify-center shadow-xs" style={{ background: '#1e4d38' }}>
            <svg viewBox="0 0 28 28" className="h-8 w-8" fill="none">
              <path
                d="M14 3C8.5 3 4 7.8 4 13.5c0 4.2 2.5 7.8 6.2 9.5C11.2 18 14 12 14 12s2.8 6 3.8 11C21.5 21.3 24 17.7 24 13.5c0-5.7-4.5-10.5-10-10.5z"
                fill="rgba(255,255,255,0.18)"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth="1.4"
              />
              <path d="M10 14l3 3 5.5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="mt-4 text-2xl font-black tracking-widest text-stone-900">
            CROVYSURE
          </h2>
          <p className="mt-1 text-xs text-stone-600">
            Agricultural Early Warning &amp; Field Response System
          </p>
        </div>


        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center">
            <AlertCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0" />
            <span className="text-red-700 text-xs">{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xs p-6 sm:p-8 border border-stone-200 space-y-5">
          {/* Role Selection */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-2">
              Select Official Role (Auto-fills credentials)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((role) => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => handleRoleSelect(role)}
                  className={`p-2.5 rounded-md border text-left transition-all ${
                    formData.role === role.value
                      ? 'bg-emerald-50 border-emerald-800 text-emerald-950 font-bold'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <div className="text-xs">{role.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Official Email Address
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-400" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-md focus:ring-1 focus:ring-emerald-800 focus:border-emerald-800"
                placeholder="official@pmfby.gov.in"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Security Credential
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pr-9 pl-3 py-2 text-xs border border-stone-300 rounded-md focus:ring-1 focus:ring-emerald-800 focus:border-emerald-800"
                placeholder="Enter password"
              />
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              Demonstration password: <strong className="text-stone-700">password123</strong>
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-800 hover:bg-emerald-900 disabled:bg-stone-300 text-white py-2.5 px-4 rounded-md text-xs font-semibold shadow-xs transition-colors flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent mr-2"></div>
                Authenticating...
              </>
            ) : (
              'Access Surveillance Portal'
            )}
          </button>
        </form>

        {/* Demo Info */}
        <div className="bg-stone-50 rounded-lg p-3.5 border border-stone-200 text-xs">
          <h3 className="font-semibold text-stone-800 mb-1">Field Demonstration Credentials:</h3>
          <ul className="text-stone-600 space-y-0.5 text-[11px]">
            <li>• Select any role above to populate sample government / district officer credentials</li>
            <li>• Demo password is pre-filled as: <strong>password123</strong></li>
          </ul>
        </div>

        {/* Footer */}
        <div className="text-center text-[11px] text-stone-500">
          CROVYSURE — Crop Intelligence &amp; Risk Platform &copy; 2026
        </div>
      </div>
    </div>
  )
}

export default Login