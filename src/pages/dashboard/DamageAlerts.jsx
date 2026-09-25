import React, { useState } from 'react'
import {
  AlertTriangle, CheckCircle, Clock,
  Search, Download, MapPin, Calendar, User,
  Eye, TrendingUp, TrendingDown, Minus,
  ChevronRight, X, Bell, RefreshCw, ArrowRight,
  Activity, Sprout, Info, Shield,
} from 'lucide-react'

// ── Helpers ──
function TrendIcon({ trend }) {
  if (trend === 'rising') return <TrendingUp className="h-3 w-3 text-red-600" />
  if (trend === 'falling') return <TrendingDown className="h-3 w-3 text-emerald-600" />
  return <Minus className="h-3 w-3 text-stone-500" />
}

function StatusBadge({ status }) {
  const map = {
    new: 'cs-badge cs-badge-blue',
    active: 'cs-badge cs-badge-amber',
    confirmed: 'cs-badge cs-badge-red',
    under_control: 'cs-badge cs-badge-green',
    resolved: 'cs-badge cs-badge-neutral',
  }
  const labels = {
    new: 'New Signal',
    active: 'Active',
    confirmed: 'Confirmed',
    under_control: 'Under Control',
    resolved: 'Resolved',
  }
  return <span className={map[status] || 'cs-badge cs-badge-neutral'}>{labels[status] || status}</span>
}

function SeverityBar({ value }) {
  const color = value >= 70 ? '#b91c1c' : value >= 40 ? '#d97706' : '#2d6a4f'
  return (
    <div className="flex items-center gap-2 text-[10px]">
      <div className="flex-1 h-1.5 rounded-full bg-stone-200">
        <div className="h-1.5 rounded-full" style={{ width: `${value}%`, background: color }} />
      </div>
      <span className="font-bold w-8 text-right" style={{ color }}>{value}%</span>
    </div>
  )
}

// ── Mock data ──
const MOCK_ALERTS = [
  {
    id: 1,
    village: 'Igatpuri',
    taluka: 'Igatpuri',
    farmerName: 'Mahesh Shinde',
    farmerId: 'FARM-003',
    plotId: 'AG-003',
    caseNumber: 'CASE-1042',
    crop: 'Cotton',
    stage: 'Flowering',
    alertType: 'pest_disease',
    severity: 72,
    trend: 'rising',
    status: 'confirmed',
    firstSignal: '10 Sep 2026',
    lastObservation: '14 Sep 2026',
    daysSinceObservation: 11,
    officerVisited: false,
    description: 'Pink bollworm infestation overlapping with bacterial blight infection. Severity rapidly increasing.',
    affectedArea: '3.2 acres',
    estimatedYieldRisk: '35–45%',
    recommendedAction: 'Immediate field inspection. Coordinate pesticide advisory with block officer.',
    priority: 'critical',
    evidenceCount: 5,
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500&auto=format&fit=crop&q=80',
    severityHistory: [8, 14, 22, 32, 72],
    timeline: [
      { date: '10 Sep', event: 'First signal', type: 'signal' },
      { date: '12 Sep', event: 'Risk increasing', type: 'alert' },
      { date: '13 Sep', event: 'Nearby field also flagged', type: 'cluster' },
      { date: '14 Sep', event: 'Confirmed by field official', type: 'confirmed' },
    ],
  },
  {
    id: 2,
    village: 'Niphad',
    taluka: 'Niphad',
    farmerName: 'Sunil Jadhav',
    farmerId: 'FARM-006',
    plotId: 'AG-006',
    caseNumber: 'CASE-1039',
    crop: 'Paddy',
    stage: 'Flowering',
    alertType: 'disease',
    severity: 48,
    trend: 'rising',
    status: 'active',
    firstSignal: '12 Sep 2026',
    lastObservation: '12 Sep 2026',
    daysSinceObservation: 13,
    officerVisited: false,
    description: 'Leaf blast (Pyricularia oryzae) detected at critical panicle initiation stage. Rapid lesion spread expected.',
    affectedArea: '2.8 acres',
    estimatedYieldRisk: '20–30%',
    recommendedAction: 'Field visit and fungicide application within 72 hours.',
    priority: 'high',
    evidenceCount: 4,
    imageUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=500&auto=format&fit=crop&q=80',
    severityHistory: [4, 8, 18, 36, 48],
    timeline: [
      { date: '12 Sep', event: 'First observation', type: 'signal' },
      { date: '14 Sep', event: 'Severity increasing', type: 'alert' },
      { date: '16 Sep', event: 'Expert review pending', type: 'pending' },
    ],
  },
  {
    id: 3,
    village: 'Sinnar',
    taluka: 'Sinnar',
    farmerName: 'Vijay More',
    farmerId: 'FARM-005',
    plotId: 'AG-005',
    caseNumber: 'CASE-1035',
    crop: 'Corn',
    stage: 'Maturity',
    alertType: 'disease',
    severity: 28,
    trend: 'rising',
    status: 'active',
    firstSignal: '13 Sep 2026',
    lastObservation: '13 Sep 2026',
    daysSinceObservation: 12,
    officerVisited: false,
    description: 'Early disease risk signals detected. Low confidence — additional observations needed.',
    affectedArea: '1.5 acres',
    estimatedYieldRisk: '5–15%',
    recommendedAction: 'Schedule observation within 3 days. Assign field officer.',
    priority: 'medium',
    evidenceCount: 2,
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&auto=format&fit=crop&q=80',
    severityHistory: [6, 8, 12, 18, 28],
    timeline: [
      { date: '13 Sep', event: 'Signal detected', type: 'signal' },
      { date: '15 Sep', event: 'Monitoring scheduled', type: 'pending' },
    ],
  },
  {
    id: 4,
    village: 'Nashik Rural',
    taluka: 'Nashik',
    farmerName: 'Ramesh Patil',
    farmerId: 'FARM-001',
    plotId: 'AG-001',
    caseNumber: 'CASE-1030',
    crop: 'Paddy',
    stage: 'Flowering',
    alertType: 'disease',
    severity: 12,
    trend: 'falling',
    status: 'under_control',
    firstSignal: '3 Sep 2026',
    lastObservation: '16 Sep 2026',
    daysSinceObservation: 9,
    officerVisited: true,
    description: 'Minor leaf blast symptoms were detected and treated. Recovery in progress.',
    affectedArea: '0.8 acres',
    estimatedYieldRisk: '<5%',
    recommendedAction: 'Continue weekly observation. No immediate action needed.',
    priority: 'low',
    evidenceCount: 3,
    imageUrl: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=500&auto=format&fit=crop&q=80',
    severityHistory: [18, 16, 14, 12, 12],
    timeline: [
      { date: '3 Sep', event: 'First detection', type: 'signal' },
      { date: '8 Sep', event: 'Field officer visit', type: 'visit' },
      { date: '10 Sep', event: 'Treatment applied', type: 'action' },
      { date: '16 Sep', event: 'Recovery confirmed', type: 'confirmed' },
    ],
  },
  {
    id: 5,
    village: 'Dindori',
    taluka: 'Dindori',
    farmerName: 'Suresh Yadav',
    farmerId: 'FARM-002',
    plotId: 'AG-002',
    caseNumber: 'CASE-1037',
    crop: 'Paddy',
    stage: 'Vegetative',
    alertType: 'disease',
    severity: 32,
    trend: 'stable',
    status: 'active',
    firstSignal: '8 Sep 2026',
    lastObservation: '15 Sep 2026',
    daysSinceObservation: 10,
    officerVisited: false,
    description: 'Bacterial blight symptoms observed. Severity currently stable after partial treatment.',
    affectedArea: '2.2 acres',
    estimatedYieldRisk: '10–20%',
    recommendedAction: 'Expert review pending. Monitor closely.',
    priority: 'medium',
    evidenceCount: 3,
    imageUrl: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=500&auto=format&fit=crop&q=80',
    severityHistory: [10, 18, 28, 32, 32],
    timeline: [
      { date: '8 Sep', event: 'First observation', type: 'signal' },
      { date: '12 Sep', event: 'Expert review opened', type: 'pending' },
      { date: '15 Sep', event: 'Status: stable', type: 'signal' },
    ],
  },
]

const SUMMARY_STATS = [
  { label: 'Total Active Cases', value: 4, sub: 'Requiring attention', color: '#b91c1c', bg: '#fef2f2' },
  { label: 'Confirmed Outbreaks', value: 1, sub: 'Verified by field officer', color: '#991b1b', bg: '#fee2e2' },
  { label: 'Fields Without Visit', value: 4, sub: 'Officer not yet dispatched', color: '#d97706', bg: '#fffbeb' },
  { label: 'Under Control', value: 1, sub: 'Recovering as expected', color: '#2d6a4f', bg: '#f0f8f3' },
]

const FILTER_OPTIONS = [
  { value: 'all', label: 'All Cases' },
  { value: 'critical', label: 'Critical' },
  { value: 'high', label: 'High Priority' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
]

function MiniBar({ values, color }) {
  const max = Math.max(...values, 1)
  return (
    <div className="flex items-end gap-[2px]" style={{ height: 20, width: 40 }}>
      {values.map((v, i) => (
        <div
          key={i}
          style={{
            height: `${Math.max((v / max) * 100, 6)}%`,
            width: 5,
            background: i === values.length - 1 ? color : `${color}55`,
            borderRadius: 1,
          }}
        />
      ))}
    </div>
  )
}

const DamageAlerts = () => {
  const [alerts] = useState(MOCK_ALERTS)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAlert, setSelectedAlert] = useState(null)
  const [lastRefreshed, setLastRefreshed] = useState('Just now')

  const filtered = alerts.filter(a => {
    const search = searchTerm.toLowerCase()
    const matchSearch =
      a.village.toLowerCase().includes(search) ||
      a.farmerName.toLowerCase().includes(search) ||
      a.crop.toLowerCase().includes(search) ||
      a.caseNumber.toLowerCase().includes(search) ||
      a.description.toLowerCase().includes(search)
    const matchFilter = filter === 'all' || a.priority === filter
    return matchSearch && matchFilter
  })

  const TIMELINE_DOT = {
    signal: 'bg-blue-500',
    alert: 'bg-amber-500',
    cluster: 'bg-red-500',
    confirmed: 'bg-red-700',
    pending: 'bg-stone-400',
    visit: 'bg-emerald-500',
    action: 'bg-emerald-600',
  }

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 pb-4 border-b border-stone-200">
        <div>
          <span className="cs-badge cs-badge-red mb-1">Field Operations</span>
          <h1 className="text-xl font-bold text-stone-900">Cases & Alerts</h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Active disease and pest cases across monitored fields.
            <span className="ml-2 text-stone-400">Last updated: {lastRefreshed}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLastRefreshed('Just now')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold border border-stone-200 rounded text-stone-700 hover:bg-stone-50 transition-colors"
          >
            <RefreshCw className="h-3 w-3" /> Refresh
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold text-white rounded transition-colors" style={{ background: 'var(--cs-green-800)' }}>
            <Download className="h-3.5 w-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {SUMMARY_STATS.map(stat => (
          <div key={stat.label} className="rounded border border-stone-200 p-3" style={{ background: stat.bg }}>
            <div className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-[11px] font-bold text-stone-800 mt-0.5">{stat.label}</div>
            <div className="text-[10px] text-stone-500 mt-0.5">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400" />
          <input
            type="text"
            placeholder="Search village, farmer, crop, case number..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-[11px] border border-stone-200 rounded bg-white focus:outline-none focus:border-stone-400"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {FILTER_OPTIONS.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 text-[10px] font-semibold rounded border transition-colors ${
                filter === f.value ? 'text-white border-transparent' : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
              }`}
              style={filter === f.value ? { background: 'var(--cs-green-800)', borderColor: 'var(--cs-green-800)' } : {}}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main content: list + detail panel */}
      <div className="flex gap-5 items-start">

        {/* Case list */}
        <div className={`${selectedAlert ? 'hidden lg:block lg:w-96 flex-shrink-0' : 'w-full'}`}>
          <div className="rounded border border-stone-200 overflow-hidden" style={{ background: '#fff' }}>

            {/* List header */}
            <div className="hidden sm:grid grid-cols-12 px-4 py-2 bg-stone-50 border-b border-stone-200 text-[9px] font-black tracking-wider uppercase text-stone-400">
              <div className="col-span-4">Village / Crop</div>
              <div className="col-span-2">Signal</div>
              <div className="col-span-2">Severity</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1">Trend</div>
              <div className="col-span-1"></div>
            </div>

            {filtered.length === 0 ? (
              <div className="py-12 text-center">
                <Shield className="h-8 w-8 text-stone-300 mx-auto mb-2" />
                <div className="text-sm font-medium text-stone-600">No active alerts</div>
                <div className="text-[10px] text-stone-400 mt-1">All monitored fields are currently stable.</div>
              </div>
            ) : (
              <div className="divide-y divide-stone-100">
                {filtered.map(alert => {
                  const isSelected = selectedAlert?.id === alert.id
                  const priorityColor = {
                    critical: 'border-l-red-700',
                    high: 'border-l-red-500',
                    medium: 'border-l-amber-500',
                    low: 'border-l-emerald-500',
                  }[alert.priority]

                  return (
                    <div
                      key={alert.id}
                      onClick={() => setSelectedAlert(isSelected ? null : alert)}
                      className={`cursor-pointer transition-colors border-l-2 ${priorityColor} ${isSelected ? 'bg-stone-50' : 'hover:bg-stone-50/60'}`}
                    >
                      {/* Mobile */}
                      <div className="sm:hidden p-3 space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[11px] font-bold text-stone-900">{alert.village} · {alert.crop}</span>
                            <div className="text-[10px] text-stone-500">{alert.farmerName}</div>
                          </div>
                          <StatusBadge status={alert.status} />
                        </div>
                        <div className="text-[10px] text-stone-700 font-medium">{alert.description.slice(0, 80)}...</div>
                        <SeverityBar value={alert.severity} />
                      </div>

                      {/* Desktop */}
                      <div className="hidden sm:grid grid-cols-12 px-4 py-3 items-center gap-2 text-[10px]">
                        <div className="col-span-4">
                          <div className="font-bold text-stone-900">{alert.village}</div>
                          <div className="text-stone-500">{alert.farmerName}</div>
                          <div className="text-stone-400 cs-mono text-[9px]">{alert.caseNumber}</div>
                        </div>
                        <div className="col-span-2">
                          <div className="font-semibold text-stone-800">{alert.crop}</div>
                          <div className="text-stone-500">{alert.stage}</div>
                        </div>
                        <div className="col-span-2">
                          <SeverityBar value={alert.severity} />
                          <MiniBar
                            values={alert.severityHistory}
                            color={alert.priority === 'critical' ? '#b91c1c' : alert.priority === 'high' ? '#dc2626' : alert.priority === 'medium' ? '#d97706' : '#2d6a4f'}
                          />
                        </div>
                        <div className="col-span-2">
                          <StatusBadge status={alert.status} />
                          {!alert.officerVisited && (
                            <div className="text-[9px] text-red-600 font-semibold mt-0.5">No officer visit</div>
                          )}
                        </div>
                        <div className="col-span-1">
                          <TrendIcon trend={alert.trend} />
                        </div>
                        <div className="col-span-1 flex justify-end">
                          <ChevronRight className={`h-3.5 w-3.5 text-stone-400 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Detail panel */}
        {selectedAlert && (
          <div className="flex-1 min-w-0">
            <div className="rounded border border-stone-200 overflow-hidden cs-panel-enter" style={{ background: '#fff' }}>

              {/* Case header */}
              <div className="cs-case-header px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-black tracking-widest uppercase text-stone-500">Case Details</span>
                      <span className="cs-mono text-[10px] text-stone-500">{selectedAlert.caseNumber}</span>
                    </div>
                    <h2 className="text-base font-bold text-stone-900">
                      {selectedAlert.village} / {selectedAlert.crop} / {selectedAlert.alertType === 'pest_disease' ? 'Pest & Disease' : 'Disease Risk'}
                    </h2>
                    <div className="flex items-center gap-3 mt-1 text-[10px] text-stone-500">
                      <span>{selectedAlert.farmerName} · {selectedAlert.farmerId}</span>
                      <span>·</span>
                      <span>First signal: {selectedAlert.firstSignal}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={selectedAlert.status} />
                    <button onClick={() => setSelectedAlert(null)} className="text-stone-400 hover:text-stone-700">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-stone-200">

                {/* Left: Image + situation */}
                <div className="p-4 space-y-4">
                  {/* Image */}
                  <div className="relative rounded border border-stone-200 overflow-hidden">
                    <img
                      src={selectedAlert.imageUrl}
                      alt={`${selectedAlert.village} field observation`}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2">
                      <div className="text-[9px] text-white">{selectedAlert.lastObservation} · {selectedAlert.crop} · {selectedAlert.stage}</div>
                    </div>
                  </div>

                  {/* Situation summary */}
                  <div>
                    <div className="text-[10px] font-black tracking-widest uppercase text-stone-500 mb-2">Field Situation</div>
                    <p className="text-[11px] text-stone-700 leading-relaxed">{selectedAlert.description}</p>
                  </div>

                  {/* Key facts */}
                  <div className="grid grid-cols-2 gap-3 text-[10px]">
                    <div>
                      <div className="text-stone-400">Affected area</div>
                      <div className="font-bold text-stone-900">{selectedAlert.affectedArea}</div>
                    </div>
                    <div>
                      <div className="text-stone-400">Estimated yield risk</div>
                      <div className="font-bold text-red-700">{selectedAlert.estimatedYieldRisk}</div>
                    </div>
                    <div>
                      <div className="text-stone-400">Days since observation</div>
                      <div className={`font-bold ${selectedAlert.daysSinceObservation > 7 ? 'text-red-700' : 'text-stone-800'}`}>
                        {selectedAlert.daysSinceObservation} days
                      </div>
                    </div>
                    <div>
                      <div className="text-stone-400">Officer dispatched</div>
                      <div className={`font-bold ${selectedAlert.officerVisited ? 'text-emerald-700' : 'text-red-700'}`}>
                        {selectedAlert.officerVisited ? 'Yes' : 'Not yet'}
                      </div>
                    </div>
                  </div>

                  {/* Severity trend */}
                  <div>
                    <div className="text-[10px] font-black tracking-widest uppercase text-stone-500 mb-1">Severity trend</div>
                    <SeverityBar value={selectedAlert.severity} />
                    <div className="flex items-center justify-between mt-1">
                      <MiniBar
                        values={selectedAlert.severityHistory}
                        color={selectedAlert.priority === 'critical' ? '#b91c1c' : selectedAlert.priority === 'high' ? '#dc2626' : '#d97706'}
                      />
                      <span className="text-[9px] text-stone-400">last 5 observations</span>
                    </div>
                  </div>
                </div>

                {/* Right: Timeline + action */}
                <div className="p-4 space-y-4">
                  {/* Timeline */}
                  <div>
                    <div className="text-[10px] font-black tracking-widest uppercase text-stone-500 mb-3">Case Timeline</div>
                    <div className="relative pl-5 space-y-0">
                      {selectedAlert.timeline.map((event, i) => {
                        const isLast = i === selectedAlert.timeline.length - 1
                        return (
                          <div key={i} className="relative pb-4 last:pb-0">
                            {!isLast && (
                              <div className="absolute left-[-11px] top-3 bottom-0 w-px bg-stone-200" />
                            )}
                            <div className={`absolute left-[-15px] top-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${TIMELINE_DOT[event.type] || 'bg-stone-400'}`} />
                            <div className="text-[9px] text-stone-400 font-bold">{event.date}</div>
                            <div className="text-[11px] font-semibold text-stone-800 mt-0.5">{event.event}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Recommended action */}
                  <div>
                    <div className="text-[10px] font-black tracking-widest uppercase text-stone-500 mb-2">Recommended action</div>
                    <div className="p-3 rounded border border-amber-200 bg-amber-50 text-[11px] font-semibold text-amber-900">
                      {selectedAlert.recommendedAction}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div>
                    <div className="text-[10px] font-black tracking-widest uppercase text-stone-500 mb-2">Response actions</div>
                    <div className="space-y-2">
                      <button
                        className="w-full flex items-center justify-between px-3 py-2 rounded border text-[11px] font-bold text-white transition-colors"
                        style={{ background: 'var(--cs-green-800)', borderColor: 'var(--cs-green-900)' }}
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5" />
                          Assign field visit
                        </div>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                      <button className="w-full flex items-center justify-between px-3 py-2 rounded border border-stone-200 text-[11px] font-semibold text-stone-700 hover:bg-stone-50 transition-colors">
                        <div className="flex items-center gap-2">
                          <Bell className="h-3.5 w-3.5 text-amber-600" />
                          Send advisory to farmer
                        </div>
                        <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
                      </button>
                      <button className="w-full flex items-center justify-between px-3 py-2 rounded border border-stone-200 text-[11px] font-semibold text-stone-700 hover:bg-stone-50 transition-colors">
                        <div className="flex items-center gap-2">
                          <Activity className="h-3.5 w-3.5 text-blue-600" />
                          Request expert review
                        </div>
                        <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
                      </button>
                    </div>
                  </div>

                  {/* Evidence note */}
                  <div className="text-[10px] text-stone-500 bg-stone-50 border border-stone-200 rounded p-2.5">
                    <Info className="h-3 w-3 inline mr-1 text-stone-400" />
                    This case is based on {selectedAlert.evidenceCount} field observation{selectedAlert.evidenceCount > 1 ? 's' : ''}.
                    {selectedAlert.evidenceCount < 3 && ' Additional observations recommended before confirming.'}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

export default DamageAlerts