import React, { useMemo, useState } from 'react'
import {
  Search,
  Download,
  AlertTriangle,
  MapPin,
  Sprout,
  Activity,
  Eye,
  Clock,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronRight,
  X,
  Info,
} from 'lucide-react'

// ── Restrained palette helpers ──
function RiskDot({ level, size = 'sm' }) {
  const cls = {
    high: 'bg-red-600',
    medium: 'bg-amber-500',
    low: 'bg-emerald-600',
    emerging: 'bg-amber-500',
    confirmed: 'bg-red-700',
    review: 'bg-blue-600',
    resolved: 'bg-stone-400',
  }[level] || 'bg-stone-400'
  const sz = size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5'
  return <span className={`inline-block ${sz} rounded-full flex-shrink-0 ${cls}`} />
}

function TrendPill({ trend }) {
  if (trend === 'rising') return (
    <span className="flex items-center gap-1 text-[10px] font-bold text-red-700">
      <TrendingUp className="h-2.5 w-2.5" /> Rising
    </span>
  )
  if (trend === 'falling') return (
    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700">
      <TrendingDown className="h-2.5 w-2.5" /> Improving
    </span>
  )
  return (
    <span className="flex items-center gap-1 text-[10px] font-semibold text-stone-500">
      <Minus className="h-2.5 w-2.5" /> Stable
    </span>
  )
}

// ── Full plot dataset ──
const ALL_PLOTS = [
  {
    id: 'AG-001',
    position: { top: '28%', left: '36%' },
    farmerName: 'Ramesh Patil',
    village: 'Nashik Rural',
    taluka: 'Nashik',
    crop: 'Paddy',
    stage: 'Flowering',
    health: 'Good',
    risk: 'low',
    signal: 'Healthy',
    trend: 'stable',
    changeText: 'No change',
    confidence: 'High',
    evidenceCount: 2,
    lastObservation: '16 Sep 2026',
    officerVisited: true,
    caseStatus: 'resolved',
    caseNumber: 'CASE-1030',
    severityHistory: [8, 7, 6, 5, 5],
  },
  {
    id: 'AG-002',
    position: { top: '42%', left: '55%' },
    farmerName: 'Suresh Yadav',
    village: 'Dindori',
    taluka: 'Dindori',
    crop: 'Paddy',
    stage: 'Vegetative',
    health: 'Moderate',
    risk: 'medium',
    signal: 'Bacterial Blight',
    trend: 'stable',
    changeText: 'Stable',
    confidence: 'Moderate',
    evidenceCount: 3,
    lastObservation: '15 Sep 2026',
    officerVisited: false,
    caseStatus: 'review',
    caseNumber: 'CASE-1037',
    severityHistory: [10, 14, 16, 15, 16],
  },
  {
    id: 'AG-003',
    position: { top: '63%', left: '29%' },
    farmerName: 'Mahesh Shinde',
    village: 'Igatpuri',
    taluka: 'Igatpuri',
    crop: 'Cotton',
    stage: 'Flowering',
    health: 'High Risk',
    risk: 'high',
    signal: 'Pest / Disease Risk',
    trend: 'rising',
    changeText: '+14% severity',
    confidence: 'Moderate',
    evidenceCount: 5,
    lastObservation: '14 Sep 2026',
    officerVisited: false,
    caseStatus: 'confirmed',
    caseNumber: 'CASE-1042',
    severityHistory: [8, 14, 20, 28, 34],
  },
  {
    id: 'AG-004',
    position: { top: '67%', left: '64%' },
    farmerName: 'Ganesh Pawar',
    village: 'Yeola',
    taluka: 'Yeola',
    crop: 'Wheat',
    stage: 'Early',
    health: 'Good',
    risk: 'low',
    signal: 'Healthy',
    trend: 'stable',
    changeText: 'No change',
    confidence: 'High',
    evidenceCount: 1,
    lastObservation: '16 Sep 2026',
    officerVisited: true,
    caseStatus: 'resolved',
    caseNumber: 'CASE-1028',
    severityHistory: [5, 5, 4, 4, 5],
  },
  {
    id: 'AG-005',
    position: { top: '34%', left: '76%' },
    farmerName: 'Vijay More',
    village: 'Sinnar',
    taluka: 'Sinnar',
    crop: 'Corn',
    stage: 'Maturity',
    health: 'Moderate',
    risk: 'medium',
    signal: 'Disease Risk signals',
    trend: 'rising',
    changeText: '+6% severity',
    confidence: 'Low',
    evidenceCount: 2,
    lastObservation: '13 Sep 2026',
    officerVisited: false,
    caseStatus: 'emerging',
    caseNumber: 'CASE-1035',
    severityHistory: [6, 8, 10, 12, 14],
  },
  {
    id: 'AG-006',
    position: { top: '76%', left: '47%' },
    farmerName: 'Sunil Jadhav',
    village: 'Niphad',
    taluka: 'Niphad',
    crop: 'Paddy',
    stage: 'Flowering',
    health: 'High Risk',
    risk: 'high',
    signal: 'Leaf Blast',
    trend: 'rising',
    changeText: '+8% severity',
    confidence: 'High',
    evidenceCount: 4,
    lastObservation: '12 Sep 2026',
    officerVisited: false,
    caseStatus: 'confirmed',
    caseNumber: 'CASE-1039',
    severityHistory: [4, 8, 14, 20, 26],
  },
]

// Emerging hotspots (areas where risk is concentrating)
const HOTSPOTS = [
  {
    id: 'HS-001',
    name: 'Igatpuri Cluster',
    crop: 'Cotton',
    issue: 'Pest / Disease overlap',
    firstDetected: '10 Sep 2026',
    latestSignal: '14 Sep 2026',
    change: '+26%',
    confirmation: 'Confirmed',
    plots: ['AG-003'],
    riskLevel: 'high',
  },
  {
    id: 'HS-002',
    name: 'Niphad-Dindori Belt',
    crop: 'Paddy',
    issue: 'Leaf Blast spreading',
    firstDetected: '12 Sep 2026',
    latestSignal: '15 Sep 2026',
    change: '+12%',
    confirmation: 'Expert review pending',
    plots: ['AG-006', 'AG-002'],
    riskLevel: 'high',
  },
  {
    id: 'HS-003',
    name: 'Sinnar East',
    crop: 'Corn',
    issue: 'Disease risk signals',
    firstDetected: '13 Sep 2026',
    latestSignal: '13 Sep 2026',
    change: '+8%',
    confirmation: 'Emerging',
    plots: ['AG-005'],
    riskLevel: 'medium',
  },
]

const FILTERS = [
  { value: 'all', label: 'All Fields' },
  { value: 'high', label: 'High Risk' },
  { value: 'medium', label: 'Attention' },
  { value: 'low', label: 'Stable' },
  { value: 'rising', label: 'Risk Rising' },
  { value: 'no-visit', label: 'No Officer Visit' },
]

const CASE_STATUS_LABELS = {
  emerging: { label: 'Emerging', cls: 'cs-badge cs-badge-amber' },
  confirmed: { label: 'Confirmed', cls: 'cs-badge cs-badge-red' },
  review: { label: 'Under Review', cls: 'cs-badge cs-badge-blue' },
  resolved: { label: 'Resolved', cls: 'cs-badge cs-badge-green' },
}

function MiniBar({ values, color }) {
  const max = Math.max(...values, 1)
  return (
    <div className="flex items-end gap-[2px]" style={{ height: 16, width: 32 }}>
      {values.map((v, i) => (
        <div
          key={i}
          style={{
            height: `${Math.max((v / max) * 100, 8)}%`,
            width: 4,
            background: i === values.length - 1 ? color : `${color}55`,
            borderRadius: 1,
          }}
        />
      ))}
    </div>
  )
}

const MapMonitor = () => {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPlot, setSelectedPlot] = useState(null)
  const [timeWindow, setTimeWindow] = useState('7d')

  const filteredPlots = useMemo(() => {
    return ALL_PLOTS.filter(plot => {
      const search = searchTerm.toLowerCase()
      const matchesSearch =
        plot.farmerName.toLowerCase().includes(search) ||
        plot.id.toLowerCase().includes(search) ||
        plot.village.toLowerCase().includes(search) ||
        plot.crop.toLowerCase().includes(search) ||
        plot.signal.toLowerCase().includes(search)

      let matchesFilter = true
      if (filter === 'high') matchesFilter = plot.risk === 'high'
      else if (filter === 'medium') matchesFilter = plot.risk === 'medium'
      else if (filter === 'low') matchesFilter = plot.risk === 'low'
      else if (filter === 'rising') matchesFilter = plot.trend === 'rising'
      else if (filter === 'no-visit') matchesFilter = !plot.officerVisited

      return matchesSearch && matchesFilter
    })
  }, [filter, searchTerm])

  const getMarkerStyle = (plot) => {
    const isSelected = selectedPlot?.id === plot.id
    const base = {
      emerging: 'bg-amber-500 border-white ring-1 ring-amber-600',
      confirmed: 'bg-red-700 border-white ring-1 ring-red-900',
      review: 'bg-blue-600 border-white ring-1 ring-blue-800',
      resolved: 'bg-emerald-600 border-white ring-1 ring-emerald-700 opacity-60',
    }[plot.caseStatus] || 'bg-stone-500 border-white'

    return `${base} ${isSelected ? 'ring-2 scale-150 z-20' : 'hover:scale-125'}`
  }

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 pb-4 border-b border-stone-200">
        <div>
          <div className="cs-badge cs-badge-green mb-1">Geographic Risk Monitoring</div>
          <h1 className="text-xl font-bold text-stone-900">Risk Map</h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Where is risk moving? Observed clusters, disease signals, and emerging hotspots across the district.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded border border-stone-200 overflow-hidden text-[10px] font-semibold">
            {[['7d', '7D'], ['14d', '14D'], ['30d', '30D']].map(([val, label]) => (
              <button
                key={val}
                onClick={() => setTimeWindow(val)}
                className={`px-2.5 py-1.5 transition-colors ${timeWindow === val ? 'text-white' : 'text-stone-600 hover:bg-stone-50'}`}
                style={timeWindow === val ? { background: 'var(--cs-green-800)' } : {}}
              >
                {label}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold border border-stone-200 rounded text-stone-700 hover:bg-stone-50 transition-colors">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <div className="relative flex-1 w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400" />
          <input
            type="text"
            placeholder="Search village, farmer, crop, signal..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-[11px] border border-stone-200 rounded bg-white focus:outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-200"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="absolute right-2.5 top-1/2 -translate-y-1/2">
              <X className="h-3.5 w-3.5 text-stone-400" />
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 text-[10px] font-semibold rounded border transition-colors ${
                filter === f.value
                  ? 'text-white border-transparent'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
              }`}
              style={filter === f.value ? { background: 'var(--cs-green-800)', borderColor: 'var(--cs-green-800)' } : {}}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Map + Side Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* ── MAP ── */}
        <div className="xl:col-span-2 rounded border border-stone-200 overflow-hidden" style={{ background: '#fff' }}>
          <div className="px-4 py-2.5 border-b border-stone-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black tracking-widest uppercase text-stone-500">Field Risk Map</span>
              <div className="text-xs font-semibold text-stone-700">Nashik Monitoring Zone · {filteredPlots.length} fields shown</div>
            </div>
            <div className="text-[10px] text-stone-400">Demo visualization</div>
          </div>

          {/* Map canvas */}
          <div
            className="relative overflow-hidden"
            style={{
              height: 420,
              background: 'linear-gradient(150deg, #f0ede6 0%, #e8f0e8 40%, #e0e8ef 100%)',
            }}
          >
            {/* Terrain texture */}
            <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 600 420">
              {/* District boundary */}
              <path d="M60 80 Q120 40 200 60 Q320 30 420 70 Q520 50 560 120 Q580 200 540 300 Q500 380 420 400 Q300 420 200 390 Q100 370 60 280 Q30 200 60 80Z"
                fill="none" stroke="#3a7d5c" strokeWidth="1.5" strokeDasharray="4,3" />
              {/* Block boundaries */}
              <line x1="200" y1="60" x2="220" y2="380" stroke="#6e7e3a" strokeWidth="0.8" strokeDasharray="3,4" />
              <line x1="350" y1="40" x2="340" y2="400" stroke="#6e7e3a" strokeWidth="0.8" strokeDasharray="3,4" />
              <line x1="60" y1="200" x2="560" y2="210" stroke="#6e7e3a" strokeWidth="0.8" strokeDasharray="3,4" />
              {/* River */}
              <path d="M80 160 Q160 180 240 150 Q310 120 380 160 Q440 190 500 170"
                fill="none" stroke="#2563eb" strokeWidth="2" opacity="0.4" />
            </svg>

            {/* Cluster risk zone overlays */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                top: '55%', left: '21%',
                width: 90, height: 90,
                background: 'rgba(185,28,28,0.08)',
                border: '1.5px dashed rgba(185,28,28,0.3)',
                transform: 'translate(-50%,-50%)',
              }}
            />
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                top: '73%', left: '44%',
                width: 70, height: 70,
                background: 'rgba(185,28,28,0.08)',
                border: '1.5px dashed rgba(185,28,28,0.3)',
                transform: 'translate(-50%,-50%)',
              }}
            />

            {/* Map label */}
            <div className="absolute top-3 left-3 bg-white/90 px-2.5 py-1.5 rounded border border-stone-200 shadow-sm">
              <div className="text-[9px] font-black tracking-widest uppercase text-stone-500">Nashik District</div>
              <div className="text-[10px] font-semibold text-stone-700">Maharashtra, India</div>
            </div>

            {/* Time window indicator */}
            <div className="absolute top-3 right-3 bg-white/90 px-2.5 py-1.5 rounded border border-stone-200">
              <div className="text-[9px] font-semibold text-stone-500">
                Showing {timeWindow === '7d' ? '7-day' : timeWindow === '14d' ? '14-day' : '30-day'} change
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-3 left-3 bg-white/95 rounded border border-stone-200 shadow-sm p-2.5">
              <div className="text-[9px] font-black uppercase tracking-wider text-stone-500 mb-1.5">Case Status</div>
              <div className="space-y-1.5">
                {[
                  { color: 'bg-red-700', label: 'Confirmed' },
                  { color: 'bg-amber-500 animate-pulse', label: 'Emerging' },
                  { color: 'bg-blue-600', label: 'Under Review' },
                  { color: 'bg-emerald-600 opacity-60', label: 'Resolved' },
                ].map(({ color, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${color}`} />
                    <span className="text-[9px] text-stone-600">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk zone labels */}
            <div className="absolute" style={{ top: '50%', left: '14%', transform: 'translate(-50%,-50%)' }}>
              <div className="text-[8px] font-bold text-red-700 opacity-70 text-center">Cluster A</div>
            </div>
            <div className="absolute" style={{ top: '68%', left: '38%', transform: 'translate(-50%,-50%)' }}>
              <div className="text-[8px] font-bold text-red-700 opacity-70 text-center">Cluster B</div>
            </div>

            {/* Plot Markers */}
            {filteredPlots.map(plot => (
              <button
                key={plot.id}
                onClick={() => setSelectedPlot(selectedPlot?.id === plot.id ? null : plot)}
                style={{ top: plot.position.top, left: plot.position.left }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 transition-all duration-200 z-10 ${getMarkerStyle(plot)}`}
                title={`${plot.id} · ${plot.village} · ${plot.signal}`}
              >
                <span className="sr-only">{plot.farmerName}</span>
              </button>
            ))}

            {/* Selected plot popup */}
            {selectedPlot && (
              <div className="absolute top-12 right-3 w-64 bg-white rounded border border-stone-300 shadow-lg z-20 cs-panel-enter">
                <div className="flex items-start justify-between p-3 border-b border-stone-100">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className={CASE_STATUS_LABELS[selectedPlot.caseStatus]?.cls || 'cs-badge cs-badge-neutral'}>
                        {CASE_STATUS_LABELS[selectedPlot.caseStatus]?.label}
                      </span>
                      <span className="text-[10px] text-stone-400 cs-mono">{selectedPlot.id}</span>
                    </div>
                    <div className="text-sm font-bold text-stone-900 mt-1">{selectedPlot.village}</div>
                    <div className="text-[10px] text-stone-500">{selectedPlot.farmerName}</div>
                  </div>
                  <button onClick={() => setSelectedPlot(null)} className="text-stone-400 hover:text-stone-700 mt-0.5">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="p-3 space-y-2 text-[10px]">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Crop</span>
                    <span className="font-semibold text-stone-800">{selectedPlot.crop} · {selectedPlot.stage}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500">Signal</span>
                    <span className="font-semibold text-stone-800">{selectedPlot.signal}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500">Trend</span>
                    <TrendPill trend={selectedPlot.trend} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500">Change</span>
                    <span className={`font-bold ${selectedPlot.trend === 'rising' ? 'text-red-700' : 'text-emerald-700'}`}>
                      {selectedPlot.changeText}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500">Assessment</span>
                    <span className="font-semibold text-stone-700">
                      Likely · <span className="text-stone-500">{selectedPlot.confidence}</span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Evidence</span>
                    <span className="font-semibold text-stone-800">{selectedPlot.evidenceCount} observations</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Last observed</span>
                    <span className="font-semibold text-stone-800">{selectedPlot.lastObservation}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500">Officer visit</span>
                    {selectedPlot.officerVisited
                      ? <span className="text-emerald-700 font-semibold">Visited</span>
                      : <span className="text-red-700 font-semibold">Not visited</span>}
                  </div>

                  {/* Severity trend mini chart */}
                  <div className="pt-1.5 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-stone-500">Severity trend</span>
                    <MiniBar
                      values={selectedPlot.severityHistory}
                      color={selectedPlot.risk === 'high' ? '#b91c1c' : selectedPlot.risk === 'medium' ? '#d97706' : '#2d6a4f'}
                    />
                  </div>
                </div>
                <div className="px-3 pb-3">
                  <div className="text-[9px] text-stone-400 mb-1.5">Case: <span className="cs-mono">{selectedPlot.caseNumber}</span></div>
                  <button
                    className="w-full py-1.5 text-[10px] font-bold rounded text-white transition-colors"
                    style={{ background: 'var(--cs-green-800)' }}
                  >
                    Open Case File
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── HOTSPOTS PANEL ── */}
        <div className="rounded border border-stone-200 overflow-hidden" style={{ background: '#fff' }}>
          <div className="px-4 py-2.5 border-b border-stone-200">
            <span className="text-[10px] font-black tracking-widest uppercase text-stone-500">Emerging Hotspots</span>
            <div className="text-xs font-semibold text-stone-700">Areas where risk is concentrating</div>
          </div>

          <div className="divide-y divide-stone-100">
            {HOTSPOTS.map(hs => (
              <div key={hs.id} className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <RiskDot level={hs.riskLevel} />
                      <span className="text-[11px] font-bold text-stone-900">{hs.name}</span>
                    </div>
                    <div className="text-[10px] text-stone-500 mt-0.5">{hs.crop} · {hs.issue}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-black text-red-700">{hs.change}</div>
                    <div className="text-[9px] text-stone-400">severity</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px] mb-2">
                  <div>
                    <span className="text-stone-400 block">First detected</span>
                    <span className="font-semibold text-stone-700">{hs.firstDetected}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Latest signal</span>
                    <span className="font-semibold text-stone-700">{hs.latestSignal}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`cs-badge ${hs.confirmation === 'Confirmed' ? 'cs-badge-red' : hs.confirmation === 'Emerging' ? 'cs-badge-amber' : 'cs-badge-blue'}`}>
                    {hs.confirmation}
                  </span>
                  <span className="text-[10px] text-stone-500">{hs.plots.length} field{hs.plots.length > 1 ? 's' : ''}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-stone-200 text-center text-[10px] text-stone-400">
            Hotspots identified from observation density + geographic proximity
          </div>
        </div>
      </div>

      {/* ── Field List ── */}
      <div className="rounded border border-stone-200 overflow-hidden" style={{ background: '#fff' }}>
        <div className="px-4 py-2.5 border-b border-stone-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black tracking-widest uppercase text-stone-500">Monitored Fields</span>
            <div className="text-xs text-stone-600">
              {filteredPlots.length} of {ALL_PLOTS.length} fields shown
            </div>
          </div>
        </div>

        {/* Table header */}
        <div className="hidden sm:grid grid-cols-12 px-4 py-2 bg-stone-50 border-b border-stone-200 text-[9px] font-black tracking-wider uppercase text-stone-400">
          <div className="col-span-3">Village / Farmer</div>
          <div className="col-span-2">Crop</div>
          <div className="col-span-2">Signal</div>
          <div className="col-span-1">Trend</div>
          <div className="col-span-1">Change</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Officer</div>
          <div className="col-span-1"></div>
        </div>

        <div className="divide-y divide-stone-100">
          {filteredPlots.map(plot => (
            <div
              key={plot.id}
              onClick={() => setSelectedPlot(selectedPlot?.id === plot.id ? null : plot)}
              className={`
                px-4 py-3 cursor-pointer hover:bg-stone-50 transition-colors
                border-l-2 ${plot.risk === 'high' ? 'border-l-red-600' : plot.risk === 'medium' ? 'border-l-amber-500' : 'border-l-emerald-600'}
              `}
            >
              {/* Mobile layout */}
              <div className="sm:hidden space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-stone-900">{plot.village} · {plot.crop}</span>
                  <span className={CASE_STATUS_LABELS[plot.caseStatus]?.cls || 'cs-badge cs-badge-neutral'}>
                    {CASE_STATUS_LABELS[plot.caseStatus]?.label}
                  </span>
                </div>
                <div className="text-[10px] text-stone-500">{plot.farmerName} · {plot.signal}</div>
                <TrendPill trend={plot.trend} />
              </div>

              {/* Desktop layout */}
              <div className="hidden sm:grid grid-cols-12 items-center gap-2 text-[10px]">
                <div className="col-span-3">
                  <div className="font-bold text-stone-900">{plot.village}</div>
                  <div className="text-stone-500">{plot.farmerName}</div>
                  <div className="text-stone-400 cs-mono text-[9px]">{plot.id}</div>
                </div>
                <div className="col-span-2">
                  <div className="font-semibold text-stone-800">{plot.crop}</div>
                  <div className="text-stone-500">{plot.stage}</div>
                </div>
                <div className="col-span-2 font-semibold text-stone-700">{plot.signal}</div>
                <div className="col-span-1"><TrendPill trend={plot.trend} /></div>
                <div className={`col-span-1 font-bold ${plot.trend === 'rising' ? 'text-red-700' : 'text-emerald-700'}`}>
                  {plot.changeText}
                </div>
                <div className="col-span-1">
                  <span className={CASE_STATUS_LABELS[plot.caseStatus]?.cls || 'cs-badge cs-badge-neutral'}>
                    {CASE_STATUS_LABELS[plot.caseStatus]?.label}
                  </span>
                </div>
                <div className={`col-span-1 font-semibold ${plot.officerVisited ? 'text-emerald-700' : 'text-red-700'}`}>
                  {plot.officerVisited ? 'Visited' : 'Not visited'}
                </div>
                <div className="col-span-1 flex justify-end">
                  <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
                </div>
              </div>
            </div>
          ))}

          {filteredPlots.length === 0 && (
            <div className="py-10 text-center">
              <MapPin className="h-8 w-8 text-stone-300 mx-auto mb-2" />
              <div className="text-sm font-medium text-stone-600">No fields match your filter</div>
              <div className="text-[10px] text-stone-400 mt-1">Try adjusting the search or risk filter</div>
              <button
                onClick={() => { setFilter('all'); setSearchTerm('') }}
                className="mt-3 text-[11px] font-semibold text-emerald-800 hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default MapMonitor