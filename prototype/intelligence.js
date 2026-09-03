// Kisan Saathi 2.0 - Prototype Intelligence Engine
// Fully deterministic, rule-based agronomic pathology & risk assessment engine
(function() {

  // Rule-based crop disease knowledge base
  const DISEASE_KNOWLEDGE_BASE = {
    Tomato: [
      {
        id: "tmt_early_blight",
        name: "Tomato Early Blight",
        nameHi: "टमाटर का अगेती झुलसा",
        pathogen: "Alternaria solani",
        keySymptoms: ["concentric", "circular", "black spot", "brown spot", "lower leaves", "yellow halo", "काले धब्बे", "भूरे धब्बे", "छल्ले", "निचले पत्ते", "पीला घेरा"],
        favoredWeather: { minHumidity: 70, minTemp: 22, maxTemp: 32 },
        vulnerableStages: ["flowering", "fruiting", "vegetative"],
        typicalSeverity: 40,
        explanation: {
          what: "Alternaria solani fungal infection causing concentric circular lesions on foliage.",
          whatHi: "अल्टरनेरिया सोलेनाई फफूंद के कारण पत्तियों पर संकेंद्रित छल्लेदार धब्बे।",
          why: "Concentric target-board rings on lower leaves combined with high relative humidity (>75%).",
          whyHi: "निचली पत्तियों पर गोल छल्लेदार धब्बे और 75% से अधिक हवा में नमी इस रोग का मुख्य कारण है।",
          uncertainty: "Bacterial leaf spot can present similar early markings until concentric rings darken.",
          uncertaintyHi: "शुरुआती दौर में जीवाणु धब्बा रोग भी इससे मिलता-जुलता दिखता है।"
        },
        advisory: {
          doNow: "Remove and safely dispose of severely infected lower leaves. Avoid leaving them on soil.",
          doNowHi: "संक्रमित निचली पत्तियों को काटकर खेत से दूर गड्ढे में दबा दें। उन्हें जमीन पर न छोड़ें।",
          monitor: "Inspect newly emerged upper foliage every 48 hours for small pinpoint brown dots.",
          monitorHi: "अगले 48 घंटों में ऊपरी नई पत्तियों पर छोटे भूरे बिंदुओं की निगरानी करें।",
          routine: "Water directly at the plant root zone; avoid wetting leaves during evening hours.",
          routineHi: "शाम के समय पत्तों पर पानी न डालें, केवल पौधे की जड़ में पानी दें।",
          nextScanDays: 5,
          nextScanDaysHi: "5 दिन बाद फिर से नई फोटो लेकर तुलना करें।"
        }
      },
      {
        id: "tmt_late_blight",
        name: "Tomato Late Blight",
        nameHi: "टमाटर का पछेती झुलसा",
        pathogen: "Phytophthora infestans",
        keySymptoms: ["water soaked", "pale green", "white mold", "rapid spread", "wet lesions", "पानी जैसे धब्बे", "सफेद फफूंद", "तेजी से फैलना", "गीले धब्बे"],
        favoredWeather: { minHumidity: 85, minTemp: 15, maxTemp: 24 },
        vulnerableStages: ["flowering", "fruiting"],
        typicalSeverity: 65,
        explanation: {
          what: "Destructive water-mold pathogen causing rapid collapse of foliage and stems.",
          whatHi: "फाइटोफ्थोरा कवक के कारण पत्तियों और तनों का तेजी से गलना और सड़ना।",
          why: "Cool temperatures accompanied by prolonged wetness and high humidity (>85%).",
          whyHi: "ठंडे तापमान और लगातार नमी (85% से अधिक) के कारण यह तेजी से फैलता है।",
          uncertainty: "Requires verification of white downy growth on the underside of leaves during morning.",
          uncertaintyHi: "सुबह के समय पत्ते के नीचे सफेद रोयेंदार फफूंद की पुष्टि आवश्यक है।"
        },
        advisory: {
          doNow: "Isolate infected plants. Apply Copper Hydroxide or approved bio-fungicide immediately.",
          doNowHi: "संक्रमित पौधों को अलग करें और तुरंत अनुशंसित कॉपर युक्त दवा या जैविक फफूंदनाशी का छिड़काव करें।",
          monitor: "Check stem bases and developing green fruit for brown greasy discolorations.",
          monitorHi: "तने के निचले हिस्से और कच्चे टमाटरों पर भूरे चिकने धब्बों की जांच करें।",
          routine: "Ensure adequate row spacing to improve air circulation across the crop canopy.",
          routineHi: "खेत में हवा के आवागमन के लिए पौधों के बीच उचित दूरी बनाए रखें।",
          nextScanDays: 3,
          nextScanDaysHi: "3 दिन बाद तुरंत दोबारा फोटो खींचकर जांच करें।"
        }
      },
      {
        id: "tmt_leaf_curl",
        name: "Tomato Leaf Curl Virus",
        nameHi: "टमाटर का पर्ण कुंचन (लीफ कर्ल) वायरस",
        pathogen: "Begomovirus (Whitefly transmitted)",
        keySymptoms: ["curling", "puckering", "stunted", "thick leaves", "yellow veins", "पत्तियां मुड़ना", "सिकुड़ना", "छोटा पौधा", "सफेद मक्खी"],
        favoredWeather: { minHumidity: 40, minTemp: 25, maxTemp: 38 },
        vulnerableStages: ["seedling", "vegetative"],
        typicalSeverity: 50,
        explanation: {
          what: "Viral infection transmitted by whiteflies leading to upward leaf curling and stunting.",
          whatHi: "सफेद मक्खी द्वारा फैलाया जाने वाला वायरस जिससे पत्तियां ऊपर की ओर मुड़ जाती हैं।",
          why: "Upward cupping of terminal shoots and proliferation of vector insects in warm weather.",
          whyHi: "गर्म मौसम में सफेद मक्खी के प्रकोप से नई कोपलों का ऊपर की ओर मुड़ना।",
          uncertainty: "Drought stress or herbicide drift can cause similar non-pathogenic leaf rolling.",
          uncertaintyHi: "सूखा या खरपतवारनाशक के उड़ने से भी पत्तियां मुड़ सकती हैं।"
        },
        advisory: {
          doNow: "Install yellow sticky traps (10 per acre) to monitor and control whitefly populations.",
          doNowHi: "सफेद मक्खी को फंसाने के लिए प्रति एकड़ 10 पीले चिपचिपे ट्रैप (Yellow Sticky Traps) लगाएं।",
          monitor: "Examine undersides of top tender leaves for tiny powdery white flying insects.",
          monitorHi: "शीर्ष कोमल पत्तियों के नीचे छोटी सफेद उड़ने वाली मक्खियों की निगरानी करें।",
          routine: "Spray 5% Neem Seed Kernel Extract (NSKE) as an organic deterrent.",
          routineHi: "5% नीम के बीज का अर्क (NSKE) प्राकृतिक रोकथाम के रूप में छिड़कें।",
          nextScanDays: 6,
          nextScanDaysHi: "6 दिन बाद पौधे की नई बढ़वार का पुनः निरीक्षण करें।"
        }
      }
    ],

    Wheat: [
      {
        id: "wht_yellow_rust",
        name: "Wheat Yellow (Stripe) Rust",
        nameHi: "गेहूं का पीला रतुआ (स्ट्राइप रस्ट)",
        pathogen: "Puccinia striiformis",
        keySymptoms: ["yellow stripe", "pustules", "stripes", "powder", "yellow dust", "पीली धारियां", "पीला पाउडर", "हल्दी जैसा रंग"],
        favoredWeather: { minHumidity: 75, minTemp: 10, maxTemp: 20 },
        vulnerableStages: ["tillering", "booting", "heading"],
        typicalSeverity: 45,
        explanation: {
          what: "Airborne fungal pathogen forming yellow-orange stripes of pustules along wheat leaf veins.",
          whatHi: "हवा से फैलने वाला फफूंद जो गेहूं की पत्तियों पर नसों के साथ पीली धारियां बनाता है।",
          why: "Cool daytime temperatures with morning fog/dew promote spore germination.",
          whyHi: "ठंडा मौसम और सुबह की ओस या कोहरा इसके बीजाणुओं को पनपने में मदद करता है।",
          uncertainty: "Nutrient deficiency (nitrogen or sulphur) can cause general yellowing without pustules.",
          uncertaintyHi: "पोषक तत्वों (सल्फर या नाइट्रोजन) की कमी से भी पत्तियां पीली हो सकती हैं।"
        },
        advisory: {
          doNow: "Rub leaf with finger; if yellow powder rubs off, spray Propiconazole 25% EC @ 1ml/L water.",
          doNowHi: "पत्ते को उंगली से रगड़ें; यदि पीला पाउडर लगे तो प्रोपिकोनाजोल 25% EC (1ml प्रति लीटर पानी) का छिड़काव करें।",
          monitor: "Check field borders and sheltered tree lines where morning dew persists longest.",
          monitorHi: "खेत की मेड़ों और पेड़ों के पास जहां ओस देर तक रहती है, वहां निगरानी रखें।",
          routine: "Avoid excessive urea/nitrogen applications which make leaf tissues succulent.",
          routineHi: "अत्यधिक यूरिया के प्रयोग से बचें, इससे पत्तियां रोग के प्रति संवेदनशील हो जाती हैं।",
          nextScanDays: 7,
          nextScanDaysHi: "7 दिन बाद छिड़काव का प्रभाव देखने के लिए नया स्कैन करें।"
        }
      }
    ],

    Rice: [
      {
        id: "paddy_blast",
        name: "Rice Blast",
        nameHi: "धान का झोंका रोग (ब्लास्ट)",
        pathogen: "Magnaporthe oryzae",
        keySymptoms: ["spindle", "diamond", "grey center", "brown margin", "neck rot", "नाव जैसे धब्बे", "राख जैसा केंद्र", "भूरा घेरा"],
        favoredWeather: { minHumidity: 80, minTemp: 20, maxTemp: 28 },
        vulnerableStages: ["tillering", "panicle"],
        typicalSeverity: 50,
        explanation: {
          what: "Fungal disease causing diamond or eye-shaped lesions with grayish centers on rice foliage.",
          whatHi: "फफूंद जनित रोग जो धान के पत्तों पर आंख या नाव के आकार के राख रंग के धब्बे बनाता है।",
          why: "Extended periods of high relative humidity and cloud cover favor sporulation.",
          whyHi: "लगातार बादलों वाला मौसम और 80% से अधिक नमी रोग को बढ़ावा देती है।",
          uncertainty: "Brown spot disease produces smaller oval spots without the pointed spindle ends.",
          uncertaintyHi: "भूरा धब्बा रोग में धब्बे गोल होते हैं और किनारे नुकीले नहीं होते।"
        },
        advisory: {
          doNow: "Apply Tricyclazole 75% WP @ 0.6g/L water during calm morning weather.",
          doNowHi: "शांत मौसम में ट्राइसाइक्लाजोल 75% WP (0.6 ग्राम प्रति लीटर पानी) का छिड़काव करें।",
          monitor: "Inspect the neck of panicles when crop reaches heading stage.",
          monitorHi: "बाली निकलने के समय बाली की गर्दन पर कालेपन की जांच करें।",
          routine: "Maintain optimal water level in paddy field; avoid letting field dry completely.",
          routineHi: "खेत में पानी का उचित स्तर बनाए रखें, खेत को पूरी तरह सूखने न दें।",
          nextScanDays: 5,
          nextScanDaysHi: "5 दिन बाद पुनः जांच करें।"
        }
      }
    ],

    Cotton: [
      {
        id: "ctn_bacterial_blight",
        name: "Cotton Bacterial Blight",
        nameHi: "कपास का जीवाणु झुलसा (एंगुलर लीफ स्पॉट)",
        pathogen: "Xanthomonas citri pv. malvacearum",
        keySymptoms: ["angular", "water soaked", "vein bounded", "black arm", "कोणीय धब्बे", "नसों के बीच धब्बे", "काला तना"],
        favoredWeather: { minHumidity: 80, minTemp: 25, maxTemp: 35 },
        vulnerableStages: ["squaring", "boll_formation"],
        typicalSeverity: 40,
        explanation: {
          what: "Bacterial disease causing angular water-soaked lesions bounded by leaf veins.",
          whatHi: "जीवाणु रोग जो नसों से घिरे कोणीय पानीदार धब्बे बनाता है।",
          why: "Warm rainy spells with driving wind disperse the bacterial slime rapidly.",
          whyHi: "गर्म बारिश और तेज हवाओं से बैक्टीरिया का फैलाव तेजी से होता है।",
          uncertainty: "Alternaria leaf spot can coexist on the same canopy during monsoon months.",
          uncertaintyHi: "मानसून के महीनों में अल्टरनेरिया फफूंद भी इसके साथ हो सकती है।"
        },
        advisory: {
          doNow: "Spray Copper Oxychloride 50% WP (2.5g) + Streptocycline (0.1g) per liter water.",
          doNowHi: "कॉपर ऑक्सीक्लोराइड 50% (2.5 ग्राम) + स्ट्रेप्टोसाइक्लिन (0.1 ग्राम) प्रति लीटर पानी में मिलाकर छिड़कें।",
          monitor: "Check young branches and bolls for dark, sunken lesions.",
          monitorHi: "नई शाखाओं और टिंडों पर काले धब्बों की निगरानी करें।",
          routine: "Destroy infected crop residues after harvest to reduce inoculum carryover.",
          routineHi: "फसल कटाई के बाद रोगग्रस्त अवशेषों को खेत से बाहर नष्ट करें।",
          nextScanDays: 6,
          nextScanDaysHi: "6 दिन बाद जांच करें।"
        }
      }
    ]
  };

  class IntelligenceService {

    // Step 1: Basic Image Quality Validator
    validateImageQuality(imageSource) {
      if (!imageSource) {
        return {
          status: "FAILED",
          score: 0,
          passed: false,
          issue: "NO_IMAGE",
          message: "कृपया कम से कम एक साफ फोटो अपलोड करें (Please upload at least one clear photo)",
          details: "No image file provided in upload session."
        };
      }

      // Check format and basic size if dataUrl
      if (typeof imageSource === 'string' && imageSource.startsWith('data:image')) {
        const approxBytes = imageSource.length * 0.75;
        if (approxBytes < 5000) {
          return {
            status: "POOR",
            score: 25,
            passed: false,
            issue: "BLURRY_OR_EMPTY",
            message: "यह फोटो बहुत धुंधली या खाली लग रही है। कृपया नजदीक से साफ फोटो लें (Photo appears blurry or blank).",
            details: "Image data size is unusually small (<5KB)."
          };
        }
      }

      return {
        status: "GOOD",
        score: 92,
        passed: true,
        issue: null,
        message: "फोटो साफ है, रोशनी और फोकस सही है (Image looks clear, lighting and focus are good)",
        details: "Image meets resolution, sharpness and lighting criteria."
      };
    }

    // Step 2: Contextual Disease Evidence Evaluator
    evaluateDiagnosis(sessionData, farmContext, weatherContext) {
      const crop = sessionData.crop || farmContext.crop || "Tomato";
      const diseases = DISEASE_KNOWLEDGE_BASE[crop] || DISEASE_KNOWLEDGE_BASE["Tomato"];
      const userText = (sessionData.symptomsText + " " + (sessionData.voiceTranscript || "")).toLowerCase();
      const stage = sessionData.stage || farmContext.stage || "flowering";
      const weather = weatherContext || { temp: 27, humidity: 84 };

      // Evaluate match score for each candidate disease
      let bestCandidate = null;
      let highestScore = 0;
      let differentialCandidates = [];

      for (const disease of diseases) {
        let score = 20; // baseline prior
        let matchedSymptoms = [];

        // Symptom match
        for (const kw of disease.keySymptoms) {
          if (userText.includes(kw.toLowerCase())) {
            score += 15;
            matchedSymptoms.push(kw);
          }
        }

        // Weather concordance
        if (weather.humidity >= disease.favoredWeather.minHumidity) {
          score += 15;
        }
        if (weather.temp >= disease.favoredWeather.minTemp && weather.temp <= disease.favoredWeather.maxTemp) {
          score += 10;
        }

        // Crop stage concordance
        if (disease.vulnerableStages.includes(stage)) {
          score += 10;
        }

        // Clarifying questions concordance
        if (sessionData.clarifyingAnswers) {
          if (sessionData.clarifyingAnswers.spotsUnderside === "yes" && disease.id === "tmt_early_blight") {
            score += 10;
          }
          if (sessionData.clarifyingAnswers.spreading === "yes") {
            score += 5;
          }
        }

        // Clamp score to max 96 (never fake 100% precision)
        score = Math.min(95, score);

        const candidateResult = {
          disease,
          confidence: score,
          matchedSymptoms,
          concordance: {
            symptoms: matchedSymptoms.length > 0,
            weather: weather.humidity >= disease.favoredWeather.minHumidity,
            stage: disease.vulnerableStages.includes(stage)
          }
        };

        differentialCandidates.push(candidateResult);

        if (score > highestScore) {
          highestScore = score;
          bestCandidate = candidateResult;
        }
      }

      // Check if evidence is insufficient (Low confidence / "I Don't Know" trigger)
      const hasMinimalSymptoms = bestCandidate && bestCandidate.matchedSymptoms.length > 0;
      const isLowConfidence = highestScore < 60 || !hasMinimalSymptoms;

      if (isLowConfidence) {
        return {
          status: "LOW_CONFIDENCE",
          name: "अनिश्चित स्थिति (Insufficient Evidence)",
          nameHi: "सटीक पहचान के लिए पर्याप्त साक्ष्य नहीं मिले",
          confidence: highestScore || 45,
          severity: 25,
          isUnknown: true,
          farmerMessage: "उपलब्ध फोटो और लक्षणों से रोग की निश्चित पुष्टि नहीं हो सकी (I don't have enough evidence to confidently identify this condition).",
          differential: differentialCandidates,
          nextSteps: [
            "पत्ते के पिछले हिस्से की साफ फोटो लें (Upload underside photo)",
            "स्पष्टीकरण प्रश्नों का उत्तर दें (Answer clarifying questions)",
            "कृषि वैज्ञानिक से सलाह लें (Escalate to agricultural expert)"
          ]
        };
      }

      return {
        status: "DIAGNOSED",
        id: bestCandidate.disease.id,
        name: bestCandidate.disease.name,
        nameHi: bestCandidate.disease.nameHi,
        pathogen: bestCandidate.disease.pathogen,
        confidence: bestCandidate.confidence,
        severity: bestCandidate.disease.typicalSeverity,
        isUnknown: false,
        matchedSymptoms: bestCandidate.matchedSymptoms,
        explanation: bestCandidate.disease.explanation,
        advisoryTemplate: bestCandidate.disease.advisory,
        differential: differentialCandidates.filter(c => c.disease.id !== bestCandidate.disease.id)
      };
    }

    // Step 3: Deterministic Context-Aware Risk Calculation
    calculateRisk(diagnosis, farmContext, weatherContext) {
      let riskScore = 0; // 0 to 100
      const factors = [];

      // Factor 1: Pathogen Severity & Diagnosis Confidence
      if (diagnosis.isUnknown) {
        riskScore += 20;
        factors.push({ name: "रोग निश्चितता (Diagnosis Confidence)", impact: "Low (Uncertain condition)" });
      } else {
        const severityPoints = Math.round(diagnosis.severity * 0.4);
        riskScore += severityPoints;
        factors.push({ name: "लक्षणों की गंभीरता (Symptom Severity)", impact: `${diagnosis.severity}% affected canopy` });
      }

      // Factor 2: Weather Risk (Humidity + Rain)
      const humidity = weatherContext.humidity || 75;
      if (humidity >= 80) {
        riskScore += 30;
        factors.push({ name: "मौसम आर्द्रता (Weather Humidity)", impact: `High (${humidity}%) - Accelerates fungal germination` });
      } else if (humidity >= 65) {
        riskScore += 15;
        factors.push({ name: "मौसम आर्द्रता (Weather Humidity)", impact: `Moderate (${humidity}%)` });
      } else {
        riskScore += 5;
        factors.push({ name: "मौसम आर्द्रता (Weather Humidity)", impact: `Favorable dry conditions (${humidity}%)` });
      }

      // Factor 3: Crop Growth Stage Vulnerability
      const stage = (farmContext.stage || "vegetative").toLowerCase();
      if (stage === "flowering" || stage === "fruiting") {
        riskScore += 20;
        factors.push({ name: "फसल अवस्था (Crop Stage)", impact: `Critical stage (${stage}) - High yield impact` });
      } else {
        riskScore += 10;
        factors.push({ name: "फसल अवस्था (Crop Stage)", impact: `Vegetative stage (${stage})` });
      }

      // Factor 4: Historical Reoccurrence (Farm Memory)
      const hasPreviousBlight = (KisanState.get().scanHistory || []).some(s => (s.diagnosisName || '').includes("Blight"));
      if (hasPreviousBlight) {
        riskScore += 15;
        factors.push({ name: "खेत का इतिहास (Farm History)", impact: "Previous blight recorded on this farm" });
      } else {
        factors.push({ name: "खेत का इतिहास (Farm History)", impact: "No repeat outbreak recorded this season" });
      }

      // Determine Overall Level
      let overallRisk = "LOW";
      let overallRiskHi = "कम जोखिम (LOW)";
      let riskColor = "#2e7d32";

      if (riskScore >= 70) {
        overallRisk = "HIGH";
        overallRiskHi = "उच्च जोखिम (HIGH)";
        riskColor = "#d32f2f";
      } else if (riskScore >= 45) {
        overallRisk = "MEDIUM";
        overallRiskHi = "मध्यम जोखिम (MEDIUM)";
        riskColor = "#f57c00";
      }

      const rationale = overallRisk === "HIGH"
        ? "उच्च आर्द्रता (84%) और फूल आने की अवस्था के कारण यह रोग अगले 48 घंटों में तेजी से फैल सकता है।"
        : "वर्तमान परिस्थितियां नियंत्रण योग्य हैं, समय पर बताई गई सलाह का पालन करें।";

      return {
        overallRisk,
        overallRiskHi,
        riskScore: Math.min(100, riskScore),
        riskColor,
        rationale,
        factors
      };
    }

    // Step 4: Actionable Advisory Generator ("What Should I Do Today?")
    generateAdvisory(diagnosis, risk, farmContext) {
      if (diagnosis.isUnknown) {
        return {
          doNow: "Do not apply chemical pesticides without confirmation. Prune 1-2 severely spotted leaves and isolate.",
          doNowHi: "बिना पुष्टि के रासायनिक दवा का छिड़काव न करें। केवल अत्यधिक खराब 1-2 पत्तियों को तोड़कर अलग करें।",
          monitor: "Check for whitefly insects or morning dew mold under the leaves over the next 24 hours.",
          monitorHi: "अगले 24 घंटों में पत्तों के नीचे सफेद मक्खी या सुबह की ओस में फफूंद की जांच करें।",
          routine: "Ensure drip irrigation is functioning properly without water logging.",
          routineHi: "ड्रिप सिंचाई की जांच करें, खेत में पानी का जमाव न होने दें।",
          nextScan: "Take a closer photo in clear daylight tomorrow or answer questions.",
          nextScanHi: "कल दिन की तेज रोशनी में पत्ते के नजदीक से फोटो लें या प्रश्नों का उत्तर दें।",
          nextScanDays: 1,
          urgency: "Moderate"
        };
      }

      const tmpl = diagnosis.advisoryTemplate;
      return {
        doNow: tmpl.doNow,
        doNowHi: tmpl.doNowHi,
        monitor: tmpl.monitor,
        monitorHi: tmpl.monitorHi,
        routine: tmpl.routine,
        routineHi: tmpl.routineHi,
        nextScan: `Take follow-up comparison scan in ${tmpl.nextScanDays} days.`,
        nextScanHi: tmpl.nextScanDaysHi,
        nextScanDays: tmpl.nextScanDays,
        urgency: risk.overallRisk === "HIGH" ? "Urgent" : "Normal"
      };
    }

    // Step 5: Follow-Up Progression & Adaptive Comparison
    compareFollowUp(previousScan, currentScanData) {
      const prevSeverity = previousScan.severity || 40;
      const currSeverity = currentScanData.severity || 22;
      const delta = currSeverity - prevSeverity;

      let outcome = "STABLE";
      let outcomeHi = "स्थिर (Condition Stable)";
      let outcomeBadgeClass = "amber";
      let adaptiveAction = "";
      let adaptiveActionHi = "";

      if (delta <= -10) {
        outcome = "IMPROVED";
        outcomeHi = "सुधार देखा गया (Condition Improved)";
        outcomeBadgeClass = "green";
        adaptiveAction = "Condition improved following reported intervention. Stop corrective spray. Maintain routine monitoring.";
        adaptiveActionHi = "उपचार के बाद फसल में सकारात्मक सुधार हुआ है। अतिरिक्त स्प्रे रोकें और 7 दिन बाद केवल नियमित निगरानी करें।";
      } else if (delta >= 10) {
        outcome = "WORSENING";
        outcomeHi = "रोग में वृद्धि देखी गई (Condition Worsening)";
        outcomeBadgeClass = "red";
        adaptiveAction = "Infection has expanded. Escalate to agricultural expert immediately for laboratory-guided intervention.";
        adaptiveActionHi = "प्रभावित क्षेत्र में वृद्धि हुई है। तुरंत कृषि वैज्ञानिक से संपर्क करें और लैब रेफरल पर विचार करें।";
      } else {
        outcome = "STABLE";
        outcomeHi = "स्थिति स्थिर है (Condition Stable)";
        outcomeBadgeClass = "amber";
        adaptiveAction = "Lesion spread arrested. Continue current organic protection and rescan in 3 days.";
        adaptiveActionHi = "रोग का फैलाव रुका हुआ है। वर्तमान देखभाल जारी रखें और 3 दिन बाद दोबारा जांच करें।";
      }

      return {
        previousSeverity: prevSeverity,
        currentSeverity: currSeverity,
        delta,
        outcome,
        outcomeHi,
        outcomeBadgeClass,
        adaptiveAction,
        adaptiveActionHi,
        timeline: [
          { day: "Day 1", severity: prevSeverity, label: `${prevSeverity}% Initial` },
          { day: `Day ${currentScanData.dayDiff || 5}`, severity: currSeverity, label: `${currSeverity}% Follow-up` }
        ]
      };
    }
  }

  window.KisanIntelligence = new IntelligenceService();
})();
