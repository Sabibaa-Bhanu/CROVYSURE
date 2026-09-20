import React, { useState, useEffect } from 'react'
import {
  Activity,
  Calendar,
  Camera,
  Upload,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  ChevronRight,
  RefreshCw,
  Plus,
  Eye,
  FileCheck,
  Sprout,
  Info
} from 'lucide-react'
import {
  DEFAULT_FIELDS,
  compareMonitoringRecords,
  generateFollowUpRecommendation
} from '../../services/cropIntelligence'

export default function FollowUpMonitoring() {
  const [fields, setFields] = useState(DEFAULT_FIELDS)
  const [selectedFieldId, setSelectedFieldId] = useState(DEFAULT_FIELDS[0].id)
  const [activeField, setActiveField] = useState(DEFAULT_FIELDS[0])

  // New observation upload state
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [newImagePreview, setNewImagePreview] = useState(null)
  const [newImageFile, setNewImageFile] = useState(null)
  const [observationDate, setObservationDate] = useState('2026-09-20')
  const [observationStage, setObservationStage] = useState('Late Tillering / Panicle Initiation')
  const [observationHealth, setObservationHealth] = useState('Moderate')
  const [observationDisease, setObservationDisease] = useState('Leaf Blast (Active lesions)')
  const [observationPest, setObservationPest] = useState('Stem Borer (Minor)')
  const [observationSeverity, setObservationSeverity] = useState(22)
  const [observationNotes, setObservationNotes] = useState('Spreading lesion centers noted on leaf tips.')

  const [analyzing, setAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [activeComparison, setActiveComparison] = useState(null)
  const [activeRecommendation, setActiveRecommendation] = useState(null)
  const [scheduleSuccess, setScheduleSuccess] = useState(false)

  // Sync activeField when selectedFieldId changes
  useEffect(() => {
    const field = fields.find(f => f.id === selectedFieldId) || fields[0]
    setActiveField(field)
    setScheduleSuccess(false)

    // Compute initial comparison between last two records in history
    if (field && field.monitoringHistory.length >= 2) {
      const history = field.monitoringHistory
      const prev = history[history.length - 2]
      const curr = history[history.length - 1]
      const comp = compareMonitoringRecords(prev, curr)
      setActiveComparison(comp)
      setActiveRecommendation(generateFollowUpRecommendation(comp))
    } else {
      setActiveComparison(null)
      setActiveRecommendation(null)
    }
  }, [selectedFieldId, fields])

  const handleFieldChange = (e) => {
    setSelectedFieldId(e.target.value)
  }

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewImageFile(file)
      const previewUrl = URL.createObjectURL(file)
      setNewImagePreview(previewUrl)
    }
  }

  const handleAnalyzeNewObservation = () => {
    setAnalyzing(true)

    setTimeout(() => {
      const history = activeField.monitoringHistory
      const previousRecord = history[history.length - 1]

      const newRecord = {
        cycleWeek: history.length + 1,
        date: observationDate,
        image: newImagePreview || 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&auto=format&fit=crop&q=80',
        stage: observationStage,
        healthStatus: observationHealth,
        diseaseStatus: observationDisease,
        pestStatus: observationPest,
        severity: Number(observationSeverity),
        notes: observationNotes || 'Field observation logged via monitoring portal.'
      }

      // Compute comparison with previous record
      const comp = compareMonitoringRecords(previousRecord, newRecord)
      const rec = generateFollowUpRecommendation(comp)

      // Add to field history
      const updatedFields = fields.map(f => {
        if (f.id === activeField.id) {
          return {
            ...f,
            activeSeverity: Number(observationSeverity),
            previousSeverity: previousRecord.severity,
            currentHealth: observationHealth,
            diseaseStatus: observationDisease,
            lastMonitoringDate: observationDate,
            monitoringHistory: [...f.monitoringHistory, newRecord]
          }
        }
        return f
      })

      setFields(updatedFields)
      setActiveComparison(comp)
      setActiveRecommendation(rec)
      setAnalyzing(false)
      setAnalysisComplete(true)
      setShowUploadModal(false)
    }, 600)
  }

  const handleScheduleAction = () => {
    setScheduleSuccess(true)
  }

  const getHealthBadge = (health) => {
    switch (health) {
      case 'Good':
        return <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800">Good</span>
      case 'Moderate':
        return <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-800">Moderate</span>
      default:
        return <span className="px-2 py-0.5 rounded text-xs font-semibold bg-red-100 text-red-800">High Risk</span>
    }
  }

  const history = activeField?.monitoringHistory || []
  const previousRecord = history.length >= 2 ? history[history.length - 2] : null
  const currentRecord = history.length >= 1 ? history[history.length - 1] : null

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wider text-emerald-800 uppercase bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              Temporal Surveillance
            </span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 mt-1">
            Follow-up Monitoring
          </h1>
          <p className="text-sm text-stone-600 mt-0.5">
            Compare sequential weekly field observations to quantify disease progression, severity shifts, and required interventions.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedFieldId}
            onChange={handleFieldChange}
            className="w-full sm:w-64 px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-700"
          >
            {fields.map(f => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.crop})
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors shadow-xs"
          >
            <Plus className="h-4 w-4" />
            Add Weekly Observation
          </button>
        </div>
      </div>

      {/* Field Snapshot Bar */}
      <div className="bg-white border border-stone-200 rounded-lg p-4 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-xs">
          <div>
            <span className="text-stone-500 block">Monitored Plot</span>
            <span className="text-stone-900 font-bold text-sm">{activeField.name}</span>
            <span className="text-stone-500 block text-[11px]">{activeField.village}</span>
          </div>
          <div>
            <span className="text-stone-500 block">Crop / Variety</span>
            <span className="text-stone-900 font-semibold text-sm">{activeField.crop}</span>
            <span className="text-stone-600 block text-[11px]">{activeField.variety}</span>
          </div>
          <div>
            <span className="text-stone-500 block">Current Health</span>
            <div className="mt-1">{getHealthBadge(activeField.currentHealth)}</div>
          </div>
          <div>
            <span className="text-stone-500 block">Latest Disease Severity</span>
            <span className="text-stone-900 font-bold text-sm">{activeField.activeSeverity}%</span>
            <span className="text-stone-500 block text-[11px]">Last cycle: {activeField.previousSeverity}%</span>
          </div>
          <div>
            <span className="text-stone-500 block">Last Field Observation</span>
            <span className="text-stone-900 font-semibold text-sm">{activeField.lastMonitoringDate}</span>
            <span className="text-stone-500 block text-[11px]">{history.length} records logged</span>
          </div>
        </div>
      </div>

      {/* Section 1: Side-by-Side Comparison ("What changed since the last monitoring?") */}
      {activeComparison && previousRecord && currentRecord && (
        <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 mb-4 border-b border-stone-200">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Comparative Analysis
              </span>
              <h2 className="text-lg font-bold text-stone-900 mt-0.5">
                What Changed Since Last Monitoring?
              </h2>
            </div>

            <div className="text-xs text-stone-500">
              Comparing <strong>{previousRecord.date}</strong> to <strong>{currentRecord.date}</strong> (7-Day Cycle)
            </div>
          </div>

          {/* Change Summary Metric Strips */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Severity Delta */}
            <div className="p-4 bg-stone-50 rounded-lg border border-stone-200">
              <span className="text-xs font-medium text-stone-500 block">Disease Severity Shift</span>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-xl font-bold text-stone-800">
                  {activeComparison.previousSeverity}% → {activeComparison.currentSeverity}%
                </span>
                {activeComparison.severityDelta > 0 ? (
                  <span className="inline-flex items-center gap-0.5 text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                    <TrendingUp className="h-3.5 w-3.5" /> +{activeComparison.severityDelta}%
                  </span>
                ) : activeComparison.severityDelta < 0 ? (
                  <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    <TrendingDown className="h-3.5 w-3.5" /> {activeComparison.severityDelta}%
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-0.5 text-xs font-bold text-stone-700 bg-stone-200 px-2 py-0.5 rounded">
                    <Minus className="h-3.5 w-3.5" /> 0%
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-500 mt-1">
                {activeComparison.severityDelta > 0
                  ? 'Foliar infection zone expanded over previous cycle'
                  : 'Symptom expansion remained contained'}
              </p>
            </div>

            {/* Health Transition */}
            <div className="p-4 bg-stone-50 rounded-lg border border-stone-200">
              <span className="text-xs font-medium text-stone-500 block">Crop Health Status</span>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-sm font-semibold text-stone-700">{activeComparison.previousHealth}</span>
                <ArrowRight className="h-4 w-4 text-stone-400" />
                <span className="text-sm font-bold text-stone-900">{activeComparison.currentHealth}</span>
              </div>
              <p className="text-[11px] text-stone-500 mt-2">
                {activeComparison.healthChanged
                  ? 'Condition shifted category requiring adjusted response'
                  : 'Health classification maintained'}
              </p>
            </div>

            {/* Pathogen / Pest Status */}
            <div className="p-4 bg-stone-50 rounded-lg border border-stone-200">
              <span className="text-xs font-medium text-stone-500 block">Pest & Pathogen Evidence</span>
              <div className="text-xs font-bold text-stone-900 mt-1.5">
                {activeComparison.currentDisease}
              </div>
              <div className="text-[11px] text-stone-600 mt-0.5">
                Pest signs: {activeComparison.currentPest}
              </div>
            </div>
          </div>

          {/* Visual Side-by-Side Images & Observations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-stone-50/80 rounded-lg border border-stone-200">
            {/* Previous Cycle Observation */}
            <div className="bg-white p-4 rounded-lg border border-stone-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Previous Observation
                </span>
                <span className="text-xs text-stone-600 font-medium flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-stone-400" /> {previousRecord.date}
                </span>
              </div>

              <div className="relative rounded-lg overflow-hidden bg-stone-100 aspect-16/10 mb-3 border border-stone-200">
                <img
                  src={previousRecord.image}
                  alt={`Observation ${previousRecord.date}`}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[11px] font-semibold bg-stone-900/70 text-white backdrop-blur-xs">
                  Week {previousRecord.cycleWeek}
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Growth Stage:</span>
                  <span className="font-medium text-stone-800">{previousRecord.stage}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Crop Health:</span>
                  <span>{getHealthBadge(previousRecord.healthStatus)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Identified Disease:</span>
                  <span className="font-medium text-stone-800">{previousRecord.diseaseStatus}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Observed Severity:</span>
                  <span className="font-bold text-stone-900">{previousRecord.severity}%</span>
                </div>
                <p className="text-[11px] text-stone-600 pt-1 italic">
                  "{previousRecord.notes}"
                </p>
              </div>
            </div>

            {/* Current Cycle Observation */}
            <div className="bg-white p-4 rounded-lg border-2 border-emerald-700/60 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                  Current Observation (Latest)
                </span>
                <span className="text-xs text-stone-800 font-bold flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-emerald-700" /> {currentRecord.date}
                </span>
              </div>

              <div className="relative rounded-lg overflow-hidden bg-stone-100 aspect-16/10 mb-3 border border-stone-200">
                <img
                  src={currentRecord.image}
                  alt={`Observation ${currentRecord.date}`}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-800 text-white">
                  Week {currentRecord.cycleWeek} (Current)
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Growth Stage:</span>
                  <span className="font-medium text-stone-800">{currentRecord.stage}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Crop Health:</span>
                  <span>{getHealthBadge(currentRecord.healthStatus)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Identified Disease:</span>
                  <span className="font-medium text-stone-800">{currentRecord.diseaseStatus}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Observed Severity:</span>
                  <span className="font-bold text-stone-900">{currentRecord.severity}%</span>
                </div>
                <p className="text-[11px] text-stone-600 pt-1 italic">
                  "{currentRecord.notes}"
                </p>
              </div>
            </div>
          </div>

          {/* Follow-up Recommendation & Action Scheduling */}
          {activeRecommendation && (
            <div className="mt-6 p-5 bg-stone-50 rounded-lg border border-stone-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 pb-3 border-b border-stone-200">
                <div>
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                    Prescribed Agronomic Follow-up
                  </span>
                  <h4 className="text-sm font-bold text-stone-900 mt-0.5">
                    {activeRecommendation.requiredAction}
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-600">Next Scheduled Field Inspection:</span>
                  <span className="px-2.5 py-1 bg-white border border-stone-300 rounded font-bold text-xs text-stone-900">
                    {activeRecommendation.nextMonitoringDate}
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-700 mt-3 leading-relaxed font-medium">
                {activeRecommendation.recommendation}
              </p>

              {activeRecommendation.preventiveSteps && (
                <div className="mt-3">
                  <span className="text-[11px] font-semibold text-stone-600 uppercase block mb-1.5">
                    Recommended Action Steps:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                    {activeRecommendation.preventiveSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-white p-2 rounded border border-stone-200">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700 flex-shrink-0 mt-0.5" />
                        <span className="text-[11px]">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-stone-200 flex justify-end">
                <button
                  onClick={handleScheduleAction}
                  disabled={scheduleSuccess}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
                    scheduleSuccess
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-stone-800 hover:bg-stone-900 text-white'
                  }`}
                >
                  {scheduleSuccess ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                      Follow-up Inspection Confirmed for {activeRecommendation.nextMonitoringDate}
                    </>
                  ) : (
                    <>
                      <Calendar className="h-4 w-4" />
                      Confirm & Schedule Follow-up ({activeRecommendation.nextMonitoringDate})
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Section 2: Sequential Monitoring Timeline */}
      <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-xs">
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-stone-200">
          <div>
            <h2 className="text-lg font-bold text-stone-900">
              Monitoring Progression Timeline
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Weekly historical records tracking crop health trajectory from initial emergence to current cycle.
            </p>
          </div>
          <span className="text-xs font-medium text-stone-600 bg-stone-100 px-2.5 py-1 rounded">
            {history.length} Observations Recorded
          </span>
        </div>

        <div className="relative border-l-2 border-stone-200 ml-4 pl-6 space-y-8">
          {history.map((record, index) => {
            const isLatest = index === history.length - 1
            return (
              <div key={index} className="relative group">
                {/* Timeline Node */}
                <div
                  className={`absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 ${
                    isLatest
                      ? 'bg-emerald-600 border-white ring-4 ring-emerald-100'
                      : 'bg-stone-400 border-white'
                  }`}
                />

                <div className={`p-4 rounded-lg border ${
                  isLatest ? 'bg-emerald-50/30 border-emerald-300' : 'bg-white border-stone-200'
                }`}>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-stone-900">
                        Week {record.cycleWeek} Field Observation
                      </span>
                      {isLatest && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-emerald-800 text-white rounded">
                          Current Cycle
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-stone-500 font-medium">
                      Date: <strong>{record.date}</strong>
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-44 h-28 rounded-md overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200">
                      <img
                        src={record.image}
                        alt={`Observation week ${record.cycleWeek}`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 space-y-1.5 text-xs">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pb-2 border-b border-stone-150">
                        <div>
                          <span className="text-stone-500 block text-[11px]">Growth Stage</span>
                          <span className="font-semibold text-stone-800">{record.stage}</span>
                        </div>
                        <div>
                          <span className="text-stone-500 block text-[11px]">Crop Health</span>
                          <span className="mt-0.5 block">{getHealthBadge(record.healthStatus)}</span>
                        </div>
                        <div>
                          <span className="text-stone-500 block text-[11px]">Severity Index</span>
                          <span className="font-bold text-stone-900">{record.severity}%</span>
                        </div>
                        <div>
                          <span className="text-stone-500 block text-[11px]">Pathology</span>
                          <span className="font-medium text-stone-800 truncate block">{record.diseaseStatus}</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-stone-600 pt-1">
                        <strong>Field Notes:</strong> {record.notes}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Upload Weekly Observation Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-stone-300 max-w-xl w-full p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-stone-200">
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  Add Weekly Field Observation
                </h3>
                <p className="text-xs text-stone-500">
                  Target field: {activeField.name} ({activeField.crop})
                </p>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-stone-400 hover:text-stone-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {/* Image Upload Area */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Upload Crop Canopy Photograph (JPG / PNG)
                </label>
                <div className="border-2 border-dashed border-stone-300 rounded-lg p-4 text-center hover:border-emerald-600 transition-colors bg-stone-50">
                  {newImagePreview ? (
                    <div className="space-y-2">
                      <div className="h-40 max-w-xs mx-auto rounded overflow-hidden">
                        <img
                          src={newImagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs text-stone-600">
                        {newImageFile?.name || 'Image uploaded successfully'}
                      </p>
                      <label className="inline-block text-xs font-semibold text-emerald-800 cursor-pointer hover:underline">
                        Change photograph
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageSelect}
                          className="hidden"
                        />
                      </label>
                    </div>
                  ) : (
                    <div>
                      <Camera className="h-8 w-8 text-stone-400 mx-auto mb-2" />
                      <p className="text-xs text-stone-700 font-medium">
                        Click to select or drag and drop field image
                      </p>
                      <p className="text-[11px] text-stone-500 mt-1">
                        High-resolution foliage close-up recommended for accurate symptom comparison
                      </p>
                      <label className="mt-3 inline-block px-3 py-1.5 bg-white border border-stone-300 rounded text-xs font-semibold text-stone-800 cursor-pointer hover:bg-stone-100">
                        Select Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageSelect}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Observation Parameters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    Observation Date
                  </label>
                  <input
                    type="date"
                    value={observationDate}
                    onChange={(e) => setObservationDate(e.target.value)}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded bg-white text-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    Growth Stage
                  </label>
                  <select
                    value={observationStage}
                    onChange={(e) => setObservationStage(e.target.value)}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded bg-white text-stone-900"
                  >
                    <option value="Seedling / Vegetative">Seedling / Vegetative</option>
                    <option value="Active Tillering">Active Tillering</option>
                    <option value="Late Tillering / Panicle Initiation">Late Tillering / Panicle Initiation</option>
                    <option value="Flowering / Anthesis">Flowering / Anthesis</option>
                    <option value="Grain Filling / Pod Development">Grain Filling / Pod Development</option>
                    <option value="Maturity">Maturity</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    Foliar Condition / Health
                  </label>
                  <select
                    value={observationHealth}
                    onChange={(e) => setObservationHealth(e.target.value)}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded bg-white text-stone-900"
                  >
                    <option value="Good">Good (Healthy canopy)</option>
                    <option value="Moderate">Moderate (Mild foliar lesions)</option>
                    <option value="High Risk">High Risk (Severe spreading pathology)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    Estimated Symptom Severity (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={observationSeverity}
                    onChange={(e) => setObservationSeverity(e.target.value)}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded bg-white text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Field Pathology / Pest Detection Notes
                </label>
                <input
                  type="text"
                  value={observationDisease}
                  onChange={(e) => setObservationDisease(e.target.value)}
                  placeholder="e.g. Leaf Blast lesions detected on upper leaves"
                  className="w-full px-3 py-1.5 border border-stone-300 rounded text-xs bg-white text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Officer Inspection Notes
                </label>
                <textarea
                  rows="2"
                  value={observationNotes}
                  onChange={(e) => setObservationNotes(e.target.value)}
                  placeholder="Add specific comments regarding weather conditions, irrigation, or fertilizer application..."
                  className="w-full px-3 py-1.5 border border-stone-300 rounded text-xs bg-white text-stone-900"
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 flex justify-end gap-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-3 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
              >
                Cancel
              </button>

              <button
                onClick={handleAnalyzeNewObservation}
                disabled={analyzing}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded text-xs font-semibold flex items-center gap-2"
              >
                {analyzing ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    Analyzing Observation & Calculating Deltas...
                  </>
                ) : (
                  <>
                    <FileCheck className="h-3.5 w-3.5" />
                    Analyze & Record Observation
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
