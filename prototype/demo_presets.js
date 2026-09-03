// Kisan Saathi 2.0 - Controlled Deterministic Demo Presets
(function() {

  const DEMO_PRESETS = [
    {
      id: "demo_success",
      title: "1. Successful Diagnosis (सफल निदान)",
      subtitle: "Tomato Early Blight with clear photo, high confidence & actionable plan",
      apply: () => {
        const state = KisanState.get();
        state.activeFarmId = "farm_1";
        state.currentScanSession = {
          id: "scan_demo_success",
          farmId: "farm_1",
          crop: "Tomato",
          variety: "Pusa Hybrid-4",
          stage: "flowering",
          images: {
            leafFront: "../generated_screens/screen_01.png",
            leafBack: null,
            stem: null,
            wholePlant: null
          },
          imageCount: 1,
          symptomsText: "पत्तियों पर संकेंद्रित काले-भूरे छल्लेदार धब्बे और पीला घेरा (Concentric dark circular rings with yellow halos on lower leaves)",
          voiceTranscript: "टमाटर की निचली पत्तियों पर काले और भूरे रंग के गोल धब्बे बन रहे हैं।",
          clarifyingAnswers: {
            spotsUnderside: "yes",
            spreading: "yes",
            noticedDaysAgo: "3"
          },
          imageQuality: {
            checked: true,
            status: "GOOD",
            score: 94,
            message: "फोटो साफ है, रोशनी और फोकस सही है (Image clear, good lighting)"
          },
          diagnosis: null,
          risk: null,
          advisory: null,
          timestamp: new Date().toISOString()
        };

        // Run intelligence
        const farm = KisanState.getActiveFarm();
        const diag = KisanIntelligence.evaluateDiagnosis(state.currentScanSession, farm, state.weather);
        const risk = KisanIntelligence.calculateRisk(diag, farm, state.weather);
        const adv = KisanIntelligence.generateAdvisory(diag, risk, farm);

        state.currentScanSession.diagnosis = diag;
        state.currentScanSession.risk = risk;
        state.currentScanSession.advisory = adv;

        KisanState.saveState();
        window.loadScreen(12); // Go to Diagnosis Result
      }
    },

    {
      id: "demo_poor_image",
      title: "2. Poor Image Rejection (खराब फोटो चेतावनी)",
      subtitle: "Blurry/dark image triggers real quality rejection without fake diagnosis",
      apply: () => {
        const state = KisanState.get();
        state.currentScanSession.images.leafFront = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";
        state.currentScanSession.imageQuality = {
          checked: true,
          status: "POOR",
          score: 18,
          message: "यह फोटो बहुत धुंधली और खाली है। कृपया साफ रोशनी में पौधे के नजदीक से फोटो लें (Photo too blurry/empty)."
        };
        state.currentScanSession.diagnosis = null;
        KisanState.saveState();
        window.loadScreen(8); // Go to Image Quality Check Screen
      }
    },

    {
      id: "demo_low_confidence",
      title: "3. Low Confidence / 'I Don't Know' (अनिश्चितता)",
      subtitle: "Insufficient symptoms triggers honest 'I Don't Know' & clarifying flow",
      apply: () => {
        const state = KisanState.get();
        state.currentScanSession.symptomsText = "पत्ता थोड़ा पीला है लेकिन कोई निश्चित धब्बे या लक्षण नहीं हैं (General faint yellowing, no specific lesion pattern)";
        state.currentScanSession.voiceTranscript = "पत्ते में कुछ हल्का बदलाव दिख रहा है।";
        state.currentScanSession.clarifyingAnswers = { spotsUnderside: "not_sure", spreading: "no" };

        const farm = KisanState.getActiveFarm();
        const diag = KisanIntelligence.evaluateDiagnosis(state.currentScanSession, farm, state.weather);
        const risk = KisanIntelligence.calculateRisk(diag, farm, state.weather);
        const adv = KisanIntelligence.generateAdvisory(diag, risk, farm);

        state.currentScanSession.diagnosis = diag;
        state.currentScanSession.risk = risk;
        state.currentScanSession.advisory = adv;

        KisanState.saveState();
        window.loadScreen(12); // Will show the "I Don't Know / Insufficient Evidence" card!
      }
    },

    {
      id: "demo_worsening_followup",
      title: "4. Worsening Follow-up (रोग में वृद्धि)",
      subtitle: "Progression comparison shows increased severity (+15%) triggering escalation",
      apply: () => {
        const state = KisanState.get();
        const prevScan = state.scanHistory[0] || { severity: 40 };
        const followUpComparison = KisanIntelligence.compareFollowUp(prevScan, {
          severity: 55, // Worsening!
          dayDiff: 5
        });

        // Record in state
        state.followUpRecords.unshift({
          id: "followup_" + Date.now(),
          farmId: state.activeFarmId,
          date: new Date().toISOString().split('T')[0],
          previousScanId: prevScan.id || "scan_hist_1",
          currentScanId: "scan_worsening",
          previousSeverity: 40,
          currentSeverity: 55,
          outcome: "WORSENING",
          outcomeHi: "रोग में वृद्धि देखी गई (Condition Worsening)",
          adaptiveAdvice: followUpComparison.adaptiveAction
        });

        KisanState.addNotification({
          type: "condition_worsened",
          priority: "urgent",
          title: "रोग वृद्धि चेतावनी (Urgent: Condition Worsening)",
          body: "फॉलो-अप में 15% रोग वृद्धि पाई गई है। कृपया तुरंत कृषि वैज्ञानिक से सलाह लें।",
          timestamp: "Just now",
          actionScreen: 23
        });

        KisanState.saveState();
        window.loadScreen(20); // Go to Disease Progression screen
      }
    },

    {
      id: "demo_expert_escalation",
      title: "5. Expert Escalation & Validation (विशेषज्ञ परामर्श)",
      subtitle: "Submit case to queue -> Open expert workstation -> Validate & return advisory",
      apply: () => {
        const newCase = KisanState.createExpertCase("Severe leaf spots spreading despite basic neem spray. Requesting laboratory-backed advisory.");
        window.goToScreen(24); // Go to Extension / Expert Case Dashboard
      }
    },

    {
      id: "demo_offline_sync",
      title: "6. Offline Mode & Cloud Sync (ऑफ़लाइन व सिंक)",
      subtitle: "Switch offline, queue scan in local memory, reconnect and synchronize",
      apply: () => {
        window.toggleOfflineMode(); // Switches to offline and loads Screen 17
        KisanState.queueOfflineScan({
          diagnosis: { name: "Offline Field Observation (टमाटर पत्ता धब्बा)", confidence: 75, severity: 30 },
          symptoms: "Observed in distant field without internet coverage.",
          risk: { overallRisk: "MEDIUM" },
          primaryImage: "../generated_screens/screen_01.png"
        });
        window.loadScreen(17);
      }
    }
  ];

  window.KisanDemoPresets = DEMO_PRESETS;
})();
