/**
 * CROVYSURE Crop Intelligence Service
 * 
 * Provides risk forecasting, weekly observation comparison,
 * and follow-up recommendation generation.
 * 
 * NOTE: Currently structured with deterministic agricultural domain logic.
 * Designed to be replaced by backend ML / API service endpoints in production.
 */

// Believable registered fields across Maharashtra agricultural zones
export const DEFAULT_FIELDS = [
  {
    id: 'FLD-MH-01',
    name: 'North Field (Plot 2A)',
    farmerName: 'Ramesh Patil',
    village: 'Niphad, Nashik District',
    crop: 'Rice (Paddy)',
    variety: 'Indrayani',
    sowingDate: '2026-06-25',
    growthStage: 'Tillering',
    soilType: 'Clay Loam',
    irrigationType: 'Canal Irrigated',
    areaAcres: 3.5,
    lastMonitoringDate: '2026-09-18',
    currentHealth: 'Moderate',
    diseaseStatus: 'Leaf Blast Detected',
    pestStatus: 'Stem Borer (Minor)',
    activeSeverity: 18,
    previousSeverity: 12,
    riskLevel: 'MODERATE',
    humidity: 84,
    temperature: '28°C',
    rainfallRisk: 'Moderate rainfall expected in 48h',
    monitoringHistory: [
      {
        cycleWeek: 1,
        date: '2026-09-04',
        image: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=800&auto=format&fit=crop&q=80',
        stage: 'Seedling / Early Vegetative',
        healthStatus: 'Good',
        diseaseStatus: 'None detected',
        pestStatus: 'None',
        severity: 4,
        notes: 'Uniform seedling emergence. Standard water level maintained.'
      },
      {
        cycleWeek: 2,
        date: '2026-09-11',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80',
        stage: 'Active Tillering',
        healthStatus: 'Good',
        diseaseStatus: 'Isolated leaf lesions observed',
        pestStatus: 'None',
        severity: 12,
        notes: 'Early spindle-shaped lesions observed on lower leaves. Humid microclimate.'
      },
      {
        cycleWeek: 3,
        date: '2026-09-18',
        image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&auto=format&fit=crop&q=80',
        stage: 'Late Tillering / Panicle Initiation',
        healthStatus: 'Moderate',
        diseaseStatus: 'Leaf Blast (Pyricularia oryzae)',
        pestStatus: 'Stem Borer (Minor egg masses)',
        severity: 18,
        notes: 'Lesion count increased on upper leaves following 3 days of overcast weather.'
      }
    ]
  },
  {
    id: 'FLD-MH-02',
    name: 'East Canal Sector (Plot 4B)',
    farmerName: 'Suresh Yadav',
    village: 'Sinnar, Nashik District',
    crop: 'Cotton',
    variety: 'Bt Cotton RCH-2',
    sowingDate: '2026-06-10',
    growthStage: 'Square Formation',
    soilType: 'Black Cotton Soil',
    irrigationType: 'Drip Irrigated',
    areaAcres: 5.0,
    lastMonitoringDate: '2026-09-17',
    currentHealth: 'High Risk',
    diseaseStatus: 'Bacterial Blight',
    pestStatus: 'Whitefly Infestation',
    activeSeverity: 34,
    previousSeverity: 20,
    riskLevel: 'HIGH',
    humidity: 78,
    temperature: '31°C',
    rainfallRisk: 'Dry spell favoring pest multiplication',
    monitoringHistory: [
      {
        cycleWeek: 1,
        date: '2026-09-03',
        image: 'https://images.unsplash.com/photo-1594488507851-9310c8121655?w=800&auto=format&fit=crop&q=80',
        stage: 'Vegetative',
        healthStatus: 'Good',
        diseaseStatus: 'None',
        pestStatus: 'Low aphid count',
        severity: 8,
        notes: 'Vigorous vegetative growth.'
      },
      {
        cycleWeek: 2,
        date: '2026-09-10',
        image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&auto=format&fit=crop&q=80',
        stage: 'Early Squaring',
        healthStatus: 'Moderate',
        diseaseStatus: 'Angular leaf spots',
        pestStatus: 'Whitefly nymphs detected',
        severity: 20,
        notes: 'Water-soaked angular spots visible under leaf surface.'
      },
      {
        cycleWeek: 3,
        date: '2026-09-17',
        image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&auto=format&fit=crop&q=80',
        stage: 'Peak Squaring',
        healthStatus: 'High Risk',
        diseaseStatus: 'Bacterial Blight (Xanthomonas)',
        pestStatus: 'Whitefly nymph density above ETL threshold',
        severity: 34,
        notes: 'Foliar blight advancing. Square shedding observed in 12% of inspected plants.'
      }
    ]
  },
  {
    id: 'FLD-MH-03',
    name: 'Ridge Plot (Block 1C)',
    farmerName: 'Anita Shinde',
    village: 'Dindori, Nashik District',
    crop: 'Soybean',
    variety: 'JS-335',
    sowingDate: '2026-07-02',
    growthStage: 'Pod Development',
    soilType: 'Medium Loam',
    irrigationType: 'Rainfed',
    areaAcres: 2.8,
    lastMonitoringDate: '2026-09-19',
    currentHealth: 'Good',
    diseaseStatus: 'No active pathology',
    pestStatus: 'Occasional Spodoptera',
    activeSeverity: 6,
    previousSeverity: 8,
    riskLevel: 'LOW',
    humidity: 68,
    temperature: '26°C',
    rainfallRisk: 'Adequate soil moisture',
    monitoringHistory: [
      {
        cycleWeek: 1,
        date: '2026-09-05',
        image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=800&auto=format&fit=crop&q=80',
        stage: 'Flowering',
        healthStatus: 'Good',
        diseaseStatus: 'None',
        pestStatus: 'Trace defoliation',
        severity: 9,
        notes: 'Healthy flower canopy.'
      },
      {
        cycleWeek: 2,
        date: '2026-09-12',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80',
        stage: 'Early Pod Formation',
        healthStatus: 'Good',
        diseaseStatus: 'None',
        pestStatus: 'Negligible pest count',
        severity: 8,
        notes: 'Good pod setting. Inter-row clean.'
      },
      {
        cycleWeek: 3,
        date: '2026-09-19',
        image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&auto=format&fit=crop&q=80',
        stage: 'Pod Filling',
        healthStatus: 'Good',
        diseaseStatus: 'Clean foliage',
        pestStatus: 'Under control',
        severity: 6,
        notes: 'Pods filling uniformly. Canopy intact with healthy chlorophyl index.'
      }
    ]
  }
]

/**
 * Calculates a structured 7-day risk forecast based on field parameters,
 * crop growth stage, and sequential observation history.
 */
export function calculateRiskForecast({
  fieldId,
  fieldData,
  customSeverity = null,
  customHumidity = null
} = {}) {
  const field = fieldData || DEFAULT_FIELDS.find(f => f.id === fieldId) || DEFAULT_FIELDS[0]
  const severity = customSeverity !== null ? Number(customSeverity) : field.activeSeverity
  const humidity = customHumidity !== null ? Number(customHumidity) : field.humidity

  // Quantitative risk scoring
  let score = 0
  score += severity * 1.4 // Severity weight
  if (humidity > 80) score += 20
  else if (humidity > 70) score += 10

  if (field.growthStage.includes('Tillering') || field.growthStage.includes('Flowering') || field.growthStage.includes('Squaring')) {
    score += 12 // High vulnerability phenological stages
  }

  const previousSeverity = field.previousSeverity || severity
  const severityDelta = severity - previousSeverity
  if (severityDelta > 5) score += 15
  else if (severityDelta > 0) score += 5
  else score -= 5

  // Determine categorical levels
  let overallRisk = 'LOW'
  let riskColor = 'green'
  let trendDirection = 'stable'
  let trendLabel = 'Stable'

  if (score >= 55) {
    overallRisk = 'HIGH'
    riskColor = 'red'
  } else if (score >= 30) {
    overallRisk = 'MODERATE'
    riskColor = 'amber'
  }

  if (severityDelta > 2) {
    trendDirection = 'increasing'
    trendLabel = 'Increasing'
  } else if (severityDelta < -2) {
    trendDirection = 'decreasing'
    trendLabel = 'Decreasing'
  }

  // Component breakdown
  let diseaseRisk = 'Low'
  let pestRisk = 'Low'
  let cropStress = 'Low'

  if (overallRisk === 'HIGH') {
    diseaseRisk = severity > 25 ? 'High' : 'Moderate'
    pestRisk = field.pestStatus.toLowerCase().includes('infestation') || field.pestStatus.toLowerCase().includes('density') ? 'High' : 'Moderate'
    cropStress = humidity > 80 || humidity < 50 ? 'High' : 'Moderate'
  } else if (overallRisk === 'MODERATE') {
    diseaseRisk = 'Moderate'
    pestRisk = field.pestStatus !== 'None' ? 'Moderate' : 'Low'
    cropStress = 'Moderate'
  }

  // Contributing factors & explanations
  const contributingFactors = []
  if (severityDelta > 0) {
    contributingFactors.push(`Symptom severity increased from ${previousSeverity}% to ${severity}% over the preceding 7 days.`)
  } else if (severityDelta < 0) {
    contributingFactors.push(`Symptom severity improved by ${Math.abs(severityDelta)}% following field intervention.`)
  } else {
    contributingFactors.push(`Symptom severity stabilized at ${severity}%.`)
  }

  if (humidity >= 80) {
    contributingFactors.push(`High relative humidity (${humidity}%) creates prolonged leaf wetness favoring fungal spore germination.`)
  } else {
    contributingFactors.push(`Relative humidity (${humidity}%) remains within typical parameters for this agro-climatic zone.`)
  }

  contributingFactors.push(`Current phenological stage (${field.growthStage}) exhibits heightened susceptibility to foliar stress.`)

  let shortExplanation = ''
  let recommendedAction = ''
  let urgency = 'Standard'
  let actionWindow = 'Next 7 days'

  if (overallRisk === 'HIGH') {
    urgency = 'Immediate'
    actionWindow = 'Next 48–72 hours'
    shortExplanation = `Risk has significantly escalated compared with the previous monitoring cycle due to rapid pathogen advancement and favorable microclimatic conditions.`
    recommendedAction = `Deploy targeted protective fungicide/insecticide spray immediately, check irrigation drainage to prevent leaf wetness persistence, and schedule verification inspection within 3 days.`
  } else if (overallRisk === 'MODERATE') {
    urgency = 'Priority'
    actionWindow = 'Next 3–4 days'
    shortExplanation = `Risk has increased compared with the previous monitoring cycle. Early signs of disease/pest activity require proactive containment.`
    recommendedAction = `Inspect affected field sections within 3–4 days, ensure field border sanitization, avoid excessive nitrogen top-dressing, and upload follow-up observation image.`
  } else {
    urgency = 'Routine'
    actionWindow = 'Next 7–10 days'
    shortExplanation = `Crop health indicators are stable. No immediate epidemic thresholds breached.`
    recommendedAction = `Maintain standard fertilizer schedule and record next regular weekly monitoring observation as planned.`
  }

  return {
    fieldId: field.id,
    fieldName: field.name,
    crop: field.crop,
    variety: field.variety,
    growthStage: field.growthStage,
    overallRisk,
    riskColor,
    score: Math.min(100, Math.max(0, Math.round(score))),
    trendDirection,
    trendLabel,
    forecastPeriod: '7-Day Rolling Horizon (Sep 20–27, 2026)',
    componentRisks: {
      diseaseRisk,
      pestRisk,
      cropStress
    },
    shortExplanation,
    contributingFactors,
    recommendedAction,
    urgency,
    actionWindow,
    nextObservationTarget: '2026-09-25',
    weatherContext: {
      temperature: field.temperature,
      humidity: `${humidity}%`,
      rainfallOutlook: field.rainfallRisk
    }
  }
}

/**
 * Compares two consecutive monitoring records (previous vs current)
 * and calculates exact deltas for severity, health transition, and disease presence.
 */
export function compareMonitoringRecords(previousRecord, currentRecord) {
  if (!previousRecord || !currentRecord) {
    return null
  }

  const prevSev = Number(previousRecord.severity || 0)
  const currSev = Number(currentRecord.severity || 0)
  const severityDelta = currSev - prevSev

  let severityTrend = 'stable'
  if (severityDelta > 0) severityTrend = 'increased'
  else if (severityDelta < 0) severityTrend = 'decreased'

  const healthChanged = previousRecord.healthStatus !== currentRecord.healthStatus

  let conditionSummary = ''
  if (severityTrend === 'increased') {
    conditionSummary = `Disease severity expanded from ${prevSev}% to ${currSev}%. Crop condition transitioned from ${previousRecord.healthStatus} to ${currentRecord.healthStatus}.`
  } else if (severityTrend === 'decreased') {
    conditionSummary = `Symptom severity contracted from ${prevSev}% to ${currSev}%. Crop health improved from ${previousRecord.healthStatus} to ${currentRecord.healthStatus}.`
  } else {
    conditionSummary = `Symptom severity remained stable at ${currSev}%. Crop health maintained at ${currentRecord.healthStatus}.`
  }

  return {
    previousDate: previousRecord.date,
    currentDate: currentRecord.date,
    previousStage: previousRecord.stage,
    currentStage: currentRecord.stage,
    previousHealth: previousRecord.healthStatus,
    currentHealth: currentRecord.healthStatus,
    previousDisease: previousRecord.diseaseStatus,
    currentDisease: currentRecord.diseaseStatus,
    previousPest: previousRecord.pestStatus || 'None',
    currentPest: currentRecord.pestStatus || 'None',
    previousSeverity: prevSev,
    currentSeverity: currSev,
    severityDelta,
    severityTrend,
    healthChanged,
    conditionSummary
  }
}

/**
 * Generates actionable follow-up recommendations and schedules
 * based on the monitoring comparison outcome.
 */
export function generateFollowUpRecommendation(comparison) {
  if (!comparison) {
    return {
      recommendation: 'Maintain regular field observations.',
      nextMonitoringIntervalDays: 7,
      nextMonitoringDate: '2026-09-25',
      requiredAction: 'Routine weekly imaging'
    }
  }

  const { currentSeverity, severityDelta, currentHealth } = comparison

  if (currentSeverity >= 30 || currentHealth === 'High Risk' || severityDelta >= 10) {
    return {
      urgency: 'High',
      recommendation: 'High disease escalation observed. Initiate targeted curative agronomic protocol and restrict field movement to prevent spore dispersal.',
      nextMonitoringIntervalDays: 3,
      nextMonitoringDate: '2026-09-21',
      requiredAction: 'Intensive 72-hour re-evaluation and verification upload',
      preventiveSteps: [
        'Apply recommended systemic fungicide / bactericide spray under dry leaf conditions.',
        'Suspend nitrogenous fertilizer top dressing immediately.',
        'Inspect surrounding boundary plots for symptom spillover.',
        'Upload follow-up verification photograph in 3 days.'
      ]
    }
  }

  if (currentSeverity >= 15 || severityDelta > 0 || currentHealth === 'Moderate') {
    return {
      urgency: 'Moderate',
      recommendation: 'Active symptoms detected with upward progression. Monitor canopy density and apply preventative spray if humid conditions persist.',
      nextMonitoringIntervalDays: 5,
      nextMonitoringDate: '2026-09-23',
      requiredAction: 'Mid-week follow-up field assessment',
      preventiveSteps: [
        'Clear stagnant standing water if drainage is obstructed.',
        'Monitor underside of leaves across 10 random sampling points.',
        'Ensure next field photo captures affected leaf cluster in clear daylight.',
        'Record next observation within 5 days.'
      ]
    }
  }

  return {
    urgency: 'Low',
    recommendation: 'Crop health is well stabilized within acceptable parameters. Continue standard crop care and nutrition.',
    nextMonitoringIntervalDays: 7,
    nextMonitoringDate: '2026-09-25',
    requiredAction: 'Routine weekly monitoring cycle',
    preventiveSteps: [
      'Maintain balanced irrigation schedule.',
      'Conduct routine peripheral weed check.',
      'Upload regular weekly observation on scheduled date.'
    ]
  }
}
