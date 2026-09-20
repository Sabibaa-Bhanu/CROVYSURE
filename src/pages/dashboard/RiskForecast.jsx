import React, { useState, useEffect } from 'react'
import {
  CloudSun,
  AlertTriangle,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  MapPin,
  RefreshCw,
  Info,
  CheckCircle2,
  ChevronRight,
  Droplets,
  Thermometer,
  Sprout,
  ArrowRight,
  Filter,
  FileText
} from 'lucide-react'
import {
  DEFAULT_FIELDS,
  calculateRiskForecast
} from '../../services/cropIntelligence'

export default function RiskForecast() {
  const [selectedFieldId, setSelectedFieldId] = useState(DEFAULT_FIELDS[0].id)
  const [loading, setLoading] = useState(false)
  const [forecast, setForecast] = useState(null)
  const [error, setError] = useState(null)
  const [actionScheduled, setActionScheduled] = useState(false)

  // Simulation parameter overrides
  const [customHumidity, setCustomHumidity] = useState(null)
  const [customSeverity, setCustomSeverity] = useState(null)

  const activeField = DEFAULT_FIELDS.find(f => f.id === selectedFieldId) || DEFAULT_FIELDS[0]

  const loadForecastData = (fieldId, hum = null, sev = null) => {
    setLoading(true)
    setError(null)
    setActionScheduled(false)

    // Simulate realistic asynchronous calculation
    setTimeout(() => {
      try {
        const field = DEFAULT_FIELDS.find(f => f.id === fieldId)
        if (!field) {
          throw new Error('Selected field record could not be located.')
        }
        const result = calculateRiskForecast({
          fieldId,
          fieldData: field,
          customHumidity: hum,
          customSeverity: sev
        })
        setForecast(result)
        setLoading(false)
      } catch (err) {
        setError(err.message || 'Failed to compute risk forecast')
        setLoading(false)
      }
    }, 350)
  }

  useEffect(() => {
    setCustomHumidity(null)
    setCustomSeverity(null)
    loadForecastData(selectedFieldId)
  }, [selectedFieldId])

  const handleFieldChange = (e) => {
    setSelectedFieldId(e.target.value)
  }

  const handleParameterUpdate = () => {
    loadForecastData(selectedFieldId, customHumidity, customSeverity)
  }

  const handleResetParameters = () => {
    setCustomHumidity(null)
    setCustomSeverity(null)
    loadForecastData(selectedFieldId, null, null)
  }

  const getRiskBadge = (level) => {
    switch (level) {
      case 'HIGH':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
            <AlertTriangle className="h-3.5 w-3.5 text-red-600" />
            HIGH RISK
          </span>
        )
      case 'MODERATE':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
            MODERATE RISK
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            LOW RISK
          </span>
        )
    }
  }

  const getSubRiskPill = (level) => {
    if (level === 'High') {
      return <span className="text-xs font-semibold px-2 py-0.5 rounded bg-red-100 text-red-800">High</span>
    }
    if (level === 'Moderate') {
      return <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">Moderate</span>
    }
    return <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Low</span>
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wider text-emerald-800 uppercase bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              Crop Protection Intelligence
            </span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 mt-1">
            Risk Forecast
          </h1>
          <p className="text-sm text-stone-600 mt-0.5">
            Identify emerging crop risks before they become severe using phenology, microclimate, and sequential monitoring data.
          </p>
        </div>

        {/* Field Selector */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label htmlFor="field-select" className="text-xs font-medium text-stone-700 whitespace-nowrap">
            Selected Field:
          </label>
          <select
            id="field-select"
            value={selectedFieldId}
            onChange={handleFieldChange}
            className="w-full sm:w-72 px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700"
          >
            {DEFAULT_FIELDS.map(f => (
              <option key={f.id} value={f.id}>
                {f.name} — {f.crop}
              </option>
            ))}
          </select>

          <button
            onClick={() => loadForecastData(selectedFieldId, customHumidity, customSeverity)}
            title="Refresh Forecast Data"
            className="p-2 bg-white border border-stone-300 rounded-lg text-stone-600 hover:text-emerald-800 hover:border-emerald-700 transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin text-emerald-700' : ''}`} />
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white border border-stone-200 rounded-lg p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-emerald-700 border-t-transparent mb-3" />
          <p className="text-sm font-medium text-stone-800">Calculating rolling risk horizon...</p>
          <p className="text-xs text-stone-500 mt-1">Evaluating sequential observation logs and atmospheric moisture indicators</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-5 text-red-900 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold">Forecast Generation Error</h4>
            <p className="text-xs text-red-700 mt-1">{error}</p>
            <button
              onClick={() => loadForecastData(selectedFieldId)}
              className="mt-3 px-3 py-1.5 bg-white border border-red-300 text-xs font-medium text-red-800 rounded hover:bg-red-100"
            >
              Retry Calculation
            </button>
          </div>
        </div>
      )}

      {/* Success Content */}
      {forecast && !loading && !error && (
        <div className="space-y-6">
          {/* Top Field Overview Banner */}
          <div className="bg-white border border-stone-200 rounded-lg p-5 shadow-xs">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-xs">
              <div>
                <span className="text-stone-500 block">Farmer / Operator</span>
                <span className="text-stone-900 font-semibold text-sm">{activeField.farmerName}</span>
                <span className="text-stone-500 block text-[11px]">{activeField.village}</span>
              </div>
              <div>
                <span className="text-stone-500 block">Crop & Variety</span>
                <span className="text-stone-900 font-semibold text-sm">{activeField.crop}</span>
                <span className="text-stone-600 block text-[11px]">{activeField.variety}</span>
              </div>
              <div>
                <span className="text-stone-500 block">Phenological Stage</span>
                <span className="text-stone-900 font-semibold text-sm">{activeField.growthStage}</span>
                <span className="text-stone-500 block text-[11px]">{activeField.areaAcres} Acres</span>
              </div>
              <div>
                <span className="text-stone-500 block">Microclimate</span>
                <span className="text-stone-900 font-semibold text-sm">{forecast.weatherContext.temperature}, {forecast.weatherContext.humidity}</span>
                <span className="text-stone-500 block text-[11px]">Rel. Humidity</span>
              </div>
              <div>
                <span className="text-stone-500 block">Last Field Observation</span>
                <span className="text-stone-900 font-semibold text-sm">{activeField.lastMonitoringDate}</span>
                <span className="text-stone-500 block text-[11px]">Severity: {activeField.activeSeverity}%</span>
              </div>
            </div>
          </div>

          {/* Primary Forecast Summary Card */}
          <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-xs">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 pb-5 border-b border-stone-200">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">Overall Risk Assessment</span>
                  {getRiskBadge(forecast.overallRisk)}
                </div>
                <div className="text-3xl font-extrabold text-stone-900 mt-2 flex items-baseline gap-3">
                  <span>{forecast.overallRisk}</span>
                  <span className="text-sm font-normal text-stone-500">
                    Index Score: <strong className="text-stone-800">{forecast.score}/100</strong>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div>
                  <span className="text-xs text-stone-500 block">Trajectory</span>
                  <div className="flex items-center gap-1.5 font-medium mt-0.5">
                    {forecast.trendDirection === 'increasing' ? (
                      <span className="text-red-700 flex items-center gap-1 font-semibold">
                        <TrendingUp className="h-4 w-4" /> Escalating
                      </span>
                    ) : forecast.trendDirection === 'decreasing' ? (
                      <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                        <TrendingDown className="h-4 w-4" /> De-escalating
                      </span>
                    ) : (
                      <span className="text-stone-700 flex items-center gap-1 font-semibold">
                        <Minus className="h-4 w-4" /> Stable
                      </span>
                    )}
                  </div>
                </div>

                <div className="h-8 w-px bg-stone-200" />

                <div>
                  <span className="text-xs text-stone-500 block">Forecast Window</span>
                  <span className="font-semibold text-stone-800 mt-0.5 block">{forecast.forecastPeriod}</span>
                </div>
              </div>
            </div>

            {/* Key Sub-Risks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
              <div className="p-4 bg-stone-50 rounded-lg border border-stone-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider">Disease Risk</span>
                  {getSubRiskPill(forecast.componentRisks.diseaseRisk)}
                </div>
                <p className="text-base font-bold text-stone-900 mt-2">{activeField.diseaseStatus}</p>
                <p className="text-xs text-stone-500 mt-1">Based on foliar lesion progression and canopy density</p>
              </div>

              <div className="p-4 bg-stone-50 rounded-lg border border-stone-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider">Pest Pressure</span>
                  {getSubRiskPill(forecast.componentRisks.pestRisk)}
                </div>
                <p className="text-base font-bold text-stone-900 mt-2">{activeField.pestStatus}</p>
                <p className="text-xs text-stone-500 mt-1">Evaluated against Economic Threshold Level (ETL)</p>
              </div>

              <div className="p-4 bg-stone-50 rounded-lg border border-stone-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider">Crop Physiological Stress</span>
                  {getSubRiskPill(forecast.componentRisks.cropStress)}
                </div>
                <p className="text-base font-bold text-stone-900 mt-2">
                  {forecast.weatherContext.rainfallOutlook}
                </p>
                <p className="text-xs text-stone-500 mt-1">Soil moisture balance & leaf transpiration load</p>
              </div>
            </div>

            {/* Structured Explanation Statement */}
            <div className="mt-5 p-4 bg-amber-50/70 border border-amber-200/80 rounded-lg">
              <div className="flex items-start gap-2.5">
                <Info className="h-5 w-5 text-amber-800 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                    Why This Risk Level Exists
                  </h4>
                  <p className="text-sm font-medium text-stone-800 mt-1">
                    "{forecast.shortExplanation}"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contributing Risk Factors & Actionable Recommendation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contributing Factors */}
            <div className="bg-white border border-stone-200 rounded-lg p-5 shadow-xs">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3">
                Key Contributing Risk Factors
              </h3>
              <ul className="space-y-2.5 text-xs text-stone-700">
                {forecast.contributingFactors.map((factor, idx) => (
                  <li key={idx} className="flex items-start gap-2 p-2.5 bg-stone-50 rounded border border-stone-150">
                    <span className="h-5 w-5 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{factor}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 pt-3 border-t border-stone-150 text-xs text-stone-500">
                Factor scores are computed using phenological vulnerability curves combined with humidity and symptom progression.
              </div>
            </div>

            {/* Actionable Guidance Card */}
            <div className="bg-white border border-stone-200 rounded-lg p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                    Recommended Agronomic Action
                  </h3>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                    Action Window: {forecast.actionWindow}
                  </span>
                </div>

                <div className="p-3.5 bg-emerald-50/60 border border-emerald-200/80 rounded-lg">
                  <p className="text-xs font-semibold text-emerald-950 leading-relaxed">
                    {forecast.recommendedAction}
                  </p>
                </div>

                <div className="mt-4 space-y-2 text-xs text-stone-600">
                  <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                    <span>Field Officer Priority:</span>
                    <strong className="text-stone-900">{forecast.urgency} Action Required</strong>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                    <span>Target Next Observation Date:</span>
                    <strong className="text-stone-900">{forecast.nextObservationTarget}</strong>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-stone-200 flex items-center gap-3">
                <button
                  onClick={() => setActionScheduled(true)}
                  disabled={actionScheduled}
                  className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                    actionScheduled
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-emerald-800 hover:bg-emerald-900 text-white'
                  }`}
                >
                  {actionScheduled ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Follow-up Task Scheduled in Field Diary
                    </>
                  ) : (
                    <>
                      <Calendar className="h-4 w-4" />
                      Schedule Follow-up Inspection ({forecast.actionWindow})
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Simulation / What-If Parameters */}
          <div className="bg-stone-50 border border-stone-200 rounded-lg p-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Forecast Sensitivity Testing
                </h4>
                <p className="text-xs text-stone-500">
                  Adjust simulated environmental conditions to project how risk levels shift before actual field testing.
                </p>
              </div>
              {(customHumidity !== null || customSeverity !== null) && (
                <button
                  onClick={handleResetParameters}
                  className="text-xs text-emerald-800 hover:underline font-medium"
                >
                  Reset to Actual Data
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 pt-3 border-t border-stone-200 text-xs">
              <div>
                <div className="flex justify-between font-medium text-stone-700 mb-1">
                  <span>Relative Humidity:</span>
                  <span className="font-bold">{customHumidity !== null ? customHumidity : activeField.humidity}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="98"
                  value={customHumidity !== null ? customHumidity : activeField.humidity}
                  onChange={(e) => setCustomHumidity(Number(e.target.value))}
                  className="w-full accent-emerald-800 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-medium text-stone-700 mb-1">
                  <span>Simulated Foliar Severity:</span>
                  <span className="font-bold">{customSeverity !== null ? customSeverity : activeField.activeSeverity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60"
                  value={customSeverity !== null ? customSeverity : activeField.activeSeverity}
                  onChange={(e) => setCustomSeverity(Number(e.target.value))}
                  className="w-full accent-emerald-800 cursor-pointer"
                />
              </div>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                onClick={handleParameterUpdate}
                className="px-3 py-1.5 bg-stone-800 text-white rounded text-xs font-medium hover:bg-stone-900 transition-colors"
              >
                Re-calculate Scenario
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
