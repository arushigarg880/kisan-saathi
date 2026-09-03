// End-to-End Functional Test Suite for Kisan Saathi 2.0
const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Setup mock browser environment
const localStorageData = {};
const mockWindow = {};
const mockDocument = {
  addEventListener: () => {},
  getElementById: (id) => ({
    value: '',
    textContent: '',
    style: {},
    classList: { add: () => {}, remove: () => {}, toggle: () => {} }
  }),
  querySelectorAll: () => []
};

const context = {
  window: mockWindow,
  document: mockDocument,
  localStorage: {
    getItem: (k) => localStorageData[k] || null,
    setItem: (k, v) => { localStorageData[k] = v; }
  },
  console: console,
  setTimeout: setTimeout,
  setInterval: setInterval,
  Date: Date,
  Math: Math,
  parseFloat: parseFloat,
  parseInt: parseInt
};
context.window = context;

// Load state and intelligence scripts
const stateCode = fs.readFileSync(path.join(__dirname, 'prototype/state.js'), 'utf8');
const intelCode = fs.readFileSync(path.join(__dirname, 'prototype/intelligence.js'), 'utf8');

vm.runInNewContext(stateCode, context);
vm.runInNewContext(intelCode, context);

const state = context.KisanState;
const intel = context.KisanIntelligence;

console.log('\n==================================================');
console.log('STARTING KISAN SAATHI 2.0 END-TO-END VERIFICATION');
console.log('==================================================\n');

// 1. Initial State Check
console.log('[TEST 1] Initializing State & Farm Memory...');
state.resetToDefault();
const initialFarm = state.getActiveFarm();
console.log(`✓ Active Farm: ${initialFarm.name} | Crop: ${initialFarm.crop} | Health: ${initialFarm.healthScore}/100`);
if (initialFarm.healthScore !== 82) throw new Error('Initial health score mismatch');

// 2. Farmer Setup
console.log('\n[TEST 2] Testing Farm Profile Creation...');
const newFarm = state.addFarm({
  name: "दक्षिण खेत (South Plot)",
  crop: "Cotton",
  cropHi: "कपास",
  area: 3.5,
  irrigation: "Canal",
  stage: "squaring"
});
console.log(`✓ Farm created: ${newFarm.name} (ID: ${newFarm.id})`);
if (state.get().farms.length !== 3) throw new Error('Farm count mismatch');

// 3. Image Quality Check
console.log('\n[TEST 3] Testing Image Quality Verification...');
const goodImg = "data:image/png;base64," + "A".repeat(10000);
const qGood = intel.validateImageQuality(goodImg);
console.log(`✓ Good image check: status=${qGood.status}, score=${qGood.score}`);
if (qGood.status !== 'GOOD') throw new Error('Good image validation failed');

const emptyImg = "";
const qEmpty = intel.validateImageQuality(emptyImg);
console.log(`✓ Empty image check: status=${qEmpty.status}, passed=${qEmpty.passed}`);
if (qEmpty.status !== 'FAILED') throw new Error('Empty image check failed');

// 4. Deterministic Diagnosis & AI Logic
console.log('\n[TEST 4] Testing Deterministic Intelligence Engine (Tomato Early Blight)...');
const sessionData = {
  crop: "Tomato",
  stage: "flowering",
  symptomsText: "पत्तियों पर संकेंद्रित काले-भूरे गोल छल्लेदार धब्बे (concentric dark circular spots on lower leaves)",
  voiceTranscript: "टमाटर के पत्तों पर काले धब्बे दिख रहे हैं",
  clarifyingAnswers: { spotsUnderside: "yes", spreading: "yes" }
};
const weatherContext = { temp: 27, humidity: 84 };

const diagnosis = intel.evaluateDiagnosis(sessionData, initialFarm, weatherContext);
console.log(`✓ Diagnosis Result: ${diagnosis.name} (${diagnosis.nameHi})`);
console.log(`✓ Confidence: ${diagnosis.confidence}% (Deterministic calculation)`);
console.log(`✓ Pathogen: ${diagnosis.pathogen}`);
if (!diagnosis.name.includes("Early Blight")) throw new Error('Expected Tomato Early Blight diagnosis');
if (diagnosis.confidence < 80) throw new Error('Expected high confidence for matching symptoms');

// 5. Context-Aware Risk Calculation
console.log('\n[TEST 5] Testing Context-Aware Risk Engine...');
const risk = intel.calculateRisk(diagnosis, initialFarm, weatherContext);
console.log(`✓ Calculated Risk: ${risk.overallRisk} (${risk.overallRiskHi})`);
console.log(`✓ Risk Score: ${risk.riskScore}/100`);
console.log(`✓ Evaluated Factors Count: ${risk.factors.length}`);
if (risk.overallRisk !== "HIGH") throw new Error('Expected HIGH risk due to 84% humidity + flowering stage');

// 6. Actionable Advisory Generation
console.log('\n[TEST 6] Testing "What Should I Do Today?" Advisory Generation...');
const advisory = intel.generateAdvisory(diagnosis, risk, initialFarm);
console.log(`✓ DO NOW: ${advisory.doNowHi}`);
console.log(`✓ MONITOR: ${advisory.monitorHi}`);
console.log(`✓ ROUTINE: ${advisory.routineHi}`);
console.log(`✓ NEXT SCAN: ${advisory.nextScan}`);
if (!advisory.doNow.includes("severely infected lower leaves")) throw new Error('Advisory content mismatch');

// 7. Store Scan in Farm Memory
console.log('\n[TEST 7] Storing Scan into Farm Memory & Health Score Update...');
const prevScansCount = state.get().scanHistory.length;
state.addScanToHistory({
  diagnosis,
  risk,
  symptoms: sessionData.symptomsText,
  primaryImage: "../generated_screens/screen_01.png"
});
if (state.get().scanHistory.length !== prevScansCount + 1) throw new Error('Scan history did not increment');
console.log(`✓ Scan added to history. Total scans: ${state.get().scanHistory.length}`);
console.log(`✓ Updated Farm Health Score: ${state.getActiveFarm().healthScore}/100`);

// 8. Follow-Up Comparison: Recovery Scenario
console.log('\n[TEST 8] Testing Follow-Up Comparison (Recovery Scenario: 40% -> 22%)...');
const followUpImproved = intel.compareFollowUp({ severity: 40 }, { severity: 22, dayDiff: 5 });
console.log(`✓ Comparison Outcome: ${followUpImproved.outcome} (${followUpImproved.outcomeHi})`);
console.log(`✓ Delta: ${followUpImproved.delta}%`);
console.log(`✓ Adaptive Guidance: ${followUpImproved.adaptiveAction}`);
if (followUpImproved.outcome !== 'IMPROVED') throw new Error('Expected IMPROVED outcome');

// 9. Follow-Up Comparison: Worsening Scenario
console.log('\n[TEST 9] Testing Follow-Up Comparison (Worsening Scenario: 40% -> 55%)...');
const followUpWorsened = intel.compareFollowUp({ severity: 40 }, { severity: 55, dayDiff: 5 });
console.log(`✓ Comparison Outcome: ${followUpWorsened.outcome} (${followUpWorsened.outcomeHi})`);
console.log(`✓ Delta: +${followUpWorsened.delta}%`);
console.log(`✓ Adaptive Escalation: ${followUpWorsened.adaptiveAction}`);
if (followUpWorsened.outcome !== 'WORSENING') throw new Error('Expected WORSENING outcome');

// 10. Low Confidence & "I Don't Know" Flow
console.log('\n[TEST 10] Testing "I Don\'t Know" Low Confidence Flow...');
const ambiguousSession = {
  crop: "Tomato",
  stage: "vegetative",
  symptomsText: "पत्ता थोड़ा पीला है लेकिन कोई धब्बे या निश्चित लक्षण नहीं हैं",
  voiceTranscript: "",
  clarifyingAnswers: { spotsUnderside: "not_sure", spreading: "no" }
};
const diagAmbiguous = intel.evaluateDiagnosis(ambiguousSession, initialFarm, { temp: 25, humidity: 55 });
console.log(`✓ Ambiguous diagnosis status: ${diagAmbiguous.status}`);
console.log(`✓ isUnknown flag: ${diagAmbiguous.isUnknown}`);
console.log(`✓ Farmer message: ${diagAmbiguous.farmerMessage}`);
if (!diagAmbiguous.isUnknown) throw new Error('Expected isUnknown to be true for ambiguous input');

// 11. Expert Escalation & Resolution
console.log('\n[TEST 11] Testing Expert Escalation & Resolution Lifecycle...');
const initialCasesCount = state.get().expertCases.length;
const newCase = state.createExpertCase("Severe spots expanding rapidly. Requesting lab-confirmed advisory.");
console.log(`✓ Case created: #${newCase.id} | Status: ${newCase.status} | Priority: ${newCase.priority}`);
if (state.get().expertCases.length !== initialCasesCount + 1) throw new Error('Expert cases did not increment');

state.resolveExpertCase(newCase.id, "Confirmed Tomato Early Blight", "Apply Copper Oxychloride 50% WP @ 2.5g/L immediately.", true);
const resolvedCase = state.get().expertCases.find(c => c.id === newCase.id);
console.log(`✓ Case resolved: #${resolvedCase.id} | Status: ${resolvedCase.status} | Lab Ticket: ${resolvedCase.labReferralId}`);
if (resolvedCase.status !== 'EXPERT_RESPONDED') throw new Error('Expected EXPERT_RESPONDED status');
if (!resolvedCase.labReferralId) throw new Error('Expected Lab Ticket ID to be created');

// 12. Offline Queue & Cloud Sync
console.log('\n[TEST 12] Testing Offline Queueing & Reconnection Sync...');
state.queueOfflineScan({
  diagnosis: { name: "Offline Field Scan", confidence: 75, severity: 30 },
  symptoms: "Logged offline in remote plot",
  risk: { overallRisk: "MEDIUM" },
  primaryImage: "../generated_screens/screen_01.png"
});
if (state.get().offlineQueue.length !== 1) throw new Error('Offline queue did not record item');
console.log(`✓ Offline item queued: 1 item in queue`);

const syncedCount = state.syncOfflineQueue();
console.log(`✓ Synced items count: ${syncedCount}`);
if (syncedCount !== 1 || state.get().offlineQueue.length !== 0) throw new Error('Sync failed');

console.log('\n==================================================');
console.log('ALL 12 END-TO-END TESTS PASSED SUCCESSFULLY! ✓');
console.log('==================================================\n');
