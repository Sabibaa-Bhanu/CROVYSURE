import React, { useState } from 'react'
import {
  FileText,
  Download,
  Calendar,
  MapPin,
  Sprout,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  ChevronRight,
  Eye,
  Printer,
  Share2,
  BarChart3,
  Activity,
  User,
  Filter,
} from 'lucide-react'

// ── Report template definitions ──
const REPORT_TYPES = [
  {
    id: 'district-situation',
    title: 'District Situation Report',
    description: 'Weekly summary of crop health, risk levels, and active cases across the district.',
    frequency: 'Weekly',
    category: 'situation',
    icon: MapPin,
  },
  {
    id: 'crop-risk',
    title: 'Crop-wise Risk Report',
    description: 'Risk breakdown by crop type — Cotton, Paddy, Soybean, Wheat.',
    frequency: 'Weekly',
    category: 'risk',
    icon: Sprout,
  },
  {
    id: 'disease-surveillance',
    title: 'Disease & Pest Surveillance',
    description: 'Observed disease and pest signals, confirmed cases, and trends.',
    frequency: 'Weekly',
    category: 'surveillance',
    icon: AlertTriangle,
  },
  {
    id: 'hotspot',
    title: 'Hotspot Report',
    description: 'Geographic concentration of risk — emerging and confirmed hotspot areas.',
    frequency: 'Weekly',
    category: 'situation',
    icon: Activity,
  },
  {
    id: 'field-inspection',
    title: 'Field Inspection Report',
    description: 'Officer visit records, observations, and action taken in the field.',
    frequency: 'Per visit',
    category: 'field',
    icon: User,
  },
  {
    id: 'expert-validation',
    title: 'Expert Validation Report',
    description: 'Summary of cases reviewed, confirmed, corrected, and escalated.',
    frequency: 'Weekly',
    category: 'validation',
    icon: CheckCircle,
  },
  {
    id: 'weekly-trend',
    title: 'Weekly Trend Report',
    description: 'Risk movement summary — rising, stable, and falling situations across talukas.',
    frequency: 'Weekly',
    category: 'risk',
    icon: BarChart3,
  },
]

// ── Generated report records ──
const REPORT_RECORDS = [
  {
    id: 'RPT-2026-038',
    title: 'District Situation Report — Week 38',
    type: 'district-situation',
    district: 'Nashik District',
    period: '16 Sep – 22 Sep 2026',
    generatedOn: '23 Sep 2026',
    generatedBy: 'Rajesh Kumar',
    status: 'final',
    findings: {
      totalCases: 12,
      confirmedOutbreaks: 1,
      highRiskFields: 4,
      fieldsMonitored: 486,
      newSignals: 3,
      resolvedCases: 5,
    },
    crops: ['Cotton', 'Paddy', 'Soybean'],
    hotspots: ['Igatpuri', 'Niphad'],
    recommendations: [
      'Immediate field inspection in Igatpuri cluster',
      'Advisory dispatch to Niphad farmers for Leaf Blast',
      'Weekly monitoring to continue in Sinnar block',
    ],
  },
  {
    id: 'RPT-2026-037',
    title: 'District Situation Report — Week 37',
    type: 'district-situation',
    district: 'Nashik District',
    period: '9 Sep – 15 Sep 2026',
    generatedOn: '16 Sep 2026',
    generatedBy: 'Rajesh Kumar',
    status: 'final',
    findings: {
      totalCases: 9,
      confirmedOutbreaks: 0,
      highRiskFields: 3,
      fieldsMonitored: 482,
      newSignals: 5,
      resolvedCases: 3,
    },
    crops: ['Cotton', 'Paddy'],
    hotspots: ['Igatpuri'],
    recommendations: [
      'Monitor Cotton fields in Igatpuri closely',
      'Expert review for Paddy blight in Niphad',
    ],
  },
  {
    id: 'RPT-2026-036',
    title: 'Crop-wise Risk Report — Week 37',
    type: 'crop-risk',
    district: 'Nashik District',
    period: '9 Sep – 15 Sep 2026',
    generatedOn: '16 Sep 2026',
    generatedBy: 'Priya Sharma',
    status: 'final',
    findings: {
      totalCases: 9,
      confirmedOutbreaks: 0,
      highRiskFields: 3,
      fieldsMonitored: 482,
      newSignals: 5,
      resolvedCases: 3,
    },
    crops: ['Cotton', 'Paddy', 'Soybean'],
    hotspots: [],
    recommendations: [
      'Cotton: Whitefly pressure rising in Sinnar block',
      'Paddy: Leaf Blast risk elevated in wet microclimate areas',
    ],
  },
  {
    id: 'RPT-2026-033',
    title: 'Field Inspection Report — Igatpuri Visit',
    type: 'field-inspection',
    district: 'Nashik District',
    period: '14 Sep 2026',
    generatedOn: '14 Sep 2026',
    generatedBy: 'Amit Singh',
    status: 'final',
    findings: {
      totalCases: 1,
      confirmedOutbreaks: 1,
      highRiskFields: 1,
      fieldsMonitored: 3,
      newSignals: 0,
      resolvedCases: 0,
    },
    crops: ['Cotton'],
    hotspots: ['Igatpuri'],
    recommendations: [
      'Immediate pesticide application recommended',
      'Recheck in 5 days',
    ],
  },
  {
    id: 'RPT-2026-031',
    title: 'Expert Validation Report — Week 36',
    type: 'expert-validation',
    district: 'Nashik District',
    period: '2 Sep – 8 Sep 2026',
    generatedOn: '9 Sep 2026',
    generatedBy: 'Rajesh Kumar',
    status: 'final',
    findings: {
      totalCases: 7,
      confirmedOutbreaks: 0,
      highRiskFields: 2,
      fieldsMonitored: 478,
      newSignals: 4,
      resolvedCases: 6,
    },
    crops: ['Paddy', 'Soybean'],
    hotspots: [],
    recommendations: [
      'Continue monitoring paddy fields in Nashik Rural',
    ],
  },
]

const CATEGORY_COLORS = {
  situation: { bg: '#f0f8f3', border: '#6ee7b7', label: 'Situation' },
  risk: { bg: '#fffbeb', border: '#fcd34d', label: 'Risk' },
  surveillance: { bg: '#fef2f2', border: '#fca5a5', label: 'Surveillance' },
  field: { bg: '#f4f5e8', border: '#d4da9e', label: 'Field' },
  validation: { bg: '#eff6ff', border: '#93c5fd', label: 'Validation' },
}

function StatusBadge({ status }) {
  if (status === 'final') return <span className="cs-badge cs-badge-green">Final</span>
  if (status === 'draft') return <span className="cs-badge cs-badge-amber">Draft</span>
  return <span className="cs-badge cs-badge-neutral">{status}</span>
}

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [selectedReport, setSelectedReport] = useState(null)
  const [activeTab, setActiveTab] = useState('generated')

  const filtered = REPORT_RECORDS.filter(r => {
    const search = searchTerm.toLowerCase()
    const matchSearch =
      r.title.toLowerCase().includes(search) ||
      r.id.toLowerCase().includes(search) ||
      r.crops.some(c => c.toLowerCase().includes(search)) ||
      r.generatedBy.toLowerCase().includes(search)
    const matchCategory = categoryFilter === 'all' || r.type === categoryFilter
    return matchSearch && matchCategory
  })

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 pb-4 border-b border-stone-200">
        <div>
          <span className="cs-badge cs-badge-olive mb-1">Administrative</span>
          <h1 className="text-xl font-bold text-stone-900">Reports</h1>
          <p className="text-xs text-stone-500 mt-0.5">
            District situation reports, crop risk summaries, and surveillance records.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200">
        {[
          { id: 'generated', label: 'Generated Reports' },
          { id: 'templates', label: 'Report Templates' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-[11px] font-semibold border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-emerald-800 text-emerald-900'
                : 'border-transparent text-stone-500 hover:text-stone-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'generated' && (
        <div className="flex gap-5 items-start">
          {/* Report list */}
          <div className={`${selectedReport ? 'hidden lg:block lg:w-96 xl:w-[440px] flex-shrink-0' : 'w-full'}`}>

            {/* Search + filter */}
            <div className="space-y-3 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-[11px] border border-stone-200 rounded bg-white focus:outline-none focus:border-stone-400"
                />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { value: 'all', label: 'All' },
                  { value: 'district-situation', label: 'Situation' },
                  { value: 'crop-risk', label: 'Crop Risk' },
                  { value: 'field-inspection', label: 'Field' },
                  { value: 'expert-validation', label: 'Validation' },
                ].map(f => (
                  <button
                    key={f.value}
                    onClick={() => setCategoryFilter(f.value)}
                    className={`px-2.5 py-1 text-[10px] font-semibold rounded border transition-colors ${
                      categoryFilter === f.value ? 'text-white border-transparent' : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                    }`}
                    style={categoryFilter === f.value ? { background: 'var(--cs-green-800)', borderColor: 'var(--cs-green-800)' } : {}}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Report list */}
            <div className="rounded border border-stone-200 overflow-hidden" style={{ background: '#fff' }}>
              {filtered.length === 0 ? (
                <div className="py-10 text-center">
                  <FileText className="h-8 w-8 text-stone-300 mx-auto mb-2" />
                  <div className="text-sm font-medium text-stone-600">No reports found</div>
                </div>
              ) : (
                <div className="divide-y divide-stone-100">
                  {filtered.map(report => {
                    const reportType = REPORT_TYPES.find(t => t.id === report.type)
                    const Icon = reportType?.icon || FileText
                    const cat = CATEGORY_COLORS[reportType?.category] || CATEGORY_COLORS.situation
                    return (
                      <div
                        key={report.id}
                        onClick={() => setSelectedReport(selectedReport?.id === report.id ? null : report)}
                        className={`p-4 cursor-pointer transition-colors hover:bg-stone-50 ${selectedReport?.id === report.id ? 'bg-emerald-50/50' : ''}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded flex-shrink-0" style={{ background: cat.bg, border: `1px solid ${cat.border}` }}>
                            <Icon className="h-4 w-4" style={{ color: 'var(--cs-green-800)' }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="text-[11px] font-bold text-stone-900 leading-tight">{report.title}</div>
                              <StatusBadge status={report.status} />
                            </div>
                            <div className="text-[10px] text-stone-500 mt-0.5">{report.period}</div>
                            <div className="flex items-center gap-2 mt-1 text-[9px] text-stone-400">
                              <span className="cs-mono">{report.id}</span>
                              <span>·</span>
                              <span>{report.generatedBy}</span>
                              <span>·</span>
                              <span>{report.generatedOn}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Report detail view */}
          {selectedReport && (
            <div className="flex-1 min-w-0">
              <div className="rounded border border-stone-200 overflow-hidden cs-panel-enter" style={{ background: '#fff' }}>

                {/* Report header */}
                <div className="cs-case-header px-5 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="cs-mono text-[10px] text-stone-500">{selectedReport.id}</span>
                        <StatusBadge status={selectedReport.status} />
                      </div>
                      <h2 className="text-lg font-bold text-stone-900">{selectedReport.title}</h2>
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-[10px] text-stone-500">
                        <span><MapPin className="h-3 w-3 inline mr-0.5" />{selectedReport.district}</span>
                        <span><Calendar className="h-3 w-3 inline mr-0.5" />{selectedReport.period}</span>
                        <span><User className="h-3 w-3 inline mr-0.5" />{selectedReport.generatedBy}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold border border-stone-200 rounded text-stone-700 hover:bg-stone-50">
                        <Printer className="h-3 w-3" /> Print
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold text-white rounded" style={{ background: 'var(--cs-green-800)' }}>
                        <Download className="h-3 w-3" /> Download PDF
                      </button>
                    </div>
                  </div>
                </div>

                {/* Report body */}
                <div className="p-5 space-y-5">

                  {/* Summary findings */}
                  <div>
                    <div className="text-[10px] font-black tracking-widest uppercase text-stone-500 mb-3">Findings Summary</div>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {[
                        { label: 'Total Cases', value: selectedReport.findings.totalCases, color: '#1a1a1a' },
                        { label: 'Confirmed', value: selectedReport.findings.confirmedOutbreaks, color: '#b91c1c' },
                        { label: 'High Risk Fields', value: selectedReport.findings.highRiskFields, color: '#d97706' },
                        { label: 'Fields Monitored', value: selectedReport.findings.fieldsMonitored, color: '#2d6a4f' },
                        { label: 'New Signals', value: selectedReport.findings.newSignals, color: '#2563eb' },
                        { label: 'Resolved', value: selectedReport.findings.resolvedCases, color: '#737373' },
                      ].map(({ label, value, color }) => (
                        <div key={label} className="rounded border border-stone-200 p-2.5 text-center bg-stone-50">
                          <div className="text-xl font-black" style={{ color }}>{value}</div>
                          <div className="text-[9px] text-stone-500 mt-0.5 leading-tight">{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Crops affected */}
                  {selectedReport.crops.length > 0 && (
                    <div>
                      <div className="text-[10px] font-black tracking-widest uppercase text-stone-500 mb-2">Crops Covered</div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedReport.crops.map(crop => (
                          <span key={crop} className="cs-badge cs-badge-olive">{crop}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Hotspots */}
                  {selectedReport.hotspots.length > 0 && (
                    <div>
                      <div className="text-[10px] font-black tracking-widest uppercase text-stone-500 mb-2">Hotspot Areas</div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedReport.hotspots.map(hs => (
                          <span key={hs} className="cs-badge cs-badge-red">{hs}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  <div>
                    <div className="text-[10px] font-black tracking-widest uppercase text-stone-500 mb-2">Recommendations</div>
                    <div className="rounded border border-stone-200 divide-y divide-stone-100" style={{ background: '#faf9f7' }}>
                      {selectedReport.recommendations.map((rec, i) => (
                        <div key={i} className="flex items-start gap-3 px-4 py-3">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-stone-200 text-stone-600 text-[9px] font-black flex items-center justify-center mt-0.5">
                            {i + 1}
                          </span>
                          <span className="text-[11px] text-stone-700 leading-relaxed">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Report footer */}
                  <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-[10px] text-stone-400">
                    <span>Generated: {selectedReport.generatedOn} · {selectedReport.generatedBy}</span>
                    <span className="cs-mono">{selectedReport.id}</span>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      )}

      {/* Report templates tab */}
      {activeTab === 'templates' && (
        <div className="space-y-3">
          <div className="text-xs text-stone-500 mb-3">
            Generate a new report for the current period.
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {REPORT_TYPES.map(template => {
              const Icon = template.icon
              const cat = CATEGORY_COLORS[template.category] || CATEGORY_COLORS.situation
              return (
                <div
                  key={template.id}
                  className="rounded border border-stone-200 p-4 hover:border-stone-400 cursor-pointer transition-colors"
                  style={{ background: '#fff' }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded flex-shrink-0" style={{ background: cat.bg, border: `1px solid ${cat.border}` }}>
                      <Icon className="h-4 w-4" style={{ color: 'var(--cs-green-800)' }} />
                    </div>
                    <div className="flex-1">
                      <div className="text-[11px] font-bold text-stone-900">{template.title}</div>
                      <span className="text-[9px] text-stone-400">{template.frequency}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed mb-3">{template.description}</p>
                  <button
                    className="w-full py-1.5 text-[10px] font-semibold rounded border border-stone-200 text-stone-700 hover:bg-stone-50 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <FileText className="h-3 w-3" /> Generate Report
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

    </div>
  )
}

export default Reports