// Kisan Saathi 2.0 - Complete Application Controller & Event Router
let currentScreenId = 1;
let currentUploadSlot = 'leafFront';
let selectedRating = 5;
let speechRecognizer = null;

document.addEventListener('DOMContentLoaded', () => {
  // Subscribe to state changes to update header and details panel
  KisanState.subscribe(state => {
    updateStateUI(state);
  });

  renderCatalog();
  loadScreen(1);
  updateClock();
  setInterval(updateClock, 1000);
});

function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const el = document.getElementById('statusTime');
  if (el) el.textContent = `${hours}:${minutes}`;
}

function updateStateUI(state) {
  // Update header badges
  const roleLabels = {
    farmer: '👨‍🌾 Farmer Mode',
    expert: '🧑‍🔬 Extension Expert',
    lab: '🔬 Lab Analyst',
    admin: '🏛️ Govt / Admin'
  };
  const roleEl = document.getElementById('currentRoleLabel');
  if (roleEl) roleEl.textContent = roleLabels[state.role] || 'Farmer Mode';

  const langLabels = {
    hi: 'हिन्दी (Hindi)',
    en: 'English',
    pa: 'ਪੰਜਾਬੀ (Punjabi)'
  };
  const langEl = document.getElementById('currentLangLabel');
  if (langEl) langEl.textContent = langLabels[state.language] || 'हिन्दी';

  const offIcon = document.getElementById('offlineIcon');
  const offLabel = document.getElementById('offlineLabel');
  const connBadge = document.getElementById('connBadge');
  if (offIcon) offIcon.textContent = state.isOffline ? '🟠' : '🟢';
  if (offLabel) offLabel.textContent = state.isOffline ? 'Offline' : 'Online';
  if (connBadge) connBadge.textContent = state.isOffline ? 'OFFLINE' : '5G';

  // Debug Box in Right Panel
  const farm = KisanState.getActiveFarm();
  const debugBox = document.getElementById('stateDebugBox');
  if (debugBox) {
    debugBox.innerHTML = `
      • <strong>Active Farm:</strong> ${farm.name} (${farm.crop})<br>
      • <strong>Health Score:</strong> ${farm.healthScore}/100<br>
      • <strong>Recent Scans:</strong> ${state.scanHistory.length} recorded<br>
      • <strong>Expert Cases:</strong> ${state.expertCases.length} in queue<br>
      • <strong>Offline Queue:</strong> ${state.offlineQueue.length} pending items
    `;
  }
}

function renderCatalog(filterText = '') {
  const list = document.getElementById('screensList');
  if (!list) return;
  list.innerHTML = '';

  const screens = window.KISAN_SCREENS || [];
  const state = KisanState.get();

  screens.forEach(s => {
    const titleText = state.language === 'hi' ? s.titleHi : (state.language === 'pa' ? s.titlePa : s.title);
    if (filterText && !s.title.toLowerCase().includes(filterText.toLowerCase()) && !titleText.toLowerCase().includes(filterText.toLowerCase())) {
      return;
    }

    const item = document.createElement('div');
    item.className = `catalog-item ${s.id === currentScreenId ? 'active' : ''}`;
    item.onclick = () => goToScreen(s.id);

    item.innerHTML = `
      <div class="cat-num">${s.id}</div>
      <div class="cat-info">
        <div class="cat-title">${titleText}</div>
        <div class="cat-subtitle">${s.tagline}</div>
      </div>
    `;
    list.appendChild(item);
  });
}

function filterScreens() {
  const query = document.getElementById('screenSearchInput').value;
  renderCatalog(query);
}

function loadScreen(id) {
  currentScreenId = id;
  const state = KisanState.get();
  state.currentScreenId = id;

  const screens = window.KISAN_SCREENS || [];
  const screen = screens.find(s => s.id === id) || screens[0];

  // Update navigation counters
  const counterEl = document.getElementById('screenCounter');
  if (counterEl) counterEl.textContent = `Screen ${screen.id} of 33`;

  // Update details panel
  const title = state.language === 'hi' ? screen.titleHi : (state.language === 'pa' ? screen.titlePa : screen.title);
  const tagline = state.language === 'hi' ? screen.taglineHi : screen.tagline;
  const desc = state.language === 'hi' ? screen.descriptionHi : screen.description;

  const titleEl = document.getElementById('screenDetailTitle');
  const taglineEl = document.getElementById('screenDetailTagline');
  const descEl = document.getElementById('screenDetailDesc');
  if (titleEl) titleEl.textContent = `${screen.id}. ${title}`;
  if (taglineEl) taglineEl.textContent = tagline;
  if (descEl) descEl.textContent = desc;

  // Widget chips
  const chipsContainer = document.getElementById('widgetChipsContainer');
  if (chipsContainer) {
    chipsContainer.innerHTML = '';
    (screen.widgets || []).forEach(w => {
      const chip = document.createElement('span');
      chip.className = 'chip';
      chip.textContent = w;
      chipsContainer.appendChild(chip);
    });
  }

  // Prompt box
  const promptBox = document.getElementById('promptTextContainer');
  if (promptBox) promptBox.textContent = screen.prompt || 'Stitch specification prompt loaded.';

  // Highlight active in catalog
  document.querySelectorAll('.catalog-item').forEach((el, idx) => {
    el.classList.toggle('active', (idx + 1) === id);
  });

  // Render the Screen UI using KisanScreenRenderers
  const container = document.getElementById('visualContainer');
  if (container) {
    container.innerHTML = '';
    if (window.KisanScreenRenderers && window.KisanScreenRenderers[id]) {
      window.KisanScreenRenderers[id](container);
    } else {
      container.innerHTML = `<div class="p-4 text-center">Screen ${id} renderer not found.</div>`;
    }
  }

  // Scroll to top
  const wrapper = document.getElementById('screenWrapper');
  if (wrapper) wrapper.scrollTop = 0;

  updateStateUI(state);
}

function goToScreen(id) {
  if (id >= 1 && id <= 33) {
    loadScreen(id);
  }
}

function goToNextScreen() {
  const next = currentScreenId < 33 ? currentScreenId + 1 : 1;
  goToScreen(next);
}

function goToPrevScreen() {
  const prev = currentScreenId > 1 ? currentScreenId - 1 : 33;
  goToScreen(prev);
}

function triggerKeyAction() {
  const screens = window.KISAN_SCREENS || [];
  const screen = screens.find(s => s.id === currentScreenId);
  if (screen && screen.nextScreen) {
    goToScreen(screen.nextScreen);
  } else {
    goToNextScreen();
  }
}

/* ==========================================================================
   INTERACTIVE SCREEN ACTIONS & DATA FLOW
   ========================================================================== */

// Language Controls
function setLanguage(lang) {
  const state = KisanState.get();
  state.language = lang;
  KisanState.saveState();
  renderCatalog(document.getElementById('screenSearchInput')?.value || '');
  loadScreen(currentScreenId);
}

function cycleLanguage() {
  const state = KisanState.get();
  const next = state.language === 'hi' ? 'en' : (state.language === 'en' ? 'pa' : 'hi');
  setLanguage(next);
}

function playSampleVoice(lang) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const samples = {
    hi: "नमस्ते, किसान साथी में आपका स्वागत है।",
    en: "Welcome to Kisan Saathi, your crop health companion.",
    pa: "ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ, ਕਿਸਾਨ ਸਾਥੀ ਵਿਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ।"
  };
  const u = new SpeechSynthesisUtterance(samples[lang] || samples.hi);
  u.lang = lang === 'hi' ? 'hi-IN' : (lang === 'pa' ? 'pa-IN' : 'en-IN');
  window.speechSynthesis.speak(u);
}

// Role Switcher
function toggleRole() {
  const state = KisanState.get();
  const roles = ['farmer', 'expert', 'lab', 'admin'];
  const nextIdx = (roles.indexOf(state.role) + 1) % roles.length;
  state.role = roles[nextIdx];
  KisanState.saveState();

  if (state.role === 'farmer') goToScreen(5);
  else if (state.role === 'expert') goToScreen(24);
  else if (state.role === 'lab') goToScreen(26);
  else if (state.role === 'admin') goToScreen(30);
}

// Offline Mode Toggle & Sync
function toggleOfflineMode() {
  const state = KisanState.get();
  state.isOffline = !state.isOffline;
  KisanState.saveState();

  const toast = document.getElementById('syncToast');
  if (state.isOffline) {
    showToast('⚠️ ऑफ़लाइन मोड चालू: बुनियादी जांच और कैश्ड सलाह उपलब्ध हैं।');
    goToScreen(17);
  } else {
    showToast('🟢 ऑनलाइन कनेक्शन बहाल! डेटा सिंक्रनाइज़ेशन तैयार।');
    goToScreen(17);
  }
}

function showToast(msg) {
  const toast = document.getElementById('syncToast');
  if (toast) {
    toast.textContent = msg;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 4000);
  }
}

function syncOfflineQueueNow() {
  const count = KisanState.syncOfflineQueue();
  showToast(`⚡ ${count} रिकॉर्ड्स सफलतापूर्वक केंद्रीय सर्वर में सिंक हो गए!`);
  loadScreen(17);
}

// Demo Dropdown Modal
function toggleDemoDropdown() {
  const modal = document.getElementById('demoModal');
  if (modal) {
    modal.style.display = modal.style.display === 'none' ? 'block' : 'none';
  }
}

// Screen 3: Login Actions
function sendDemoOTP() {
  showToast('🔑 आपका सत्यापन कोड (OTP) है: 4829');
  document.getElementById('otp1').value = '4';
  document.getElementById('otp2').value = '8';
  document.getElementById('otp3').value = '2';
  document.getElementById('otp4').value = '9';
}

function submitLogin() {
  const name = document.getElementById('loginName')?.value.trim() || 'Ramesh Kumar';
  const phone = document.getElementById('loginPhone')?.value.trim() || '9876543210';

  if (phone.length < 10) {
    alert('कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें। (Please enter valid 10-digit number)');
    return;
  }

  const state = KisanState.get();
  state.farmer.name = name;
  state.farmer.phone = phone;
  KisanState.saveState();
  showToast(`✓ नमस्ते ${name}, आपकी प्रोफ़ाइल सुरक्षित हो गई।`);
  goToScreen(4);
}

// Screen 4: Farm Setup
function fetchGPSLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const str = `करनाल (GPS: ${pos.coords.latitude.toFixed(2)}° N, ${pos.coords.longitude.toFixed(2)}° E)`;
        document.getElementById('farmLocation').value = str;
        showToast('📍 GPS लोकेशन सफलतापूर्वक प्राप्त हुई!');
      },
      err => {
        document.getElementById('farmLocation').value = 'करनाल, हरियाणा (29.68° N, 76.99° E)';
        showToast('📍 डिफॉल्ट GPS निर्देशांक सेट किए गए।');
      }
    );
  } else {
    document.getElementById('farmLocation').value = 'करनाल, हरियाणा (29.68° N, 76.99° E)';
  }
}

function stepArea(delta) {
  const el = document.getElementById('farmArea');
  if (el) {
    let val = parseFloat(el.value) || 1.0;
    val = Math.max(0.5, Math.min(50, val + delta));
    el.value = val.toFixed(1);
  }
}

let selectedCropData = { en: 'Tomato', hi: 'टमाटर' };

function selectCropChip(el, cropEn, cropHi) {
  document.querySelectorAll('.crop-chips-grid .chip-item').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  selectedCropData = { en: cropEn, hi: cropHi };
}

function submitFarmSetup() {
  const name = document.getElementById('farmName')?.value.trim() || 'उत्तर खेत (North Field)';
  const area = parseFloat(document.getElementById('farmArea')?.value) || 2.5;
  const irrigation = document.getElementById('farmIrrigation')?.value || 'Drip';

  const newFarm = KisanState.addFarm({
    name,
    crop: selectedCropData.en,
    cropHi: selectedCropData.hi,
    area,
    irrigation,
    stage: 'flowering'
  });

  showToast(`✓ खेत "${newFarm.name}" सुरक्षित हुआ!`);
  goToScreen(5);
}

function selectActiveFarm(farmId) {
  const state = KisanState.get();
  state.activeFarmId = farmId;
  KisanState.saveState();
  showToast('खेत बदला गया।');
  loadScreen(currentScreenId);
}

// Screen 7: Multimodal Crop Scan Input
function triggerSlotUpload(slotKey) {
  currentUploadSlot = slotKey;
  const input = document.getElementById('slotFileInput');
  if (input) input.click();
}

function handleSlotFilePicked(inputEl) {
  if (inputEl.files && inputEl.files[0]) {
    const file = inputEl.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const state = KisanState.get();
      state.currentScanSession.images[currentUploadSlot] = dataUrl;
      state.currentScanSession.imageCount++;

      // Run quality check on actual file
      const q = KisanIntelligence.validateImageQuality(dataUrl);
      state.currentScanSession.imageQuality = q;
      KisanState.saveState();

      showToast(`📸 ${currentUploadSlot} फोटो अपलोड हुई!`);
      loadScreen(7);
    };
    reader.readAsDataURL(file);
  }
}

function loadSampleLeafPhoto() {
  const state = KisanState.get();
  state.currentScanSession.images.leafFront = '../generated_screens/screen_01.png';
  state.currentScanSession.imageCount = 1;
  state.currentScanSession.imageQuality = {
    status: 'GOOD',
    score: 94,
    message: 'फोटो साफ है, रोशनी और फोकस सही है।'
  };
  KisanState.saveState();
  showToast('✓ सैंपल पत्ता फोटो लोड की गई!');
  loadScreen(7);
}

function appendSymptomTag(tagText) {
  const txt = document.getElementById('symptomsInput');
  if (txt) {
    txt.value = (txt.value ? txt.value + ', ' : '') + tagText;
    KisanState.get().currentScanSession.symptomsText = txt.value;
  }
}

function submitScanForAnalysis() {
  const txt = document.getElementById('symptomsInput')?.value || '';
  const state = KisanState.get();
  state.currentScanSession.symptomsText = txt;

  // Validate at least 1 image exists or symptoms entered
  const hasImg = Object.values(state.currentScanSession.images).some(x => x !== null);
  if (!hasImg) {
    alert('कृपया कम से कम एक पत्ते की फोटो लें या सैंपल फोटो लोड करें। (Please take at least 1 photo)');
    return;
  }

  // Check image quality
  const leadImg = state.currentScanSession.images.leafFront || Object.values(state.currentScanSession.images).find(x => x !== null);
  const q = KisanIntelligence.validateImageQuality(leadImg);
  state.currentScanSession.imageQuality = q;
  KisanState.saveState();

  if (q.status === 'POOR' || q.status === 'FAILED') {
    goToScreen(8); // Go to quality check rejection
  } else {
    goToScreen(8); // Review quality screen, then proceed
  }
}

function proceedAfterQualityCheck() {
  const state = KisanState.get();
  const q = state.currentScanSession.imageQuality;
  if (q && (q.status === 'POOR' || q.status === 'FAILED')) {
    alert('कृपया साफ फोटो लें। धुंधली फोटो से गलत परिणाम का खतरा रहता है। (Please retake clearer photo)');
    goToScreen(7);
    return;
  }
  goToScreen(10); // Go to clarifying questions
}

// Screen 9: Voice Assistant Recording
function toggleSpeechRecording() {
  const btn = document.getElementById('voiceMicBtn');
  const label = document.getElementById('voiceStatusLabel');
  const box = document.getElementById('voiceTranscriptBox');

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition) {
    if (!speechRecognizer) {
      speechRecognizer = new SpeechRecognition();
      speechRecognizer.continuous = false;
      speechRecognizer.lang = 'hi-IN';

      speechRecognizer.onstart = () => {
        if (btn) btn.style.transform = 'scale(1.15)';
        if (label) label.textContent = '🔴 सुन रहा हूँ... बोलिए (Listening...)';
      };

      speechRecognizer.onresult = (e) => {
        const text = e.results[0][0].transcript;
        if (box) box.value = text;
        KisanState.get().currentScanSession.voiceTranscript = text;
        if (label) label.textContent = '✓ बात दर्ज कर ली गई! (Transcribed)';
        if (btn) btn.style.transform = 'scale(1)';
      };

      speechRecognizer.onerror = (e) => {
        if (label) label.textContent = 'माइक एरर। आप नीचे लिख भी सकते हैं।';
        if (btn) btn.style.transform = 'scale(1)';
      };

      speechRecognizer.onend = () => {
        if (btn) btn.style.transform = 'scale(1)';
      };
    }
    speechRecognizer.start();
  } else {
    // Fallback simulation with authentic Hindi transcription
    if (label) label.textContent = '🔴 रिकॉर्डिंग... (Simulating microphone input)';
    setTimeout(() => {
      const sampleVoice = 'टमाटर की निचली पत्तियों पर काले और भूरे रंग के गोल छल्लेदार धब्बे बन रहे हैं।';
      if (box) box.value = sampleVoice;
      KisanState.get().currentScanSession.voiceTranscript = sampleVoice;
      if (label) label.textContent = '✓ आवाज से लक्षण सफलतापूर्वक दर्ज हुए!';
    }, 1200);
  }
}

function confirmVoiceTranscript() {
  const box = document.getElementById('voiceTranscriptBox');
  const state = KisanState.get();
  if (box && box.value) {
    state.currentScanSession.voiceTranscript = box.value;
    state.currentScanSession.symptomsText = (state.currentScanSession.symptomsText ? state.currentScanSession.symptomsText + ' ' : '') + box.value;
  }
  KisanState.saveState();
  showToast('✓ आवाज से लक्षण दर्ज हुए!');
  goToScreen(10);
}

// Screen 10: Clarifying Questions
function setClarifyingAnswer(key, val) {
  const state = KisanState.get();
  state.currentScanSession.clarifyingAnswers[key] = val;
  KisanState.saveState();
  loadScreen(10);
}

function speakQuestionText(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'hi-IN';
  window.speechSynthesis.speak(u);
}

// Screen 11: Real Intelligence Pipeline Execution
function executeAnalysisAndProceed() {
  const state = KisanState.get();
  const farm = KisanState.getActiveFarm();

  // Run deterministic intelligence service
  const diag = KisanIntelligence.evaluateDiagnosis(state.currentScanSession, farm, state.weather);
  const risk = KisanIntelligence.calculateRisk(diag, farm, state.weather);
  const adv = KisanIntelligence.generateAdvisory(diag, risk, farm);

  state.currentScanSession.diagnosis = diag;
  state.currentScanSession.risk = risk;
  state.currentScanSession.advisory = adv;

  // Add scan into persistent Farm Memory History
  KisanState.addScanToHistory(state.currentScanSession);

  showToast('✓ फसल विश्लेषण पूर्ण!');
  goToScreen(12);
}

// Screen 15: "What Should I Do Today?"
function toggleActionDone(checkboxEl) {
  if (checkboxEl.checked) {
    showToast('✓ कार्य पूर्ण चिह्नित किया गया।');
  }
}

function markActionsCompleted() {
  KisanState.recordFarmerAction('Pruned infected lower leaves & maintained drip irrigation');
  showToast('✓ किसान कार्य फार्म डायरी में सुरक्षित हुआ!');
  goToScreen(16);
}

// Screen 16: Advisory Tabs
function switchAdvisoryTab(tabName) {
  document.querySelectorAll('.tab-pill-bar .tab-pill').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  const content = document.getElementById('advisoryTabContent');
  if (!content) return;

  if (tabName === 'organic') {
    content.innerHTML = `
      <div class="adv-detail-card">
        <div class="adv-sec-title">🌿 अनुशंसित जैविक उपचार (Organic Recommendation)</div>
        <div class="adv-recipe-box">
          <strong>नीम का तेल (Neem Oil 10,000 ppm):</strong> 5ml प्रति लीटर पानी में 1ml शैम्पू या साबुन के घोल के साथ मिलाकर शाम 4 बजे के बाद छिड़काव करें।
        </div>
      </div>
    `;
  } else if (tabName === 'precautions') {
    content.innerHTML = `
      <div class="adv-detail-card">
        <div class="adv-sec-title text-red">⚠️ सावधानियां: क्या न करें (What to Avoid)</div>
        <ul class="adv-avoid-list">
          <li>दोपहर की तेज धूप में किसी भी दवा का छिड़काव न करें।</li>
          <li>अत्यधिक यूरिया या नाइट्रोजन उर्वरक डालने से बचें।</li>
          <li>बिना विशेषज्ञ सलाह के एक साथ 2-3 रसायनों को न मिलाएं।</li>
        </ul>
      </div>
    `;
  } else {
    content.innerHTML = `
      <div class="adv-detail-card">
        <div class="adv-sec-title">🏛️ प्रमाणित कृषि स्रोत (ICAR / SAU Guideline)</div>
        <div class="text-xs text-muted">
          भारतीय कृषि अनुसंधान परिषद (ICAR) और राज्य कृषि विश्वविद्यालय के पैकेज ऑफ प्रैक्टिसेज पर आधारित।
        </div>
        <div class="helpline-box mt-2">
          <span>📞 किसान कॉल सेंटर (Toll-Free):</span>
          <a href="tel:18001801551" class="helpline-link">1800-180-1551</a>
        </div>
      </div>
    `;
  }
}

// Screen 19: Follow-Up Comparative Scan
let currentFollowUpMode = 'improved';

function loadSampleFollowUpPhoto(mode) {
  currentFollowUpMode = mode;
  const tag = document.getElementById('followUpSeverityTag');
  const cam = document.getElementById('followUpCamPlaceholder');
  if (mode === 'improved') {
    if (tag) { tag.textContent = '22% लक्षण कम हुए (Improved)'; tag.className = 'frame-sub text-green'; }
    if (cam) cam.innerHTML = `<img src="../generated_screens/screen_01.png" style="width:100%; height:100%; object-fit:cover; border-radius:8px;">`;
  } else {
    if (tag) { tag.textContent = '55% लक्षण बढ़े (Worsening)'; tag.className = 'frame-sub text-red'; }
    if (cam) cam.innerHTML = `<img src="../generated_screens/screen_01.png" style="width:100%; height:100%; object-fit:cover; border-radius:8px; filter:contrast(1.4) saturate(1.3);">`;
  }
  showToast(`सिम्युलेशन: ${mode === 'improved' ? 'सुधार (22%)' : 'रोग वृद्धि (55%)'}`);
}

function submitFollowUpComparison() {
  const state = KisanState.get();
  const prevScan = state.scanHistory[0] || { severity: 40 };
  const targetSeverity = currentFollowUpMode === 'improved' ? 22 : 55;

  const comparison = KisanIntelligence.compareFollowUp(prevScan, {
    severity: targetSeverity,
    dayDiff: 5
  });

  state.followUpRecords.unshift({
    id: "followup_" + Date.now(),
    farmId: state.activeFarmId,
    date: new Date().toISOString().split('T')[0],
    previousScanId: prevScan.id,
    currentScanId: "scan_followup_latest",
    previousSeverity: prevScan.severity,
    currentSeverity: targetSeverity,
    outcome: comparison.outcome,
    outcomeHi: comparison.outcomeHi,
    adaptiveAdvice: comparison.adaptiveAction
  });

  KisanState.saveState();
  showToast(`तुलना पूर्ण: ${comparison.outcomeHi}`);
  goToScreen(20);
}

function acceptAdaptivePlan() {
  showToast('✓ नई अनुकूली कार्ययोजना स्वीकृत हुई व रिमाइंडर सेट हुआ।');
  goToScreen(5);
}

// Screen 23-25: Expert Escalation & Review
function recordExpertVoiceNote() {
  const el = document.getElementById('expertVoiceNoteStatus');
  if (el) el.textContent = '✓ 12-सेकंड का आवाज संदेश संलग्न हुआ (Voice note attached)';
  showToast('🎙️ आवाज संदेश संलग्न किया गया।');
}

function submitCaseToExpertQueue() {
  const notes = document.getElementById('expertCaseNotes')?.value || 'Farmer escalated case.';
  const newCase = KisanState.createExpertCase(notes, true);
  showToast(`✓ केस #${newCase.id} कृषि वैज्ञानिक को भेजा गया!`);
  goToScreen(24);
}

function filterExpertQueue(filter) {
  document.querySelectorAll('.tab-pill-bar .tab-pill').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  const state = KisanState.get();
  let cases = state.expertCases || [];
  if (filter === 'URGENT') cases = cases.filter(c => c.priority === 'URGENT');
  else if (filter === 'RESOLVED') cases = cases.filter(c => c.status === 'EXPERT_RESPONDED');

  const list = document.getElementById('expertCasesList');
  if (!list) return;
  list.innerHTML = cases.map(c => `
    <div class="expert-case-card" onclick="openExpertCaseDetail('${c.id}')">
      <div class="flex-between">
        <div class="case-farmer-name">👨‍🌾 ${c.farmerName} (${c.village})</div>
        <span class="priority-badge ${c.priority.toLowerCase()}">${c.priority}</span>
      </div>
      <div class="case-crop-info">🌱 ${c.crop} • AI: ${c.diagnosisAI} (${c.confidenceAI}%)</div>
      <div class="case-symptoms-snippet">"${c.symptoms}"</div>
      <div class="flex-between mt-2">
        <span class="case-time">🕒 ${c.status}</span>
        <button class="btn-sm" onclick="event.stopPropagation(); openExpertCaseDetail('${c.id}');">
          केस खोलें →
        </button>
      </div>
    </div>
  `).join('');
}

function openExpertCaseDetail(caseId) {
  goToScreen(25);
}

function referCurrentCaseToLab(caseId) {
  KisanState.resolveExpertCase(caseId, 'Suspected Fungal / Bacterial Blight', 'Sample forwarded for PCR culture.', true);
  showToast('🧪 केस प्रयोगशाला (Laboratory) में रेफर कर दिया गया।');
  goToScreen(26);
}

function dispatchExpertAdvisory(caseId) {
  const notes = document.getElementById('expertAdvisoryInput')?.value || 'Apply Copper Oxychloride 50% WP @ 2.5g/L immediately.';
  KisanState.resolveExpertCase(caseId, 'Confirmed Tomato Early Blight', notes, false);
  showToast('📤 किसान को वैज्ञानिक परामर्श प्रेषित किया गया!');
  goToScreen(24);
}

function submitLabResult(referralId) {
  const res = document.getElementById('labResultInput')?.value || 'Confirmed: Alternaria solani (Early Blight) - Positive';
  showToast('📄 लैब रिपोर्ट जारी की गई और किसान केस अपडेट हुआ!');
  goToScreen(25);
}

// Screen 27: Notifications
function markAllNotificationsRead() {
  const state = KisanState.get();
  state.notifications.forEach(n => n.read = true);
  KisanState.saveState();
  showToast('सभी सूचनाएं पढ़ी हुई चिह्नित की गईं।');
  loadScreen(27);
}

function handleNotificationClick(actionScreenId) {
  goToScreen(actionScreenId);
}

// Screen 32: Feedback
function selectFeedbackSmiley(el, val) {
  document.querySelectorAll('.smileys-grid .smiley-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
}

function setRating(stars) {
  selectedRating = stars;
  document.querySelectorAll('.stars-row .star').forEach((s, idx) => {
    s.classList.toggle('active', idx < stars);
  });
}

function submitFarmerFeedback() {
  const comments = document.getElementById('feedbackComment')?.value || '';
  const state = KisanState.get();
  state.feedbackList.push({
    date: new Date().toISOString(),
    rating: selectedRating,
    comments
  });
  KisanState.saveState();
  showToast('🙏 आपकी राय दर्ज कर ली गई है। धन्यवाद!');
  goToScreen(5);
}

// Screen 33: Settings
function callHelpline() {
  alert('किसान कॉल सेंटर (टोल-फ्री नंबर 1800-180-1551) पर कॉल की जा रही है...');
}

function resetAllStateData() {
  if (confirm('क्या आप सभी डेटा को रीसेट करना चाहते हैं? (Reset all state?)')) {
    KisanState.resetToDefault();
    showToast('सभी डेटा डिफ़ॉल्ट पर रीसेट किया गया।');
    goToScreen(1);
  }
}

// Voice Readout for Screen
function speakCurrentScreen() {
  if (!('speechSynthesis' in window)) {
    alert('Audio synthesis not supported in this browser.');
    return;
  }
  window.speechSynthesis.cancel();

  const state = KisanState.get();
  const screens = window.KISAN_SCREENS || [];
  const screen = screens.find(s => s.id === currentScreenId);
  if (!screen) return;

  const textToSpeak = state.language === 'hi'
    ? `${screen.titleHi}। ${screen.taglineHi}। ${screen.descriptionHi}`
    : `${screen.title}. ${screen.tagline}. ${screen.description}`;

  const u = new SpeechSynthesisUtterance(textToSpeak);
  u.lang = state.language === 'hi' ? 'hi-IN' : (state.language === 'pa' ? 'pa-IN' : 'en-IN');
  u.rate = 0.95;

  const btn = document.getElementById('audioSpeakBtn');
  if (btn) {
    btn.style.background = '#f59e0b';
    btn.innerHTML = '<span>🔊</span> <span>बोल रहा हूँ... (Speaking)</span>';
  }

  u.onend = () => {
    if (btn) {
      btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      btn.innerHTML = '<span>🔊</span> <span>सलाह सुनें (Listen to Screen Advice)</span>';
    }
  };

  u.onerror = () => {
    if (btn) {
      btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      btn.innerHTML = '<span>🔊</span> <span>सलाह सुनें (Listen to Screen Advice)</span>';
    }
  };

  window.speechSynthesis.speak(u);
}
