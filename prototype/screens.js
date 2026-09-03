// Kisan Saathi 2.0 - Complete Interactive Screen Renderers for all 33 Screens
(function() {

  function getLangText(hi, en, pa) {
    const lang = KisanState.get().language;
    if (lang === 'hi') return hi;
    if (lang === 'pa') return pa || hi;
    return en;
  }

  const ScreenRenderers = {

    // Screen 1: Splash / Welcome
    1: function(container) {
      const state = KisanState.get();
      container.innerHTML = `
        <div class="screen-view splash-view">
          <div class="splash-hero">
            <div class="splash-logo-glow">🌱</div>
            <h1 class="splash-title">Kisan Saathi</h1>
            <h2 class="splash-title-hi">(किसान साथी)</h2>
            <p class="splash-tagline">${getLangText('आपकी फसल का सच्चा साथी', 'Your Crop Health Companion', 'ਤੁਹਾਡੀ ਫਸਲ ਦਾ ਸਾਥੀ')}</p>
          </div>

          <!-- Language Quick Picker -->
          <div class="splash-lang-card">
            <label class="form-label">${getLangText('भाषा चुनें / Choose Language', 'Select Language', 'ਭਾਸ਼ਾ ਚੁਣੋ')}</label>
            <div class="lang-pills">
              <button class="lang-pill ${state.language === 'hi' ? 'active' : ''}" onclick="setLanguage('hi')">हिन्दी</button>
              <button class="lang-pill ${state.language === 'en' ? 'active' : ''}" onclick="setLanguage('en')">English</button>
              <button class="lang-pill ${state.language === 'pa' ? 'active' : ''}" onclick="setLanguage('pa')">ਪੰਜਾਬੀ</button>
            </div>
          </div>

          <!-- Main Actions -->
          <div class="splash-actions">
            <button class="btn-primary" onclick="goToScreen(2)">
              <span>${getLangText('शुरू करें', 'Get Started', 'ਸ਼ੁਰੂ ਕਰੋ')}</span>
              <span>→</span>
            </button>
            <button class="btn-secondary" onclick="goToScreen(5)">
              <span>${getLangText('सीधे डैशबोर्ड देखें (अतिथि)', 'Continue as Guest', 'ਡੈਸ਼ਬੋਰਡ ਦੇਖੋ')}</span>
            </button>
          </div>

          <!-- Demo Scenarios Bar -->
          <div class="demo-scenarios-box">
            <div class="demo-box-title">🧪 ${getLangText('परीक्षण डेमो परिदृश्य (Demo Presets)', 'Hackathon Demo Presets', 'ਡੈਮੋ ਪ੍ਰੀਸੈਟਸ')}</div>
            <div class="demo-buttons-grid">
              <button class="btn-demo" onclick="KisanDemoPresets[0].apply()">1. सफल निदान (Success)</button>
              <button class="btn-demo" onclick="KisanDemoPresets[1].apply()">2. खराब फोटो (Blurry)</button>
              <button class="btn-demo" onclick="KisanDemoPresets[2].apply()">3. अनिश्चितता (I Don't Know)</button>
              <button class="btn-demo" onclick="KisanDemoPresets[3].apply()">4. रोग वृद्धि (Worsening)</button>
              <button class="btn-demo" onclick="KisanDemoPresets[4].apply()">5. विशेषज्ञ (Expert)</button>
              <button class="btn-demo" onclick="KisanDemoPresets[5].apply()">6. ऑफ़लाइन (Sync)</button>
            </div>
          </div>
        </div>
      `;
    },

    // Screen 2: Language Selection
    2: function(container) {
      const state = KisanState.get();
      container.innerHTML = `
        <div class="screen-view">
          <div class="screen-header-bar">
            <button class="back-btn" onclick="goToScreen(1)">←</button>
            <h3>${getLangText('भाषा चुनें', 'Choose Language', 'ਭਾਸ਼ਾ ਚੁਣੋ')}</h3>
            <div></div>
          </div>

          <p class="screen-subtitle">${getLangText('आपकी सलाह आपकी चुनी हुई भाषा में उपलब्ध होगी।', 'Your advisory will be provided in your preferred language.', 'ਤੁਹਾਡੀ ਸਲਾਹ ਤੁਹਾਡੀ ਚੁਣੀ ਹੋਈ ਭਾਸ਼ਾ ਵਿੱਚ ਹੋਵੇਗੀ।')}</p>

          <div class="lang-cards-list">
            <div class="lang-card ${state.language === 'hi' ? 'selected' : ''}" onclick="setLanguage('hi')">
              <div class="lang-card-left">
                <span class="lang-code">अ</span>
                <div>
                  <div class="lang-name">हिन्दी (Hindi)</div>
                  <div class="lang-sample">"नमस्ते, किसान साथी में स्वागत है"</div>
                </div>
              </div>
              <button class="speaker-btn" onclick="event.stopPropagation(); playSampleVoice('hi')">🔊</button>
            </div>

            <div class="lang-card ${state.language === 'en' ? 'selected' : ''}" onclick="setLanguage('en')">
              <div class="lang-card-left">
                <span class="lang-code">A</span>
                <div>
                  <div class="lang-name">English</div>
                  <div class="lang-sample">"Welcome to Kisan Saathi"</div>
                </div>
              </div>
              <button class="speaker-btn" onclick="event.stopPropagation(); playSampleVoice('en')">🔊</button>
            </div>

            <div class="lang-card ${state.language === 'pa' ? 'selected' : ''}" onclick="setLanguage('pa')">
              <div class="lang-card-left">
                <span class="lang-code">ੳ</span>
                <div>
                  <div class="lang-name">ਪੰਜਾਬੀ (Punjabi)</div>
                  <div class="lang-sample">"ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ, ਕਿਸਾਨ ਸਾਥੀ ਵਿਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ"</div>
                </div>
              </div>
              <button class="speaker-btn" onclick="event.stopPropagation(); playSampleVoice('pa')">🔊</button>
            </div>
          </div>

          <button class="btn-primary mt-auto" onclick="goToScreen(3)">
            <span>${getLangText('आगे बढ़ें', 'Continue', 'ਅੱਗੇ ਵਧੋ')}</span>
            <span>→</span>
          </button>
        </div>
      `;
    },

    // Screen 3: Login / Farmer Profile
    3: function(container) {
      const state = KisanState.get();
      container.innerHTML = `
        <div class="screen-view">
          <div class="screen-header-bar">
            <button class="back-btn" onclick="goToScreen(2)">←</button>
            <h3>${getLangText('किसान लॉगिन', 'Farmer Login', 'ਕਿਸਾਨ ਲੌਗਇਨ')}</h3>
            <div></div>
          </div>

          <div class="form-container">
            <div class="form-group">
              <label class="form-label">${getLangText('किसान का नाम / Farmer Name', 'Farmer Name', 'ਕਿਸਾਨ ਦਾ ਨਾਮ')}</label>
              <input type="text" id="loginName" class="form-input" value="${state.farmer.name}">
            </div>

            <div class="form-group">
              <label class="form-label">${getLangText('मोबाइल नंबर / Mobile Number', 'Mobile Number', 'ਮੋਬਾਈਲ ਨੰਬਰ')}</label>
              <div class="phone-input-group">
                <span class="country-prefix">🇮🇳 +91</span>
                <input type="tel" id="loginPhone" class="form-input" value="${state.farmer.phone}" maxlength="10">
              </div>
            </div>

            <div class="form-group">
              <div class="otp-header">
                <label class="form-label">${getLangText('4-अंकीय ओटीपी / 4-Digit OTP', '4-Digit OTP', 'ਓਟੀਪੀ')}</label>
                <button type="button" class="link-btn" onclick="sendDemoOTP()">${getLangText('ओटीपी भेजें (Send OTP)', 'Send OTP', 'ਓਟੀਪੀ ਭੇਜੋ')}</button>
              </div>
              <div class="otp-boxes">
                <input type="text" class="otp-input" id="otp1" value="4" maxlength="1">
                <input type="text" class="otp-input" id="otp2" value="8" maxlength="1">
                <input type="text" class="otp-input" id="otp3" value="2" maxlength="1">
                <input type="text" class="otp-input" id="otp4" value="9" maxlength="1">
              </div>
              <div class="text-xs text-muted mt-1" id="otpHint">ओटीपी कोड: 4829 (Valid)</div>
            </div>

            <div class="trust-badge">
              <span>🔒</span>
              <span>${getLangText('सुरक्षित एवं सरकारी कृषि दिशा-निर्देशों के अनुरूप', '100% Safe & Aligned with Agricultural Guidelines', 'ਸੁਰੱਖਿਅਤ ਅਤੇ ਪ੍ਰਮਾਣਿਤ')}</span>
            </div>

            <button class="btn-primary mt-auto" onclick="submitLogin()">
              <span>${getLangText('लॉगिन करें व खेत जोड़ें', 'Verify & Continue', 'ਲੌਗਇਨ ਕਰੋ')}</span>
              <span>→</span>
            </button>
          </div>
        </div>
      `;
    },

    // Screen 4: Create Farm Profile
    4: function(container) {
      const state = KisanState.get();
      container.innerHTML = `
        <div class="screen-view">
          <div class="screen-header-bar">
            <button class="back-btn" onclick="goToScreen(3)">←</button>
            <h3>${getLangText('खेत का विवरण', 'Farm Setup', 'ਖੇਤ ਦਾ ਵੇਰਵਾ')}</h3>
            <div></div>
          </div>

          <div class="info-alert-card">
            <span>💡</span>
            <span>${getLangText('हम आपके खेत के विवरण को याद रखेंगे ताकि भविष्य की सलाह अधिक सटीक हो सके।', 'We remember your farm details so future advice is personalized.', 'ਤੁਹਾਡੇ ਖੇਤ ਦਾ ਵੇਰਵਾ ਯਾਦ ਰੱਖਿਆ ਜਾਵੇਗਾ।')}</span>
          </div>

          <div class="form-container">
            <div class="form-group">
              <label class="form-label">${getLangText('खेत का नाम / Farm Name', 'Farm Name', 'ਖੇਤ ਦਾ ਨਾਮ')}</label>
              <input type="text" id="farmName" class="form-input" value="उत्तर खेत (North Field)">
            </div>

            <div class="form-group">
              <div class="flex-between">
                <label class="form-label">${getLangText('स्थान / Location (GPS)', 'Location', 'ਸਥਾਨ')}</label>
                <button type="button" class="link-btn" onclick="fetchGPSLocation()">📍 ${getLangText('GPS प्राप्त करें', 'Use GPS', 'ਜੀਪੀਐਸ ਲਓ')}</button>
              </div>
              <input type="text" id="farmLocation" class="form-input" value="करनाल, हरियाणा (29.68° N, 76.99° E)">
            </div>

            <div class="form-group">
              <label class="form-label">${getLangText('क्षेत्रफल / Land Area (Acres)', 'Area (Acres)', 'ਰਕਬਾ')}</label>
              <div class="stepper-group">
                <button type="button" class="stepper-btn" onclick="stepArea(-0.5)">-</button>
                <input type="number" id="farmArea" class="stepper-input" value="2.5" step="0.5">
                <button type="button" class="stepper-btn" onclick="stepArea(0.5)">+</button>
                <span class="unit-label">${getLangText('एकड़', 'Acres', 'ਏਕੜ')}</span>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">${getLangText('मुख्य फसल / Primary Crop', 'Primary Crop', 'ਮੁੱਖ ਫਸਲ')}</label>
              <div class="crop-chips-grid">
                <div class="chip-item selected" onclick="selectCropChip(this, 'Tomato', 'टमाटर')">🍅 टमाटर (Tomato)</div>
                <div class="chip-item" onclick="selectCropChip(this, 'Wheat', 'गेहूं')">🌾 गेहूं (Wheat)</div>
                <div class="chip-item" onclick="selectCropChip(this, 'Rice', 'धान')">🌱 धान (Rice)</div>
                <div class="chip-item" onclick="selectCropChip(this, 'Cotton', 'कपास')">☁️ कपास (Cotton)</div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">${getLangText('सिंचाई का प्रकार / Irrigation', 'Irrigation Type', 'ਸਿੰਚਾਈ')}</label>
              <select id="farmIrrigation" class="form-input">
                <option value="Drip">ड्रिप सिंचाई (Drip Irrigation)</option>
                <option value="Canal">नहर का पानी (Canal)</option>
                <option value="Tubewell">ट्यूबवेल / बोरवेल (Tubewell)</option>
                <option value="Rainfed">वर्षा आधारित (Rainfed)</option>
              </select>
            </div>

            <button class="btn-primary mt-auto" onclick="submitFarmSetup()">
              <span>${getLangText('खेत सुरक्षित करें व डैशबोर्ड खोलें', 'Save Farm & Open Dashboard', 'ਖੇਤ ਸੁਰੱਖਿਅਤ ਕਰੋ')}</span>
              <span>→</span>
            </button>
          </div>
        </div>
      `;
    },

    // Screen 5: Home / Farmer Dashboard
    5: function(container) {
      const state = KisanState.get();
      const farm = KisanState.getActiveFarm();
      const recentScans = state.scanHistory || [];
      const unreadAlerts = state.notifications.filter(n => !n.read).length;

      container.innerHTML = `
        <div class="screen-view dashboard-view">
          <!-- Top Header Profile -->
          <div class="dash-top-bar">
            <div class="farmer-avatar-info">
              <div class="dash-avatar">👨‍🌾</div>
              <div>
                <div class="dash-greeting">${getLangText('नमस्ते', 'Hello', 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ')}, ${state.farmer.name.split(' ')[0]} जी</div>
                <div class="dash-farm-badge">📍 ${farm.name} (${farm.cropHi || farm.crop})</div>
              </div>
            </div>
            <div class="dash-status-pill ${state.isOffline ? 'offline' : 'online'}">
              <span>${state.isOffline ? '🟠' : '🟢'}</span>
              <span>${state.isOffline ? 'Offline' : 'Online'}</span>
            </div>
          </div>

          <!-- Farm Health Score Card -->
          <div class="dash-score-card" onclick="goToScreen(29)">
            <div class="score-circle-wrapper">
              <div class="score-circle">
                <span class="score-val">${farm.healthScore}</span>
                <span class="score-max">/100</span>
              </div>
            </div>
            <div class="score-details">
              <div class="score-status-tag good">${getLangText('अच्छी स्थिति (Good)', 'Good Health', 'ਚੰਗੀ ਹਾਲਤ')}</div>
              <div class="score-desc">${getLangText('फसल की सामान्य स्थिति संतोषजनक है।', 'Crop condition is satisfactory.', 'ਫਸਲ ਦੀ ਹਾਲਤ ਠੀਕ ਹੈ।')}</div>
              <div class="score-link">${getLangText('विस्तृत स्कोर विश्लेषण देखें →', 'View Deep Dive Score →', 'ਵੇਰਵਾ ਦੇਖੋ →')}</div>
            </div>
          </div>

          <!-- Primary Actions -->
          <div class="dash-action-cards">
            <div class="action-card scan-card" onclick="goToScreen(7)">
              <div class="action-icon">📷</div>
              <div class="action-title">${getLangText('फसल स्कैन करें', 'Scan Crop', 'ਫਸਲ ਸਕੈਨ')}</div>
              <div class="action-sub">${getLangText('फोटो खींचकर रोग पहचानें', 'Identify pests & diseases', 'ਫੋਟੋ ਲਓ')}</div>
            </div>

            <div class="action-card voice-card" onclick="goToScreen(9)">
              <div class="action-icon">🎙️</div>
              <div class="action-title">${getLangText('बोलकर बताएं', 'Speak Problem', 'ਬੋਲ ਕੇ ਦੱਸੋ')}</div>
              <div class="action-sub">${getLangText('लक्षण बोलकर सलाह पाएं', 'Voice assistant', 'ਆਵਾਜ਼ ਸਹਾਇਕ')}</div>
            </div>
          </div>

          <!-- Today's Key Action Banner -->
          <div class="dash-today-banner" onclick="goToScreen(15)">
            <div class="banner-header">
              <span class="banner-tag">🎯 ${getLangText('आज की मुख्य सलाह', "Today's Action", 'ਅੱਜ ਦੀ ਸਲਾਹ')}</span>
              <span class="banner-arrow">→</span>
            </div>
            <div class="banner-text">
              ${recentScans.length > 0 ? getLangText('निचली पत्तियों की छंटाई करें और नए पत्तों की निगरानी करें।', 'Prune lower leaves and monitor newly emerged shoots.', 'ਹੇਠਲੇ ਪੱਤਿਆਂ ਦੀ ਛਾਂਟੀ ਕਰੋ।') : getLangText('अपनी पहली फसल जांच करके व्यक्तिगत सलाह प्राप्त करें।', 'Perform your first scan to get personalized guidance.', 'ਪਹਿਲੀ ਜਾਂਚ ਕਰੋ।')}
            </div>
          </div>

          <!-- Weather Card -->
          <div class="dash-weather-card" onclick="goToScreen(31)">
            <div class="weather-left">
              <div class="weather-icon">⛅</div>
              <div>
                <div class="weather-temp">${state.weather.temp}°C • ${state.weather.condition.split('(')[0]}</div>
                <div class="weather-humid">${getLangText('आर्द्रता', 'Humidity', 'ਨਮੀ')}: ${state.weather.humidity}% • ${getLangText('बारिश की संभावना', 'Rain chance', 'ਮੀਂਹ')}: ${state.weather.rainChance}%</div>
              </div>
            </div>
            <div class="weather-risk-badge high">⚠️ ${getLangText('फफूंद जोखिम: उच्च', 'Fungal Risk: High', 'ਫਫੂੰਦੀ ਜੋਖਮ: ਵੱਧ')}</div>
          </div>

          <!-- Bottom Navigation Bar -->
          ${renderMobileBottomNav(5)}
        </div>
      `;
    },

    // Screen 6: My Farms & Crop Selection
    6: function(container) {
      const state = KisanState.get();
      container.innerHTML = `
        <div class="screen-view">
          <div class="screen-header-bar">
            <button class="back-btn" onclick="goToScreen(5)">←</button>
            <h3>${getLangText('मेरे खेत व फसलें', 'My Farms & Crops', 'ਮੇਰੇ ਖੇਤ')}</h3>
            <button class="icon-action-btn" onclick="goToScreen(4)">+ जोड़ें</button>
          </div>

          <div class="farms-list">
            ${state.farms.map(f => `
              <div class="farm-card ${f.id === state.activeFarmId ? 'active-farm' : ''}" onclick="selectActiveFarm('${f.id}')">
                <div class="farm-card-header">
                  <div>
                    <div class="farm-name">${f.name}</div>
                    <div class="farm-crop-sub">🌱 ${f.cropHi || f.crop} (${f.variety}) • ${f.area} एकड़</div>
                  </div>
                  <div class="farm-score-pill">${f.healthScore}/100</div>
                </div>
                <div class="farm-card-footer">
                  <span class="last-scan">🕒 ${getLangText('अंतिम जांच', 'Last Scan', 'ਆਖਰੀ ਜਾਂਚ')}: ${f.lastScanDate}</span>
                  <button class="btn-sm" onclick="event.stopPropagation(); selectActiveFarm('${f.id}'); goToScreen(7);">
                    📷 ${getLangText('जांच करें', 'Scan', 'ਜਾਂਚ')}
                  </button>
                </div>
              </div>
            `).join('')}
          </div>

          <button class="btn-secondary mt-auto" onclick="goToScreen(4)">
            <span>+ ${getLangText('नया खेत जोड़ें', 'Add Another Farm', 'ਨਵਾਂ ਖੇਤ ਜੋੜੋ')}</span>
          </button>

          ${renderMobileBottomNav(6)}
        </div>
      `;
    },

    // Screen 7: Crop Scan / Multimodal Input
    7: function(container) {
      const state = KisanState.get();
      const session = state.currentScanSession;
      container.innerHTML = `
        <div class="screen-view">
          <div class="screen-header-bar">
            <button class="back-btn" onclick="goToScreen(5)">←</button>
            <h3>${getLangText('फसल जांच (फोटो व लक्षण)', 'Scan Crop', 'ਫਸਲ ਜਾਂਚ')}</h3>
            <div></div>
          </div>

          <p class="screen-subtitle">${getLangText('विभिन्न कोणों से फोटो खींचें या लक्षण बोलकर बताएं।', 'Capture photos or speak symptoms for multi-evidence analysis.', 'ਫੋਟੋ ਖਿੱਚੋ ਜਾਂ ਬੋਲ ਕੇ ਦੱਸੋ।')}</p>

          <!-- 4-Photo Upload Grid -->
          <div class="photo-slots-grid">
            <div class="photo-slot ${session.images.leafFront ? 'has-img' : ''}" onclick="triggerSlotUpload('leafFront')">
              ${session.images.leafFront ? `<img src="${session.images.leafFront}" class="slot-preview">` : `<div class="slot-icon">🍃</div><div class="slot-label">${getLangText('पत्ता आगे', 'Leaf Front', 'ਪੱਤਾ ਅੱਗੇ')}</div>`}
            </div>
            <div class="photo-slot ${session.images.leafBack ? 'has-img' : ''}" onclick="triggerSlotUpload('leafBack')">
              ${session.images.leafBack ? `<img src="${session.images.leafBack}" class="slot-preview">` : `<div class="slot-icon">🌿</div><div class="slot-label">${getLangText('पत्ता पीछे', 'Leaf Back', 'ਪੱਤਾ ਪਿੱਛੇ')}</div>`}
            </div>
            <div class="photo-slot ${session.images.stem ? 'has-img' : ''}" onclick="triggerSlotUpload('stem')">
              ${session.images.stem ? `<img src="${session.images.stem}" class="slot-preview">` : `<div class="slot-icon">🎋</div><div class="slot-label">${getLangText('तना', 'Stem', 'ਤਣਾ')}</div>`}
            </div>
            <div class="photo-slot ${session.images.wholePlant ? 'has-img' : ''}" onclick="triggerSlotUpload('wholePlant')">
              ${session.images.wholePlant ? `<img src="${session.images.wholePlant}" class="slot-preview">` : `<div class="slot-icon">🪴</div><div class="slot-label">${getLangText('पूरा पौधा', 'Whole Plant', 'ਪੂਰਾ ਬੂਟਾ')}</div>`}
            </div>
          </div>
          <input type="file" id="slotFileInput" style="display:none" accept="image/*" onchange="handleSlotFilePicked(this)">

          <!-- Quick Load Sample Photo Button for testing -->
          <div class="sample-photo-bar">
            <button type="button" class="btn-sample-photo" onclick="loadSampleLeafPhoto()">
              📸 ${getLangText('परीक्षण पत्ता फोटो लोड करें (Sample Leaf Photo)', 'Load Sample Leaf Photo', 'ਸੈਂਪਲ ਫੋਟੋ')}
            </button>
          </div>

          <!-- Symptoms Text & Voice -->
          <div class="form-group mt-3">
            <div class="flex-between">
              <label class="form-label">${getLangText('लक्षण बताएं / Symptoms', 'Observed Symptoms', 'ਲੱਛਣ')}</label>
              <button type="button" class="link-btn" onclick="goToScreen(9)">🎙️ ${getLangText('बोलें (Voice)', 'Speak', 'ਬੋਲੋ')}</button>
            </div>
            <textarea id="symptomsInput" class="form-textarea" rows="2" placeholder="${getLangText('पत्तियों पर काले धब्बे, पीलापन या सूखना...', 'Black spots, yellowing, curling...', 'ਕਾਲੇ ਧੱਬੇ...')}">${session.symptomsText}</textarea>
          </div>

          <!-- Quick Symptom Tags -->
          <div class="symptom-chips">
            <button type="button" class="symptom-tag" onclick="appendSymptomTag('काले-भूरे गोल छल्लेदार धब्बे (Concentric dark rings)')">+ काले धब्बे</button>
            <button type="button" class="symptom-tag" onclick="appendSymptomTag('पत्तियों में पीलापन (Yellowing)')">+ पीलापन</button>
            <button type="button" class="symptom-tag" onclick="appendSymptomTag('पत्तियों का मुड़ाव (Curling)')">+ मुड़ाव</button>
            <button type="button" class="symptom-tag" onclick="appendSymptomTag('सफेद फफूंद (White mold)')">+ सफेद फफूंद</button>
          </div>

          <button class="btn-primary mt-auto" onclick="submitScanForAnalysis()">
            <span>${getLangText('फसल का विश्लेषण करें', 'Analyze My Crop', 'ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ')}</span>
            <span>→</span>
          </button>
        </div>
      `;
    },

    // Screen 8: Image Quality Check
    8: function(container) {
      const state = KisanState.get();
      const session = state.currentScanSession;
      const img = session.images.leafFront || "../generated_screens/screen_01.png";
      const quality = session.imageQuality || { status: "GOOD", score: 92, message: "फोटो साफ है।" };
      const isGood = quality.status === "GOOD";

      container.innerHTML = `
        <div class="screen-view">
          <div class="screen-header-bar">
            <button class="back-btn" onclick="goToScreen(7)">←</button>
            <h3>${getLangText('फोटो गुणवत्ता जांच', 'Image Quality Check', 'ਫੋਟੋ ਕੁਆਲਿਟੀ')}</h3>
            <div></div>
          </div>

          <div class="viewfinder-box">
            <img src="${img}" class="viewfinder-img">
            <div class="viewfinder-badge ${isGood ? 'good' : 'bad'}">
              <span>${isGood ? '✓' : '⚠️'}</span>
              <span>${quality.message}</span>
            </div>
          </div>

          <!-- Checklist -->
          <div class="quality-checklist">
            <div class="check-item ${isGood ? 'pass' : 'fail'}">
              <span>${isGood ? '✓' : '✗'}</span>
              <span>${getLangText('पर्याप्त रोशनी (Adequate Lighting)', 'Good Lighting', 'ਚੰਗੀ ਰੋਸ਼ਨੀ')}</span>
            </div>
            <div class="check-item ${isGood ? 'pass' : 'fail'}">
              <span>${isGood ? '✓' : '✗'}</span>
              <span>${getLangText('साफ फोकस (Sharp Focus & Clear Edges)', 'Sharp Focus', 'ਸਾਫ ਫੋਕਸ')}</span>
            </div>
            <div class="check-item ${isGood ? 'pass' : 'fail'}">
              <span>${isGood ? '✓' : '✗'}</span>
              <span>${getLangText('पौधे का भाग स्पष्ट दिख रहा है (Leaf Subject Clear)', 'Subject Recognizable', 'ਪੱਤਾ ਸਪੱਸ਼ਟ')}</span>
            </div>
          </div>

          <div class="flex-row-btns mt-auto">
            <button class="btn-secondary" onclick="goToScreen(7)">
              <span>🔄 ${getLangText('दोबारा फोटो लें', 'Retake Photo', 'ਦੁਬਾਰਾ ਲਓ')}</span>
            </button>
            <button class="btn-primary" onclick="proceedAfterQualityCheck()">
              <span>${getLangText('आगे बढ़ें', 'Proceed', 'ਅੱਗੇ ਵਧੋ')}</span>
              <span>→</span>
            </button>
          </div>
        </div>
      `;
    },

    // Screen 9: Voice Assistant
    9: function(container) {
      const state = KisanState.get();
      const session = state.currentScanSession;
      container.innerHTML = `
        <div class="screen-view voice-view">
          <div class="screen-header-bar dark">
            <button class="back-btn" onclick="goToScreen(7)">←</button>
            <h3>${getLangText('आवाज सहायक', 'Voice Assistant', 'ਆਵਾਜ਼ ਸਹਾਇਕ')}</h3>
            <div></div>
          </div>

          <div class="voice-hero">
            <div class="pulsing-mic-btn" id="voiceMicBtn" onclick="toggleSpeechRecording()">
              <span>🎙️</span>
            </div>
            <div class="voice-status-text" id="voiceStatusLabel">
              ${getLangText('माइक पर टैप करके बोलें...', 'Tap microphone and speak symptoms...', 'ਮਾਈਕ ਦਬਾ ਕੇ ਬੋਲੋ...')}
            </div>
          </div>

          <!-- Transcript Box -->
          <div class="transcript-card">
            <label class="form-label text-light">${getLangText('मैंने यह सुना (You said):', 'Transcription:', 'ਮੈਂ ਇਹ ਸੁਣਿਆ:')}</label>
            <textarea id="voiceTranscriptBox" class="form-textarea dark" rows="3">${session.voiceTranscript || "टमाटर के पत्तों पर काले धब्बे दिख रहे हैं।"}</textarea>
            <div class="text-xs text-muted mt-1">${getLangText('यदि कुछ गलत सुना गया हो तो आप यहां सुधार सकते हैं।', 'You can edit the text above if needed.', 'ਲਿਖਤ ਠੀਕ ਕਰ ਸਕਦੇ ਹੋ।')}</div>
          </div>

          <button class="btn-primary mt-auto" onclick="confirmVoiceTranscript()">
            <span>${getLangText('हाँ, यह सही है (आगे बढ़ें)', 'Confirm & Proceed', 'ਹਾਂ, ਠੀਕ ਹੈ')}</span>
            <span>→</span>
          </button>
        </div>
      `;
    },

    // Screen 10: Clarifying Questions
    10: function(container) {
      const state = KisanState.get();
      const session = state.currentScanSession;
      container.innerHTML = `
        <div class="screen-view">
          <div class="screen-header-bar">
            <button class="back-btn" onclick="goToScreen(8)">←</button>
            <h3>${getLangText('स्पष्टीकरण प्रश्न', 'Clarifying Questions', 'ਸਪਸ਼ਟੀਕਰਨ')}</h3>
            <span class="step-pill">1/2</span>
          </div>

          <div class="question-hero-card">
            <div class="q-icon">🔍</div>
            <div class="q-title">
              ${getLangText('क्या ये काले धब्बे पत्तियों के नीचे भी दिखाई दे रहे हैं?', 'Are these dark spots also visible on the underside of leaves?', 'ਕੀ ਇਹ ਧੱਬੇ ਪੱਤਿਆਂ ਦੇ ਹੇਠਾਂ ਵੀ ਹਨ?')}
            </div>
            <button class="speaker-btn mt-2" onclick="speakQuestionText('क्या ये काले धब्बे पत्तियों के नीचे भी दिखाई दे रहे हैं?')">🔊 ${getLangText('प्रश्न सुनें', 'Listen', 'ਸੁਣੋ')}</button>
          </div>

          <div class="q-options-list">
            <button class="btn-option ${session.clarifyingAnswers.spotsUnderside === 'yes' ? 'selected' : ''}" onclick="setClarifyingAnswer('spotsUnderside', 'yes')">
              <span>✅ ${getLangText('हाँ, नीचे भी धब्बे हैं', 'Yes, on the underside too', 'ਹਾਂ, ਹੇਠਾਂ ਵੀ ਹਨ')}</span>
            </button>
            <button class="btn-option ${session.clarifyingAnswers.spotsUnderside === 'no' ? 'selected' : ''}" onclick="setClarifyingAnswer('spotsUnderside', 'no')">
              <span>❌ ${getLangText('नहीं, केवल ऊपर हैं', 'No, only on top', 'ਨਹੀਂ, ਸਿਰਫ਼ ਉੱਪਰ ਹਨ')}</span>
            </button>
            <button class="btn-option ${session.clarifyingAnswers.spotsUnderside === 'not_sure' ? 'selected' : ''}" onclick="setClarifyingAnswer('spotsUnderside', 'not_sure')">
              <span>❓ ${getLangText('पता नहीं / स्पष्ट नहीं', 'Not Sure', 'ਪਤਾ ਨਹੀਂ')}</span>
            </button>
          </div>

          <div class="flex-row-btns mt-auto">
            <button class="btn-secondary" onclick="goToScreen(11)">
              <span>${getLangText('छोड़ें (Skip)', 'Skip', 'ਛੱਡੋ')}</span>
            </button>
            <button class="btn-primary" onclick="goToScreen(11)">
              <span>${getLangText('उत्तर सबमिट करें', 'Submit & Analyze', 'ਜਵਾਬ ਦਿਓ')}</span>
              <span>→</span>
            </button>
          </div>
        </div>
      `;
    },

    // Screen 11: Analysis Progress & Execution
    11: function(container) {
      container.innerHTML = `
        <div class="screen-view text-center">
          <div class="screen-header-bar">
            <div></div>
            <h3>${getLangText('विश्लेषण प्रगति', 'Analysis Pipeline', 'ਵਿਸ਼ਲੇਸ਼ਣ')}</h3>
            <div></div>
          </div>

          <div class="analysis-spinner-box">
            <div class="pulse-scanner-icon">🔍</div>
            <div class="analysis-status-head" id="analysisMainStatus">${getLangText('फसल की जांच की जा रही है...', 'Evaluating crop evidence...', 'ਜਾਂਚ ਚੱਲ ਰਹੀ ਹੈ...')}</div>
          </div>

          <!-- 5 Real Pipeline Stages -->
          <div class="pipeline-stages-list">
            <div class="stage-step done" id="stage1">
              <span class="step-check">✓</span>
              <span>${getLangText('फोटो और इनपुट सत्यापन (Photos validated)', 'Photos & Input validated', 'ਫੋਟੋ ਜਾਂਚ ਮੁਕੰਮਲ')}</span>
            </div>
            <div class="stage-step done" id="stage2">
              <span class="step-check">✓</span>
              <span>${getLangText('लक्षणों का विश्लेषण (Symptoms evaluated)', 'Symptoms analyzed', 'ਲੱਛਣ ਮਿਲਾਏ')}</span>
            </div>
            <div class="stage-step done" id="stage3">
              <span class="step-check">✓</span>
              <span>${getLangText('मौसम व खेत के इतिहास की जांच (Weather & Farm context correlated)', 'Weather & Farm context correlated', 'ਮੌਸਮ ਜਾਂਚ')}</span>
            </div>
            <div class="stage-step done" id="stage4">
              <span class="step-check">✓</span>
              <span>${getLangText('रोग साक्ष्य मिलान (Disease evidence matched)', 'Disease evidence matched', 'ਰੋਗ ਦੀ ਪਛਾਣ')}</span>
            </div>
            <div class="stage-step done" id="stage5">
              <span class="step-check">✓</span>
              <span>${getLangText('सलाह व कार्ययोजना तैयार (Personalized advisory ready)', 'Personalized advisory ready', 'ਸਲਾਹ ਤਿਆਰ')}</span>
            </div>
          </div>

          <div class="reassurance-box">
            <span>🛡️</span>
            <span>${getLangText('Kisan Saathi आपके खेत के इतिहास, मौसम और लक्षणों को मिलाकर निर्णय तैयार कर रहा है।', 'Combining multi-signal evidence to ensure high reliability.', 'ਸਾਰੇ ਤੱਥਾਂ ਦੀ ਜਾਂਚ ਮੁਕੰਮਲ।')}</span>
          </div>

          <button class="btn-primary mt-auto" onclick="executeAnalysisAndProceed()">
            <span>${getLangText('परिणाम देखें', 'View Diagnosis Result', 'ਨਤੀਜਾ ਦੇਖੋ')}</span>
            <span>→</span>
          </button>
        </div>
      `;
    },

    // Screen 12: Diagnosis Result
    12: function(container) {
      const state = KisanState.get();
      const session = state.currentScanSession;
      const diag = session.diagnosis || {
        name: "Tomato Early Blight",
        nameHi: "टमाटर का अगेती झुलसा",
        confidence: 91,
        severity: 40,
        isUnknown: false
      };

      if (diag.isUnknown) {
        // Honest "I Don't Know" Screen
        container.innerHTML = `
          <div class="screen-view">
            <div class="screen-header-bar">
              <button class="back-btn" onclick="goToScreen(5)">←</button>
              <h3>${getLangText('निदान परिणाम', 'Diagnosis Result', 'ਨਤੀਜਾ')}</h3>
              <div></div>
            </div>

            <div class="uncertainty-hero-card">
              <div class="warn-big-icon">❓</div>
              <div class="uncertain-title">${getLangText('पर्याप्त साक्ष्य नहीं मिले', 'Insufficient Evidence', 'ਪੂਰੇ ਸਬੂਤ ਨਹੀਂ ਮਿਲੇ')}</div>
              <p class="uncertain-desc">
                ${getLangText('उपलब्ध फोटो और लक्षणों से रोग की निश्चित पुष्टि नहीं हो सकी (I don\'t have enough evidence to confidently identify this condition).', 'We are not confident enough to identify this condition safely.', 'ਸਹੀ ਪਛਾਣ ਲਈ ਹੋਰ ਜਾਣਕਾਰੀ ਚਾਹੀਦੀ ਹੈ।')}
              </p>
            </div>

            <div class="next-action-options">
              <div class="form-label">${getLangText('आप क्या करना चाहते हैं? (What would you like to do?)', 'Next Steps:', 'ਅੱਗੇ ਕੀ ਕਰਨਾ ਹੈ?')}</div>
              <button class="btn-option" onclick="goToScreen(7)">
                <span>📸 ${getLangText('पत्ते के नजदीक से साफ फोटो लें', 'Upload a clearer leaf photo', 'ਸਾਫ ਫੋਟੋ ਲਓ')}</span>
              </button>
              <button class="btn-option" onclick="goToScreen(10)">
                <span>❓ ${getLangText('स्पष्टीकरण प्रश्नों के उत्तर दें', 'Answer clarifying questions', 'ਸਵਾਲਾਂ ਦੇ ਜਵਾਬ ਦਿਓ')}</span>
              </button>
              <button class="btn-option highlight" onclick="goToScreen(23)">
                <span>👨‍🔬 ${getLangText('कृषि विशेषज्ञ से सलाह लें (Escalate to Expert)', 'Consult Agricultural Expert', 'ਮਾਹਰ ਦੀ ਸਲਾਹ ਲਓ')}</span>
              </button>
            </div>

            <button class="btn-secondary mt-auto" onclick="goToScreen(5)">
              <span>${getLangText('डैशबोर्ड पर लौटें', 'Back to Dashboard', 'ਡੈਸ਼ਬੋਰਡ')}</span>
            </button>
          </div>
        `;
        return;
      }

      container.innerHTML = `
        <div class="screen-view">
          <div class="screen-header-bar">
            <button class="back-btn" onclick="goToScreen(5)">←</button>
            <h3>${getLangText('निदान परिणाम', 'Diagnosis Result', 'ਨਤੀਜਾ')}</h3>
            <span class="severity-pill high">${diag.severity}% ${getLangText('गंभीरता', 'Severity', 'ਗੰਭੀਰਤਾ')}</span>
          </div>

          <div class="diag-hero-card">
            <div class="diag-leaf-preview">
              <img src="${session.images.leafFront || '../generated_screens/screen_01.png'}" class="diag-img">
            </div>
            <div class="diag-meta">
              <div class="diag-condition-name">${diag.nameHi || diag.name}</div>
              <div class="diag-latin">Pathogen: ${diag.pathogen || 'Alternaria solani'}</div>
              <div class="confidence-bar-wrapper">
                <div class="flex-between text-xs">
                  <span>${getLangText('निश्चितता (Confidence)', 'Confidence', 'ਯਕੀਨ')}</span>
                  <span class="font-bold text-green">${diag.confidence}%</span>
                </div>
                <div class="progress-track">
                  <div class="progress-fill green" style="width: ${diag.confidence}%;"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="diag-action-buttons">
            <button class="btn-primary" onclick="goToScreen(15)">
              <span>🎯 ${getLangText('आज क्या करें? (दैनिक कार्ययोजना)', 'What Should I Do Today?', 'ਅੱਜ ਕੀ ਕਰਨਾ ਹੈ?')}</span>
              <span>→</span>
            </button>
            <button class="btn-secondary" onclick="goToScreen(13)">
              <span>💡 ${getLangText('यह परिणाम क्यों आया? (कारण देखें)', 'Why this result? (Explainable AI)', 'ਕਾਰਨ ਦੇਖੋ')}</span>
            </button>
            <button class="btn-outline-expert" onclick="goToScreen(23)">
              <span>👨‍🔬 ${getLangText('विशेषज्ञ से पुष्टि कराएं', 'Consult Agricultural Expert', 'ਮਾਹਰ ਤੋਂ ਪੁੱਛੋ')}</span>
            </button>
          </div>

          ${renderMobileBottomNav(12)}
        </div>
      `;
    },

    // Screen 13: Explainable AI & Heatmap
    13: function(container) {
      const state = KisanState.get();
      const session = state.currentScanSession;
      const diag = session.diagnosis || { name: "Tomato Early Blight", nameHi: "टमाटर का अगेती झुलसा", confidence: 91 };
      const exp = diag.explanation || {
        what: "Alternaria solani fungal infection",
        whatHi: "अल्टरनेरिया सोलेनाई फफूंद का संक्रमण",
        why: "Concentric target-board rings on lower leaves",
        whyHi: "निचली पत्तियों पर गोल संकेंद्रित छल्लेदार धब्बे",
        uncertainty: "Bacterial leaf spot can present similar early markings.",
        uncertaintyHi: "शुरुआती दौर में जीवाणु धब्बा रोग भी इससे मिलता-जुलता दिखता है।"
      };

      container.innerHTML = `
        <div class="screen-view">
          <div class="screen-header-bar">
            <button class="back-btn" onclick="goToScreen(12)">←</button>
            <h3>${getLangText('परिणाम का कारण', 'Why This Result?', 'ਨਤੀਜੇ ਦਾ ਕਾਰਨ')}</h3>
            <div></div>
          </div>

          <!-- Heatmap Canvas Overlay View -->
          <div class="heatmap-container">
            <img src="${session.images.leafFront || '../generated_screens/screen_01.png'}" class="heatmap-base-img">
            <div class="heatmap-lesion-circle" style="top: 45%; left: 42%; width: 70px; height: 70px;">
              <span class="heatmap-tag">${getLangText('मुख्य प्रभावित हिस्सा', 'Key Lesion', 'ਮੁੱਖ ਹਿੱਸਾ')}</span>
            </div>
          </div>

          <div class="explain-cards-list">
            <div class="explain-card">
              <div class="exp-title">👁️ ${getLangText('सिस्टम ने क्या देखा? (What was noticed)', 'Observed Symptoms', 'ਕੀ ਵੇਖਿਆ')}</div>
              <div class="exp-body">${exp.whyHi || exp.why}</div>
            </div>

            <div class="explain-card">
              <div class="exp-title">⚠️ ${getLangText('जोखिम बढ़ाने वाले कारक (Contributing Factors)', 'Risk Drivers', 'ਜੋਖਮ ਦੇ ਕਾਰਨ')}</div>
              <div class="exp-body">
                • ${getLangText('हवा में नमी 84% होने से फफूंद के बीजाणु तेजी से पनपते हैं।', 'Relative humidity (84%) creates favorable fungal growth.', 'ਹਵਾ ਵਿੱਚ ਨਮੀ 84% ਹੈ।')}<br>
                • ${getLangText('फूल आने की अवस्था में फसल अधिक संवेदनशील होती है।', 'Crop is in sensitive flowering stage.', 'ਫੁੱਲ ਆਉਣ ਦਾ ਸਮਾਂ।')}
              </div>
            </div>

            <div class="explain-card">
              <div class="exp-title">❓ ${getLangText('क्या अनिश्चित है? (What remains uncertain)', 'Remaining Uncertainty', 'ਅਨਿਸ਼ਚਿਤਤਾ')}</div>
              <div class="exp-body">${exp.uncertaintyHi || exp.uncertainty}</div>
            </div>
          </div>

          <div class="flex-row-btns mt-auto">
            <button class="btn-secondary" onclick="speakCurrentScreen()">
              <span>🔊 ${getLangText('व्याख्या सुनें', 'Listen to Explanation', 'ਸੁਣੋ')}</span>
            </button>
            <button class="btn-primary" onclick="goToScreen(14)">
              <span>${getLangText('जोखिम स्थिति देखें', 'View Risk Dashboard', 'ਜੋਖਮ ਡੈਸ਼ਬੋਰਡ')}</span>
              <span>→</span>
            </button>
          </div>
        </div>
      `;
    },

    // Screen 14: Crop Health & Risk Dashboard
    14: function(container) {
      const state = KisanState.get();
      const session = state.currentScanSession;
      const risk = session.risk || {
        overallRisk: "HIGH",
        overallRiskHi: "उच्च जोखिम (HIGH)",
        riskScore: 78,
        factors: [
          { name: "रोग निश्चितता (Diagnosis Confidence)", impact: "High (91%)" },
          { name: "मौसम आर्द्रता (Weather Humidity)", impact: "High (84%)" },
          { name: "फसल अवस्था (Crop Stage)", impact: "Flowering stage (Critical)" }
        ]
      };

      container.innerHTML = `
        <div class="screen-view">
          <div class="screen-header-bar">
            <button class="back-btn" onclick="goToScreen(13)">←</button>
            <h3>${getLangText('फसल जोखिम विश्लेषण', 'Risk Dashboard', 'ਫਸਲ ਜੋਖਮ')}</h3>
            <div></div>
          </div>

          <!-- Overall Risk Gauge -->
          <div class="risk-gauge-card">
            <div class="risk-gauge-header">
              <span class="text-xs text-muted">${getLangText('समग्र फसल जोखिम स्तर', 'Overall Risk Level', 'ਕੁੱਲ ਜੋਖਮ')}</span>
              <span class="risk-level-badge ${risk.overallRisk.toLowerCase()}">${risk.overallRiskHi || risk.overallRisk}</span>
            </div>
            <div class="risk-meter-bar">
              <div class="risk-meter-fill ${risk.overallRisk.toLowerCase()}" style="width: ${risk.riskScore || 75}%;"></div>
            </div>
            <div class="risk-rationale">${risk.rationale || 'उच्च आर्द्रता और फूल आने की अवस्था के कारण यह रोग अगले 48 घंटों में तेजी से फैल सकता है।'}</div>
          </div>

          <!-- Factor Breakdown -->
          <div class="factors-list">
            <div class="form-label">${getLangText('विश्लेषण में शामिल घटक (Signals Evaluated)', 'Signals Evaluated', 'ਵਿਸ਼ਲੇਸ਼ਣ ਤੱਥ')}</div>
            ${(risk.factors || []).map(f => `
              <div class="factor-row">
                <span class="factor-name">${f.name}</span>
                <span class="factor-impact">${f.impact}</span>
              </div>
            `).join('')}
          </div>

          <div class="reassurance-card mt-3">
            <span>🛡️</span>
            <span>${getLangText('हम केवल एक फोटो पर निर्भर न रहकर मौसम, अवस्था और इतिहास को मिलाकर जोखिम तय करते हैं।', 'Multi-signal contextual evidence ensures balanced decision-making.', 'ਬਹੁ-ਪੱਖੀ ਜਾਂਚ ਨਾਲ ਫੈਸਲਾ।')}</span>
          </div>

          <button class="btn-primary mt-auto" onclick="goToScreen(15)">
            <span>${getLangText('आज की कार्ययोजना देखें', 'What Should I Do Today?', 'ਅੱਜ ਦੀ ਕਾਰਵਾਈ')}</span>
            <span>→</span>
          </button>
        </div>
      `;
    },

    // Screen 15: "What Should I Do Today?"
    15: function(container) {
      const state = KisanState.get();
      const session = state.currentScanSession;
      const adv = session.advisory || {
        doNow: "Remove and safely dispose of severely infected lower leaves.",
        doNowHi: "संक्रमित निचली पत्तियों को काटकर खेत से दूर गड्ढे में दबा दें।",
        monitor: "Inspect newly emerged upper foliage every 48 hours for small dark spots.",
        monitorHi: "अगले 48 घंटों में ऊपरी नई पत्तियों पर छोटे धब्बों की निगरानी करें।",
        routine: "Water directly at root zone; avoid evening wetting.",
        routineHi: "शाम के समय पत्तों पर पानी न डालें, केवल जड़ में पानी दें।",
        nextScanDays: 5,
        nextScanDaysHi: "5 दिन बाद फिर से नई फोटो लेकर तुलना करें।"
      };

      container.innerHTML = `
        <div class="screen-view">
          <div class="screen-header-bar">
            <button class="back-btn" onclick="goToScreen(12)">←</button>
            <h3>${getLangText('आज क्या करें?', 'What To Do Today?', 'ਅੱਜ ਕੀ ਕਰਨਾ ਹੈ?')}</h3>
            <button class="audio-small-btn" onclick="speakCurrentScreen()">🔊 ${getLangText('सुनें', 'Listen', 'ਸੁਣੋ')}</button>
          </div>

          <div class="actions-checklist">
            <!-- DO NOW -->
            <div class="action-box do-now">
              <div class="action-box-header">
                <span class="action-badge urgent">🚨 ${getLangText('तुरंत करें (DO NOW)', 'DO NOW', 'ਹੁਣੇ ਕਰੋ')}</span>
                <input type="checkbox" id="checkDoNow" class="action-check" onchange="toggleActionDone(this)">
              </div>
              <div class="action-box-text">${adv.doNowHi || adv.doNow}</div>
            </div>

            <!-- MONITOR -->
            <div class="action-box monitor">
              <div class="action-box-header">
                <span class="action-badge warn">👁️ ${getLangText('निगरानी रखें (MONITOR)', 'MONITOR', 'ਨਿਗਰਾਨੀ')}</span>
                <input type="checkbox" id="checkMonitor" class="action-check" onchange="toggleActionDone(this)">
              </div>
              <div class="action-box-text">${adv.monitorHi || adv.monitor}</div>
            </div>

            <!-- ROUTINE -->
            <div class="action-box routine">
              <div class="action-box-header">
                <span class="action-badge info">💧 ${getLangText('नियमित देखभाल (ROUTINE)', 'ROUTINE', 'ਰੋਜ਼ਾਨਾ')}</span>
                <input type="checkbox" id="checkRoutine" class="action-check" onchange="toggleActionDone(this)">
              </div>
              <div class="action-box-text">${adv.routineHi || adv.routine}</div>
            </div>

            <!-- NEXT SCAN -->
            <div class="action-box next-scan">
              <div class="action-box-header">
                <span class="action-badge success">📅 ${getLangText('अगली जांच (NEXT SCAN)', 'NEXT SCAN', 'ਅਗਲੀ ਜਾਂਚ')}</span>
              </div>
              <div class="action-box-text">${adv.nextScanDaysHi || adv.nextScan}</div>
            </div>
          </div>

          <div class="flex-row-btns mt-auto">
            <button class="btn-secondary" onclick="goToScreen(16)">
              <span>📋 ${getLangText('विस्तृत सलाह व सावधानियां', 'Advisory Details', 'ਵਿਸਤ੍ਰਿਤ ਸਲਾਹ')}</span>
            </button>
            <button class="btn-primary" onclick="markActionsCompleted()">
              <span>✓ ${getLangText('कदम पूरा किया (सहेजें)', 'Mark Done & Save', 'ਮੁਕੰਮਲ ਕੀਤਾ')}</span>
            </button>
          </div>
        </div>
      `;
    },

    // Screen 16: Advisory Details & Precautions
    16: function(container) {
      container.innerHTML = `
        <div class="screen-view">
          <div class="screen-header-bar">
            <button class="back-btn" onclick="goToScreen(15)">←</button>
            <h3>${getLangText('विस्तृत कृषि सलाह', 'Advisory Details', 'ਖੇਤੀਬਾੜੀ ਸਲਾਹ')}</h3>
            <div></div>
          </div>

          <!-- Tabs -->
          <div class="tab-pill-bar">
            <button class="tab-pill active" onclick="switchAdvisoryTab('organic')">${getLangText('जैविक उपाय', 'Organic', 'ਜੈਵਿਕ')}</button>
            <button class="tab-pill" onclick="switchAdvisoryTab('precautions')">${getLangText('क्या न करें', "Don'ts", 'ਨਾ ਕਰੋ')}</button>
            <button class="tab-pill" onclick="switchAdvisoryTab('trusted')">${getLangText('प्रमाणित स्रोत', 'Trusted Source', 'ਸਰੋਤ')}</button>
          </div>

          <div id="advisoryTabContent" class="advisory-tab-body">
            <div class="adv-detail-card">
              <div class="adv-sec-title">🌿 ${getLangText('अनुशंसित जैविक उपचार (Organic Recommendation)', 'Organic Spray Formulation', 'ਜੈਵਿਕ ਇਲਾਜ')}</div>
              <div class="adv-recipe-box">
                <strong>नीम का तेल (Neem Oil 10,000 ppm):</strong> 5ml प्रति लीटर पानी में 1ml शैम्पू या साबुन के घोल के साथ मिलाकर शाम 4 बजे के बाद छिड़काव करें।
              </div>
            </div>

            <div class="adv-detail-card mt-2">
              <div class="adv-sec-title text-red">⚠️ ${getLangText('सावधानियां: क्या न करें (What to Avoid)', 'What NOT To Do', 'ਕੀ ਨਾ ਕਰੋ')}</div>
              <ul class="adv-avoid-list">
                <li>दोपहर की तेज धूप में किसी भी दवा का छिड़काव न करें।</li>
                <li>अत्यधिक यूरिया या नाइट्रोजन उर्वरक डालने से बचें।</li>
                <li>बिना विशेषज्ञ सलाह के एक साथ 2-3 रसायनों को न मिलाएं।</li>
              </ul>
            </div>

            <div class="adv-detail-card mt-2">
              <div class="adv-sec-title">🏛️ ${getLangText('प्रमाणित कृषि स्रोत (ICAR / SAU Guideline)', 'Trusted Scientific Source', 'ਪ੍ਰਮਾਣਿਤ ਸਰੋਤ')}</div>
              <div class="text-xs text-muted">
                भारतीय कृषि अनुसंधान परिषद (ICAR) और राज्य कृषि विश्वविद्यालय के पैकेज ऑफ प्रैक्टिसेज पर आधारित।
              </div>
              <div class="helpline-box mt-2">
                <span>📞 किसान कॉल सेंटर (Toll-Free):</span>
                <a href="tel:18001801551" class="helpline-link">1800-180-1551</a>
              </div>
            </div>
          </div>

          <button class="btn-primary mt-auto" onclick="goToScreen(18)">
            <span>${getLangText('फॉलो-अप रिमाइंडर देखें', 'View Follow-Up Reminder', 'ਫਾਲੋ-ਅੱਪ ਦੇਖੋ')}</span>
            <span>→</span>
          </button>
        </div>
      `;
    },

    // Screen 17: Offline Mode & Pending Sync
    17: function(container) {
      const state = KisanState.get();
      const queue = state.offlineQueue || [];

      container.innerHTML = `
        <div class="screen-view">
          <div class="screen-header-bar">
            <button class="back-btn" onclick="goToScreen(5)">←</button>
            <h3>${getLangText('ऑफ़लाइन मोड व सिंक', 'Offline Mode & Sync', 'ਔਫਲਾਈਨ ਮੋਡ')}</h3>
            <div></div>
          </div>

          <div class="offline-status-banner ${state.isOffline ? 'offline' : 'online'}">
            <div class="offline-icon-large">${state.isOffline ? '📡' : '🟢'}</div>
            <div class="offline-status-text">
              <div class="font-bold">${state.isOffline ? getLangText('ऑफ़लाइन मोड सक्रिय है', 'Offline Mode Active', 'ਔਫਲਾਈਨ ਮੋਡ') : getLangText('ऑनलाइन कनेक्टेड', 'Online Connected', 'ਆਨਲਾਈਨ')}</div>
              <div class="text-xs">${state.isOffline ? getLangText('बिना इंटरनेट के फोटो ले सकते हैं व पुरानी सलाह देख सकते हैं।', 'You can take photos and view cached advisories offline.', 'ਬਿਨਾਂ ਇੰਟਰਨੈਟ ਕੰਮ ਕਰੋ।') : getLangText('केंद्रीय सर्वर से पूर्ण कनेक्शन उपलब्ध है।', 'Full connection with central cloud service.', 'ਕਲਾਉਡ ਨਾਲ ਜੁੜਿਆ।')}</div>
            </div>
          </div>

          <!-- Pending Queue List -->
          <div class="offline-queue-card">
            <div class="flex-between mb-2">
              <div class="form-label">${getLangText('सिंक के लिए लंबित डेटा (Pending Queue)', 'Pending Sync Items', 'ਸਿੰਕ ਲਈ ਬਾਕੀ')}</div>
              <span class="queue-count-pill">${queue.length} items</span>
            </div>

            ${queue.length === 0 ? `
              <div class="empty-queue-msg">
                <span>✓</span>
                <span>${getLangText('सभी डेटा पहले से सिंक है। कोई लंबित कार्य नहीं।', 'All data is synchronized. No pending items.', 'ਸਾਰਾ ਡਾਟਾ ਸਿੰਕ ਹੈ।')}</span>
              </div>
            ` : `
              <div class="queue-items-list">
                ${queue.map(q => `
                  <div class="queue-item-row">
                    <span>📷 ${q.payload?.diagnosis?.name || 'Field Crop Scan'}</span>
                    <span class="text-xs text-muted">Pending</span>
                  </div>
                `).join('')}
              </div>
            `}
          </div>

          <!-- Offline Tools Shortcuts -->
          <div class="offline-tools-grid mt-3">
            <div class="tool-tile" onclick="goToScreen(7)">
              <div class="tool-tile-icon">📸</div>
              <div class="tool-tile-title">${getLangText('ऑफ़लाइन फोटो लें', 'Take Photo', 'ਫੋਟੋ ਲਓ')}</div>
            </div>
            <div class="tool-tile" onclick="goToScreen(28)">
              <div class="tool-tile-icon">📖</div>
              <div class="tool-tile-title">${getLangText('खेत की डायरी', 'Farm Memory', 'ਖੇਤ ਡਾਇਰੀ')}</div>
            </div>
          </div>

          <div class="flex-row-btns mt-auto">
            <button class="btn-secondary" onclick="toggleOfflineMode()">
              <span>${state.isOffline ? '🟢 Switch Online' : '🟠 Switch Offline'}</span>
            </button>
            <button class="btn-primary" onclick="syncOfflineQueueNow()">
              <span>🔄 ${getLangText('अभी सिंक करें (Sync Now)', 'Sync Now', 'ਹੁਣੇ ਸਿੰਕ ਕਰੋ')}</span>
            </button>
          </div>
        </div>
      `;
    },

    // Screen 18: Follow-Up Reminder
    18: function(container) {
      const state = KisanState.get();
      const lastScan = state.scanHistory[0] || { diagnosisName: "Tomato Early Blight", severity: 40, date: "5 days ago" };

      container.innerHTML = `
        <div class="screen-view">
          <div class="screen-header-bar">
            <button class="back-btn" onclick="goToScreen(5)">←</button>
            <h3>${getLangText('फॉलो-अप का समय', 'Follow-Up Due', 'ਫਾਲੋ-ਅੱਪ ਦਾ ਸਮਾਂ')}</h3>
            <div></div>
          </div>

          <div class="reminder-hero-card">
            <div class="reminder-bell-icon">🔔</div>
            <div class="reminder-title">${getLangText('टमाटर की फसल की पुनः जांच का समय', 'Time for Tomato Checkup', 'ਮੁੜ ਜਾਂਚ ਦਾ ਸਮਾਂ')}</div>
            <div class="reminder-sub">
              ${getLangText('उत्तर खेत (North Field) — 5 दिन पहले अगेती झुलसा (40% गंभीरता) दर्ज हुआ था।', 'North Field: 5 days ago Early Blight (40% severity) was recorded.', '5 ਦਿਨ ਪਹਿਲਾਂ 40% ਬਿਮਾਰੀ ਸੀ।')}
            </div>
          </div>

          <div class="info-alert-card mt-3">
            <span>❓</span>
            <span>${getLangText('उपचार के बाद आपकी फसल में कितना सुधार हुआ? नई फोटो खींचकर जांचें ताकि अगली सलाह स्वतः अपडेट हो सके।', 'Take a new scan to compare recovery and dynamically adapt next steps.', 'ਨਵੀਂ ਫੋਟੋ ਖਿੱਚ ਕੇ ਸੁਧਾਰ ਦੇਖੋ।')}</span>
          </div>

          <div class="flex-row-btns mt-auto">
            <button class="btn-secondary" onclick="goToScreen(5)">
              <span>${getLangText('कल याद दिलाएं', 'Remind Tomorrow', 'ਕੱਲ ਯਾਦ ਦਿਵਾਓ')}</span>
            </button>
            <button class="btn-primary" onclick="goToScreen(19)">
              <span>📷 ${getLangText('फॉलो-अप फोटो लें', 'Take Follow-Up Scan', 'ਨਵੀਂ ਫੋਟੋ ਲਓ')}</span>
              <span>→</span>
            </button>
          </div>
        </div>
      `;
    },

    // Screen 19: Follow-Up Scan Comparison
    19: function(container) {
      const state = KisanState.get();
      const prevScan = state.scanHistory[0] || { severity: 40, imageUrl: "../generated_screens/screen_01.png" };

      container.innerHTML = `
        <div class="screen-view">
          <div class="screen-header-bar">
            <button class="back-btn" onclick="goToScreen(18)">←</button>
            <h3>${getLangText('तुलनात्मक फोटो जांच', 'Follow-Up Scan Comparison', 'ਤੁਲਨਾਤਮਕ ਜਾਂਚ')}</h3>
            <div></div>
          </div>

          <!-- Side-by-Side Viewfinder -->
          <div class="side-by-side-grid">
            <div class="compare-frame">
              <div class="frame-tag">${getLangText('पहले की फोटो (Day 1)', 'Baseline (Day 1)', 'ਪਹਿਲੀ ਫੋਟੋ')}</div>
              <img src="${prevScan.imageUrl || '../generated_screens/screen_01.png'}" class="compare-img">
              <div class="frame-sub text-red">${prevScan.severity || 40}% ${getLangText('प्रभावित', 'affected', 'ਬਿਮਾਰ')}</div>
            </div>

            <div class="compare-frame">
              <div class="frame-tag new">${getLangText('आज की नई फोटो (Day 5)', 'Today (Day 5)', 'ਅੱਜ ਦੀ ਫੋਟੋ')}</div>
              <div class="live-cam-placeholder" id="followUpCamPlaceholder" onclick="loadSampleFollowUpPhoto('improved')">
                <span style="font-size: 24px;">📷</span>
                <span style="font-size: 11px;">${getLangText('टैप करके नई फोटो लें', 'Tap to capture', 'ਫੋਟੋ ਲਓ')}</span>
              </div>
              <div class="frame-sub text-green" id="followUpSeverityTag">22% ${getLangText('लक्षण कम हुए', 'reduced', 'ਘਟੇ')}</div>
            </div>
          </div>

          <!-- Quick Selector for Demo Testing -->
          <div class="demo-toggle-strip mt-2">
            <span class="text-xs text-muted">${getLangText('टेस्ट परिणाम चुनें:', 'Test Simulation:', 'ਟੈਸਟ: ')}</span>
            <button type="button" class="btn-xs-tag" onclick="loadSampleFollowUpPhoto('improved')">✓ सुधरा (Improved - 22%)</button>
            <button type="button" class="btn-xs-tag" onclick="loadSampleFollowUpPhoto('worsened')">⚠️ बढ़ा (Worsened - 55%)</button>
          </div>

          <div class="form-checkbox-row mt-3">
            <input type="checkbox" id="confirmSamePlot" checked>
            <label for="confirmSamePlot" class="text-xs">${getLangText('पुष्टि करें: यह वही पौधा और वही खेत है।', 'Confirming same plant and plot.', 'ਪੁਸ਼ਟੀ: ਇਹ ਉਹੀ ਬੂਟਾ ਹੈ।')}</label>
          </div>

          <button class="btn-primary mt-auto" onclick="submitFollowUpComparison()">
            <span>${getLangText('तुलना करें और प्रगति देखें', 'Compare & Evaluate Progression', 'ਤਰੱਕੀ ਦੇਖੋ')}</span>
            <span>→</span>
          </button>
        </div>
      `;
    },

    // Screen 20: Disease Progression Timeline
    20: function(container) {
      const state = KisanState.get();
      const lastFollowup = state.followUpRecords[0] || {
        previousSeverity: 40,
        currentSeverity: 22,
        outcome: "IMPROVED",
        outcomeHi: "सुधार देखा गया (Condition Improved)",
        adaptiveAdvice: "Condition improved following reported intervention. Stop corrective spray. Maintain routine monitoring."
      };

      const isImproved = lastFollowup.outcome === "IMPROVED";

      container.innerHTML = `
        <div class="screen-view">
          <div class="screen-header-bar">
            <button class="back-btn" onclick="goToScreen(19)">←</button>
            <h3>${getLangText('रोग प्रगति समयरेखा', 'Disease Progression', 'ਬਿਮਾਰੀ ਦੀ ਪ੍ਰਗਤੀ')}</h3>
            <div></div>
          </div>

          <div class="progression-status-card ${isImproved ? 'improved' : 'worsened'}">
            <div class="prog-icon">${isImproved ? '📉' : '📈'}</div>
            <div>
              <div class="prog-badge ${isImproved ? 'green' : 'red'}">${lastFollowup.outcomeHi}</div>
              <div class="prog-subtitle">
                ${isImproved ? getLangText('प्रभावित हिस्से में 18% की कमी दर्ज हुई है। नई पत्तियां रोगमुक्त हैं।', 'Severity reduced by 18%. Healthy new foliage detected.', 'ਬਿਮਾਰੀ ਘਟ ਰਹੀ ਹੈ।') : getLangText('प्रभावित हिस्से में 15% की वृद्धि देखी गई है। विशेषज्ञ समीक्षा आवश्यक है।', 'Severity increased by 15%. Expert review strongly recommended.', 'ਬਿਮਾਰੀ ਵਧ ਰਹੀ ਹੈ।')}
              </div>
            </div>
          </div>

          <!-- 3-Node Timeline Graph -->
          <div class="progression-timeline-graph mt-3">
            <div class="prog-node">
              <div class="node-circle initial">${lastFollowup.previousSeverity}%</div>
              <div class="node-label">Day 1 (${getLangText('शुरुआत', 'Initial', 'ਸ਼ੁਰੂ')})</div>
            </div>
            <div class="node-line ${isImproved ? 'down' : 'up'}"></div>
            <div class="node-node">
              <div class="node-circle ${isImproved ? 'improved' : 'worsened'}">${lastFollowup.currentSeverity}%</div>
              <div class="node-label">Day 5 (${getLangText('आज', 'Today', 'ਅੱਜ')})</div>
            </div>
            <div class="node-line dotted"></div>
            <div class="node-node">
              <div class="node-circle projected">${isImproved ? '10%' : '70%'}</div>
              <div class="node-label">Day 10 (${getLangText('अनुमान', 'Projected', 'ਅੰਦਾਜ਼ਾ')})</div>
            </div>
          </div>

          <div class="flex-row-btns mt-auto">
            <button class="btn-secondary" onclick="goToScreen(21)">
              <span>💊 ${getLangText('उपचार प्रतिक्रिया देखें', 'Treatment Response', 'ਇਲਾਜ ਪ੍ਰਤੀਕਰਿਆ')}</span>
            </button>
            <button class="btn-primary" onclick="goToScreen(22)">
              <span>${getLangText('अपडेट की गई सलाह देखें', 'View Adaptive Advice', 'ਨਵੀਂ ਸਲਾਹ ਦੇਖੋ')}</span>
              <span>→</span>
            </button>
          </div>
        </div>
      `;
    },

    // Screen 21: Treatment Response Tracking
    21: function(container) {
      const state = KisanState.get();
      const lastFollowup = state.followUpRecords[0] || { previousSeverity: 40, currentSeverity: 22, outcome: "IMPROVED" };
      const lastTreatment = state.treatmentLogs[0] || { intervention: "Neem Oil Spray (नीम तेल 5ml/L छिड़काव)", date: "Day 2" };

      container.innerHTML = `
        <div class="screen-view">
          <div class="screen-header-bar">
            <button class="back-btn" onclick="goToScreen(20)">←</button>
            <h3>${getLangText('उपचार प्रतिक्रिया', 'Treatment Response', 'ਇਲਾਜ ਦਾ ਅਸਰ')}</h3>
            <div></div>
          </div>

          <div class="treatment-response-card">
            <div class="response-header">
              <span>📊 ${getLangText('उपचार का प्रभाव विश्लेषण', 'Intervention vs Outcome', 'ਇਲਾਜ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ')}</span>
            </div>

            <div class="before-after-metrics">
              <div class="metric-box">
                <span class="metric-label">${getLangText('उपचार से पहले (Before)', 'Before', 'ਪਹਿਲਾਂ')}</span>
                <span class="metric-val text-red">${lastFollowup.previousSeverity}%</span>
                <span class="text-xs text-muted">High severity</span>
              </div>
              <div class="metric-arrow">➔</div>
              <div class="metric-box">
                <span class="metric-label">${getLangText('उपचार के बाद (After)', 'After', 'ਬਾਅਦ')}</span>
                <span class="metric-val text-green">${lastFollowup.currentSeverity}%</span>
                <span class="text-xs text-muted">Significant drop</span>
              </div>
            </div>

            <div class="reported-intervention-row">
              <span class="font-bold">किसान द्वारा किया गया उपाय:</span>
              <span>${lastTreatment.intervention} (${lastTreatment.date})</span>
            </div>

            <div class="disclaimer-safe-card">
              <span>⚖️</span>
              <span>${getLangText('वैज्ञानिक मानक: फसल की स्थिति में दर्ज किए गए उपाय के बाद सुधार देखा गया है। (Non-causal observed response)', 'Observed recovery correlated with reported farmer action.', 'ਪ੍ਰਮਾਣਿਤ ਵਿਸ਼ਲੇਸ਼ਣ।')}</span>
            </div>
          </div>

          <button class="btn-primary mt-auto" onclick="goToScreen(22)">
            <span>${getLangText('अनुकूली सलाह पर जाएं', 'Go to Adaptive Advice', 'ਨਵੀਂ ਸਲਾਹ')}</span>
            <span>→</span>
          </button>
        </div>
      `;
    },

    // Screen 22: Adaptive Follow-Up Action
    22: function(container) {
      const state = KisanState.get();
      const lastFollowup = state.followUpRecords[0] || { outcome: "IMPROVED" };
      const isImproved = lastFollowup.outcome === "IMPROVED";

      container.innerHTML = `
        <div class="screen-view">
          <div class="screen-header-bar">
            <button class="back-btn" onclick="goToScreen(20)">←</button>
            <h3>${getLangText('अनुकूली कार्ययोजना', 'Adaptive Next Steps', 'ਅਨੁਕੂਲ ਕਾਰਵਾਈ')}</h3>
            <div></div>
          </div>

          <div class="adaptive-dynamic-banner">
            <div class="banner-dynamic-icon">🔀</div>
            <div>
              <div class="font-bold">${getLangText('सुधार के आधार पर नई सलाह स्वतः अपडेट की गई', 'Guidance Adapted to Recovery', 'ਨਵੀਂ ਸਲਾਹ ਅਪਡੇਟ ਹੋਈ')}</div>
              <div class="text-xs">${isImproved ? getLangText('चूंकि फसल ठीक हो रही है, इसलिए अतिरिक्त कीटनाशक छिड़काव रोक दिया गया है।', 'Spraying suspended to allow natural plant recovery.', 'ਵਾਧੂ ਸਪਰੇਅ ਰੋਕੀ ਗਈ।') : getLangText('चूंकि रोग बढ़ा है, तत्काल विशेषज्ञ परामर्श की सिफारिश की जाती है।', 'Condition worsened; expert escalation triggered.', 'ਬਿਮਾਰੀ ਵਧਣ ਕਰਕੇ ਮਾਹਰ ਨੂੰ ਭੇਜੋ।')}</div>
            </div>
          </div>

          <div class="adaptive-cards-list mt-3">
            <div class="adapt-card">
              <span class="adapt-num">1</span>
              <div>
                <div class="adapt-title">${isImproved ? getLangText('छिड़काव बंद करें (Stop Spray)', 'Suspend Chemical/Organic Spray', 'ਸਪਰੇਅ ਬੰਦ ਕਰੋ') : getLangText('तुरंत विशेषज्ञ से संपर्क करें', 'Contact Expert Immediately', 'ਮਾਹਰ ਨਾਲ ਸੰਪਰਕ ਕਰੋ')}</div>
                <div class="adapt-desc">${isImproved ? 'पौधे की प्राकृतिक बढ़वार जारी रहने दें, पत्तियों पर अतिरिक्त दवा का भार न डालें।' : 'केस को विशेषज्ञ कतार में भेजकर सलाह लें।'}</div>
              </div>
            </div>

            <div class="adapt-card">
              <span class="adapt-num">2</span>
              <div>
                <div class="adapt-title">${getLangText('हल्की निगरानी रखें (Light Monitoring)', 'Light Foliage Monitoring', 'ਹਲਕੀ ਨਿਗਰਾਨੀ')}</div>
                <div class="adapt-desc">${getLangText('अगले 7 दिनों में केवल नई निकलने वाली शाखाओं पर ध्यान दें।', 'Check young shoots only.', 'ਨਵੀਆਂ ਸ਼ਾਖਾਵਾਂ ਦੇਖੋ।')}</div>
              </div>
            </div>

            <div class="adapt-card">
              <span class="adapt-num">3</span>
              <div>
                <div class="adapt-title">${getLangText('अंतिम पुष्टि 7 दिन बाद (Final Scan)', 'Final Recheck in 7 Days', 'ਆਖਰੀ ਜਾਂਚ 7 ਦਿਨ ਬਾਅਦ')}</div>
                <div class="adapt-desc">${getLangText('7 दिन बाद अंतिम स्वस्थ फसल की फोटो खींचकर सीजन मेमोरी में दर्ज करें।', 'Take final confirmation scan.', 'ਆਖਰੀ ਫੋਟੋ ਲਓ।')}</div>
              </div>
            </div>
          </div>

          <button class="btn-primary mt-auto" onclick="acceptAdaptivePlan()">
            <span>${getLangText('स्वीकार करें व रिमाइंडर सेट करें', 'Accept & Set Reminder', 'ਮਨਜ਼ੂਰ ਕਰੋ')}</span>
            <span>→</span>
          </button>
        </div>
      `;
    },

    // Screen 23: Expert Help Request
    23: function(container) {
      const state = KisanState.get();
      const farm = KisanState.getActiveFarm();
      const lastScan = state.scanHistory[0] || {};

      container.innerHTML = `
        <div class="screen-view">
          <div class="screen-header-bar">
            <button class="back-btn" onclick="goToScreen(12)">←</button>
            <h3>${getLangText('कृषि विशेषज्ञ से पूछें', 'Consult Expert', 'ਮਾਹਰ ਤੋਂ ਪੁੱਛੋ')}</h3>
            <div></div>
          </div>

          <!-- Case Summary Card -->
          <div class="case-summary-strip">
            <div class="flex-between">
              <span class="font-bold">${farm.name} (${farm.cropHi || farm.crop})</span>
              <span class="severity-pill ${lastScan.riskLevel === 'HIGH' ? 'high' : 'medium'}">${lastScan.riskLevel || 'HIGH'} RISK</span>
            </div>
            <div class="text-xs text-muted mt-1">AI Diagnosis: ${lastScan.diagnosisName || 'Tomato Early Blight'} (Confidence: ${lastScan.confidence || 72}%)</div>
          </div>

          <div class="form-container mt-2">
            <div class="form-group">
              <label class="form-label">${getLangText('अतिरिक्त लक्षण बताएं / Additional Notes', 'Additional Symptoms / Observations', 'ਹੋਰ ਲੱਛਣ')}</label>
              <textarea id="expertCaseNotes" class="form-textarea" rows="2" placeholder="${getLangText('दवा का असर नहीं हुआ या धब्बे तेजी से फैल रहे हैं...', 'Explain what happened...', 'ਹੋਰ ਵੇਰਵਾ...')}">Severe leaf spots spreading despite basic neem spray. Requesting laboratory-backed advisory.</textarea>
            </div>

            <!-- Audio Note Option -->
            <div class="form-group">
              <div class="flex-between">
                <label class="form-label">${getLangText('आवाज संदेश रिकॉर्ड करें / Voice Note', 'Voice Note for Expert', 'ਆਵਾਜ਼ ਸੁਨੇਹਾ')}</label>
                <button type="button" class="link-btn" onclick="recordExpertVoiceNote()">🎙️ ${getLangText('रिकॉर्ड करें', 'Record', 'ਰਿਕਾਰਡ')}</button>
              </div>
              <div class="voice-note-status" id="expertVoiceNoteStatus">${getLangText('वैकल्पिक: बोलकर अपनी बात रिकॉर्ड करें', 'Optional voice note', 'ਆਵਾਜ਼ ਸੁਨੇਹਾ ਜੋੜੋ')}</div>
            </div>

            <div class="form-group">
              <label class="form-label">${getLangText('संपर्क का पसंदीदा माध्यम / Contact Mode', 'Preferred Contact Mode', 'ਸੰਪਰਕ ਦਾ ਤਰੀਕਾ')}</label>
              <div class="contact-mode-chips">
                <label class="radio-chip"><input type="radio" name="contactMode" value="app" checked> इन-ऐप सलाह (In-App)</label>
                <label class="radio-chip"><input type="radio" name="contactMode" value="whatsapp"> व्हाट्सएप (WhatsApp)</label>
                <label class="radio-chip"><input type="radio" name="contactMode" value="call"> फोन कॉल (Call)</label>
              </div>
            </div>

            <div class="workflow-status-card">
              <div class="wf-step active">1. अनुरोध प्रेषण</div>
              <div class="wf-arrow">➔</div>
              <div class="wf-step">2. वैज्ञानिक जांच</div>
              <div class="wf-arrow">➔</div>
              <div class="wf-step">3. 24 घंटे में समाधान</div>
            </div>

            <button class="btn-primary mt-auto" onclick="submitCaseToExpertQueue()">
              <span>${getLangText('विशेषज्ञ को भेजें', 'Submit to Expert Queue', 'ਮਾਹਰ ਨੂੰ ਭੇਜੋ')}</span>
              <span>→</span>
            </button>
          </div>
        </div>
      `;
    },

    // Screen 24: Expert / Extension Case Dashboard
    24: function(container) {
      const state = KisanState.get();
      const cases = state.expertCases || [];

      container.innerHTML = `
        <div class="screen-view">
          <div class="screen-header-bar">
            <button class="back-btn" onclick="goToScreen(5)">←</button>
            <h3>${getLangText('विस्तार कार्यकर्ता डैशबोर्ड', 'Extension Case Queue', 'ਕੇਸ ਸੂਚੀ')}</h3>
            <span class="role-indicator">🧑‍🔬 Expert</span>
          </div>

          <!-- Queue Filter Tabs -->
          <div class="tab-pill-bar">
            <button class="tab-pill active" onclick="filterExpertQueue('ALL')">${getLangText('सभी', 'All', 'ਸਾਰੇ')} (${cases.length})</button>
            <button class="tab-pill" onclick="filterExpertQueue('URGENT')">${getLangText('उच्च जोखिम', 'Urgent', 'ਵੱਧ ਜੋਖਮ')}</button>
            <button class="tab-pill" onclick="filterExpertQueue('RESOLVED')">${getLangText('सत्यापित', 'Resolved', 'ਹੱਲ ਕੀਤੇ')}</button>
          </div>

          <div class="expert-cases-list mt-2" id="expertCasesList">
            ${cases.map(c => `
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
                    ${getLangText('केस खोलें', 'Open Case', 'ਕੇਸ ਖੋਲ੍ਹੋ')} →
                  </button>
                </div>
              </div>
            `).join('')}
          </div>

          ${renderMobileBottomNav(24)}
        </div>
      `;
    },

    // Screen 25: Expert Case Detail & Validation
    25: function(container) {
      const state = KisanState.get();
      const currentCase = state.expertCases[0] || {
        id: "KS-9842",
        farmerName: "रमेश कुमार (Ramesh Kumar)",
        village: "करनाल (Karnal)",
        crop: "Tomato",
        diagnosisAI: "Tomato Early Blight (अगेती झुलसा)",
        confidenceAI: 72,
        riskAI: "HIGH",
        symptoms: "Severe necrotic spots with yellow halo on lower tomato canopy."
      };

      container.innerHTML = `
        <div class="screen-view">
          <div class="screen-header-bar">
            <button class="back-btn" onclick="goToScreen(24)">←</button>
            <h3>${getLangText('केस सत्यापन #' + currentCase.id, 'Case Detail #' + currentCase.id, 'ਕੇਸ ਵੇਰਵਾ')}</h3>
            <span class="priority-badge urgent">URGENT</span>
          </div>

          <!-- Farmer & Evidence Header -->
          <div class="case-detail-header">
            <div>
              <div class="font-bold">${currentCase.farmerName} • ${currentCase.village}</div>
              <div class="text-xs text-muted">Crop: ${currentCase.crop} | AI Diagnosis: ${currentCase.diagnosisAI}</div>
            </div>
          </div>

          <div class="expert-photo-view">
            <img src="../generated_screens/screen_01.png" class="expert-large-img">
            <div class="ai-overlay-box">
              <span class="font-bold">AI Prediction:</span> ${currentCase.diagnosisAI} (${currentCase.confidenceAI}%)
            </div>
          </div>

          <!-- Expert Actions Form -->
          <div class="expert-action-card mt-3">
            <div class="form-label">${getLangText('वैज्ञानिक सत्यापन (Scientific Validation)', 'Validation Action', 'ਵਿਗਿਆਨਕ ਜਾਂਚ')}</div>
            <div class="validation-radios">
              <label class="radio-label">
                <input type="radio" name="expertVerdict" value="CONFIRM" checked>
                <span>✓ ${getLangText('AI निदान की पुष्टि करें (Confirm AI Diagnosis)', 'Confirm AI Diagnosis', 'ਪੁਸ਼ਟੀ ਕਰੋ')}</span>
              </label>
              <label class="radio-label">
                <input type="radio" name="expertVerdict" value="OVERRIDE">
                <span>✏️ ${getLangText('निदान में सुधार करें (Override with Custom Diagnosis)', 'Override Diagnosis', 'ਸੁਧਾਰ ਕਰੋ')}</span>
              </label>
            </div>

            <div class="form-group mt-2">
              <label class="form-label">${getLangText('परामर्श नोट्स (Advisory Notes for Farmer)', 'Advisory Notes', 'ਸਲਾਹ ਨੋਟਿਸ')}</label>
              <textarea id="expertAdvisoryInput" class="form-textarea" rows="2">Confirmed Early Blight. Apply Copper Oxychloride 50% WP @ 2.5g/L immediately. Destroy fallen leaves.</textarea>
            </div>

            <div class="flex-row-btns mt-2">
              <button class="btn-secondary" onclick="referCurrentCaseToLab('${currentCase.id}')">
                <span>🧪 ${getLangText('लैब में भेजें', 'Refer to Lab', 'ਲੈਬ ਭੇਜੋ')}</span>
              </button>
              <button class="btn-primary" onclick="dispatchExpertAdvisory('${currentCase.id}')">
                <span>📤 ${getLangText('किसान को सलाह भेजें', 'Dispatch Advisory', 'ਸਲਾਹ ਭੇਜੋ')}</span>
              </button>
            </div>
          </div>
        </div>
      `;
    },

    // Screen 26: Laboratory Referral
    26: function(container) {
      const state = KisanState.get();
      const referral = state.labReferrals[0] || {
        id: "LAB-TMT-2026-08",
        caseId: "KS-9842",
        farmerName: "रमेश कुमार (Ramesh Kumar)",
        crop: "Tomato Hybrid",
        sampleType: "Foliage with necrotic lesions",
        testRequested: "PCR / Fungal Culture Assay",
        status: "TESTING",
        sentDate: "2026-09-02",
        labName: "State Ag Diagnostic Lab, Karnal"
      };

      container.innerHTML = `
        <div class="screen-view">
          <div class="screen-header-bar">
            <button class="back-btn" onclick="goToScreen(25)">←</button>
            <h3>${getLangText('प्रयोगशाला रेफरल', 'Laboratory Referral', 'ਲੈਬ ਰੈਫਰਲ')}</h3>
            <span class="role-indicator">🔬 Lab</span>
          </div>

          <!-- Referral Ticket -->
          <div class="lab-ticket-card">
            <div class="flex-between">
              <div>
                <span class="text-xs text-muted">Sample Ticket ID</span>
                <div class="font-bold text-lg">${referral.id}</div>
              </div>
              <div class="qr-mock-box">🏁 [QR]</div>
            </div>

            <div class="ticket-details-grid mt-2">
              <div><span class="text-muted">Farmer:</span> ${referral.farmerName}</div>
              <div><span class="text-muted">Crop:</span> ${referral.crop}</div>
              <div><span class="text-muted">Sample:</span> ${referral.sampleType}</div>
              <div><span class="text-muted">Assay:</span> ${referral.testRequested}</div>
            </div>

            <!-- Lifecycle Timeline -->
            <div class="lab-timeline-strip mt-3">
              <div class="lab-step done">✓ Sent</div>
              <div class="lab-arrow">➔</div>
              <div class="lab-step done">✓ Received</div>
              <div class="lab-arrow">➔</div>
              <div class="lab-step active">⏳ Testing</div>
              <div class="lab-arrow">➔</div>
              <div class="lab-step">Report</div>
            </div>
          </div>

          <!-- Lab Result Entry -->
          <div class="form-container mt-3">
            <div class="form-group">
              <label class="form-label">${getLangText('लैब परीक्षण परिणाम (Enter Confirmed Lab Result)', 'Lab Result Entry', 'ਲੈਬ ਨਤੀਜਾ')}</label>
              <input type="text" id="labResultInput" class="form-input" value="Confirmed: Alternaria solani (Early Blight) - Positive">
            </div>

            <button class="btn-primary" onclick="submitLabResult('${referral.id}')">
              <span>📄 ${getLangText('लैब रिपोर्ट जारी करें व केस अपडेट करें', 'Issue Report & Update Case', 'ਰਿਪੋਰਟ ਜਾਰੀ ਕਰੋ')}</span>
            </button>
          </div>
        </div>
      `;
    },

    // Screen 27: Notifications & Alerts
    27: function(container) {
      const state = KisanState.get();
      const notifs = state.notifications || [];

      container.innerHTML = `
        <div class="screen-view">
          <div class="screen-header-bar">
            <button class="back-btn" onclick="goToScreen(5)">←</button>
            <h3>${getLangText('सूचनाएं व अलर्ट केंद्र', 'Notifications & Alerts', 'ਸੂਚਨਾਵਾਂ')}</h3>
            <button class="link-btn" onclick="markAllNotificationsRead()">${getLangText('सब पढ़ीं', 'Mark Read', 'ਪੜ੍ਹ ਲਿਆ')}</button>
          </div>

          <div class="notif-cards-list">
            ${notifs.map(n => `
              <div class="notif-item-card ${n.priority} ${n.read ? 'read' : 'unread'}" onclick="handleNotificationClick(${n.actionScreen || 5})">
                <div class="notif-header">
                  <span class="notif-priority-pill ${n.priority}">${n.priority.toUpperCase()}</span>
                  <span class="notif-time">${n.timestamp}</span>
                </div>
                <div class="notif-title">${n.title}</div>
                <div class="notif-body">${n.body}</div>
              </div>
            `).join('')}
          </div>

          ${renderMobileBottomNav(27)}
        </div>
      `;
    },

    // Screen 28: Farm Timeline & Personal Farm Memory
    28: function(container) {
      const state = KisanState.get();
      const history = state.scanHistory || [];

      container.innerHTML = `
        <div class="screen-view">
          <div class="screen-header-bar">
            <button class="back-btn" onclick="goToScreen(5)">←</button>
            <h3>${getLangText('खेत की याददाश्त (समयरेखा)', 'Personal Farm Memory', 'ਖੇਤ ਦੀ ਯਾਦਦਾਸ਼ਤ')}</h3>
            <div></div>
          </div>

          <div class="timeline-hero-msg">
            <span>📖</span>
            <span>${getLangText('आपकी फसल का पूरा इतिहास यहां सुरक्षित है, जिससे भविष्य की सलाह अधिक सटीक बनती है।', 'Continuous record of scans, treatments and health trends.', 'ਫਸਲ ਦਾ ਪੂਰਾ ਇਤਿਹਾਸ।')}</span>
          </div>

          <!-- Vertical Interactive Timeline -->
          <div class="memory-timeline-vertical mt-2">
            ${history.map(item => `
              <div class="timeline-event-card" onclick="goToScreen(12)">
                <div class="event-dot"></div>
                <div class="event-content">
                  <div class="flex-between">
                    <span class="event-date">${item.date} (${item.dayLabel || 'Scan'})</span>
                    <span class="severity-pill ${item.riskLevel === 'HIGH' ? 'high' : 'medium'}">${item.severity}% affected</span>
                  </div>
                  <div class="event-name">${item.diagnosisName}</div>
                  <div class="event-desc">${item.symptoms}</div>
                </div>
              </div>
            `).join('')}

            <div class="timeline-event-card">
              <div class="event-dot setup"></div>
              <div class="event-content">
                <div class="event-date">2026-08-15 (Start of Season)</div>
                <div class="event-name">Farm Profile Created</div>
                <div class="event-desc">Tomato Pusa Hybrid planted over 2.5 acres. Drip irrigation active.</div>
              </div>
            </div>
          </div>

          ${renderMobileBottomNav(28)}
        </div>
      `;
    },

    // Screen 29: Farm Health Score Deep Dive
    29: function(container) {
      const farm = KisanState.getActiveFarm();

      container.innerHTML = `
        <div class="screen-view">
          <div class="screen-header-bar">
            <button class="back-btn" onclick="goToScreen(5)">←</button>
            <h3>${getLangText('फार्म हेल्थ स्कोर विश्लेषण', 'Health Score Deep Dive', 'ਸਿਹਤ ਸਕੋਰ')}</h3>
            <div></div>
          </div>

          <!-- Score Gauge -->
          <div class="score-deep-hero">
            <div class="deep-score-num">${farm.healthScore}</div>
            <div class="deep-score-max">/ 100</div>
            <div class="deep-score-verdict good">उत्तम स्वास्थ्य स्थिति (Good Condition)</div>
            <div class="deep-trend-arrow">▲ +8 points recovery this week</div>
          </div>

          <!-- 4 Pillars -->
          <div class="pillar-bars-list mt-3">
            <div class="pillar-row">
              <div class="flex-between text-xs">
                <span>🛡️ ${getLangText('रोग प्रतिरोधक क्षमता (Disease Resistance)', 'Disease Resistance', 'ਰੋਗ ਪ੍ਰਤੀਰੋਧ')}</span>
                <span class="font-bold">85/100</span>
              </div>
              <div class="progress-track"><div class="progress-fill green" style="width: 85%;"></div></div>
            </div>

            <div class="pillar-row">
              <div class="flex-between text-xs">
                <span>⛅ ${getLangText('मौसम अनुकूलता (Weather Resilience)', 'Weather Resilience', 'ਮੌਸਮ ਅਨੁਕੂਲਤਾ')}</span>
                <span class="font-bold">68/100</span>
              </div>
              <div class="progress-track"><div class="progress-fill amber" style="width: 68%;"></div></div>
            </div>

            <div class="pillar-row">
              <div class="flex-between text-xs">
                <span>💊 ${getLangText('समय पर उपचार (Treatment Adherence)', 'Treatment Adherence', 'ਸਮੇਂ ਸਿਰ ਇਲਾਜ')}</span>
                <span class="font-bold">95/100</span>
              </div>
              <div class="progress-track"><div class="progress-fill green" style="width: 95%;"></div></div>
            </div>

            <div class="pillar-row">
              <div class="flex-between text-xs">
                <span>📈 ${getLangText('ऐतिहासिक स्वास्थ्य (Historical Vigor)', 'Historical Vigor', 'ਇਤਿਹਾਸਕ ਸਿਹਤ')}</span>
                <span class="font-bold">80/100</span>
              </div>
              <div class="progress-track"><div class="progress-fill green" style="width: 80%;"></div></div>
            </div>
          </div>

          <div class="advice-card mt-3">
            <strong>स्कोर 90+ करने के लिए सलाह:</strong>
            <p class="text-xs text-muted mt-1">शाम के समय सिंचाई से बचें और आगामी 2 दिनों में उच्च आर्द्रता के दौरान खेत में हवा का आवागमन बनाए रखें।</p>
          </div>

          <button class="btn-primary mt-auto" onclick="goToScreen(30)">
            <span>${getLangText('क्षेत्रीय रोग नक्शा देखें', 'View Regional GIS Map', 'ਖੇਤਰੀ ਨਕਸ਼ਾ')}</span>
            <span>→</span>
          </button>
        </div>
      `;
    },

    // Screen 30: Nearby Risk & GIS Map View
    30: function(container) {
      container.innerHTML = `
        <div class="screen-view">
          <div class="screen-header-bar">
            <button class="back-btn" onclick="goToScreen(5)">←</button>
            <h3>${getLangText('आस-पास का जोखिम व नक्शा', 'Nearby Risk & GIS Map', 'ਨੇੜਲਾ ਜੋਖਮ')}</h3>
            <span class="role-indicator">🏛️ GIS</span>
          </div>

          <!-- Stylized GIS Topographic Map -->
          <div class="gis-map-canvas">
            <div class="map-grid-lines"></div>
            <!-- Farmer Pin -->
            <div class="map-pin my-farm" style="top: 48%; left: 48%;">
              <div class="pin-pulse"></div>
              <span class="pin-icon">🏡</span>
              <span class="pin-tooltip">मेरा खेत (My Farm)</span>
            </div>
            <!-- Disease Outbreak Circles -->
            <div class="hotspot-circle high" style="top: 30%; left: 35%; width: 90px; height: 90px;"></div>
            <div class="hotspot-circle medium" style="top: 55%; left: 65%; width: 110px; height: 110px;"></div>
          </div>

          <!-- Community Risk Alert Card -->
          <div class="community-risk-card mt-3">
            <div class="flex-between">
              <span class="font-bold text-red">⚠️ क्षेत्रीय रोग प्रकोप चेतावनी</span>
              <span class="risk-level-badge high">3km Radius</span>
            </div>
            <p class="text-xs mt-1">
              आपके 3 किमी के दायरे में 12 किसानों ने टमाटर झुलसा रोग (Early Blight) की सूचना दर्ज की है।
            </p>
            <button class="btn-sm mt-2" onclick="goToScreen(16)">
              🛡️ ${getLangText('सामुदायिक बचाव के उपाय देखें', 'View Prevention Steps', 'ਬਚਾਅ ਦੇ ਤਰੀਕੇ')}
            </button>
          </div>

          <button class="btn-primary mt-auto" onclick="goToScreen(31)">
            <span>${getLangText('मौसम जोखिम पूर्वानुमान देखें', 'Weather Forecast Risk', 'ਮੌਸਮ ਜੋਖਮ')}</span>
            <span>→</span>
          </button>
        </div>
      `;
    },

    // Screen 31: Weather & Crop Risk Forecast
    31: function(container) {
      const state = KisanState.get();
      const weather = state.weather;

      container.innerHTML = `
        <div class="screen-view">
          <div class="screen-header-bar">
            <button class="back-btn" onclick="goToScreen(5)">←</button>
            <h3>${getLangText('मौसम और फसल जोखिम', 'Weather & Crop Risk', 'ਮੌਸਮ ਅਤੇ ਜੋਖਮ')}</h3>
            <div></div>
          </div>

          <!-- Current Weather Hero -->
          <div class="weather-forecast-hero">
            <div class="flex-between">
              <div>
                <div class="city-name">करनाल (Karnal, Haryana)</div>
                <div class="temp-big">${weather.temp}°C</div>
                <div class="weather-desc">${weather.condition}</div>
              </div>
              <div class="weather-big-icon">⛈️</div>
            </div>
            <div class="weather-meta-strip mt-2">
              <span>💧 आर्द्रता: ${weather.humidity}%</span>
              <span>🌧️ बारिश: ${weather.rainChance}%</span>
              <span>💨 हवा: ${weather.windSpeed}</span>
            </div>
          </div>

          <!-- 5-Day Strip -->
          <div class="forecast-strip-5day mt-3">
            <div class="day-col"><span class="d-label">आज</span><span class="d-icon">⛅</span><span class="d-temp">27°</span></div>
            <div class="day-col"><span class="d-label">कल</span><span class="d-icon">🌧️</span><span class="d-temp">25°</span></div>
            <div class="day-col"><span class="d-label">शनि</span><span class="d-icon">🌦️</span><span class="d-temp">26°</span></div>
            <div class="day-col"><span class="d-label">रवि</span><span class="d-icon">☀️</span><span class="d-temp">29°</span></div>
            <div class="day-col"><span class="d-label">सोम</span><span class="d-icon">🌤️</span><span class="d-temp">30°</span></div>
          </div>

          <!-- Risk Correlation Warning -->
          <div class="correlation-alert-card mt-3">
            <div class="font-bold text-red">⚠️ ${getLangText('कृषि-मौसम जोखिम चेतावनी', 'Agro-Weather Alert', 'ਚੇਤਾਵਨੀ')}</div>
            <div class="text-xs mt-1">
              उच्च आर्द्रता (>80%) और संभावित बारिश के कारण फफूंद जनित रोगों का जोखिम 65% बढ़ गया है। बारिश रुकने तक किसी भी प्रकार का पर्ण छिड़काव न करें।
            </div>
          </div>

          <button class="btn-primary mt-auto" onclick="goToScreen(32)">
            <span>${getLangText('फीडबैक दें', 'Submit Field Feedback', 'ਫੀਡਬੈਕ ਦਿਓ')}</span>
            <span>→</span>
          </button>
        </div>
      `;
    },

    // Screen 32: Farmer Feedback & Outcome Report
    32: function(container) {
      container.innerHTML = `
        <div class="screen-view">
          <div class="screen-header-bar">
            <button class="back-btn" onclick="goToScreen(5)">←</button>
            <h3>${getLangText('किसान फीडबैक', 'Field Feedback', 'ਕਿਸਾਨ ਫੀਡਬੈਕ')}</h3>
            <div></div>
          </div>

          <p class="screen-subtitle">${getLangText('क्या हमारी सलाह से आपकी फसल में सुधार हुआ? अपनी राय बताएं।', 'Did your crop recover after following our advice? Tell us.', 'ਫਸਲ ਵਿੱਚ ਕਿੰਨਾ ਸੁਧਾਰ ਹੋਇਆ?')} </p>

          <!-- 4 Smileys -->
          <div class="smileys-grid">
            <button type="button" class="smiley-btn selected" onclick="selectFeedbackSmiley(this, 'GREAT')">
              <span class="s-emoji">😃</span>
              <span class="s-label">बहुत सुधार (Great)</span>
            </button>
            <button type="button" class="smiley-btn" onclick="selectFeedbackSmiley(this, 'SLIGHT')">
              <span class="s-emoji">🙂</span>
              <span class="s-label">थोड़ा सुधार (Slight)</span>
            </button>
            <button type="button" class="smiley-btn" onclick="selectFeedbackSmiley(this, 'NONE')">
              <span class="s-emoji">😐</span>
              <span class="s-label">कोई बदलाव नहीं (None)</span>
            </button>
            <button type="button" class="smiley-btn" onclick="selectFeedbackSmiley(this, 'WORSE')">
              <span class="s-emoji">😟</span>
              <span class="s-label">रोग बढ़ा (Worsened)</span>
            </button>
          </div>

          <!-- Star Rating -->
          <div class="star-rating-box mt-3">
            <span class="form-label">${getLangText('सलाह की रेटिंग:', 'Rate advisory:', 'ਰੇਟਿੰਗ:')}</span>
            <div class="stars-row">
              <span class="star active" onclick="setRating(1)">★</span>
              <span class="star active" onclick="setRating(2)">★</span>
              <span class="star active" onclick="setRating(3)">★</span>
              <span class="star active" onclick="setRating(4)">★</span>
              <span class="star active" onclick="setRating(5)">★</span>
            </div>
          </div>

          <div class="form-group mt-3">
            <label class="form-label">${getLangText('टिप्पणी या अनुभव लिखें / Comments', 'Comments', 'ਟਿੱਪਣੀ')}</label>
            <textarea id="feedbackComment" class="form-textarea" rows="2" placeholder="${getLangText('सलाह बहुत उपयोगी रही, 5 दिन में सुधार दिखा...', 'Your experience...', 'ਆਪਣਾ ਤਜਰਬਾ ਲਿਖੋ...')}">सलाह बहुत उपयोगी रही, 5 दिन में सुधार दिखा।</textarea>
          </div>

          <button class="btn-primary mt-auto" onclick="submitFarmerFeedback()">
            <span>${getLangText('फीडबैक सबमिट करें', 'Submit Feedback', 'ਸਬਮਿਟ ਕਰੋ')}</span>
            <span>→</span>
          </button>
        </div>
      `;
    },

    // Screen 33: Settings & Preferences
    33: function(container) {
      const state = KisanState.get();

      container.innerHTML = `
        <div class="screen-view">
          <div class="screen-header-bar">
            <button class="back-btn" onclick="goToScreen(5)">←</button>
            <h3>${getLangText('सेटिंग्स व प्राथमिकताएं', 'Settings', 'ਸੈਟਿੰਗਾਂ')}</h3>
            <div></div>
          </div>

          <!-- Profile Card -->
          <div class="settings-profile-card">
            <div class="settings-avatar">👨‍🌾</div>
            <div>
              <div class="font-bold">${state.farmer.name}</div>
              <div class="text-xs text-muted">📱 +91 ${state.farmer.phone} • ${state.farmer.village}</div>
            </div>
          </div>

          <!-- Menu Options -->
          <div class="settings-menu-list mt-3">
            <div class="menu-item-row" onclick="goToScreen(2)">
              <span>🌐 ${getLangText('भाषा बदलें (Change Language)', 'Change Language', 'ਭਾਸ਼ਾ ਬਦਲੋ')}</span>
              <span class="text-muted text-xs">${state.language.toUpperCase()} →</span>
            </div>

            <div class="menu-item-row" onclick="goToScreen(4)">
              <span>🏡 ${getLangText('खेत प्रबंधन (Manage Farms)', 'Manage Farms', 'ਖੇਤ ਪ੍ਰਬੰਧਨ')}</span>
              <span class="text-muted text-xs">${state.farms.length} Farms →</span>
            </div>

            <div class="menu-item-row" onclick="goToScreen(17)">
              <span>📶 ${getLangText('ऑफ़लाइन डेटा व स्टोरेज (Offline Storage)', 'Offline Storage', 'ਔਫਲਾਈਨ ਡਾਟਾ')}</span>
              <span class="text-muted text-xs">32 MB Cached →</span>
            </div>

            <div class="menu-item-row" onclick="goToScreen(27)">
              <span>🔔 ${getLangText('अधिसूचना प्राथमिकताएं (Alerts)', 'Notifications', 'ਸੂਚਨਾਵਾਂ')}</span>
              <span class="text-muted text-xs">Active →</span>
            </div>

            <div class="menu-item-row" onclick="callHelpline()">
              <span>📞 ${getLangText('किसान सहायता हेल्पलाइन (Helpline)', 'Krishi Helpline', 'ਹੈਲਪਲਾਈਨ')}</span>
              <span class="text-green text-xs">1800-180-1551</span>
            </div>
          </div>

          <button class="btn-danger mt-auto" onclick="resetAllStateData()">
            <span>⚠️ ${getLangText('सभी डेटा रीसेट करें (Reset Demo Data)', 'Reset Demo Data', 'ਡਾਟਾ ਰੀਸੈਟ ਕਰੋ')}</span>
          </button>

          ${renderMobileBottomNav(33)}
        </div>
      `;
    }
  };

  function renderMobileBottomNav(activeId) {
    return `
      <div class="mobile-nav-bar">
        <div class="nav-tab ${activeId === 5 ? 'active' : ''}" onclick="goToScreen(5)">
          <div class="nav-icon">🏠</div>
          <div>होम</div>
        </div>
        <div class="nav-tab ${activeId === 6 ? 'active' : ''}" onclick="goToScreen(6)">
          <div class="nav-icon">🌾</div>
          <div>मेरे खेत</div>
        </div>
        <div class="nav-tab ${activeId === 7 ? 'active' : ''}" onclick="goToScreen(7)">
          <div class="nav-icon">📷</div>
          <div>जांच</div>
        </div>
        <div class="nav-tab ${activeId === 27 ? 'active' : ''}" onclick="goToScreen(27)">
          <div class="nav-icon">🔔</div>
          <div>अलर्ट</div>
        </div>
        <div class="nav-tab ${activeId === 33 ? 'active' : ''}" onclick="goToScreen(33)">
          <div class="nav-icon">⚙️</div>
          <div>सेटिंग्स</div>
        </div>
      </div>
    `;
  }

  window.KisanScreenRenderers = ScreenRenderers;
})();
