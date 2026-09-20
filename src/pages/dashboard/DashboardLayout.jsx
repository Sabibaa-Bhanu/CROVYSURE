import React, { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
  Menu,
  X,
  Map,
  Image,
  Users,
  Shield,
  AlertTriangle,
  FileText,
  History,
  Settings,
  LogOut,
  ChevronDown,
  BarChart3,
  CheckCircle2,
  Sprout,
  Activity,
  ClipboardCheck,
  CloudSun,
} from 'lucide-react'

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeModule, setActiveModule] = useState('overview')
  const navigate = useNavigate()

  const navigation = [
    {
      name: 'Overview',
      href: '/dashboard',
      icon: BarChart3,
    },
    {
      name: 'Field & Hotspot Map',
      href: '/dashboard/map',
      icon: Map,
    },
    {
      name: 'Image Gallery',
      href: '/dashboard/images',
      icon: Image,
    },
    {
      name: 'AI Analysis',
      href: '/dashboard/ai-analysis',
      icon: Shield,
    },
    {
      name: 'Crop Monitoring',
      href: '/dashboard/growth',
      icon: Sprout,
    },
    {
      name: 'Farmer Tracker',
      href: '/dashboard/farmers',
      icon: Users,
    },
    {
      name: 'Expert Validation',
      href: '/dashboard/approvals',
      icon: ClipboardCheck,
    },
    {
      name: 'Disease Alerts',
      href: '/dashboard/alerts',
      icon: AlertTriangle,
    },
    {
      name: 'Risk Forecast',
      href: '/dashboard/risk',
      icon: CloudSun,
    },
    {
      name: 'Reports & Analytics',
      href: '/dashboard/reports',
      icon: FileText,
    },
    {
      name: 'Follow-up Monitoring',
      href: '/dashboard/follow-up',
      icon: Activity,
    },
    {
      name: 'History',
      href: '/dashboard/history',
      icon: History,
    },
  ]

  const user = {
    name: 'Rajesh Kumar',
    role: 'District Agriculture Officer',
    district: 'Nashik District',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    navigate('/login')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-stone-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 flex z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-stone-900/60" />
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-stone-200 flex flex-col
          transform transition duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between h-16 px-4 bg-emerald-900 text-white border-b border-emerald-950">
          <div className="flex items-center space-x-2.5 min-w-0">
            {/* CROVYSURE wordmark icon: leaf + check */}
            <svg
              viewBox="0 0 32 32"
              className="h-8 w-8 flex-shrink-0"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Leaf shape */}
              <path
                d="M16 4C10 4 5 9 5 16c0 5 3 9 7.5 11C14 21 16 15 16 15s2 6 3.5 12C24 25 27 21 27 16c0-7-5-12-11-12z"
                fill="rgba(255,255,255,0.25)"
                stroke="white"
                strokeWidth="1.5"
              />
              {/* Check mark overlay */}
              <path
                d="M11 16.5l3.5 3.5 6.5-7"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="min-w-0">
              <h1 className="text-base font-black tracking-widest leading-none">CROVYSURE</h1>
              <p className="text-xs opacity-80 leading-tight mt-0.5 truncate">
                Crop Intelligence &amp; Risk Platform
              </p>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-white hover:bg-green-700 flex-shrink-0"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User profile */}
        <div className="p-4 border-b border-stone-200 bg-stone-50/70">
          <div className="flex items-center space-x-3">
            <img
              className="h-9 w-9 rounded-full border border-stone-300 object-cover"
              src={user.avatar}
              alt={user.name}
            />

            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-stone-900 truncate">
                {user.name}
              </p>

              <p className="text-[11px] text-stone-500 truncate">
                {user.role}
              </p>

              <p className="text-[11px] text-emerald-800 font-semibold">
                {user.district}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => {
                  setActiveModule(item.name.toLowerCase())
                  setSidebarOpen(false)
                }}
                className={({ isActive }) => `
                  flex items-center px-3 py-2 text-xs font-medium
                  rounded-md transition-colors duration-150 group

                  ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-900 font-bold border-l-3 border-emerald-800'
                      : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                  }
                `}
              >
                <Icon
                  className={`
                    mr-2.5 h-4 w-4
                    ${
                      activeModule === item.name.toLowerCase()
                        ? 'text-emerald-800'
                        : 'text-stone-400 group-hover:text-stone-700'
                    }
                  `}
                />

                {item.name}
              </NavLink>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-stone-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-xs font-medium text-stone-600 rounded-md hover:bg-stone-100 hover:text-red-700 transition-colors"
          >
            <LogOut className="mr-2.5 h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white border-b border-stone-200 z-10">
          <div className="flex items-center justify-between h-14 px-4 sm:px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-1.5 rounded-md text-stone-600 hover:bg-stone-100"
              >
                <Menu className="h-5 w-5" />
              </button>

              {/* Breadcrumb */}
              <div className="ml-2 sm:ml-4 flex items-center space-x-2 text-xs">
                <span className="font-extrabold tracking-wider text-emerald-900">CROVYSURE</span>

                <span className="text-stone-400">/</span>

                <span className="text-stone-600 font-medium">
                  {navigation.find(n => n.href === location.pathname)?.name || 'Dashboard Overview'}
                </span>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center space-x-3">
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-100 text-stone-600 border border-stone-200">
                Prototype Data
              </span>

              <div className="flex items-center space-x-1.5 text-xs text-stone-600">
                <span className="w-2 h-2 bg-emerald-600 rounded-full" />
                <span className="font-medium">District Portal Live</span>
              </div>

              <div className="h-4 w-px bg-stone-200" />

              <span className="text-xs text-stone-500 font-medium hidden sm:inline">
                Season: Kharif 2026
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout