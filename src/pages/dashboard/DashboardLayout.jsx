import React, { useState } from 'react'
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  Menu,
  X,
  Map,
  Image,
  Users,
  AlertTriangle,
  FileText,
  History,
  LogOut,
  BarChart3,
  CheckCircle2,
  Sprout,
  Activity,
  ClipboardCheck,
  CloudSun,
  Shield,
  ChevronDown,
  ChevronRight,
  Bell,
  RefreshCw,
  TrendingUp,
  Compass,
} from 'lucide-react'

const navGroups = [
  {
    label: 'Situation',
    items: [
      { name: 'Field Situation', href: '/dashboard', icon: BarChart3, end: true },
      { name: 'Risk Map', href: '/dashboard/map', icon: Map },
      { name: 'Risk Forecast', href: '/dashboard/risk', icon: TrendingUp },
    ],
  },
  {
    label: 'Field Response',
    items: [
      { name: 'Cases & Alerts', href: '/dashboard/alerts', icon: AlertTriangle },
      { name: 'Expert Review', href: '/dashboard/approvals', icon: ClipboardCheck },
      { name: 'Follow-up Monitoring', href: '/dashboard/follow-up', icon: Activity },
      { name: 'Field Images', href: '/dashboard/images', icon: Image },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { name: 'Crop Monitoring', href: '/dashboard/growth', icon: Sprout },
      { name: 'Assessment Panel', href: '/dashboard/ai-analysis', icon: Shield },
      { name: 'Image Comparison', href: '/dashboard/compare', icon: Image },
    ],
  },
  {
    label: 'Records',
    items: [
      { name: 'Farmer Registry', href: '/dashboard/farmers', icon: Users },
      { name: 'History Log', href: '/dashboard/history', icon: History },
      { name: 'Reports', href: '/dashboard/reports', icon: FileText },
    ],
  },
]

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()

  const userName = user?.name || 'Rajesh Kumar'
  const userRole = user?.role || 'District Agriculture Officer'
  const userDistrict = user?.district || 'Nashik District'

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    navigate('/login')
  }

  // Current page name from path
  const currentPage = navGroups
    .flatMap(g => g.items)
    .find(item => item.end ? location.pathname === item.href : location.pathname.startsWith(item.href))

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--cs-paper)' }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'rgba(26,26,26,0.55)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-56 flex flex-col border-r
          transform transition-transform duration-250 ease-in-out
          lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{
          background: '#fff',
          borderColor: '#e5e5e5',
        }}
      >
        {/* Wordmark */}
        <div
          className="flex items-center h-14 px-4 border-b flex-shrink-0"
          style={{ borderColor: 'var(--cs-green-900)', background: 'var(--cs-green-900)' }}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <svg viewBox="0 0 28 28" className="h-7 w-7 flex-shrink-0" fill="none">
              <path
                d="M14 3C8.5 3 4 7.8 4 13.5c0 4.2 2.5 7.8 6.2 9.5C11.2 18 14 12 14 12s2.8 6 3.8 11C21.5 21.3 24 17.7 24 13.5c0-5.7-4.5-10.5-10-10.5z"
                fill="rgba(255,255,255,0.18)"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth="1.4"
              />
              <path
                d="M10 14l3 3 5.5-6"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="min-w-0">
              <div className="text-[13px] font-black tracking-widest text-white leading-none">CROVYSURE</div>
              <div className="text-[9px] text-white/60 leading-tight mt-0.5 truncate">Early Warning & Field Response</div>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden p-1 rounded text-white/70 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Officer profile */}
        <div className="px-3 py-3 border-b flex-shrink-0" style={{ borderColor: '#e5e5e5', background: '#faf9f7' }}>
          <div className="flex items-start gap-2.5">
            <div
              className="h-8 w-8 rounded flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
              style={{ background: 'var(--cs-green-800)' }}
            >
              {userName.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-bold text-stone-900 truncate">{userName}</div>
              <div className="text-[10px] text-stone-500 truncate">{userRole}</div>
              <div
                className="text-[10px] font-semibold truncate mt-0.5"
                style={{ color: 'var(--cs-green-800)' }}
              >
                {userDistrict}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-4">
          {navGroups.map((group) => (
            <div key={group.label}>
              <div
                className="px-2 mb-1 text-[9px] font-black tracking-widest uppercase"
                style={{ color: 'var(--cs-charcoal-400)' }}
              >
                {group.label}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      end={item.end}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2.5 px-2.5 py-1.5 text-[11px] font-medium rounded transition-colors duration-100
                         ${isActive
                           ? 'cs-nav-active bg-emerald-50 text-emerald-900 font-bold'
                           : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                         }`
                      }
                    >
                      <Icon className="h-3.5 w-3.5 flex-shrink-0" />
                      {item.name}
                    </NavLink>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Season + Logout */}
        <div className="border-t px-3 py-3 flex-shrink-0" style={{ borderColor: '#e5e5e5' }}>
          <div className="text-[10px] text-stone-500 mb-2 px-0.5">
            Season: <span className="font-semibold text-stone-700">Kharif 2026</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-2.5 py-1.5 text-[11px] font-medium text-stone-600 rounded hover:bg-red-50 hover:text-red-700 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top header bar */}
        <header
          className="flex-shrink-0 h-12 flex items-center justify-between px-4 sm:px-6 border-b"
          style={{ background: '#fff', borderColor: '#e5e5e5' }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded text-stone-500 hover:bg-stone-100"
            >
              <Menu className="h-4 w-4" />
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="font-black tracking-widest" style={{ color: 'var(--cs-green-900)' }}>
                CROVYSURE
              </span>
              <ChevronRight className="h-3 w-3 text-stone-400" />
              <span className="text-stone-600 font-medium">
                {currentPage?.name || 'Dashboard'}
              </span>
            </div>
          </div>

          {/* Right: Status indicators */}
          <div className="flex items-center gap-3">
            {/* Alert badge */}
            <div className="hidden sm:flex items-center gap-1.5 text-[10px]">
              <span
                className="cs-badge cs-badge-red"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block" />
                2 Action Required
              </span>
            </div>

            <div className="h-3 w-px bg-stone-200" />

            <div className="flex items-center gap-1.5 text-[10px] font-medium text-stone-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
              <span className="hidden sm:inline">District Portal Live</span>
            </div>

            <div className="hidden sm:block h-3 w-px bg-stone-200" />

            <span className="hidden sm:inline text-[10px] font-medium text-stone-400">
              25 Sep 2026 · 08:41
            </span>

            <span
              className="hidden md:inline cs-badge cs-badge-neutral"
            >
              Prototype
            </span>
          </div>
        </header>

        {/* Page outlet */}
        <main
          className="flex-1 overflow-y-auto"
          style={{ background: 'var(--cs-paper)' }}
        >
          <div className="max-w-[1440px] mx-auto p-4 sm:p-5 lg:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout