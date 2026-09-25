import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ClipboardCheck,
  MapPin,
  Activity,
  RefreshCw,
  Download,
  ChevronRight,
  Sprout,
  CloudSun,
  Eye,
  MoreHorizontal,
} from 'lucide-react'
import { DEFAULT_FIELDS } from '../../services/cropIntelligence'

// ---- Demo data (clearly isolated from production) ----
const DEMO_RISK_MOVEMENT = [
  { label: 'Cotton disease signals', change: +18, trend: 'rising', crop: 'Cotton', villages: 4 },
  { label: 'Pest observations', change: +11, trend: 'rising', crop: 'Paddy/Cotton', villages: 3 },
  { label: 'Emerging clusters', change: +3, trend: 'rising', crop: 'Multiple', villages: 3 },
  { label: 'Confirmed this week', change: +2, trend: 'stable', crop: 'Cotton', villages: 2 },
  { label: 'Resolved cases', change: +5, trend: 'falling', crop: 'Soybean', villages: 5 },
  { label: 'Monitoring coverage', change: -2, trend: 'falling', crop: 'All', villages: null },
]

const DEMO_ATTENTION_AREAS = [
  {
    id: 'AG-003',
    village: 'Igatpuri',
    taluka: 'Igatpuri',
    crop: 'Cotton',
    signal: 'Pest / Disease Risk',
    trend: 'rising',
    riskLevel: 'high',
    lastObservation: '3 days ago',
    confirmationStatus: 'Expert review pending',
    action: 'Field inspection',
    changeText: '+14% severity',
    caseNumber: 'CASE-1042',
  },
  {
    id: 'AG-006',
    village: 'Niphad',
    taluka: 'Niphad',
    crop: 'Paddy',
    signal: 'Leaf Blast',
    trend: 'rising',
    riskLevel: 'high',
    lastObservation: '5 days ago',
    confirmationStatus: 'New signal',
    action: 'Expert review',
    changeText: '+8% severity',
    caseNumber: 'CASE-1039',
  },
  {
    id: 'AG-002',
    village: 'Dindori',
    taluka: 'Dindori',
    crop: 'Paddy',
    signal: 'Bacterial Blight',
    trend: 'stable',
    riskLevel: 'medium',
    lastObservation: '2 days ago',
    confirmationStatus: 'Under review',
    action: 'Monitor closely',
    changeText: 'Stable',
    caseNumber: 'CASE-1037',
  },
  {
    id: 'AG-005',
    village: 'Sinnar',
    taluka: 'Sinnar',
    crop: 'Corn',
    signal: 'Disease risk signals',
    trend: 'stable',
    riskLevel: 'medium',
    lastObservation: '4 days ago',
    confirmationStatus: 'Validation needed',
    action: 'Assign officer',
    changeText: 'Stable',
    caseNumber: 'CASE-1035',
  },
  {
    id: 'AG-001',
    village: 'Nashik Rural',
    taluka: 'Nashik',
    crop: 'Paddy',
    signal: 'Healthy',
    trend: 'falling',
    riskLevel: 'low',
    lastObservation: '1 day ago',
    confirmationStatus: 'Validated',
    action: 'Routine follow-up',
    changeText: 'Improving',
    caseNumber: 'CASE-1030',
  },
]

const DEMO_ACTION_QUEUE = [
  { id: 1, priority: 'critical', type: 'Field inspection needed', location: 'Igatpuri — Cotton', reason: 'Pest cluster confirmed by 2 observations, no officer visit yet', due: 'Today', status: 'overdue', route: '/dashboard/alerts' },
  { id: 2, priority: 'high', type: 'Expert review', location: 'Niphad — Paddy', reason: '3 cases awaiting expert validation', due: 'Tomorrow', status: 'pending', route: '/dashboard/approvals' },
  { id: 3, priority: 'high', type: 'Field inspection needed', location: 'Sinnar — Cotton', reason: 'Risk shifted to HIGH, 5+ days since last visit', due: 'Tomorrow', status: 'pending', route: '/dashboard/alerts' },
  { id: 4, priority: 'medium', type: 'Follow-up monitoring', location: 'North Field — Paddy', reason: 'Weekly observation due, severity increasing', due: '2 days', status: 'pending', route: '/dashboard/follow-up' },
  { id: 5, priority: 'medium', type: 'Advisory dispatch', location: 'Niphad Block', reason: 'Stem Borer advisory to be sent to 24 registered farmers', due: '3 days', status: 'pending', route: '/dashboard/reports' },
]

const DEMO_CASE_STATUS_COUNTS = {
  newSignal: 4,
  underReview: 6,
  expertValidation: 8,
  fieldVisitRequired: 3,
  confirmed: 12,
  actionAdvised: 5,
  followUpRequired: 7,
  resolved: 89,
}

// ---- Reusable Components ----
function TrendBadge({ trend }) {
  if (trend === 'rising') return (
    <span className="flex items-center gap-1 text-[10px] font-bold trend-rising">
      <TrendingUp className="h-3 w-3" /> Rising
    </span>
  )
  if (trend === 'falling') return (
    <span className="flex items-center gap-1 text-[10px] font-bold trend-falling">
      <TrendingDown className="h-3 w-3" /> Improving
    </span>
  )
  return (
    <span className="flex items-center gap-1 text-[10px] font-semibold trend-stable">
      <Minus className="h-3 w-3" /> Stable
    </span>
  )
}

function RiskDot({ level }) {
  const cls = level === 'high' ? 'risk-dot-high' : level === 'medium' ? 'risk-dot-medium' : 'risk-dot-low'
  return <span className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${cls}`} />
}

function SituationBadge({ status }) {
  const map = {
    'new signal': 'cs-badge cs-badge-blue',
    'expert review pending': 'cs-badge cs-badge-amber',
    'under review': 'cs-badge cs-badge-amber',
    'validated': 'cs-badge cs-badge-green',
    'validation needed': 'cs-badge cs-badge-amber',
    'confirmed': 'cs-badge cs-badge-red',
  }
  const cls = map[status.toLowerCase()] || 'cs-badge cs-badge-neutral'
  return <span className={cls}>{status}</span>
}

function MiniSparkline({ values = [3, 5, 8, 12, 18], color = '#b91c1c' }) {
  const max = Math.max(...values)
  return (
    <div className="flex items-end gap-[2px]" style={{ height: 18, width: 36 }}>
      {values.map((v, i) => (
        <div
          key={i}
          style={{
            height: `${(v / max) * 100}%`,
            width: 4,
            background: i === values.length - 1 ? color : `${color}55`,
            borderRadius: 1,
          }}
        />
      ))}
    </div>
  )
}

// ---- Main Page ----
const Overview = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [timeWindow, setTimeWindow] = useState('7d')
  const [selectedArea, setSelectedArea] = useState(null)
  const primaryField = DEFAULT_FIELDS[0]

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 280)
    return () => clearTimeout(t)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-7 w-7 border-2 border-t-transparent mx-auto mb-3"
            style={{ borderColor: 'var(--cs-green-800)', borderTopColor: 'transparent' }}
          />
          <p className="text-sm font-medium text-stone-600">Loading district situation...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="cs-badge cs-badge-green">District Agricultural Surveillance</span>
            <span className="text-[10px] text-stone-500">Nashik Command Zone</span>
          </div>
          <h1 className="text-xl font-bold text-stone-900">Field Situation</h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Monitoring emerging crop disease and pest risk across monitored fields.
            <span className="ml-2 text-stone-400">Last updated: 08:41 today</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Time window selector */}
          <div className="flex items-center rounded border border-stone-200 overflow-hidden text-[10px] font-semibold">
            {[['7d', '7 days'], ['14d', '14 days'], ['30d', '30 days']].map(([val, label]) => (
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
          <button
            onClick={() => navigate('/dashboard/reports')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold text-white rounded transition-colors"
            style={{ background: 'var(--cs-green-800)' }}
          >
            <Download className="h-3.5 w-3.5" /> Export Summary
          </button>
        </div>
      </div>

      {/* ── Case Status Pipeline ── */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-black tracking-widest uppercase text-stone-500">Case Pipeline</span>
          <button onClick={() => navigate('/dashboard/alerts')} className="text-[10px] font-semibold text-emerald-800 hover:underline flex items-center gap-1">
            View all cases <ChevronRight className="h-3 w-3" />
          </button>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
          {[
            { label: 'New Signal', count: DEMO_CASE_STATUS_COUNTS.newSignal, color: '#2563eb', bg: '#eff6ff' },
            { label: 'Under Review', count: DEMO_CASE_STATUS_COUNTS.underReview, color: '#d97706', bg: '#fffbeb' },
            { label: 'Expert Val.', count: DEMO_CASE_STATUS_COUNTS.expertValidation, color: '#b45309', bg: '#fef3c7' },
            { label: 'Visit Req.', count: DEMO_CASE_STATUS_COUNTS.fieldVisitRequired, color: '#b91c1c', bg: '#fef2f2' },
            { label: 'Confirmed', count: DEMO_CASE_STATUS_COUNTS.confirmed, color: '#991b1b', bg: '#fee2e2' },
            { label: 'Action Adv.', count: DEMO_CASE_STATUS_COUNTS.actionAdvised, color: '#5c6b2e', bg: '#f4f5e8' },
            { label: 'Follow-up', count: DEMO_CASE_STATUS_COUNTS.followUpRequired, color: '#1e4d38', bg: '#f0f8f3' },
            { label: 'Resolved', count: DEMO_CASE_STATUS_COUNTS.resolved, color: '#737373', bg: '#f5f5f5' },
          ].map(({ label, count, color, bg }) => (
            <div key={label} className="rounded border border-stone-200 p-2 text-center" style={{ background: bg }}>
              <div className="text-lg font-black" style={{ color }}>{count}</div>
              <div className="text-[9px] font-semibold text-stone-500 mt-0.5 leading-tight">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Grid: Risk Movement + Areas Needing Attention ── */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5 items-start">

        {/* ── RISK MOVEMENT ── */}
        <div className="xl:col-span-2 space-y-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[10px] font-black tracking-widest uppercase text-stone-500">Risk Movement</span>
              <div className="text-sm font-bold text-stone-900">Where is risk moving?</div>
            </div>
            <span className="text-[9px] text-stone-400">{timeWindow} window</span>
          </div>

          <div className="rounded border border-stone-200 overflow-hidden" style={{ background: '#fff' }}>
            {DEMO_RISK_MOVEMENT.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-3 border-b border-stone-100 last:border-0"
              >
                {/* Trend sign */}
                <div className="flex-shrink-0 w-12 text-right">
                  <span
                    className={`text-sm font-black ${item.change > 0 ? 'text-red-700' : 'text-emerald-700'}`}
                  >
                    {item.change > 0 ? '+' : ''}{item.change}%
                  </span>
                </div>

                {/* Label + crop */}
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-semibold text-stone-800 truncate">{item.label}</div>
                  <div className="text-[10px] text-stone-400 mt-0.5">{item.crop}</div>
                </div>

                {/* Sparkline */}
                <div className="flex-shrink-0">
                  <MiniSparkline
                    values={item.trend === 'rising' ? [3, 5, 8, 12, 18] : item.trend === 'falling' ? [18, 14, 11, 8, 5] : [10, 11, 10, 11, 10]}
                    color={item.trend === 'rising' ? '#b91c1c' : item.trend === 'falling' ? '#2d6a4f' : '#d97706'}
                  />
                </div>

                {/* Trend tag */}
                <div className="flex-shrink-0 w-16">
                  <TrendBadge trend={item.trend} />
                  {item.villages && (
                    <div className="text-[9px] text-stone-400 mt-0.5">{item.villages} villages</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Primary field spotlight */}
          <div
            className="mt-3 rounded border border-stone-200 p-3"
            style={{ background: '#fff' }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black tracking-widest uppercase text-stone-500">Current Observation</span>
              <span className="cs-badge cs-badge-amber">Moderate Risk</span>
            </div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-sm font-bold text-stone-900">{primaryField.name}</div>
                <div className="text-[11px] text-stone-500">{primaryField.farmerName} · {primaryField.village}</div>
                <div className="text-[11px] text-stone-500 mt-0.5">
                  {primaryField.crop} · <span className="font-medium text-stone-700">{primaryField.growthStage}</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-[10px] text-stone-500">Severity</div>
                <div className="text-base font-black text-red-700">{primaryField.activeSeverity}%</div>
                <div className="text-[10px] text-red-600 flex items-center justify-end gap-0.5">
                  <TrendingUp className="h-2.5 w-2.5" />
                  +{primaryField.activeSeverity - primaryField.previousSeverity}%
                </div>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-stone-100 grid grid-cols-2 gap-2 text-[10px]">
              <div>
                <span className="text-stone-400">Disease:</span>{' '}
                <span className="font-semibold text-stone-800">{primaryField.diseaseStatus}</span>
              </div>
              <div>
                <span className="text-stone-400">Pest:</span>{' '}
                <span className="font-semibold text-stone-800">{primaryField.pestStatus}</span>
              </div>
            </div>
            <div className="mt-2 flex gap-1.5">
              <button
                onClick={() => navigate('/dashboard/risk')}
                className="flex-1 text-center text-[10px] font-semibold py-1.5 rounded transition-colors text-white"
                style={{ background: 'var(--cs-green-800)' }}
              >
                Open Risk Forecast
              </button>
              <button
                onClick={() => navigate('/dashboard/follow-up')}
                className="flex-1 text-center text-[10px] font-semibold py-1.5 rounded border border-stone-200 text-stone-700 hover:bg-stone-50 transition-colors"
              >
                Follow-up
              </button>
            </div>
          </div>
        </div>

        {/* ── AREAS NEEDING ATTENTION ── */}
        <div className="xl:col-span-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[10px] font-black tracking-widest uppercase text-stone-500">Operational Queue</span>
              <div className="text-sm font-bold text-stone-900">Areas needing attention</div>
            </div>
            <button
              onClick={() => navigate('/dashboard/map')}
              className="flex items-center gap-1 text-[10px] font-semibold text-emerald-800 hover:underline"
            >
              <MapPin className="h-3 w-3" /> View on map
            </button>
          </div>

          <div className="rounded border border-stone-200 overflow-hidden" style={{ background: '#fff' }}>
            {/* Table header */}
            <div className="grid grid-cols-12 px-4 py-2 bg-stone-50 border-b border-stone-200 text-[9px] font-black tracking-wider uppercase text-stone-400">
              <div className="col-span-3">Village / Crop</div>
              <div className="col-span-2">Signal</div>
              <div className="col-span-2">Trend</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Action</div>
              <div className="col-span-1"></div>
            </div>

            {DEMO_ATTENTION_AREAS.map((area) => (
              <div
                key={area.id}
                onClick={() => setSelectedArea(selectedArea?.id === area.id ? null : area)}
                className={`cs-queue-row cs-queue-row-${area.riskLevel} grid grid-cols-12 px-4 py-3 border-b border-stone-100 last:border-0 cursor-pointer`}
              >
                {/* Village + Crop */}
                <div className="col-span-3 flex items-start gap-1.5">
                  <RiskDot level={area.riskLevel} />
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-stone-900 truncate">{area.village}</div>
                    <div className="text-[10px] text-stone-500 truncate">{area.crop}</div>
                    <div className="text-[9px] text-stone-400 mt-0.5">{area.lastObservation}</div>
                  </div>
                </div>

                {/* Signal */}
                <div className="col-span-2 flex items-center">
                  <span className="text-[10px] font-semibold text-stone-700 leading-tight">{area.signal}</span>
                </div>

                {/* Trend */}
                <div className="col-span-2 flex flex-col justify-center gap-0.5">
                  <TrendBadge trend={area.trend} />
                  <span className="text-[9px] text-stone-400">{area.changeText}</span>
                </div>

                {/* Status */}
                <div className="col-span-2 flex items-center">
                  <SituationBadge status={area.confirmationStatus} />
                </div>

                {/* Action */}
                <div className="col-span-2 flex items-center">
                  <span className="text-[10px] font-semibold text-stone-600">{area.action}</span>
                </div>

                {/* Detail arrow */}
                <div className="col-span-1 flex items-center justify-end">
                  <ChevronRight
                    className={`h-3.5 w-3.5 text-stone-400 transition-transform ${selectedArea?.id === area.id ? 'rotate-90' : ''}`}
                  />
                </div>

                {/* Expanded detail row */}
                {selectedArea?.id === area.id && (
                  <div className="col-span-12 mt-3 pt-3 border-t border-stone-100">
                    <div className="rounded border border-stone-200 p-3" style={{ background: '#faf9f7' }}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-wider text-stone-500 mb-1.5">Why this area is flagged</div>
                          <ul className="space-y-1 text-[11px] text-stone-700">
                            <li className="flex items-start gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1 flex-shrink-0" />
                              Severity increased {area.changeText} since last observation
                            </li>
                            <li className="flex items-start gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1 flex-shrink-0" />
                              Nearby fields in {area.taluka} block reporting similar symptoms
                            </li>
                            <li className="flex items-start gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-1 flex-shrink-0" />
                              No field officer visit in the last 5 days
                            </li>
                          </ul>
                        </div>
                        <div className="flex flex-col gap-1.5 flex-shrink-0">
                          <button
                            onClick={(e) => { e.stopPropagation(); navigate('/dashboard/approvals') }}
                            className="px-3 py-1.5 text-[10px] font-bold rounded text-white transition-colors"
                            style={{ background: 'var(--cs-green-800)' }}
                          >
                            Open Case File
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); navigate('/dashboard/map') }}
                            className="px-3 py-1.5 text-[10px] font-semibold rounded border border-stone-200 text-stone-700 hover:bg-stone-50"
                          >
                            View on Map
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-stone-200 flex items-center gap-2 text-[9px] text-stone-400">
                        <span className="cs-mono">{area.caseNumber}</span>
                        <span>·</span>
                        <span>Last observed: {area.lastObservation}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Action Queue ── */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-[10px] font-black tracking-widest uppercase text-stone-500">Response</span>
            <div className="text-sm font-bold text-stone-900">Next actions</div>
          </div>
          <span className="cs-badge cs-badge-red">
            {DEMO_ACTION_QUEUE.filter(a => a.priority === 'critical' || a.priority === 'high').length} Urgent
          </span>
        </div>

        <div className="rounded border border-stone-200 overflow-hidden" style={{ background: '#fff' }}>
          {DEMO_ACTION_QUEUE.map((action) => (
            <div
              key={action.id}
              onClick={() => navigate(action.route)}
              className={`
                flex items-center gap-4 px-4 py-3 border-b border-stone-100 last:border-0 cursor-pointer hover:bg-stone-50 transition-colors
                ${action.priority === 'critical' ? 'border-l-2 border-l-red-600' : action.priority === 'high' ? 'border-l-2 border-l-amber-500' : 'border-l-2 border-l-stone-300'}
              `}
            >
              {/* Priority */}
              <div className="flex-shrink-0 w-14">
                {action.priority === 'critical' ? (
                  <span className="cs-badge cs-badge-red">Critical</span>
                ) : action.priority === 'high' ? (
                  <span className="cs-badge cs-badge-amber">High</span>
                ) : (
                  <span className="cs-badge cs-badge-neutral">Medium</span>
                )}
              </div>

              {/* Action type */}
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-bold text-stone-900">{action.type}</div>
                <div className="text-[10px] text-stone-500 truncate">{action.location}</div>
                <div className="text-[10px] text-stone-400 mt-0.5">{action.reason}</div>
              </div>

              {/* Due */}
              <div className="flex-shrink-0 text-right">
                <div className="text-[10px] text-stone-500">Due</div>
                <div
                  className={`text-[11px] font-bold ${action.status === 'overdue' ? 'text-red-700' : 'text-stone-800'}`}
                >
                  {action.due}
                </div>
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0">
                <ChevronRight className="h-4 w-4 text-stone-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Regional coverage + weather context row ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Regional matrix */}
        <div className="md:col-span-2 rounded border border-stone-200 overflow-hidden" style={{ background: '#fff' }}>
          <div className="px-4 py-2.5 border-b border-stone-200 flex items-center justify-between">
            <span className="text-[10px] font-black tracking-widest uppercase text-stone-500">Regional Coverage</span>
            <button onClick={() => navigate('/dashboard/map')} className="text-[10px] font-semibold text-emerald-800 hover:underline flex items-center gap-1">
              GIS Map <MapPin className="h-2.5 w-2.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 divide-x divide-y divide-stone-100">
            {[
              { region: 'Nashik District', coverage: 84, crop: 'Rice & Soybean', stage: 'Tillering', risk: 'Leaf Blast (Moderate)', riskLevel: 'medium' },
              { region: 'Pune Division', coverage: 78, crop: 'Sugarcane & Wheat', stage: 'Vegetative', risk: 'Low pathology', riskLevel: 'low' },
              { region: 'Nagpur Division', coverage: 65, crop: 'Cotton & Soybean', stage: 'Square Formation', risk: 'Bacterial Blight / Whitefly', riskLevel: 'high' },
              { region: 'Chhatrapati Sambhajinagar', coverage: 72, crop: 'Cotton & Pulses', stage: 'Vegetative/Flowering', risk: 'Moisture Stress', riskLevel: 'medium' },
            ].map((r) => (
              <div key={r.region} className="p-3 text-[10px]">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-stone-800 text-[11px]">{r.region}</span>
                  <span className="font-bold text-emerald-800">{r.coverage}%</span>
                </div>
                <div className="text-stone-500">{r.crop} · {r.stage}</div>
                <div
                  className={`mt-1 font-semibold ${r.riskLevel === 'high' ? 'text-red-700' : r.riskLevel === 'medium' ? 'text-amber-700' : 'text-emerald-700'}`}
                >
                  {r.risk}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weather context */}
        <div className="rounded border border-stone-200 overflow-hidden" style={{ background: '#fff' }}>
          <div className="px-4 py-2.5 border-b border-stone-200">
            <span className="text-[10px] font-black tracking-widest uppercase text-stone-500">Weather Context</span>
          </div>
          <div className="p-3 space-y-2.5 text-[10px]">
            {[
              { label: 'Rainfall (48h)', value: 'Moderate expected', color: 'var(--cs-blue-700)' },
              { label: 'Humidity', value: '82–87% RH', color: 'var(--cs-blue-700)' },
              { label: 'Temperature', value: '28–32°C', color: 'var(--cs-amber-700)' },
              { label: 'Wind', value: 'SW · 14 km/h', color: 'var(--cs-charcoal-500)' },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex justify-between items-center py-1 border-b border-stone-100 last:border-0">
                <span className="text-stone-500">{label}</span>
                <span className="font-semibold" style={{ color }}>{value}</span>
              </div>
            ))}

            <div className="mt-2 pt-2 border-t border-stone-200 rounded bg-amber-50 border border-amber-200 p-2.5">
              <div className="text-[10px] font-semibold text-amber-800 leading-relaxed">
                Current conditions may support increased pest and fungal activity in cotton and paddy regions.
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Overview