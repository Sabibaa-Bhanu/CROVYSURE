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


/* ============================================================
   MODEL D — PEST CLASS CONFIGURATION
   Single source of truth for all active Model D pest classes.

   Dataset summary:
     Corn    — 6 classes
     Cotton  — 3 classes  (Cotton_Leafworm & Cotton_Thrips excluded: 0 images)
     Paddy   — 9 classes
     Wheat   — 6 classes
     TOTAL   — 24 active classes

   NOTE: Class identifiers use the exact dataset folder names (underscore
   format). The UI converts these to human-readable strings via
   formatPestName(). Do NOT alter the identifiers here — they must match
   the ML model output exactly so the frontend works without changes once
   the real inference endpoint is connected.
============================================================ */

export const PEST_CLASSES = {
  Corn: [
    'Aphid',
    'Army_Worm',
    'Corn_Borer',
    'Fall_Armyworm',
    'Peach_Borer',
    'Potosiabre_vitarsis',
  ],
  Cotton: [
    // Cotton_Leafworm and Cotton_Thrips are excluded — zero images in dataset
    'Aphid',
    'Cotton_Bollworm',
    'Cotton_Whitefly',
  ],
  Paddy: [
    'Brown_Plant_Hopper',
    'Leaf_Folder',
    'Paddy_Stem_Maggot',
    'Rice_Gall_Midge',
    'Rice_Leaf_Caterpillar',
    'Rice_Skipper',
    'White_Backed_Plant_Hopper',
    'White_Stem_Borer',
    'Yellow_Stem_Borer',
  ],
  Wheat: [
    'Bird_Cherry_Oat_Aphid',
    'English_Grain_Aphid',
    'Green_Bug',
    'Wheat_Blossom_Midge',
    'Wheat_Phloeothrips',
    'Wheat_Sawfly',
  ],
}

/**
 * Converts a dataset class identifier to a human-readable display string.
 * e.g. "Brown_Plant_Hopper" → "Brown Plant Hopper"
 *      "Cotton_Whitefly"    → "Cotton Whitefly"
 *
 * The original identifier is always preserved for API/model use.
 *
 * @param {string} classId - Dataset class identifier (underscore format)
 * @returns {string} Human-readable name
 */
export function formatPestName(classId) {
  if (!classId || typeof classId !== 'string') return 'Unknown'
  return classId.replace(/_/g, ' ')
}

/**
 * Validates that a pest class identifier belongs to the active dataset.
 * If an unexpected class is returned by the API, this returns false so
 * the UI can show a safe fallback instead of silently mapping to a wrong class.
 *
 * @param {string} classId - Pest class identifier to validate
 * @returns {boolean}
 */
export function validatePestClass(classId) {
  return Object.values(PEST_CLASSES).some((classes) => classes.includes(classId))
}

/**
 * Returns the valid pest classes for a given crop.
 * Normalises the crop name to handle slight variations from Model A output.
 *
 * @param {string} crop - Crop name returned by Model A (e.g. "Paddy", "Rice (Paddy)", "Corn")
 * @returns {string[]} Array of dataset class identifiers valid for that crop
 */
export function getPestClassesForCrop(crop) {
  if (!crop) return []
  const normalized = crop.toLowerCase()
  if (normalized.includes('corn') || normalized.includes('maize')) return PEST_CLASSES.Corn
  if (normalized.includes('cotton')) return PEST_CLASSES.Cotton
  if (normalized.includes('paddy') || normalized.includes('rice')) return PEST_CLASSES.Paddy
  if (normalized.includes('wheat')) return PEST_CLASSES.Wheat
  return []
}

/* ----------------------------------------------------------
   Deterministic advisory data for each dataset pest class.
   Keyed by exact dataset class identifier.
   Used by the demo mode only — will be replaced by real model
   inference output once the backend endpoint is connected.
---------------------------------------------------------- */

const PEST_ADVISORY = {
  // ── CORN ─────────────────────────────────────────────────
  Aphid: {
    scientificName: 'Rhopalosiphum maidis',
    severity: 'Moderate',
    confidence: 0.857,
    affectedAreaPct: 17,
    managementAdvice:
      'Aphid colonies forming on new growth and tassels. Honeydew secretions observed indicating active feeding. Survey natural enemies (Coccinellids, lacewings) before initiating chemical control.',
    actionSteps: [
      'Survey 30 random plants; record whether natural enemies are present.',
      'Apply imidacloprid or dimethoate 30 EC if colony count exceeds threshold.',
      'Avoid broad-spectrum insecticides during flowering to protect pollinators.',
      'Upload a close-up image of the affected node region for clearer classification.',
    ],
  },
  Army_Worm: {
    scientificName: 'Mythimna separata',
    severity: 'High',
    confidence: 0.912,
    affectedAreaPct: 31,
    managementAdvice:
      'Army worm mass migration detected. Larvae can cause complete defoliation within 48–72 hours if unchecked. Immediate perimeter barrier spray is recommended before larvae migrate further.',
    actionSteps: [
      'Inspect field edges at dusk when larvae are most active.',
      'Apply chlorpyrifos 20 EC or emamectin benzoate 5 SG as per label rate.',
      'Create a shallow trench along the field boundary to trap migrating larvae.',
      'Re-inspect in 3 days and upload follow-up image of leaf damage extent.',
    ],
  },
  Corn_Borer: {
    scientificName: 'Ostrinia furnacalis',
    severity: 'Moderate',
    confidence: 0.874,
    affectedAreaPct: 24,
    managementAdvice:
      'Corn borer larvae detected tunneling into stalks and ears. Frass deposits visible near entry holes. Early intervention limits stalk breakage and ear damage.',
    actionSteps: [
      'Cut and destroy infested stalks showing frass at entry holes.',
      'Apply fipronil 5 SC or spinosad granules into the whorl during the vegetative stage.',
      'Release Trichogramma parasitoids (50,000 eggs/ha) during egg-laying peak.',
      'Monitor 10 plants per sampling site; record bored stalk percentage.',
    ],
  },
  Fall_Armyworm: {
    scientificName: 'Spodoptera frugiperda',
    severity: 'High',
    confidence: 0.943,
    affectedAreaPct: 38,
    managementAdvice:
      'Fall armyworm feeding damage detected on whorl leaves. Window-pane and pin-hole patterns visible, consistent with second-instar larval feeding. This is a regulated pest requiring immediate action.',
    actionSteps: [
      'Apply emamectin benzoate 5 SG (0.4 g/litre) or spinetoram to the whorl.',
      'Inspect each plant whorl at 20 random sites; count live larvae per plant.',
      'Set up pheromone traps (5/ha) to monitor adult moth flight.',
      'Report infestation to local agriculture extension officer as required.',
    ],
  },
  Peach_Borer: {
    scientificName: 'Synanthedon exitiosa',
    severity: 'Low',
    confidence: 0.821,
    affectedAreaPct: 9,
    managementAdvice:
      'Peach borer activity detected at stalk base. Gum-like exudate and sawdust frass at crown indicate larval entry. Low population density — preventive treatment is adequate.',
    actionSteps: [
      'Remove soil from crown area and physically destroy visible larvae.',
      'Apply chlorpyrifos drench at stalk base as a prophylactic measure.',
      'Wrap stalk base with agri-fabric to deter egg-laying adults.',
      'Record next observation within 7 days.',
    ],
  },
  Potosiabre_vitarsis: {
    scientificName: 'Protaetia brevitarsis',
    severity: 'Low',
    confidence: 0.803,
    affectedAreaPct: 7,
    managementAdvice:
      'Adult beetles (Protaetia brevitarsis) detected feeding on silk and tassel. Population is below economic injury level but should be monitored through pollination period to prevent ear damage.',
    actionSteps: [
      'Hand-collect and destroy visible adults during early morning hours.',
      'Monitor silk damage daily during pollination period.',
      'Avoid overhead irrigation which attracts beetles to moist silks.',
      'Apply kaolin clay spray on ears as a physical deterrent if population increases.',
    ],
  },
  // ── COTTON ───────────────────────────────────────────────
  Cotton_Bollworm: {
    scientificName: 'Helicoverpa armigera',
    severity: 'High',
    confidence: 0.928,
    affectedAreaPct: 33,
    managementAdvice:
      'Cotton bollworm (Helicoverpa armigera) egg masses and early-instar larvae detected on squares and bolls. Population is approaching economic threshold. Larvae develop resistance rapidly — rotate insecticide modes of action.',
    actionSteps: [
      'Check 5 plants per site for egg masses on upper leaf surface.',
      'Apply indoxacarb 14.5 SC or chlorantraniliprole 18.5 SC per label rate.',
      'Deploy Helicoverpa pheromone traps (5/ha) to track adult activity.',
      'Avoid continuous application of the same insecticide class in successive sprays.',
    ],
  },
  Cotton_Whitefly: {
    scientificName: 'Bemisia tabaci (biotype B)',
    severity: 'Moderate',
    confidence: 0.861,
    affectedAreaPct: 21,
    managementAdvice:
      'Cotton whitefly (Bemisia tabaci) nymph density detected above EIL on lower leaf surfaces. This biotype is a vector for Cotton Leaf Curl Virus — control is urgent to prevent virus spread.',
    actionSteps: [
      'Apply buprofezin 25 WP or spiromesifen 22.9 SC under the leaf canopy.',
      'Avoid pyrethroids which disrupt natural enemies and cause population resurgence.',
      'Install yellow sticky traps (5/ha) to monitor adult flight.',
      'Remove and destroy heavily infested leaves to reduce inoculum.',
    ],
  },
  // ── PADDY ────────────────────────────────────────────────
  Brown_Plant_Hopper: {
    scientificName: 'Nilaparvata lugens',
    severity: 'High',
    confidence: 0.931,
    affectedAreaPct: 37,
    managementAdvice:
      'Brown Plant Hopper population detected above economic threshold. Hopperburn risk is elevated under the current humid microclimate. Avoid synthetic pyrethroids which suppress natural enemies and worsen outbreaks.',
    actionSteps: [
      'Drain standing water temporarily to disrupt nymphal microhabitat.',
      'Apply buprofezin (Applaud) or pymetrozine (Chess) per label rate.',
      'Check 20 random hill sites with a flashlight at night to estimate density.',
      'Remove weed hosts (Leersia spp.) along field bunds.',
    ],
  },
  Leaf_Folder: {
    scientificName: 'Cnaphalocrocis medinalis',
    severity: 'Moderate',
    confidence: 0.876,
    affectedAreaPct: 19,
    managementAdvice:
      'Rice leaf folder larvae rolling and feeding on leaves. White papery streaks visible across the canopy. Economic injury level is 10% leaf area damage — current infestation is approaching this threshold.',
    actionSteps: [
      'Clip and collect rolled leaves containing larvae; destroy away from field.',
      'Apply chlorantraniliprole 18.5 SC or lambda-cyhalothrin 5 EC per label.',
      'Reduce excessive nitrogen which promotes lush growth preferred by leaf folders.',
      'Inspect 20 random tillers; record percentage with folded leaves.',
    ],
  },
  Paddy_Stem_Maggot: {
    scientificName: 'Chlorops oryzae',
    severity: 'Moderate',
    confidence: 0.843,
    affectedAreaPct: 16,
    managementAdvice:
      'Paddy stem maggot infestation detected. Larval feeding causes "deadheart" in vegetative stage and "whiteear" at reproductive stage. Damage resembles stem borer but maggot is a distinct class.',
    actionSteps: [
      'Uproot and destroy affected tillers showing deadheart symptoms.',
      'Apply carbofuran 3G granules (10 kg/acre) at the base of tillers.',
      'Maintain field sanitation by removing crop debris from previous season.',
      'Record number of deadheart tillers per sample site.',
    ],
  },
  Rice_Gall_Midge: {
    scientificName: 'Orseolia oryzae',
    severity: 'Moderate',
    confidence: 0.887,
    affectedAreaPct: 20,
    managementAdvice:
      'Rice gall midge infestation confirmed — silver shoot (onion leaf) symptoms visible. Infested tillers will not produce panicles. Early intervention is critical at transplanting and active tillering stages.',
    actionSteps: [
      'Pull and count silver shoots per hill to assess infestation percentage.',
      'Apply carbofuran 3G or fipronil granules within 30 days of transplanting.',
      'Avoid early transplanting dates that coincide with gall midge adult flight peak.',
      'Upload close-up image of silver shoot for confirmation.',
    ],
  },
  Rice_Leaf_Caterpillar: {
    scientificName: 'Marasmia patnalis',
    severity: 'Low',
    confidence: 0.832,
    affectedAreaPct: 12,
    managementAdvice:
      'Rice leaf caterpillar feeding detected. Larvae scrape the leaf mesophyll leaving white streaks. Population is below EIL but early-stage management prevents escalation.',
    actionSteps: [
      'Release Trichogramma parasitoids as a biological control measure.',
      'Apply neem-based formulations (Azadirachtin 1500 ppm) as a low-risk option.',
      'Monitor 15 tillers per sampling point; record larval count.',
      'Schedule follow-up in 5 days.',
    ],
  },
  Rice_Skipper: {
    scientificName: 'Parnara guttata',
    severity: 'Low',
    confidence: 0.818,
    affectedAreaPct: 8,
    managementAdvice:
      'Rice skipper larvae detected rolling leaf tips. Irregular leaf-tip rolling with frass inside visible. Population is isolated — spot treatment is preferred over broadcast spraying.',
    actionSteps: [
      'Clip and destroy rolled leaf tips containing larvae.',
      'Apply triazophos or monocrotophos at affected spots only.',
      'Monitor expansion of damage over the next 5 days.',
      'Document by uploading a follow-up image of the canopy.',
    ],
  },
  White_Backed_Plant_Hopper: {
    scientificName: 'Sogatella furcifera',
    severity: 'Moderate',
    confidence: 0.869,
    affectedAreaPct: 23,
    managementAdvice:
      'White Backed Plant Hopper detected. Symptoms similar to Brown Plant Hopper but this species prefers the upper canopy. Current density warrants preventive spray before tillering is complete.',
    actionSteps: [
      'Apply etofenprox or buprofezin per the label — avoid pyrethroids.',
      'Drain field briefly to disrupt nymphal habitat.',
      'Install light traps to monitor adult flight and predict population peaks.',
      'Check 20 hill sites for nymph count; record per site.',
    ],
  },
  White_Stem_Borer: {
    scientificName: 'Scirpophaga innotata',
    severity: 'Moderate',
    confidence: 0.879,
    affectedAreaPct: 22,
    managementAdvice:
      'White Stem Borer egg masses detected on leaf sheaths. Larval tunneling causes deadheart (vegetative) and whiteear (reproductive). Distinct from Yellow Stem Borer — apply species-appropriate management.',
    actionSteps: [
      'Collect and destroy egg masses on the underside of leaf sheaths.',
      'Apply carbofuran 3G granules (10 kg/acre) at tiller base.',
      'Avoid flooding immediately after granule application to retain efficacy.',
      'Re-inspect in 5–7 days to verify larval control effectiveness.',
    ],
  },
  Yellow_Stem_Borer: {
    scientificName: 'Scirpophaga incertulas',
    severity: 'High',
    confidence: 0.904,
    affectedAreaPct: 29,
    managementAdvice:
      'Yellow Stem Borer is the primary stem borer species of paddy, with higher prevalence than White Stem Borer. Egg masses have characteristic golden-yellow scales. Deadheart incidence is escalating — immediate action required.',
    actionSteps: [
      'Remove and destroy egg masses — identify by yellow silky scales covering them.',
      'Apply chlorantraniliprole 18.5 SC (0.3 ml/litre) or carbofuran 3G granules.',
      'Set up light traps (1/ha) to monitor adult moth emergence.',
      'Inspect 25 tillers per site; record deadheart percentage at next visit.',
    ],
  },
  // ── WHEAT ────────────────────────────────────────────────
  Bird_Cherry_Oat_Aphid: {
    scientificName: 'Rhopalosiphum padi',
    severity: 'Moderate',
    confidence: 0.851,
    affectedAreaPct: 18,
    managementAdvice:
      'Bird Cherry Oat Aphid colonies detected on lower leaf sheaths and stems. This species is also a vector for Barley Yellow Dwarf Virus. Early control limits both direct damage and virus spread.',
    actionSteps: [
      'Count colonies on 20 stems at tillering; treat if ≥5 colonies/stem.',
      'Apply pirimicarb 50 WG (aphid-selective) to spare beneficial insects.',
      'Monitor for virus symptoms (yellowing, stunting) over the next 10 days.',
      'Record and upload follow-up image showing aphid distribution on stems.',
    ],
  },
  English_Grain_Aphid: {
    scientificName: 'Sitobion avenae',
    severity: 'Moderate',
    confidence: 0.862,
    affectedAreaPct: 15,
    managementAdvice:
      'English Grain Aphid colonies detected on upper leaves and ears. Peak damage occurs during heading — aphid feeding at this stage reduces grain weight significantly.',
    actionSteps: [
      'Monitor 10 ears per site; treat if ≥5 aphids per ear at heading.',
      'Apply lambda-cyhalothrin or pirimicarb per label before full ear emergence.',
      'Preserve natural enemies by avoiding broad-spectrum insecticide applications.',
      'Document population density trend at next weekly observation.',
    ],
  },
  Green_Bug: {
    scientificName: 'Schizaphis graminum',
    severity: 'Low',
    confidence: 0.824,
    affectedAreaPct: 10,
    managementAdvice:
      'Green Bug aphid infestation at early stage. Yellowing and reddening of leaves at feeding sites is characteristic. Population is below economic threshold — scout closely over the next 7 days.',
    actionSteps: [
      'Monitor 30 tillers per field at weekly intervals.',
      'Apply dimethoate 30 EC only if population exceeds 50–100 aphids per tiller.',
      'Avoid excessive irrigation which promotes soft growth preferred by green bugs.',
      'Record infestation level and upload follow-up image in 7 days.',
    ],
  },
  Wheat_Blossom_Midge: {
    scientificName: 'Sitodiplosis mosellana',
    severity: 'Moderate',
    confidence: 0.846,
    affectedAreaPct: 20,
    managementAdvice:
      'Wheat Blossom Midge adult activity detected during heading. Females lay eggs inside spikelets and larvae feed on developing grains. Timing of spray is critical — must coincide with adult flight peak during crop heading.',
    actionSteps: [
      'Monitor adult emergence using yellow water traps — treat at 1 adult/trap/day.',
      'Apply lambda-cyhalothrin or deltamethrin at early to mid-heading stage.',
      'Target spraying in the evening when adults are most active.',
      'Inspect harvested grain for orange larvae as a post-harvest assessment.',
    ],
  },
  Wheat_Phloeothrips: {
    scientificName: 'Haplothrips tritici',
    severity: 'Low',
    confidence: 0.809,
    affectedAreaPct: 9,
    managementAdvice:
      'Wheat Phloeothrips (grain thrips) detected inside spikelets at heading. Direct feeding causes shrivelled grain and yield loss. Population is at low level — targeted intervention is sufficient.',
    actionSteps: [
      'Count thrips per ear at 10 random sites; treat if ≥10 thrips/ear.',
      'Apply dimethoate 30 EC or spinosad during early heading.',
      'Harvest on schedule — delayed harvesting increases thrips-related grain damage.',
      'Record and document grain quality at harvest for comparison.',
    ],
  },
  Wheat_Sawfly: {
    scientificName: 'Cephus cinctus',
    severity: 'Moderate',
    confidence: 0.866,
    affectedAreaPct: 19,
    managementAdvice:
      'Wheat Sawfly larval activity detected inside stems. Larvae cut the stem internally causing lodging and whiteheads. Solid-stemmed varieties resist infestation — note for varietal planning next season.',
    actionSteps: [
      'Inspect 25 stems per site for sawfly larvae by splitting the stem.',
      'Apply pyrethroid insecticide at adult flight peak — monitor with yellow sticky traps.',
      'Harvest on time before larvae complete development and cause full stem cutoff.',
      'Plan to include solid-stemmed or tolerant varieties in next crop cycle.',
    ],
  },
}

/**
 * Model D — Pest Detection (Demo Mode)
 *
 * Returns a deterministic, dataset-accurate pest detection result.
 * The function is crop-aware: only pest classes from the detected crop
 * are returned, matching the real ML model's per-crop scope.
 *
 * PRODUCTION INTEGRATION NOTE:
 * Replace this entire function body with a single API call:
 *   const response = await fetch(`/api/model-d/detect`, { method: 'POST', body: formData })
 *   const raw = await response.json()
 *   if (!validatePestClass(raw.pest_class)) { ... show fallback ... }
 *   return buildPestResult(raw)
 * The surrounding UI and result structure require no changes.
 *
 * @param {object} options
 * @param {string} [options.imageName]  - Uploaded image filename (seed for determinism)
 * @param {string} [options.crop]       - Crop detected by Model A (e.g. "Paddy", "Corn")
 * @returns {PestDetectionResult}
 */
export function generatePestDetectionResult({ imageName = '', crop = 'Paddy' } = {}) {
  // Deterministic seed derived from the image filename.
  // Same image → same result every time. No Math.random().
  let seed = 0
  for (let i = 0; i < imageName.length; i++) {
    seed = (seed * 31 + imageName.charCodeAt(i)) & 0xffff
  }

  // Get only the pest classes valid for the detected crop
  const validClasses = getPestClassesForCrop(crop)

  // If the crop is not in the supported set, return a clean no-detection state
  if (!validClasses.length) {
    return {
      detected: false,
      detections: [],
      pestClassId: null,
      pestName: null,
      scientificName: null,
      severity: null,
      confidence: null,
      affectedAreaPct: 0,
      managementAdvice: 'The detected crop is not currently in the Model D dataset. Pest analysis is unavailable for this crop type.',
      actionSteps: [],
    }
  }

  // Pick a class deterministically from the crop-specific class list
  const classId = validClasses[seed % validClasses.length]

  // Validate against the centralized class list (guards against future config drift)
  if (!validatePestClass(classId)) {
    console.warn(`[Model D] Unexpected pest class encountered: "${classId}". Displaying fallback.`)
    return {
      detected: false,
      detections: [],
      pestClassId: null,
      pestName: 'Unknown pest class',
      scientificName: null,
      severity: null,
      confidence: null,
      affectedAreaPct: 0,
      managementAdvice: 'An unrecognised pest class was returned by the analysis engine. Please re-upload the image or contact support.',
      actionSteps: [],
    }
  }

  const advisory = PEST_ADVISORY[classId]

  return {
    // Result state — detected = true for any positive pest identification
    detected: true,
    detections: [{ pest_class: classId, confidence: advisory.confidence }],

    // Display fields
    pestClassId: classId,                    // exact dataset identifier — used for API calls
    pestName: formatPestName(classId),       // human-readable display name
    scientificName: advisory.scientificName,
    severity: advisory.severity,
    confidence: advisory.confidence,
    affectedAreaPct: advisory.affectedAreaPct,
    managementAdvice: advisory.managementAdvice,
    actionSteps: advisory.actionSteps,
  }
}
