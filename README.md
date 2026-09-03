# Kisan Saathi 2.0 (किसान साथी)
### Continuous AI Crop-Health Decision-Support Platform

[![Hackathon Ready](https://img.shields.io/badge/Hackathon-SIH%20%2F%20TEKATHON-brightgreen)](https://github.com/arushigarg880/kisan-saathi)
[![Prototype Live](https://img.shields.io/badge/Status-Functional%20Prototype-blue)](http://localhost:8080/prototype/index.html)
[![Languages](https://img.shields.io/badge/Languages-Hindi%20%7C%20English%20%7C%20Punjabi-orange)](https://github.com/arushigarg880/kisan-saathi)

> **"One app that turns what the farmer sees, says, and records — together with weather, location, farm history and trusted agricultural knowledge — into one understandable crop-health decision."**

---

## 🌟 Overview

**Kisan Saathi 2.0** is an end-to-end, software-only crop health decision-support system designed specifically for Indian farmers, agricultural extension workers, diagnostic laboratories, and government authorities.

Unlike simple one-time disease classifiers, Kisan Saathi operates as a **continuous health companion**:

$$\text{Observe} \longrightarrow \text{Diagnose} \longrightarrow \text{Contextualize} \longrightarrow \text{Predict Risk} \longrightarrow \text{Explain} \longrightarrow \text{Act} \longrightarrow \text{Follow Up} \longrightarrow \text{Adapt} \longrightarrow \text{Escalate}$$

---

## 🚀 Key Features

- **33 Connected Functional Screens**: Every screen is part of one unified data flow from onboarding to farm memory.
- **Multilingual by Default**: Real-time switching between **हिन्दी (Hindi)**, **English**, and **ਪੰਜਾਬੀ (Punjabi)** across all text and speech outputs.
- **Multimodal Evidence Input**: Multi-angle camera capture (leaf front, leaf back, stem, whole plant) combined with voice symptom recording.
- **Image Quality Check**: Pre-analysis validation checking for blur, darkness, and framing before running diagnostics to avoid false predictions.
- **Honest AI ("I Don't Know" Mode)**: If evidence or symptoms are insufficient (<60% confidence), the system transparently reports uncertainty and offers clarifying questions or expert escalation.
- **Context-Aware Risk Assessment**: Evaluates disease severity alongside local weather humidity (>80%), crop growth stage (flowering vs vegetative), and historical farm memory.
- **"What Should I Do Today?" Action Plan**: Priority-based daily task breakdown: **DO NOW**, **MONITOR**, **ROUTINE**, and **NEXT SCAN**.
- **Follow-Up Progression Engine**: Compares baseline scan against day 5 recheck to mathematically determine **IMPROVED**, **STABLE**, or **WORSENING**.
- **Treatment Response Tracking**: Correlates farmer interventions (e.g. Neem oil spray) with severity drop using scientifically sound, non-causal language.
- **Adaptive Guidance**: Dynamically updates recommendations based on recovery (e.g., stops spray if improving; escalates if worsening).
- **Extension & Expert Triage Queue**: Full workflow for extension officers to review cases, validate or override AI diagnoses, and dispatch advisories.
- **Laboratory Sample Referral**: Generates QR-coded diagnostic tickets (`#LAB-TMT-2026-08`) with sample lifecycle tracking.
- **GIS Outbreak Hotspots**: Interactive topographic vector map displaying community disease clusters within 3km and 5km radii.
- **Offline Mode & Auto-Sync**: Fully functional offline operation with local queueing that synchronizes upon internet reconnection.
- **6 Controlled Hackathon Presets**: One-click test scenarios for hackathon evaluation and demonstrations.

---

## 🛠️ Technology Stack & Symbols Used

| Category | Technology / Standard | Purpose |
| :--- | :--- | :--- |
| **Frontend Runtime** | Vanilla JavaScript (ES6+), HTML5, CSS3 | Zero-dependency, ultra-lightweight, high-performance mobile UI compatible with all rural smartphones |
| **Voice & Speech** | Web Speech API (`SpeechRecognition`, `SpeechSynthesis`) | Hands-free voice symptom transcription & spoken audio readouts in native Indian languages |
| **State & Memory** | LocalStorage / IndexedDB pub-sub State Engine | Persistent Personal Farm Memory across sessions and device restarts |
| **Pathology Engine** | Deterministic Rule-Based Agronomic Knowledge Base | Reliable disease inference (Tomato, Wheat, Rice, Cotton) without hallucination |
| **Geographic Intelligence** | Vector SVG Topographic Map Engine | Visualizing anonymized community disease clusters and containment zones |
| **Server Runtime** | Node.js HTTP Server (`server.js`) | Lightweight static server serving the mobile PWA prototype |

### Key Symbols & Visual Indicators in Kisan Saathi

| Symbol | Meaning | Where It Appears |
| :---: | :--- | :--- |
| 🌱 | **Brand Identity / Seedling** | App logo, splash screen, and farm creation |
| 🟢 / 🟠 | **Connectivity Status** | Online (Green) / Offline (Amber) mode indicator |
| 📷 | **Multimodal Scan** | Primary action for multi-angle crop photo capture |
| 🎙️ | **Voice Assistant** | Symptom voice input and audio notes for experts |
| 🔊 | **Voice Guidance** | Spoken audio readouts for non-literate farmers |
| 🚨 | **DO NOW** | Urgent agricultural actions that must be completed today |
| 👁️ | **MONITOR** | Watchpoints to observe over the next 24–48 hours |
| 💧 | **ROUTINE** | Standard irrigation and agronomic maintenance |
| 📅 | **NEXT SCAN** | Scheduled follow-up scan date |
| 📈 / 📉 | **Progression Trend** | Worsening (Red / Up) vs Recovery (Green / Down) |
| 🧑‍🔬 / 🔬 | **Expert & Lab Roles** | Agricultural extension worker & diagnostic lab referral |
| 🗺️ | **GIS Outbreak Pin** | Community disease cluster on regional map |

---

## 🏁 Quickstart / Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/arushigarg880/kisan-saathi.git
   cd kisan-saathi
   ```

2. **Start the local server**:
   ```bash
   node server.js
   ```

3. **Open the application**:
   Open `http://localhost:8080/prototype/index.html` in any web or mobile browser.

---

## 🧪 Testing the 6 Demo Scenarios

In the top header of the prototype, click **`🧪 Demo Presets ▾`** (or the cards on Screen 1) to test:
1. **Successful Diagnosis**: Clear leaf image → Tomato Early Blight (95% confidence, High Risk) with actionable plan.
2. **Poor Image Rejection**: Blurry/empty image → Quality check validation triggers retake request.
3. **Low Confidence / "I Don't Know"**: Ambiguous symptoms → Transparently reports insufficient evidence with fallback steps.
4. **Worsening Follow-up**: Compares baseline 40% with 55% scan → Triggers urgent escalation.
5. **Expert Escalation**: Submits case `#KS-XXXX` → Opens extension worker workstation for override and lab referral.
6. **Offline Cloud Sync**: Queues actions locally while disconnected → Synchronizes upon reconnection.

---

## 📄 License & Integrity

Developed for the **Smart India Hackathon (SIH) / TEKATHON** crop-health initiative. Built according to ICAR and State Agricultural University agronomic guidance packages.
