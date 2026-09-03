// Kisan Saathi 2.0 - Central State Management & Farm Memory
(function() {
  const STORAGE_KEY = 'kisan_saathi_state_v2';

  const defaultState = {
    language: 'hi', // 'hi' | 'en' | 'pa'
    role: 'farmer', // 'farmer' | 'expert' | 'lab' | 'admin'
    isOffline: false,
    currentScreenId: 1,

    farmer: {
      name: "रमेश कुमार (Ramesh Kumar)",
      phone: "9876543210",
      village: "करनाल (Karnal)",
      district: "करनाल (Karnal)",
      state: "हरियाणा (Haryana)",
      language: "hi"
    },

    farms: [
      {
        id: "farm_1",
        name: "उत्तर खेत (North Field)",
        crop: "Tomato",
        cropHi: "टमाटर",
        variety: "Pusa Hybrid-4",
        area: 2.5,
        soil: "Sandy Loam",
        irrigation: "Drip",
        stage: "flowering",
        healthScore: 82,
        lastScanDate: "2026-08-28"
      },
      {
        id: "farm_2",
        name: "नहर वाला खेत (Canal Field)",
        crop: "Wheat",
        cropHi: "गेहूं",
        variety: "HD-2967",
        area: 4.0,
        soil: "Alluvial",
        irrigation: "Canal",
        stage: "vegetative",
        healthScore: 94,
        lastScanDate: "2026-08-25"
      }
    ],
    activeFarmId: "farm_1",

    currentScanSession: {
      id: "scan_live",
      farmId: "farm_1",
      crop: "Tomato",
      variety: "Pusa Hybrid-4",
      stage: "flowering",
      images: {
        leafFront: null,
        leafBack: null,
        stem: null,
        wholePlant: null
      },
      imageCount: 0,
      symptomsText: "पत्तियों पर काले और भूरे रंग के गोल छल्ले वाले धब्बे (Concentric circular dark spots on leaves)",
      voiceTranscript: "टमाटर के पत्तों पर काले धब्बे दिख रहे हैं (Tomato leaves have circular dark spots)",
      clarifyingAnswers: {
        spotsUnderside: "yes",
        spreading: "yes",
        noticedDaysAgo: "3"
      },
      imageQuality: {
        checked: false,
        status: "GOOD",
        score: 92,
        message: "फोटो स्पष्ट है, रोशनी और फोकस सही है (Image clear, good lighting and focus)"
      },
      diagnosis: null,
      risk: null,
      advisory: null,
      timestamp: new Date().toISOString()
    },

    // Farm Memory History
    scanHistory: [
      {
        id: "scan_hist_1",
        farmId: "farm_1",
        crop: "Tomato",
        date: "2026-08-20",
        dayLabel: "Day 1 (14 days ago)",
        diagnosisName: "Tomato Early Blight (अगेती झुलसा)",
        confidence: 91,
        severity: 40,
        severityLabel: "High (40% leaf area)",
        symptoms: "Concentric brown-black lesions on lower leaves",
        status: "DIAGNOSED",
        riskLevel: "HIGH",
        imageUrl: "../generated_screens/screen_01.png"
      },
      {
        id: "scan_hist_2",
        farmId: "farm_1",
        crop: "Tomato",
        date: "2026-08-25",
        dayLabel: "Day 5 (9 days ago)",
        diagnosisName: "Tomato Early Blight (अगेती झुलसा)",
        confidence: 93,
        severity: 22,
        severityLabel: "Moderate (22% leaf area)",
        symptoms: "Lesions dried out, no new spots on upper shoots",
        status: "IMPROVED",
        riskLevel: "MEDIUM",
        imageUrl: "../generated_screens/screen_01.png"
      }
    ],

    // Treatment History
    treatmentLogs: [
      {
        id: "treat_1",
        farmId: "farm_1",
        date: "2026-08-22",
        intervention: "Neem Oil Spray (नीम तेल 5ml/L छिड़काव)",
        adherence: "Fully Completed (पूर्ण अनुपालन)",
        notes: "Sprayed during late afternoon on all infected lower leaves."
      }
    ],

    // Follow-up Comparison Records
    followUpRecords: [
      {
        id: "followup_1",
        farmId: "farm_1",
        date: "2026-08-25",
        previousScanId: "scan_hist_1",
        currentScanId: "scan_hist_2",
        previousSeverity: 40,
        currentSeverity: 22,
        outcome: "IMPROVED",
        outcomeHi: "सुधार देखा गया (Condition Improved)",
        adaptiveAdvice: "Continue organic care. Avoid synthetic fungicides. Recheck in 7 days."
      }
    ],

    // Expert Cases Queue
    expertCases: [
      {
        id: "KS-9842",
        farmerName: "रमेश कुमार (Ramesh Kumar)",
        village: "करनाल (Karnal)",
        phone: "9876543210",
        farmId: "farm_1",
        crop: "Tomato",
        diagnosisAI: "Tomato Early Blight (अगेती झुलसा)",
        confidenceAI: 72,
        riskAI: "HIGH",
        status: "UNDER_REVIEW", // SUBMITTED | UNDER_REVIEW | EXPERT_RESPONDED | RESOLVED
        priority: "URGENT",
        submittedAt: "2026-09-02T10:30:00Z",
        symptoms: "Severe necrotic spots with yellow halo on lower tomato canopy.",
        expertDiagnosis: null,
        expertNotes: "",
        labReferralId: null
      },
      {
        id: "KS-9840",
        farmerName: "हरप्रीत सिंह (Harpreet Singh)",
        village: "पटियाला (Patiala)",
        phone: "9812345678",
        farmId: "farm_ext_1",
        crop: "Wheat",
        diagnosisAI: "Yellow Rust (पीला रतुआ)",
        confidenceAI: 89,
        riskAI: "MEDIUM",
        status: "EXPERT_RESPONDED",
        priority: "MEDIUM",
        submittedAt: "2026-09-01T14:15:00Z",
        expertDiagnosis: "Yellow Rust (Puccinia striiformis)",
        expertNotes: "Apply Propiconazole 25% EC @ 1ml/L immediately. Avoid excessive nitrogen.",
        labReferralId: null
      }
    ],

    // Laboratory Referrals
    labReferrals: [
      {
        id: "LAB-TMT-2026-08",
        caseId: "KS-9842",
        farmerName: "रमेश कुमार (Ramesh Kumar)",
        crop: "Tomato Hybrid",
        sampleType: "Foliage with necrotic lesions",
        testRequested: "PCR / Fungal Culture Assay",
        status: "TESTING", // SENT | RECEIVED | TESTING | REPORT_READY
        sentDate: "2026-09-02",
        labName: "State Ag Diagnostic Lab, Karnal",
        result: null
      }
    ],

    // Event-Driven Notifications
    notifications: [
      {
        id: "notif_1",
        type: "outbreak",
        priority: "urgent",
        title: "क्षेत्रीय बीमारी चेतावनी (District Outbreak Alert)",
        body: "करनाल और आस-पास के 5 किमी दायरे में टमाटर झुलसा रोग तेजी से देखा गया है। अपनी फसल की तुरंत जांच करें।",
        timestamp: "1 hour ago",
        read: false,
        actionScreen: 30
      },
      {
        id: "notif_2",
        type: "followup_due",
        priority: "important",
        title: "फॉलो-अप का समय (Follow-Up Due)",
        body: "उत्तर खेत (Tomato): 5 दिन पहले किए गए छिड़काव का असर देखने के लिए आज नई फोटो खींचें।",
        timestamp: "3 hours ago",
        read: false,
        actionScreen: 19
      }
    ],

    // Offline Sync Queue
    offlineQueue: [],

    // User Feedback
    feedbackList: [],

    // Weather Context
    weather: {
      temp: 27,
      condition: "Humid / Overcast (नम व बादल)",
      humidity: 84,
      rainChance: 65,
      windSpeed: "12 km/h",
      fungalRiskFactor: "HIGH (>80% humidity enhances spore germination)"
    }
  };

  class StateService {
    constructor() {
      this.state = this.loadState();
      this.subscribers = [];
    }

    loadState() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          // Merge with defaults to guarantee all schema fields exist
          return Object.assign({}, defaultState, parsed);
        }
      } catch (e) {
        console.warn("Error reading localStorage, using defaults", e);
      }
      return JSON.parse(JSON.stringify(defaultState));
    }

    saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      } catch (e) {
        console.warn("Error saving to localStorage", e);
      }
      this.notifySubscribers();
    }

    resetToDefault() {
      this.state = JSON.parse(JSON.stringify(defaultState));
      this.saveState();
    }

    subscribe(callback) {
      this.subscribers.push(callback);
    }

    notifySubscribers() {
      for (const cb of this.subscribers) {
        try { cb(this.state); } catch (e) { console.error(e); }
      }
    }

    get() {
      return this.state;
    }

    set(updates) {
      Object.assign(this.state, updates);
      this.saveState();
    }

    getActiveFarm() {
      return this.state.farms.find(f => f.id === this.state.activeFarmId) || this.state.farms[0];
    }

    addFarm(farmData) {
      const newFarm = {
        id: "farm_" + Date.now(),
        name: farmData.name || "नया खेत (New Plot)",
        crop: farmData.crop || "Tomato",
        cropHi: farmData.cropHi || "टमाटर",
        variety: farmData.variety || "Standard Hybrid",
        area: parseFloat(farmData.area) || 1.0,
        soil: farmData.soil || "Loam",
        irrigation: farmData.irrigation || "Drip",
        stage: farmData.stage || "vegetative",
        healthScore: 85,
        lastScanDate: "Not yet scanned"
      };
      this.state.farms.push(newFarm);
      this.state.activeFarmId = newFarm.id;
      this.addNotification({
        type: "farm_added",
        priority: "routine",
        title: "खेत प्रोफ़ाइल सुरक्षित की गई (Farm Profile Created)",
        body: `${newFarm.name} को आपकी पर्सनल फार्म मेमोरी में जोड़ दिया गया है।`,
        timestamp: "Just now",
        actionScreen: 5
      });
      this.saveState();
      return newFarm;
    }

    addNotification(notif) {
      const item = {
        id: "notif_" + Date.now(),
        type: notif.type || "system",
        priority: notif.priority || "routine",
        title: notif.title,
        body: notif.body,
        timestamp: notif.timestamp || "Just now",
        read: false,
        actionScreen: notif.actionScreen || 5
      };
      this.state.notifications.unshift(item);
      this.saveState();
    }

    addScanToHistory(scanResult) {
      const activeFarm = this.getActiveFarm();
      const historyItem = {
        id: "scan_" + Date.now(),
        farmId: activeFarm.id,
        crop: activeFarm.crop,
        date: new Date().toISOString().split('T')[0],
        dayLabel: "Today",
        diagnosisName: scanResult.diagnosis.name,
        confidence: scanResult.diagnosis.confidence,
        severity: scanResult.diagnosis.severity,
        severityLabel: `${scanResult.diagnosis.severity}% affected`,
        symptoms: scanResult.symptoms,
        status: scanResult.diagnosis.status || "DIAGNOSED",
        riskLevel: scanResult.risk.overallRisk,
        imageUrl: scanResult.primaryImage || "../generated_screens/screen_01.png"
      };

      this.state.scanHistory.unshift(historyItem);
      activeFarm.healthScore = Math.max(20, Math.min(100, Math.round(100 - (scanResult.diagnosis.severity * 0.7))));
      activeFarm.lastScanDate = historyItem.date;

      this.addNotification({
        type: "analysis_completed",
        priority: "important",
        title: "नई फसल जांच पूर्ण (Diagnosis Completed)",
        body: `${scanResult.diagnosis.name} का पता चला। आज की कार्ययोजना देखें।`,
        timestamp: "Just now",
        actionScreen: 15
      });

      this.saveState();
      return historyItem;
    }

    recordFarmerAction(actionText) {
      const activeFarm = this.getActiveFarm();
      const entry = {
        id: "treat_" + Date.now(),
        farmId: activeFarm.id,
        date: new Date().toISOString().split('T')[0],
        intervention: actionText,
        adherence: "Completed by Farmer",
        notes: "Recorded from 'What Should I Do Today' checklist."
      };
      this.state.treatmentLogs.unshift(entry);
      this.addNotification({
        type: "action_logged",
        priority: "routine",
        title: "कदम दर्ज किया गया (Action Logged)",
        body: `उपचार दर्ज हुआ: "${actionText}". 5 दिन बाद फॉलो-अप लिया जाएगा।`,
        timestamp: "Just now",
        actionScreen: 18
      });
      this.saveState();
    }

    createExpertCase(extraNotes = "", audioNote = null) {
      const activeFarm = this.getActiveFarm();
      const lastScan = this.state.scanHistory[0] || {};
      const newCase = {
        id: "KS-" + (Math.floor(1000 + Math.random() * 9000)),
        farmerName: this.state.farmer.name,
        village: this.state.farmer.village,
        phone: this.state.farmer.phone,
        farmId: activeFarm.id,
        crop: activeFarm.crop,
        diagnosisAI: lastScan.diagnosisName || "Uncertain Crop Condition",
        confidenceAI: lastScan.confidence || 65,
        riskAI: lastScan.riskLevel || "HIGH",
        status: "SUBMITTED",
        priority: (lastScan.riskLevel === "HIGH" || (lastScan.confidence || 0) < 70) ? "URGENT" : "MEDIUM",
        submittedAt: new Date().toISOString(),
        symptoms: extraNotes || this.state.currentScanSession.symptomsText || "Farmer escalated case for verification.",
        expertDiagnosis: null,
        expertNotes: "",
        hasAudioNote: !!audioNote,
        labReferralId: null
      };

      this.state.expertCases.unshift(newCase);
      this.addNotification({
        type: "expert_submitted",
        priority: "important",
        title: "केस विशेषज्ञ को भेजा गया (Escalated to Expert)",
        body: `केस #${newCase.id} कृषि विशेषज्ञ कतार में दर्ज हो गया है। 24 घंटे में समीक्षा मिलेगी।`,
        timestamp: "Just now",
        actionScreen: 24
      });
      this.saveState();
      return newCase;
    }

    resolveExpertCase(caseId, expertDiagnosis, advisoryNotes, referToLab = false) {
      const c = this.state.expertCases.find(x => x.id === caseId);
      if (!c) return;

      c.expertDiagnosis = expertDiagnosis;
      c.expertNotes = advisoryNotes;
      c.status = "EXPERT_RESPONDED";

      if (referToLab) {
        const labTicket = {
          id: "LAB-" + c.crop.substring(0, 3).toUpperCase() + "-" + Date.now().toString().slice(-4),
          caseId: c.id,
          farmerName: c.farmerName,
          crop: c.crop,
          sampleType: "Foliage / Plant sample",
          testRequested: "Pathogen PCR Culture",
          status: "RECEIVED",
          sentDate: new Date().toISOString().split('T')[0],
          labName: "District Agri Diagnostic Center",
          result: null
        };
        this.state.labReferrals.unshift(labTicket);
        c.labReferralId = labTicket.id;
      }

      this.addNotification({
        type: "expert_resolved",
        priority: "urgent",
        title: "विशेषज्ञ की सलाह प्राप्त हुई (Expert Advice Received)",
        body: `केस #${c.id} पर डॉ. वर्मा का परामर्श उपलब्ध है: "${expertDiagnosis}".`,
        timestamp: "Just now",
        actionScreen: 16
      });

      this.saveState();
    }

    queueOfflineScan(scanPayload) {
      const queueItem = {
        id: "queue_" + Date.now(),
        type: "SCAN",
        payload: scanPayload,
        timestamp: new Date().toISOString()
      };
      this.state.offlineQueue.push(queueItem);
      this.saveState();
      return queueItem;
    }

    syncOfflineQueue() {
      const count = this.state.offlineQueue.length;
      if (count === 0) return 0;

      for (const item of this.state.offlineQueue) {
        if (item.type === "SCAN") {
          this.addScanToHistory(item.payload);
        }
      }
      this.state.offlineQueue = [];
      this.addNotification({
        type: "sync_success",
        priority: "important",
        title: "डेटा सिंक संपन्न (Data Synchronized)",
        body: `${count} ऑफ़लाइन रिकॉर्ड्स सफलतापूर्वक केंद्रीय प्रणाली में अपडेट हो गए।`,
        timestamp: "Just now",
        actionScreen: 5
      });
      this.saveState();
      return count;
    }
  }

  window.KisanState = new StateService();
})();
