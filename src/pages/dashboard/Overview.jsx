import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Calendar,
  RefreshCw,
  Download,
  Sprout,
  Activity,
  ClipboardCheck,
  CloudSun,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { DEFAULT_FIELDS } from '../../services/cropIntelligence'

const mockData = {
  stats: {
    registeredFarmers: 1247,
    farmersChange: 5.2,
    imagesAnalyzed: 894,
    imagesChange: 12.8,
    diseaseCases: 126,
    diseaseChange: 8.3,
    highRiskFields: 18,
    riskChange: -4.2,
    pendingValidation: 8,
    activeAlerts: 12,
    fieldsMonitored: 486,
    coverageArea: 78.3,
    aiAccuracy: 94.7,
    completedVisits: 156,
  },
  recentActivity: [
    {
      id: 1,
      type: 'followup',
      title: 'Weekly observation submitted — North Field',
      description: 'Leaf Blast severity updated: 12% → 18% (Cycle Week 3)',
      time: '14 minutes ago',
      status: 'warning',
      actionRoute: '/dashboard/follow-up'
    },
    {
      id: 2,
      type: 'risk',
      title: 'Risk forecast updated for Sinnar Sector',
      description: 'Bacterial Blight risk shifted to HIGH due to dry spell',
      time: '38 minutes ago',
      status: 'error',
      actionRoute: '/dashboard/risk'
    },
    {
      id: 3,
      type: 'validation',
      title: 'Expert validation completed',
      description: 'Officer Rajesh Kumar verified 6 Paddy foliar cases',
      time: '1 hour ago',
      status: 'operational',
      actionRoute: '/dashboard/approvals'
    },
    {
      id: 4,
      type: 'observation',
      title: 'Soybean observation recorded — Dindori',
      description: 'JS-335 plot in clean vegetative recovery phase',
      time: '2.5 hours ago',
      status: 'operational',
      actionRoute: '/dashboard/growth'
    },
    {
      id: 5,
      type: 'alert',
      title: 'Stem Borer threshold advisory issued',
      description: 'Advisory sent to 24 registered farmers in Niphad Block',
      time: '4 hours ago',
      status: 'warning',
      actionRoute: '/dashboard/alerts'
    }
  ],
  systemStatus: {
    aiAnalysis: {
      status: 'operational',
      latency: '118ms',
    },
    imageProcessing: {
      status: 'operational',
      queue: 6,
    },
    dataSync: {
      status: 'operational',
      lastSync: '1 min ago',
    },
    apiHealth: {
      status: 'operational',
      uptime: '99.9%',
    },
  },
}

const StatusIndicator = ({ status }) => {
  const config = {
    operational: {
      color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
      dot: 'bg-emerald-600',
      label: 'Normal',
    },
    warning: {
      color: 'text-amber-800 bg-amber-50 border-amber-200',
      dot: 'bg-amber-600',
      label: 'Watch',
    },
    error: {
      color: 'text-red-800 bg-red-50 border-red-200',
      dot: 'bg-red-600',
      label: 'High Risk',
    },
  }

  const item = config[status] || config.operational

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold border ${item.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
      {item.label}
    </span>
  )
}

const Overview = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({})
  const [recentActivity, setRecentActivity] = useState([])
  const [systemStatus, setSystemStatus] = useState({})
  const [reportExported, setReportExported] = useState(false)

  // Primary active field for highlighted surveillance
  const primaryField = DEFAULT_FIELDS[0]

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats(mockData.stats)
      setRecentActivity(mockData.recentActivity)
      setSystemStatus(mockData.systemStatus)
      setLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const refreshData = () => {
    setLoading(true)
    setTimeout(() => {
      setStats(mockData.stats)
      setRecentActivity(mockData.recentActivity)
      setSystemStatus(mockData.systemStatus)
      setLoading(false)
    }, 400)
  }

  const exportReport = () => {
    setReportExported(true)
    setTimeout(() => setReportExported(false), 3500)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-800 border-t-transparent mx-auto mb-3" />
          <p className="text-sm font-medium text-stone-700">Loading district crop surveillance data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* District & Command Bar Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wider text-emerald-800 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              District Agricultural Surveillance
            </span>
            <span className="text-xs text-stone-500">Nashik Command Zone</span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 mt-1">
            Crop Health & Risk Overview
          </h1>
          <p className="text-xs text-stone-600 mt-0.5">
            Real-time monitoring across 486 registered field plots and weekly sequential farmer observations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={refreshData}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-300 text-stone-700 text-xs font-semibold rounded-md hover:bg-stone-50 hover:text-stone-900 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </button>

          <button
            onClick={exportReport}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-800 text-white text-xs font-semibold rounded-md hover:bg-emerald-900 transition-colors shadow-xs"
          >
            <Download className="h-3.5 w-3.5" />
            {reportExported ? 'Report Downloaded' : 'Export District Summary'}
          </button>
        </div>
      </div>

      {reportExported && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-xs font-medium text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-700" />
          Weekly district crop risk assessment exported as CSV / PDF bundle.
        </div>
      )}

      {/* PRIORITY SECTION: Current Crop / Field Surveillance Spotlight */}
      <div className="bg-white border border-stone-200 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Current Field Under Observation
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                Moderate Risk Level
              </span>
            </div>
            <h2 className="text-lg font-bold text-stone-900 mt-1">
              {primaryField.name} — {primaryField.crop} ({primaryField.variety})
            </h2>
            <p className="text-xs text-stone-500">
              Farmer: <strong className="text-stone-800">{primaryField.farmerName}</strong> • {primaryField.village} • Stage: <strong className="text-stone-800">{primaryField.growthStage}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => navigate('/dashboard/risk')}
              className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-md flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <CloudSun className="h-4 w-4" />
              Open Risk Forecast
            </button>
            <button
              onClick={() => navigate('/dashboard/follow-up')}
              className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-colors"
            >
              <Activity className="h-4 w-4 text-emerald-800" />
              Follow-up Monitoring
            </button>
          </div>
        </div>

        {/* Dense Field Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 text-xs">
          <div className="p-3 bg-stone-50 rounded border border-stone-200">
            <span className="text-stone-500 block text-[11px]">Current Crop Health</span>
            <span className="text-stone-900 font-bold text-sm mt-0.5 block">
              {primaryField.currentHealth}
            </span>
            <span className="text-[11px] text-amber-700 font-medium">Needs Attention</span>
          </div>

          <div className="p-3 bg-stone-50 rounded border border-stone-200">
            <span className="text-stone-500 block text-[11px]">Active Pathology</span>
            <span className="text-stone-900 font-bold text-sm mt-0.5 block truncate">
              Leaf Blast
            </span>
            <span className="text-[11px] text-stone-500">Severity: 18%</span>
          </div>

          <div className="p-3 bg-stone-50 rounded border border-stone-200">
            <span className="text-stone-500 block text-[11px]">What Changed</span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-stone-900 font-bold text-sm">12% → 18%</span>
              <span className="text-red-700 font-bold text-[11px] flex items-center">
                <TrendingUp className="h-3 w-3" /> +6%
              </span>
            </div>
            <span className="text-[11px] text-stone-500">Since 11 Sep observation</span>
          </div>

          <div className="p-3 bg-stone-50 rounded border border-stone-200">
            <span className="text-stone-500 block text-[11px]">Risk Forecast</span>
            <span className="text-amber-800 font-bold text-sm mt-0.5 block">
              MODERATE (7-Day)
            </span>
            <span className="text-[11px] text-stone-500">High humidity driver</span>
          </div>

          <div className="p-3 bg-stone-50 rounded border border-stone-200">
            <span className="text-stone-500 block text-[11px]">Next Field Follow-up</span>
            <span className="text-stone-900 font-bold text-sm mt-0.5 block">
              23 Sep 2026
            </span>
            <span className="text-[11px] text-emerald-800 font-semibold">Inspection Due</span>
          </div>

          <div className="p-3 bg-stone-50 rounded border border-stone-200">
            <span className="text-stone-500 block text-[11px]">Surveillance History</span>
            <span className="text-stone-900 font-bold text-sm mt-0.5 block">
              3 Weeks Logged
            </span>
            <span className="text-[11px] text-stone-500">Weekly photos on file</span>
          </div>
        </div>
      </div>

      {/* Primary District Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Registered Farmers</span>
            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              +{stats.farmersChange}%
            </span>
          </div>
          <p className="text-2xl font-bold text-stone-900 mt-2">{stats.registeredFarmers}</p>
          <p className="text-xs text-stone-500 mt-1">Across 14 block subdivisions</p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Images Analyzed</span>
            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              +{stats.imagesChange}%
            </span>
          </div>
          <p className="text-2xl font-bold text-stone-900 mt-2">{stats.imagesAnalyzed}</p>
          <p className="text-xs text-stone-500 mt-1">Weekly canopy photos uploaded</p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Active Disease Cases</span>
            <span className="text-xs text-red-700 font-bold bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
              +{stats.diseaseChange}%
            </span>
          </div>
          <p className="text-2xl font-bold text-stone-900 mt-2">{stats.diseaseCases}</p>
          <p className="text-xs text-stone-500 mt-1">Under protocol-based treatment</p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">High-Risk Plots</span>
            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              {stats.riskChange}%
            </span>
          </div>
          <p className="text-2xl font-bold text-red-700 mt-2">{stats.highRiskFields}</p>
          <p className="text-xs text-stone-500 mt-1">Urgent follow-up inspection required</p>
        </div>
      </div>

      {/* Main Operations Grid: Quick Actions / Activity Feed / System Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Box 1: Operational Modules & Direct Actions */}
        <div className="bg-white rounded-lg border border-stone-200 p-5 shadow-xs flex flex-col h-[28rem]">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
              <Sprout className="h-4 w-4 text-emerald-800" />
              Core Surveillance Actions
            </h3>
            <span className="text-[11px] text-stone-500 font-medium">Direct Portal Access</span>
          </div>

          <div className="mt-3 space-y-2.5 flex-1 overflow-y-auto pr-1">
            {/* Action 1: Risk Forecast */}
            <button
              onClick={() => navigate('/dashboard/risk')}
              className="w-full text-left p-3 rounded-lg border border-stone-200 hover:border-emerald-700 hover:bg-emerald-50/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 bg-emerald-100 rounded flex items-center justify-center text-emerald-900 flex-shrink-0">
                  <CloudSun className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900 group-hover:text-emerald-900">
                    Risk Forecast
                  </div>
                  <div className="text-[11px] text-stone-500">
                    Evaluate 7-day disease & weather projection
                  </div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-stone-400 group-hover:text-emerald-800 group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* Action 2: Follow-up Monitoring */}
            <button
              onClick={() => navigate('/dashboard/follow-up')}
              className="w-full text-left p-3 rounded-lg border border-stone-200 hover:border-emerald-700 hover:bg-emerald-50/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 bg-emerald-100 rounded flex items-center justify-center text-emerald-900 flex-shrink-0">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900 group-hover:text-emerald-900">
                    Follow-up Monitoring
                  </div>
                  <div className="text-[11px] text-stone-500">
                    Weekly image comparison & delta tracking
                  </div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-stone-400 group-hover:text-emerald-800 group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* Action 3: Expert Validation */}
            <button
              onClick={() => navigate('/dashboard/approvals')}
              className="w-full text-left p-3 rounded-lg border border-stone-200 hover:border-emerald-700 hover:bg-emerald-50/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 bg-amber-100 rounded flex items-center justify-center text-amber-800 flex-shrink-0">
                  <ClipboardCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900 group-hover:text-amber-900">
                    Expert Validation
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {stats.pendingValidation} detections awaiting officer approval
                  </div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-stone-400 group-hover:text-amber-800 group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* Action 4: Disease Alerts */}
            <button
              onClick={() => navigate('/dashboard/alerts')}
              className="w-full text-left p-3 rounded-lg border border-stone-200 hover:border-emerald-700 hover:bg-emerald-50/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 bg-red-100 rounded flex items-center justify-center text-red-800 flex-shrink-0">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900 group-hover:text-red-900">
                    Disease & Pest Alerts
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {stats.activeAlerts} high priority field advisories
                  </div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-stone-400 group-hover:text-red-800 group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>

          <div className="pt-3 border-t border-stone-200 text-xs text-stone-500 flex justify-between items-center">
            <span>District: Nashik Division</span>
            <span className="font-semibold text-stone-800">486 Fields Active</span>
          </div>
        </div>

        {/* Box 2: Recent Field Activity Feed */}
        <div className="bg-white rounded-lg border border-stone-200 p-5 shadow-xs flex flex-col h-[28rem]">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="h-4 w-4 text-stone-700" />
              Surveillance Activity
            </h3>
            <span className="text-[11px] text-stone-500">Live Stream</span>
          </div>

          <div className="mt-3 flex-1 overflow-y-auto space-y-3 pr-1">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                onClick={() => activity.actionRoute && navigate(activity.actionRoute)}
                className="p-2.5 rounded-lg border border-stone-200 hover:border-stone-400 hover:bg-stone-50 cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs font-bold text-stone-900">
                    {activity.title}
                  </div>
                  <StatusIndicator status={activity.status} />
                </div>
                <p className="text-[11px] text-stone-600 mt-1 leading-snug">
                  {activity.description}
                </p>
                <div className="text-[10px] text-stone-400 mt-1.5 flex items-center justify-between">
                  <span>{activity.time}</span>
                  <span className="text-emerald-800 font-semibold hover:underline">View details →</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-200 text-center">
            <button
              onClick={() => navigate('/dashboard/history')}
              className="text-xs font-semibold text-emerald-800 hover:underline"
            >
              View Complete Surveillance Log →
            </button>
          </div>
        </div>

        {/* Box 3: Field Operations & Telemetry */}
        <div className="bg-white rounded-lg border border-stone-200 p-5 shadow-xs flex flex-col h-[28rem]">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-800" />
              Platform Diagnostics
            </h3>
            <span className="text-[11px] text-emerald-700 font-semibold">Active</span>
          </div>

          <div className="mt-3 space-y-3 flex-1">
            <div className="flex items-center justify-between p-2.5 bg-stone-50 rounded border border-stone-200 text-xs">
              <div>
                <span className="font-semibold text-stone-900 block">AI Image Inference Pipeline</span>
                <span className="text-[11px] text-stone-500">Latency: {systemStatus.aiAnalysis?.latency}</span>
              </div>
              <StatusIndicator status={systemStatus.aiAnalysis?.status} />
            </div>

            <div className="flex items-center justify-between p-2.5 bg-stone-50 rounded border border-stone-200 text-xs">
              <div>
                <span className="font-semibold text-stone-900 block">Queue & Image Intake</span>
                <span className="text-[11px] text-stone-500">{systemStatus.imageProcessing?.queue} images pending</span>
              </div>
              <StatusIndicator status={systemStatus.imageProcessing?.status} />
            </div>

            <div className="flex items-center justify-between p-2.5 bg-stone-50 rounded border border-stone-200 text-xs">
              <div>
                <span className="font-semibold text-stone-900 block">State Database Sync</span>
                <span className="text-[11px] text-stone-500">Last: {systemStatus.dataSync?.lastSync}</span>
              </div>
              <StatusIndicator status={systemStatus.dataSync?.status} />
            </div>

            <div className="flex items-center justify-between p-2.5 bg-stone-50 rounded border border-stone-200 text-xs">
              <div>
                <span className="font-semibold text-stone-900 block">Government API Gateway</span>
                <span className="text-[11px] text-stone-500">Uptime: {systemStatus.apiHealth?.uptime}</span>
              </div>
              <StatusIndicator status={systemStatus.apiHealth?.status} />
            </div>

            <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded text-xs text-emerald-950 flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-700 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">All District Systems Operational</span>
                <span className="text-[11px] text-emerald-800">
                  PMFBY crop surveillance synchronizing across 486 field plots.
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-200 text-xs text-stone-500 flex justify-between items-center">
            <span>Model Version: v2.4 (Agri-ResNet)</span>
            <span className="font-semibold text-stone-800">Accuracy: 94.7%</span>
          </div>
        </div>
      </div>

      {/* Regional Surveillance Coverage */}
      <div className="bg-white rounded-lg border border-stone-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 mb-4 border-b border-stone-200">
          <div>
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Regional Agricultural Monitoring Matrix
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Coverage percentage, active crop stages, and primary observed pathogens across key agricultural zones.
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard/map')}
            className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1"
          >
            <MapPin className="h-3.5 w-3.5" /> View GIS Hotspot Map →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 bg-stone-50 rounded border border-stone-200">
            <div className="flex justify-between items-center">
              <span className="font-bold text-stone-900 text-sm">Nashik District</span>
              <span className="text-xs font-bold text-emerald-800">84% Covered</span>
            </div>
            <div className="mt-2 space-y-1 text-stone-600 text-[11px]">
              <div>Primary Crop: <strong>Rice & Soybean</strong></div>
              <div>Current Stage: <strong>Tillering / Pod Formation</strong></div>
              <div>Primary Risk: <span className="text-amber-700 font-semibold">Leaf Blast (Moderate)</span></div>
            </div>
          </div>

          <div className="p-3.5 bg-stone-50 rounded border border-stone-200">
            <div className="flex justify-between items-center">
              <span className="font-bold text-stone-900 text-sm">Pune Division</span>
              <span className="text-xs font-bold text-emerald-800">78% Covered</span>
            </div>
            <div className="mt-2 space-y-1 text-stone-600 text-[11px]">
              <div>Primary Crop: <strong>Sugarcane & Wheat</strong></div>
              <div>Current Stage: <strong>Vegetative Growth</strong></div>
              <div>Primary Risk: <span className="text-emerald-700 font-semibold">Low Pathology</span></div>
            </div>
          </div>

          <div className="p-3.5 bg-stone-50 rounded border border-stone-200">
            <div className="flex justify-between items-center">
              <span className="font-bold text-stone-900 text-sm">Nagpur Division</span>
              <span className="text-xs font-bold text-emerald-800">65% Covered</span>
            </div>
            <div className="mt-2 space-y-1 text-stone-600 text-[11px]">
              <div>Primary Crop: <strong>Cotton & Soybean</strong></div>
              <div>Current Stage: <strong>Square Formation</strong></div>
              <div>Primary Risk: <span className="text-red-700 font-semibold">Bacterial Blight / Whitefly</span></div>
            </div>
          </div>

          <div className="p-3.5 bg-stone-50 rounded border border-stone-200">
            <div className="flex justify-between items-center">
              <span className="font-bold text-stone-900 text-sm">Chhatrapati Sambhajinagar</span>
              <span className="text-xs font-bold text-emerald-800">72% Covered</span>
            </div>
            <div className="mt-2 space-y-1 text-stone-600 text-[11px]">
              <div>Primary Crop: <strong>Cotton & Pulses</strong></div>
              <div>Current Stage: <strong>Vegetative / Flowering</strong></div>
              <div>Primary Risk: <span className="text-amber-700 font-semibold">Moisture Stress</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview