import React, { useState } from 'react'
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Search,
  Download,
  Eye,
  User,
  MapPin,
  Calendar,
  RotateCcw,
  ShieldCheck,
  Leaf,
  Activity,
  FileCheck,
  X,
  MessageSquare,
  ChevronRight,
  ChevronDown,
  TrendingUp,
  AlertTriangle,
  Info,
  ArrowRight,
  Droplets,
  Thermometer,
  Wind,
} from 'lucide-react'

// ── Data ──
const INITIAL_VALIDATIONS = [
  {
    id: 1,
    farmerName: 'Ramesh Patil',
    farmerId: 'FARM-001',
    fieldId: 'AG-001',
    village: 'Shivaji Nagar',
    taluka: 'Nashik',
    crop: 'Paddy',
    stage: 'Flowering',
    disease: 'Bacterial Blight',
    status: 'pending',
    source: 'Farmer App',
    submittedBy: 'Ramesh Patil',
    submissionDate: '16 Sep 2026',
    captureDate: '16 Sep 2026',
    latitude: '20.0059',
    longitude: '73.7897',
    locationMatch: true,
    expertNote: '',
    imageAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=600&auto=format&fit=crop&q=80',
    // Assessment data
    assessment: { label: 'Likely', confidence: 'Moderate', evidenceCount: 2, nearbyCases: 1 },
    // Risk context
    riskTrend: 'rising',
    severityHistory: [8, 10, 14, 16, 18],
    weatherContext: { humidity: '84%', temperature: '28°C', rainfall: 'Moderate expected', risk: 'Conditions support fungal spread' },
    // Timeline
    timeline: [
      { date: '12 Sep 2026', event: 'First observation', detail: 'Mild leaf spots reported', type: 'observation' },
      { date: '14 Sep 2026', event: 'Follow-up photo', detail: 'Symptom spread visible', type: 'observation' },
      { date: '16 Sep 2026', event: 'Assessment ready', detail: 'Assessment: Bacterial Blight (Likely)', type: 'assessment' },
      { date: '16 Sep 2026', event: 'Awaiting review', detail: 'Expert validation pending', type: 'pending' },
    ],
    caseNumber: 'CASE-1037',
    firstDetected: '12 Sep 2026',
    riskLevel: 'medium',
  },
  {
    id: 2,
    farmerName: 'Suresh Yadav',
    farmerId: 'FARM-002',
    fieldId: 'AG-002',
    village: 'Gandhi Gram',
    taluka: 'Dindori',
    crop: 'Paddy',
    stage: 'Vegetative',
    disease: 'Healthy',
    status: 'validated',
    source: 'Field Official',
    submittedBy: 'Priya Sharma',
    submissionDate: '15 Sep 2026',
    captureDate: '15 Sep 2026',
    latitude: '20.0121',
    longitude: '73.8012',
    locationMatch: true,
    expertNote: 'Assessment matches field image. No further action needed.',
    imageAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80',
    assessment: { label: 'Confirmed healthy', confidence: 'High', evidenceCount: 3, nearbyCases: 0 },
    riskTrend: 'falling',
    severityHistory: [12, 10, 8, 6, 5],
    weatherContext: { humidity: '68%', temperature: '26°C', rainfall: 'Low', risk: 'Low risk conditions' },
    timeline: [
      { date: '8 Sep 2026', event: 'First observation', detail: 'Minor stress signs reported', type: 'observation' },
      { date: '12 Sep 2026', event: 'Follow-up', detail: 'Stress recovering', type: 'observation' },
      { date: '15 Sep 2026', event: 'Assessment ready', detail: 'Assessment: Healthy', type: 'assessment' },
      { date: '15 Sep 2026', event: 'Expert confirmed', detail: 'Officer Priya Sharma validated', type: 'confirmed' },
    ],
    caseNumber: 'CASE-1033',
    firstDetected: '8 Sep 2026',
    riskLevel: 'low',
  },
  {
    id: 3,
    farmerName: 'Mahesh Shinde',
    farmerId: 'FARM-003',
    fieldId: 'AG-003',
    village: 'Igatpuri',
    taluka: 'Igatpuri',
    crop: 'Cotton',
    stage: 'Flowering',
    disease: 'Pest / Disease Risk',
    status: 'needs_review',
    source: 'Field Official',
    submittedBy: 'Amit Singh',
    submissionDate: '14 Sep 2026',
    captureDate: '14 Sep 2026',
    latitude: '19.9981',
    longitude: '73.7764',
    locationMatch: true,
    expertNote: 'Symptoms require closer inspection. Request additional photos.',
    imageAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&auto=format&fit=crop&q=80',
    assessment: { label: 'Unclear', confidence: 'Low', evidenceCount: 1, nearbyCases: 2 },
    riskTrend: 'rising',
    severityHistory: [8, 14, 20, 28, 34],
    weatherContext: { humidity: '78%', temperature: '31°C', rainfall: 'Dry spell', risk: 'Dry conditions favour pest multiplication' },
    timeline: [
      { date: '10 Sep 2026', event: 'First signal', detail: 'Cotton stress observed', type: 'observation' },
      { date: '12 Sep 2026', event: 'Risk increasing', detail: 'Severity rising, nearby field also flagged', type: 'alert' },
      { date: '14 Sep 2026', event: 'Assessment', detail: 'Assessment: Unclear — needs more evidence', type: 'assessment' },
      { date: '14 Sep 2026', event: 'Review requested', detail: 'Expert asked for additional photos', type: 'review' },
    ],
    caseNumber: 'CASE-1042',
    firstDetected: '10 Sep 2026',
    riskLevel: 'high',
  },
  {
    id: 4,
    farmerName: 'Vikram Jadhav',
    farmerId: 'FARM-004',
    fieldId: 'AG-004',
    village: 'Kisan Colony',
    taluka: 'Yeola',
    crop: 'Paddy',
    stage: 'Early',
    disease: 'Healthy',
    status: 'rejected',
    source: 'Farmer App',
    submittedBy: 'Vikram Jadhav',
    submissionDate: '13 Sep 2026',
    captureDate: '13 Sep 2026',
    latitude: '20.0213',
    longitude: '73.8145',
    locationMatch: false,
    expertNote: 'Image quality insufficient. Location mismatch detected. Please resubmit with correct field photo.',
    imageAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=600&auto=format&fit=crop&q=80',
    assessment: { label: 'Unable to assess', confidence: 'Very Low', evidenceCount: 1, nearbyCases: 0 },
    riskTrend: 'stable',
    severityHistory: [5, 5, 6, 5, 5],
    weatherContext: { humidity: '70%', temperature: '27°C', rainfall: 'Normal', risk: 'No weather risk' },
    timeline: [
      { date: '13 Sep 2026', event: 'Submission received', detail: 'Low-quality image from farmer app', type: 'observation' },
      { date: '13 Sep 2026', event: 'Rejected', detail: 'Location mismatch · image quality insufficient', type: 'rejected' },
    ],
    caseNumber: 'CASE-1031',
    firstDetected: '13 Sep 2026',
    riskLevel: 'low',
  },
]

// ── Helper components ──
const STATUS_CONFIG = {
  pending: { label: 'Awaiting Review', cls: 'cs-badge cs-badge-blue', icon: Clock },
  validated: { label: 'Confirmed', cls: 'cs-badge cs-badge-green', icon: CheckCircle },
  needs_review: { label: 'More Evidence Needed', cls: 'cs-badge cs-badge-amber', icon: AlertCircle },
  rejected: { label: 'Insufficient Data', cls: 'cs-badge cs-badge-neutral', icon: XCircle },
}

const TIMELINE_TYPE_STYLE = {
  observation: { dot: 'bg-stone-400', line: 'text-stone-600' },
  assessment: { dot: 'bg-blue-500', line: 'text-blue-700' },
  pending: { dot: 'bg-amber-500', line: 'text-amber-700' },
  confirmed: { dot: 'bg-emerald-600', line: 'text-emerald-700' },
  alert: { dot: 'bg-red-500', line: 'text-red-700' },
  review: { dot: 'bg-amber-500', line: 'text-amber-700' },
  rejected: { dot: 'bg-stone-500', line: 'text-stone-600' },
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending
  return <span className={cfg.cls}>{cfg.label}</span>
}

function RiskBadge({ level }) {
  if (level === 'high') return <span className="cs-badge cs-badge-red">High Risk</span>
  if (level === 'medium') return <span className="cs-badge cs-badge-amber">Moderate Risk</span>
  return <span className="cs-badge cs-badge-green">Low Risk</span>
}

function ConfidenceBar({ label }) {
  const w = label === 'High' ? 85 : label === 'Moderate' ? 55 : label === 'Low' ? 30 : 15
  const color = label === 'High' ? '#2d6a4f' : label === 'Moderate' ? '#d97706' : '#b91c1c'
  return (
    <div className="flex items-center gap-2 text-[10px]">
      <div className="flex-1 h-1.5 rounded-full bg-stone-200">
        <div className="h-1.5 rounded-full transition-all" style={{ width: `${w}%`, background: color }} />
      </div>
      <span className="font-semibold text-stone-700 w-16">{label}</span>
    </div>
  )
}

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'needs_review', label: 'More Evidence' },
  { value: 'validated', label: 'Confirmed' },
  { value: 'rejected', label: 'Rejected' },
]

const ApprovalWorkflow = () => {
  const [validations, setValidations] = useState(INITIAL_VALIDATIONS)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCase, setSelectedCase] = useState(null)
  const [expertNote, setExpertNote] = useState('')
  const [actionTaken, setActionTaken] = useState(null)

  const filtered = validations.filter(item => {
    const match = filter === 'all' || item.status === filter
    const search = searchTerm.toLowerCase()
    const matchSearch =
      item.farmerName.toLowerCase().includes(search) ||
      item.village.toLowerCase().includes(search) ||
      item.crop.toLowerCase().includes(search) ||
      item.disease.toLowerCase().includes(search) ||
      item.caseNumber.toLowerCase().includes(search)
    return match && matchSearch
  })

  const openCase = (item) => {
    setSelectedCase(item)
    setExpertNote(item.expertNote || '')
    setActionTaken(null)
  }

  const updateStatus = (id, status) => {
    setValidations(prev => prev.map(v => v.id === id ? { ...v, status, expertNote } : v))
    setSelectedCase(prev => prev ? { ...prev, status, expertNote } : prev)
    setActionTaken(status)
  }

  const counts = FILTERS.map(f => ({
    ...f,
    count: f.value === 'all' ? validations.length : validations.filter(v => v.status === f.value).length
  }))

  return (
    <div className="flex flex-col lg:flex-row gap-5 h-full">

      {/* ── LEFT: Case Queue ── */}
      <div className={`${selectedCase ? 'lg:w-80 xl:w-96' : 'w-full'} flex flex-col gap-4`}>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 pb-4 border-b border-stone-200">
          <div>
            <span className="cs-badge cs-badge-olive mb-1">Field Validation</span>
            <h1 className="text-xl font-bold text-stone-900">Expert Review</h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Review observations, assess evidence, and confirm or correct field assessments.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400" />
          <input
            type="text"
            placeholder="Search case, village, crop, farmer..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-[11px] border border-stone-200 rounded bg-white focus:outline-none focus:border-stone-400"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-1.5">
          {counts.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-semibold rounded border transition-colors ${
                filter === f.value ? 'text-white border-transparent' : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
              }`}
              style={filter === f.value ? { background: 'var(--cs-green-800)', borderColor: 'var(--cs-green-800)' } : {}}
            >
              {f.label}
              <span className={`px-1.5 py-0.5 rounded text-[9px] font-black ${filter === f.value ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'}`}>
                {f.count}
              </span>
            </button>
          ))}
        </div>

        {/* Case list */}
        <div className="rounded border border-stone-200 overflow-hidden" style={{ background: '#fff' }}>
          {filtered.length === 0 ? (
            <div className="py-10 text-center">
              <FileCheck className="h-8 w-8 text-stone-300 mx-auto mb-2" />
              <div className="text-sm font-medium text-stone-600">No cases awaiting review</div>
              <div className="text-[10px] text-stone-400 mt-1">All monitored fields are currently stable.</div>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {filtered.map(item => {
                const isSelected = selectedCase?.id === item.id
                return (
                  <div
                    key={item.id}
                    onClick={() => openCase(item)}
                    className={`
                      p-3 cursor-pointer transition-colors
                      border-l-2
                      ${item.riskLevel === 'high' ? 'border-l-red-600' : item.riskLevel === 'medium' ? 'border-l-amber-500' : 'border-l-emerald-600'}
                      ${isSelected ? 'bg-emerald-50/50' : 'hover:bg-stone-50'}
                    `}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-bold text-stone-900">{item.village} · {item.crop}</span>
                        </div>
                        <div className="text-[10px] text-stone-500">{item.farmerName} · {item.stage}</div>
                      </div>
                      <StatusBadge status={item.status} />
                    </div>

                    <div className="flex items-center justify-between text-[10px]">
                      <div className="font-semibold text-stone-700">{item.disease}</div>
                      <div className="text-stone-400 cs-mono">{item.caseNumber}</div>
                    </div>

                    {item.status === 'pending' && (
                      <div className="mt-1.5 text-[10px] text-amber-700 font-medium">
                        Awaiting expert review · {item.submissionDate}
                      </div>
                    )}
                    {item.status === 'needs_review' && (
                      <div className="mt-1.5 text-[10px] text-amber-700 font-medium">
                        More evidence requested · {item.submissionDate}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

      </div>

      {/* ── RIGHT: Field Case File ── */}
      {selectedCase && (
        <div className="flex-1 min-w-0">
          <div className="rounded border border-stone-200 overflow-hidden cs-panel-enter" style={{ background: '#fff' }}>

            {/* Case file header */}
            <div className="cs-case-header px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-black tracking-widest uppercase text-stone-500">Field Case File</span>
                    <span className="cs-mono text-[10px] text-stone-500">{selectedCase.caseNumber}</span>
                  </div>
                  <h2 className="text-lg font-bold text-stone-900">
                    {selectedCase.village} / {selectedCase.crop} / {selectedCase.disease}
                  </h2>
                  <div className="flex items-center gap-3 mt-1 text-[10px] text-stone-500">
                    <span><MapPin className="h-3 w-3 inline mr-0.5" />{selectedCase.taluka} Block</span>
                    <span><User className="h-3 w-3 inline mr-0.5" />{selectedCase.farmerName}</span>
                    <span><Calendar className="h-3 w-3 inline mr-0.5" />First detected: {selectedCase.firstDetected}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <StatusBadge status={selectedCase.status} />
                  <RiskBadge level={selectedCase.riskLevel} />
                  <button
                    onClick={() => setSelectedCase(null)}
                    className="text-stone-400 hover:text-stone-700 ml-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Summary row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-3 border-t border-stone-200 text-[10px]">
                <div>
                  <div className="text-stone-400">Current risk</div>
                  <div className="font-bold text-stone-900 mt-0.5 text-[11px]">
                    {selectedCase.riskLevel.toUpperCase()}
                  </div>
                </div>
                <div>
                  <div className="text-stone-400">Evidence</div>
                  <div className="font-bold text-stone-900 mt-0.5 text-[11px]">
                    {selectedCase.assessment.evidenceCount} observations
                  </div>
                </div>
                <div>
                  <div className="text-stone-400">Last observed</div>
                  <div className="font-bold text-stone-900 mt-0.5 text-[11px]">{selectedCase.submissionDate}</div>
                </div>
                <div>
                  <div className="text-stone-400">Confirmation</div>
                  <div className="font-bold text-stone-900 mt-0.5 text-[11px]">
                    <StatusBadge status={selectedCase.status} />
                  </div>
                </div>
              </div>
            </div>

            {/* Main case body */}
            <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-stone-200">

              {/* Column 1: Field image + evidence */}
              <div className="p-4 space-y-4">
                <div>
                  <div className="text-[10px] font-black tracking-widest uppercase text-stone-500 mb-2">Field Image</div>
                  {selectedCase.imageAvailable ? (
                    <div className="relative rounded border border-stone-200 overflow-hidden">
                      <img
                        src={selectedCase.imageUrl}
                        alt={`Field observation — ${selectedCase.village}`}
                        className="w-full h-36 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2">
                        <div className="text-[9px] text-white font-medium">{selectedCase.captureDate} · {selectedCase.crop}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-36 bg-stone-100 rounded border border-stone-200 flex items-center justify-center text-stone-400 text-xs">
                      No image available
                    </div>
                  )}
                </div>

                {/* Assessment block */}
                <div>
                  <div className="text-[10px] font-black tracking-widest uppercase text-stone-500 mb-2">Assessment</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-stone-500">Current assessment</span>
                      <span className="font-bold text-stone-900">
                        {selectedCase.disease} — <span className="text-stone-600">{selectedCase.assessment.label}</span>
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-[10px] mb-1">
                        <span className="text-stone-500">Confidence</span>
                      </div>
                      <ConfidenceBar label={selectedCase.assessment.confidence} />
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-stone-500">Observations</span>
                      <span className="font-semibold text-stone-800">{selectedCase.assessment.evidenceCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-stone-500">Nearby confirmed cases</span>
                      <span className={`font-semibold ${selectedCase.assessment.nearbyCases > 0 ? 'text-red-700' : 'text-emerald-700'}`}>
                        {selectedCase.assessment.nearbyCases}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-stone-500">Location verified</span>
                      <span className={`font-semibold ${selectedCase.locationMatch ? 'text-emerald-700' : 'text-red-700'}`}>
                        {selectedCase.locationMatch ? 'Matches GPS' : 'Mismatch detected'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Weather context */}
                <div>
                  <div className="text-[10px] font-black tracking-widest uppercase text-stone-500 mb-2">Weather Context</div>
                  <div className="rounded border border-stone-200 p-2.5 space-y-1.5 text-[10px]">
                    <div className="flex justify-between">
                      <span className="text-stone-500">Humidity</span>
                      <span className="font-semibold text-blue-700">{selectedCase.weatherContext.humidity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Temperature</span>
                      <span className="font-semibold text-amber-700">{selectedCase.weatherContext.temperature}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Rainfall</span>
                      <span className="font-semibold text-stone-700">{selectedCase.weatherContext.rainfall}</span>
                    </div>
                  </div>
                  <div className="mt-2 p-2 rounded bg-stone-50 border border-stone-200 text-[10px] text-stone-600 italic">
                    {selectedCase.weatherContext.risk}
                  </div>
                </div>
              </div>

              {/* Column 2: Evidence trail + timeline */}
              <div className="p-4">
                <div className="text-[10px] font-black tracking-widest uppercase text-stone-500 mb-3">Field Health Timeline</div>

                <div className="relative pl-6 space-y-0">
                  {selectedCase.timeline.map((event, i) => {
                    const style = TIMELINE_TYPE_STYLE[event.type] || TIMELINE_TYPE_STYLE.observation
                    const isLast = i === selectedCase.timeline.length - 1
                    return (
                      <div key={i} className="relative pb-5 last:pb-0">
                        {/* Vertical line */}
                        {!isLast && (
                          <div className="absolute left-[-15px] top-4 bottom-0 w-px bg-stone-200" />
                        )}
                        {/* Dot */}
                        <div
                          className={`absolute left-[-19px] top-1 w-3 h-3 rounded-full border-2 border-white ${style.dot}`}
                        />
                        {/* Content */}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider">{event.date}</span>
                          </div>
                          <div className={`text-[11px] font-bold mt-0.5 ${style.line}`}>{event.event}</div>
                          <div className="text-[10px] text-stone-500 mt-0.5">{event.detail}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Why flagged */}
                <div className="mt-5 pt-4 border-t border-stone-200">
                  <div className="text-[10px] font-black tracking-widest uppercase text-stone-500 mb-2">Why this area is flagged</div>
                  <div className="space-y-1.5 text-[11px] text-stone-700">
                    {[
                      selectedCase.assessment.evidenceCount > 1
                        ? `${selectedCase.assessment.evidenceCount} observations recorded`
                        : '1 observation — more evidence needed',
                      selectedCase.riskTrend === 'rising'
                        ? 'Severity is increasing across observation cycles'
                        : 'Severity is stable or improving',
                      selectedCase.assessment.nearbyCases > 0
                        ? `${selectedCase.assessment.nearbyCases} nearby confirmed case(s) in this block`
                        : 'No confirmed cases in immediate vicinity',
                      !selectedCase.locationMatch
                        ? 'Location mismatch — field identity needs verification'
                        : 'Location verified against registered field coordinates',
                    ].map((point, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                          i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-amber-500' : i === 2 ? 'bg-red-500' : 'bg-stone-400'
                        }`} />
                        {point}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Column 3: Expert action panel */}
              <div className="p-4 flex flex-col gap-4">
                <div>
                  <div className="text-[10px] font-black tracking-widest uppercase text-stone-500 mb-2">Expert Decision</div>

                  {actionTaken && (
                    <div className="mb-3 p-3 rounded border bg-emerald-50 border-emerald-200">
                      <div className="text-[10px] font-bold text-emerald-800">
                        {actionTaken === 'validated' ? 'Confirmed and recorded.' :
                         actionTaken === 'needs_review' ? 'More evidence requested from farmer/officer.' :
                         actionTaken === 'rejected' ? 'Submission rejected — resubmission requested.' :
                         'Escalated to laboratory analysis.'}
                      </div>
                    </div>
                  )}

                  {/* Expert note */}
                  <div className="mb-3">
                    <label className="text-[10px] font-semibold text-stone-600 block mb-1">Expert observation note</label>
                    <textarea
                      value={expertNote}
                      onChange={e => setExpertNote(e.target.value)}
                      rows={3}
                      placeholder="Add your observation, correction, or note..."
                      className="w-full text-[11px] p-2.5 border border-stone-200 rounded resize-none focus:outline-none focus:border-stone-400 bg-white"
                    />
                  </div>

                  {/* Action buttons */}
                  <div className="space-y-2">
                    <div className="text-[9px] font-black uppercase tracking-widest text-stone-500 mb-1">Decision</div>

                    <button
                      onClick={() => updateStatus(selectedCase.id, 'validated')}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded border text-[11px] font-bold transition-colors"
                      style={{
                        background: selectedCase.status === 'validated' ? 'var(--cs-green-800)' : 'var(--cs-green-50)',
                        color: selectedCase.status === 'validated' ? '#fff' : 'var(--cs-green-800)',
                        borderColor: 'var(--cs-green-200)'
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Confirm assessment
                      </div>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>

                    <button
                      onClick={() => updateStatus(selectedCase.id, 'needs_review')}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded border border-amber-200 text-[11px] font-bold transition-colors"
                      style={{
                        background: selectedCase.status === 'needs_review' ? '#d97706' : '#fffbeb',
                        color: selectedCase.status === 'needs_review' ? '#fff' : '#92400e',
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Request more evidence
                      </div>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>

                    <button
                      onClick={() => updateStatus(selectedCase.id, 'rejected')}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded border border-stone-200 text-stone-600 text-[11px] font-semibold hover:bg-stone-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4" />
                        Insufficient data — reject
                      </div>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>

                    <button
                      onClick={() => updateStatus(selectedCase.id, 'escalated')}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded border border-red-200 text-red-700 text-[11px] font-semibold hover:bg-red-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Escalate to laboratory
                      </div>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Uncertainty statement */}
                <div className="mt-auto pt-4 border-t border-stone-200">
                  <div className="p-2.5 rounded bg-stone-50 border border-stone-200 text-[10px] text-stone-600 leading-relaxed">
                    <Info className="h-3 w-3 inline mr-1 text-stone-400" />
                    The system provides an initial assessment based on available observations and weather data.
                    Expert confirmation transforms this into a verified case that informs district-level action.
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default ApprovalWorkflow