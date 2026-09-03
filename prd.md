# Kisan Saathi --- Product Requirements Document (PRD)

**Product:** Kisan Saathi\
**Product Type:** Software-only, mobile-first/PWA crop-health
decision-support platform\
**Primary Users:** Farmers, Extension Workers, Agricultural Experts,
Labs, Government/Admin\
**Initial Languages:** Hindi, English, Punjabi\
**Prototype Goal:** A polished, clickable end-to-end demonstration that
makes the intelligence of the system understandable to a farmer without
exposing technical jargon.

------------------------------------------------------------------------

## 1. Product Vision

Kisan Saathi is a **continuous AI crop-health assistant**, not a
one-time disease classifier.

The product should help a farmer move through:

**Observe → Diagnose → Understand Context → Predict Risk → Explain → Act
→ Follow Up → Measure Progress → Adapt → Escalate if needed → Learn →
Continue Monitoring**

The system is **100% software-based**. It must not depend on IoT
sensors, physical pest traps, soil sensors, drones, Raspberry Pi, or
other hardware.

The central product promise is:

> **One app that turns what the farmer sees, says, and records ---
> together with weather, location, farm history and trusted agricultural
> knowledge --- into one understandable crop-health decision.**

------------------------------------------------------------------------

# 2. Problem

Farmers may notice crop disease or pest damage only after it has
progressed. Correct diagnosis and timely expert support may be difficult
to access.

A useful crop-health decision depends on more than one image. It can
involve:

-   Crop and variety
-   Crop growth stage
-   Symptoms
-   Multiple crop images
-   Weather
-   Soil information
-   Previous disease/pest history
-   Previous treatments
-   Location and nearby disease activity

Incorrect or late decisions can contribute to delayed treatment,
unnecessary inputs, increased cultivation cost, crop damage and yield
loss.

------------------------------------------------------------------------

# 3. Product Goals

## Primary Goals

1.  Enable farmers to submit crop problems using **images, voice and
    simple farm information**.
2.  Combine multiple evidence sources instead of relying on one photo.
3.  Detect diseases/pests and communicate **confidence and
    uncertainty**.
4.  Forecast crop-health risk using local context.
5.  Explain why a result was produced.
6.  Give simple, prioritized and actionable recommendations.
7.  Provide multilingual text, voice and visual guidance.
8.  Work in low-connectivity conditions through offline-first
    capabilities.
9.  Track crop condition over time.
10. Monitor treatment response without claiming causation.
11. Adapt the next action based on follow-up results.
12. Escalate uncertain, severe or worsening cases to experts/labs.
13. Build a long-term **Personal Farm Memory**.
14. Provide aggregated intelligence to agricultural authorities.

------------------------------------------------------------------------

# 4. Non-Goals / Hard Constraints

-   No physical sensors.
-   No IoT hardware dependency.
-   No drone dependency.
-   No physical pest traps.
-   No claim that AI is always correct.
-   No automatic blind pesticide prescription.
-   No automatic model retraining from unverified farmer data.
-   No technical ML terminology shown as the primary farmer experience.
-   No requirement for continuous internet connectivity.
-   No fake precision or unsupported quantitative impact claims.

------------------------------------------------------------------------

# 5. Target Users & Roles

## Farmer

Needs: - Very simple navigation - Local language - Voice interaction -
Easy image capture - Clear diagnosis - Clear next action - Offline
access - Crop history

## Extension Worker

Needs: - Farmer cases - Risk prioritization - Location - History -
Diagnosis evidence - Expert escalation

## Agricultural Expert

Needs: - Case queue - Images - Symptoms - AI result - Confidence -
Context - History - Ability to validate/correct - Advisory review

## Laboratory

Needs: - Referral details - Sample/case metadata - Previous AI/expert
assessment - Lab result entry

## Government/Admin

Needs: - Disease hotspots - Crop-wise trends - District-wise trends -
Risk trends - Emerging outbreak alerts - Extension performance - Reports

------------------------------------------------------------------------

# 6. Information Architecture

``` text
KISAN SAATHI
│
├── Authentication
│   ├── Language
│   ├── Login / OTP
│   └── Role Selection
│
├── Farmer App
│   ├── Home
│   ├── My Farms
│   ├── Crop Health
│   ├── Scan Crop
│   ├── Voice Assistant
│   ├── Diagnosis
│   ├── Explain Result
│   ├── Risk
│   ├── What Should I Do Today?
│   ├── Follow-Up
│   ├── Farm Timeline
│   ├── Farm Health Score
│   ├── Alerts
│   ├── Expert Help
│   ├── Feedback
│   └── Settings / Offline
│
├── Expert / Extension
│   ├── Case Queue
│   ├── Case Details
│   ├── Validation
│   └── Advisory
│
├── Lab
│   ├── Referrals
│   └── Results
│
└── Government / Admin
    ├── Dashboard
    ├── Hotspots
    ├── Trends
    ├── Alerts
    └── Reports
```

------------------------------------------------------------------------

# 7. Core Farmer Journey

``` text
Open App
  ↓
Select Language
  ↓
Create / Select Farm
  ↓
Choose Crop
  ↓
Scan Crop / Speak Problem
  ↓
Add Multiple Images + Symptoms
  ↓
System Checks Information
  ↓
AI Analyzes Evidence
  ↓
Context Is Considered
  ↓
Disease / Pest + Confidence + Risk
  ↓
Simple Explanation
  ↓
Personalized Advisory
  ↓
"What Should I Do Today?"
  ↓
Farmer Acts
  ↓
Follow-Up Reminder
  ↓
New Scan
  ↓
Compare With Previous Scan
  ↓
Improved / Stable / Worsening
  ↓
Continue / Monitor / Reassess / Expert
  ↓
Farm Memory Updated
```

------------------------------------------------------------------------

# 8. Screen-by-Screen Product Requirements

## Screen 1 --- Splash / Welcome

### Purpose

Establish product identity quickly.

### UI

-   Kisan Saathi logo
-   Short tagline
-   "Get Started" button
-   Language selector

### Farmer-facing message

> **Your crop health companion**

### Background processing shown simply

None. Keep this screen calm.

### Widgets

-   Logo
-   Language dropdown
-   Get Started CTA
-   Optional "Continue as guest/demo"

------------------------------------------------------------------------

# 9. Screen 2 --- Language Selection

### Purpose

Let the farmer choose the language before using the app.

### Languages

-   हिन्दी
-   English
-   ਪੰਜਾਬੀ

### Widgets

-   Large language cards
-   Continue button
-   Voice preview button

### Background process translated for user

Instead of: \> "Initializing multilingual NLP pipeline"

Show: \> **Your advice will be available in Hindi.**

------------------------------------------------------------------------

# 10. Screen 3 --- Login / Farmer Profile

### Purpose

Create a lightweight identity.

### Fields

-   Name
-   Mobile number
-   Preferred language
-   Optional profile image

### Widgets

-   Mobile input
-   OTP
-   Language selector
-   Continue

### Background

The system securely creates the farmer profile.

Farmer-facing status: \> **Your profile is ready.**

------------------------------------------------------------------------

# 11. Screen 4 --- Create Farm

### Purpose

Create the farmer's first farm profile.

### Information

-   Farm name
-   Village
-   District
-   State
-   Farm area
-   Location
-   Optional soil information
-   Irrigation method

### Widgets

-   Location picker
-   Area input
-   Crop selection
-   Save Farm

### Background

The app creates the farmer's **Personal Farm Memory**.

Farmer-facing explanation:

> **We'll remember your farm details so future advice can be more
> personalized.**

------------------------------------------------------------------------

# 12. Screen 5 --- Home / Farmer Dashboard

### Purpose

This is the main screen and should feel extremely simple.

### Header

-   Farmer name
-   Current farm
-   Language
-   Online/offline indicator

### Main Widgets

#### Farm Health Score

Example: \> **82 / 100 --- Good**

Show supporting indicators: - Crop condition - Disease risk - Weather
risk - Treatment response

#### Primary Actions

**Scan Crop**\
Upload/take crop images.

**Speak Problem**\
Describe symptoms in the farmer's language.

**My Crops**\
See crop health and history.

**Today's Advisory**\
Show the most important current action.

### Secondary widgets

-   Weather summary
-   Active alerts
-   Next follow-up
-   Recent scan

### Farmer-facing background explanation

Instead of showing model/service activity, show:

> **Kisan Saathi is checking your crop, recent history and local
> conditions to keep your advice updated.**

------------------------------------------------------------------------

# 13. Screen 6 --- My Farms / Crop Selection

### Purpose

Support farmers with multiple farms/crops.

### Widgets

-   Farm cards
-   Crop cards
-   Crop health score
-   Last scan date
-   Risk status
-   "Scan this crop"

### Example

``` text
North Field
Tomato
Health: 82/100
Risk: Medium
Last Scan: 3 days ago
[Scan Crop]
```

### Background

The system uses the selected farm and crop history for the next
analysis.

Farmer-facing: \> **Using your Tomato crop history for this check.**

------------------------------------------------------------------------

# 14. Screen 7 --- Crop Scan / Multimodal Input

### Purpose

Collect evidence.

### Primary widgets

#### Image Upload

Allow multiple images: - Leaf front - Leaf back - Stem - Fruit - Whole
plant - Affected area

#### Crop Details

-   Crop
-   Variety
-   Growth stage

#### Symptoms

Simple text input.

#### Voice

"Describe what you see"

#### Location

Use saved farm location or manually select.

### Main CTA

> **Analyze My Crop**

### Important UX

Do not force the farmer to fill every field. Use saved farm information
whenever possible.

------------------------------------------------------------------------

# 15. Screen 8 --- Image Quality Check

### Purpose

Prevent poor images from producing unreliable results.

### User-facing states

Good: \> **Image looks clear**

Bad: \> **This image is blurry. Please take another photo.**

Too dark: \> **Try taking the photo in better light.**

Wrong subject: \> **We couldn't clearly see the crop. Move closer and
try again.**

### Background processing translated into plain language

Internal process: - Blur detection - Lighting check - Crop/leaf
detection - Image normalization

Farmer sees: \> **Checking whether your photo is clear enough to
analyze.**

### Widgets

-   Image preview
-   Quality badge
-   Retake button
-   Continue button

------------------------------------------------------------------------

# 16. Screen 9 --- Voice Assistant

### Purpose

Allow natural voice-based reporting.

### Widgets

-   Large microphone button
-   Language indicator
-   Transcribed text
-   Edit text
-   Speak again
-   Continue

### Example

Farmer says: \> "मेरे टमाटर के पत्तों पर काले धब्बे पड़ रहे हैं।"

App shows:

> **I heard:**\
> "Tomato leaves have black spots."

Then: \> **Is that correct?**

### Background

Speech is converted into understandable information such as crop,
symptom and affected plant part.

Farmer-facing: \> **Understanding what you're describing...**

------------------------------------------------------------------------

# 17. Screen 10 --- Clarifying Questions

### Purpose

Ask only useful questions when evidence is insufficient.

### Examples

-   "Are the spots also on the underside of the leaves?"
-   "When did you first notice this?"
-   "Is the problem spreading?"
-   "Have you already used any treatment?"

### Widgets

-   Large answer buttons
-   Voice answer
-   Skip
-   Progress indicator

### Important rule

Questions should be short and understandable.

### Background

The system identifies missing information that could improve the
decision.

Farmer sees: \> **A quick question will help us give you a better
answer.**

------------------------------------------------------------------------

# 18. Screen 11 --- Analysis Progress

### Purpose

Make processing visible without exposing technical architecture.

### Show 4--5 friendly stages

``` text
✓ Checking your photos
✓ Understanding your symptoms
● Checking crop conditions
○ Comparing with known patterns
○ Preparing your advice
```

### Do NOT show

-   API calls
-   Model names
-   embeddings
-   vector database
-   microservices
-   inference tensors
-   Kafka events

### Why this screen matters

It demonstrates that Kisan Saathi is doing more than simply matching an
image.

------------------------------------------------------------------------

# 19. Screen 12 --- Diagnosis Result

### Purpose

Give the farmer the main result.

### Example

``` text
Likely Condition
Tomato Early Blight

Confidence
91%

Risk
High
```

### Widgets

-   Disease/pest name
-   Confidence
-   Severity
-   Affected crop image
-   Alternative possibilities
-   "Why this result?"
-   "What should I do today?"
-   "Ask an expert"

### Uncertainty state

If confidence is low:

> **We are not confident enough to identify this condition.**

Then:

> **Please upload a clearer photo or answer a few questions.**

This is the **"I Don't Know"** capability.

------------------------------------------------------------------------

# 20. Screen 13 --- Explainable AI

### Purpose

Build trust.

### UI

Show the uploaded crop image with affected areas highlighted.

### Sections

**What we noticed** - Characteristic leaf spots - Pattern across
multiple images - Symptoms match reported description

**What increased the risk** - Current weather - Crop stage - Previous
farm history

### Farmer-facing wording

> **Why did Kisan Saathi say this?**

Avoid: \> "Grad-CAM activation map"

Instead: \> **The highlighted areas are the parts of the leaf that most
influenced the result.**

------------------------------------------------------------------------

# 21. Screen 14 --- Crop Health / Risk Dashboard

### Purpose

Combine evidence into an understandable health picture.

### Main Widget

**Crop Health Score: 82/100**

### Supporting indicators

-   Image evidence: Strong
-   Weather risk: High
-   Farm history: Medium
-   Location risk: High
-   Crop stage: High

### Risk

> **Overall Risk: HIGH**

### User-friendly explanation

> **Current conditions may allow the problem to spread quickly.**

### Background

The system combines image evidence, crop stage, weather, farm history
and location.

Farmer sees:

> **We're combining several signals instead of relying only on your
> photo.**

------------------------------------------------------------------------

# 22. Screen 15 --- "What Should I Do Today?"

### Purpose

Turn intelligence into action.

This should be one of the most important prototype screens.

### Layout

## DO NOW

Most urgent action.

## MONITOR

What to watch.

## ROUTINE

Normal crop-care action.

## NEXT SCAN

When/how to check again.

### Example

``` text
DO NOW
Inspect affected lower leaves and remove severely affected leaves.

MONITOR
Check nearby plants for new spots.

NEXT SCAN
Take another crop scan in 5 days.
```

### Voice

Button: \> **Listen to this advice**

### Important

Avoid making unsupported pesticide recommendations. Use safe, trusted,
context-specific guidance.

------------------------------------------------------------------------

# 23. Screen 16 --- Advisory Details

### Purpose

Allow deeper information without overwhelming the farmer.

### Sections

-   What is happening?
-   Why it may be happening
-   Immediate action
-   Prevention
-   What to avoid
-   When to seek expert help
-   Trusted source
-   Listen

### RAG explanation

Never show "RAG".

Show:

> **Advice based on trusted agricultural guidance and your crop
> situation.**

### Source transparency

Provide "Why this advice?" and source/reference information where
appropriate.

------------------------------------------------------------------------

# 24. Screen 17 --- Offline Mode

### Purpose

Demonstrate a major differentiator.

### Online indicator

> **Online --- Full crop analysis available**

### Offline indicator

> **Offline --- Basic crop tools are still available**

### Offline features

-   Capture images
-   Save crop information
-   Basic local diagnosis where supported
-   View cached advisories
-   View saved farm history
-   Record feedback
-   Queue pending data

### Sync status

> **3 items waiting to sync**

When internet returns:

> **Connection restored. Updating your crop information...**

Then:

> **Your latest recommendation is ready.**

------------------------------------------------------------------------

# 25. Screen 18 --- Follow-Up Reminder

### Purpose

Ensure the product does not stop after one recommendation.

### Widgets

-   Next scan date
-   Crop
-   Previous diagnosis
-   Reminder
-   "Scan Again"

### Example

> **Time to check your tomato crop again.**

> Previous severity: 40%\
> Last checked: 5 days ago

------------------------------------------------------------------------

# 26. Screen 19 --- Follow-Up Scan

### Purpose

Capture new evidence using the same crop/farm context.

### Widgets

-   Previous image
-   New image
-   Take/upload new image
-   Same crop confirmation
-   Submit follow-up

### Helpful feature

Allow side-by-side comparison.

------------------------------------------------------------------------

# 27. Screen 20 --- Disease Progression

### Purpose

Show whether the condition is improving or worsening.

### Main states

**Improved**

**Stable**

**Worsening**

### Visual

Simple timeline:

``` text
Day 1 ───── Day 5 ───── Day 10
 40%          25%          12%
```

### User-facing interpretation

> **Your crop appears to be recovering.**

or:

> **The affected area appears to be increasing.**

### Important

Do not claim treatment caused the improvement.

Use:

> **Treatment response observed**

not:

> **Treatment cured the disease**

------------------------------------------------------------------------

# 28. Screen 21 --- Treatment Response

### Purpose

Measure response after an intervention.

### Widgets

-   Before severity
-   After severity
-   Change indicator
-   Farmer-reported treatment
-   Treatment date
-   Response status

### Output

``` text
Improved
Stable
Worsening
```

### Important wording

> **The crop condition improved after the reported intervention.**

Avoid:

> **The intervention caused the improvement.**

------------------------------------------------------------------------

# 29. Screen 22 --- Adaptive Follow-Up

### Purpose

Make the next decision dynamic.

### Decision states

``` text
Improved
   ↓
Continue monitoring

Stable
   ↓
Monitor and rescan

Worsening
   ↓
Reassess
   ↓
Expert/Lab if required
```

### Farmer-facing message

> **Based on your latest scan, we've updated what you should do next.**

This is a core differentiator.

------------------------------------------------------------------------

# 30. Screen 23 --- Expert Help

### Purpose

Escalate difficult cases.

### Entry points

-   Low confidence
-   Severe disease
-   Worsening condition
-   Ambiguous result
-   High-risk situation
-   Farmer requests help

### Widgets

-   Case summary
-   Images
-   AI result
-   Confidence
-   Risk
-   Farm history
-   "Request Expert Review"

### Statuses

> Review requested\
> Expert reviewing\
> Expert response received

------------------------------------------------------------------------

# 31. Screen 24 --- Expert / Extension Case Dashboard

### Purpose

Show the non-farmer workflow in the prototype.

### Widgets

#### Priority Queue

-   High risk
-   Low confidence
-   Worsening
-   New cases

#### Case Card

-   Farmer
-   Crop
-   Location
-   Disease
-   Confidence
-   Severity
-   Last scan
-   Priority

### Actions

-   Open case
-   Validate
-   Request more information
-   Escalate to lab
-   Send advisory

------------------------------------------------------------------------

# 32. Screen 25 --- Expert Case Detail

### Information

-   Farmer details
-   Farm location
-   Crop
-   Variety
-   Stage
-   Images
-   Symptoms
-   AI diagnosis
-   Confidence
-   Explainability
-   Weather
-   Farm history
-   Previous interventions
-   Follow-up results

### Expert actions

-   Confirm diagnosis
-   Correct diagnosis
-   Modify recommendation
-   Request new image
-   Refer to lab

### Audit

Record: - AI prediction - Expert change - Final advisory - Timestamp

------------------------------------------------------------------------

# 33. Screen 26 --- Laboratory Referral

### Purpose

Support cases requiring laboratory confirmation.

### Widgets

-   Referral reason
-   AI assessment
-   Expert assessment
-   Sample/case information
-   Referral status
-   Lab result

### Flow

``` text
AI
 ↓
Low Confidence / High Risk
 ↓
Expert
 ↓
Laboratory Referral
 ↓
Lab Result
 ↓
Updated Case
```

------------------------------------------------------------------------

# 34. Screen 27 --- Notifications / Alerts

### Types

-   Follow-up due
-   High-risk crop
-   Weather-related risk
-   Expert response
-   Updated recommendation
-   Sync completed
-   New nearby risk alert where supported

### Priority

Use clear levels: - Urgent - Important - Routine

Avoid notification overload.

------------------------------------------------------------------------

# 35. Screen 28 --- Farm Timeline / Personal Farm Memory

### Purpose

Show that the app remembers the farm.

### Timeline events

``` text
Today
New scan — Early Blight — High Risk

5 days ago
Treatment response — Improved

10 days ago
Early Blight detected

30 days ago
Farm profile created
```

### Widgets

-   Timeline
-   Filters
-   Crop selector
-   Scan details
-   Treatment history
-   Expert consultations

### Farmer-facing message

> **Your farm history helps us make future advice more relevant.**

------------------------------------------------------------------------

# 36. Screen 29 --- Farm Health Score

### Purpose

Create one understandable health summary.

### Main score

> **82 / 100**

### Components

-   Disease health
-   Crop condition
-   Treatment response
-   Weather risk
-   Recent progression

### Trend

-   Improving
-   Stable
-   Needs attention

### Important

Scores should be clearly labeled as system-generated indicators, not
scientific measurements unless validated.

------------------------------------------------------------------------

# 37. Screen 30 --- Nearby Risk / GIS View

### Purpose

Show geographic intelligence.

### Map widgets

-   Farmer location
-   Nearby cases
-   Risk zones
-   Disease hotspots
-   Crop filters
-   Time filters

### Farmer-facing wording

> **Higher reported disease activity has been observed in this area.**

Avoid exposing private farmer identities.

### Background

The system combines location with aggregated disease/pest information.

------------------------------------------------------------------------

# 38. Screen 31 --- Weather & Crop Risk

### Purpose

Explain how weather can influence crop risk.

### Widgets

-   Current weather
-   Upcoming conditions
-   Crop risk indicator
-   Simple explanation

Example:

> **High humidity may increase fungal disease risk for your crop.**

### Important

Weather should influence risk, not automatically prove disease presence.

------------------------------------------------------------------------

# 39. Screen 32 --- Feedback

### Purpose

Collect field confirmation.

### Questions

-   Was the advice useful?
-   Did the crop improve?
-   Is the problem still present?
-   Did the problem worsen?
-   What action did you take?
-   Upload new image
-   Voice feedback

### Simple CTA

> **Tell us what happened**

------------------------------------------------------------------------

# 40. Screen 33 --- Settings

### Sections

-   Language
-   Voice settings
-   Notifications
-   Offline data
-   Privacy
-   Farm management
-   Help
-   Logout

### Offline data

Show: \> Last synced: Today, 10:42 AM

> Pending sync: 2 items

------------------------------------------------------------------------

# 41. Government / Admin Dashboard

This can be a separate responsive web dashboard.

## Dashboard widgets

### Disease Hotspots

Map of active reported regions.

### Disease Trends

-   Crop-wise
-   District-wise
-   Severity
-   Time trend

### Risk Trends

High-risk regions and emerging patterns.

### Alerts

-   Emerging outbreak
-   High-risk region
-   Spread trend

### Extension Performance

-   Cases handled
-   Response time
-   Expert validations
-   Lab referrals

### Reports

Exportable decision-support reports.

------------------------------------------------------------------------

# 42. Background Processing --- Farmer-Friendly Transparency

The app should show important processing, but translate technical
operations into simple language.

  -----------------------------------------------------------------------
  Internal activity                   What farmer should see
  ----------------------------------- -----------------------------------
  Speech-to-text                      "Understanding what you said..."

  Language detection                  "Using Hindi for your advice."

  NLP/entity extraction               "Identifying your crop and
                                      symptoms..."

  Image quality check                 "Checking whether your photo is
                                      clear..."

  Image preprocessing                 "Preparing your images for
                                      analysis..."

  Multi-image analysis                "Comparing all your crop photos..."

  Disease model inference             "Checking for possible crop
                                      problems..."

  Confidence calculation              "Checking how certain the result
                                      is..."

  Risk model                          "Checking current crop risk..."

  Weather API                         "Checking local weather
                                      conditions..."

  Farm history lookup                 "Reviewing your previous crop
                                      checks..."

  GIS analysis                        "Checking nearby reported crop
                                      risks..."

  RAG retrieval                       "Checking trusted agricultural
                                      guidance..."

  Recommendation engine               "Preparing your personalized action
                                      plan..."

  Follow-up comparison                "Comparing your new scan with the
                                      previous one..."

  Expert escalation                   "This case needs a closer review."

  Sync                                "Saving your latest information..."
  -----------------------------------------------------------------------

### Golden rule

**Never expose technical system architecture as the farmer's main
experience.**

The farmer should understand: \> **What is happening, why it is
happening, and what they should do next.**

------------------------------------------------------------------------

# 43. Complete Intelligence Flow

``` text
FARMER
  │
  ├── Voice
  ├── Multi-Images
  ├── Farm Data
  └── Location
       ↓
INPUT CHECK
       ↓
UNDERSTAND SYMPTOMS + IMAGES
       ↓
AI DIAGNOSIS
       ↓
CONFIDENCE CHECK
       │
       ├── Low Confidence → Ask for More Evidence / Expert
       │
       └── Sufficient Confidence
                    ↓
              CONTEXT CHECK
                    │
        ┌───────────┼───────────┐
        ↓           ↓           ↓
     Weather     Farm History   GIS
        └───────────┼───────────┘
                    ↓
              RISK ASSESSMENT
                    ↓
              EXPLAIN RESULT
                    ↓
             PERSONALIZED ADVICE
                    ↓
          "WHAT SHOULD I DO TODAY?"
                    ↓
                FARMER ACTS
                    ↓
              FOLLOW-UP SCAN
                    ↓
              COMPARE PROGRESS
                    ↓
        ┌───────────┼───────────┐
        ↓           ↓           ↓
     Improved     Stable      Worsening
        ↓           ↓           ↓
    Continue     Monitor     Reassess
                                ↓
                          Expert / Lab
                                ↓
                         Validated Result
                                ↓
                         Farm Memory Update
                                ↓
                         Controlled Learning
                                ↓
                       Future Better Decisions
```

------------------------------------------------------------------------

# 44. Ten Core Innovations

## 1. Multi-Image Diagnosis

Combines multiple plant views instead of relying on one photograph.

## 2. AI Confidence + "I Don't Know"

The system can refuse an unreliable diagnosis and ask for better
evidence.

## 3. Disease Progression Tracking

Compares crop condition across time.

## 4. Treatment Response Monitoring

Shows whether the crop condition improved, remained stable or worsened
after a reported intervention.

## 5. Personal Farm Memory

Maintains long-term farm history.

## 6. Farm Health Score

Provides an understandable overall crop/farm health indicator.

## 7. "What Should I Do Today?"

Turns complex analysis into prioritized actions.

## 8. Explainable AI

Shows why the system reached a result and highlights relevant crop
regions.

## 9. Offline-First Diagnosis

Provides basic functionality without continuous internet and
synchronizes later.

## 10. Adaptive Follow-Up

Uses new observations to determine the next step.

------------------------------------------------------------------------

# 45. Critical Product Flaws / Risks

The prototype must openly account for these weaknesses.

## Flaw 1 --- Image Quality

### Problem

Farmers may upload blurry, dark, distant or irrelevant images.

### Solution

-   Quality check
-   Crop detection
-   Retake guidance
-   Multiple image request
-   Do not force a diagnosis

------------------------------------------------------------------------

## Flaw 2 --- AI Can Be Wrong

### Problem

Visual symptoms can overlap between diseases, nutrient deficiencies,
pests and environmental stress.

### Solution

-   Confidence score
-   "I Don't Know"
-   Alternative possibilities
-   More evidence requests
-   Expert escalation

------------------------------------------------------------------------

## Flaw 3 --- Weather Does Not Prove Disease

### Problem

Favorable weather increases risk but does not mean disease is present.

### Solution

Clearly separate: - Current diagnosis - Future risk

Use wording such as: \> "Conditions may increase risk."

------------------------------------------------------------------------

## Flaw 4 --- Recommendations Can Be Unsafe

### Problem

Incorrect pesticide/input advice can cause crop, financial,
environmental or residue problems.

### Solution

-   Trusted agricultural knowledge
-   IPM-first guidance
-   Context-aware recommendations
-   Avoid blind prescriptions
-   Expert escalation
-   Audit advisory generation

------------------------------------------------------------------------

## Flaw 5 --- Offline AI Is Limited

### Problem

A lightweight offline model cannot necessarily match cloud-level
analysis.

### Solution

Clearly communicate:

> **Offline: Basic analysis available**

> **Online: Advanced analysis available**

Sync automatically when connectivity returns.

------------------------------------------------------------------------

## Flaw 6 --- Sparse Local Data

### Problem

A disease model or risk model may perform poorly in regions/crops with
limited representative data.

### Solution

-   Show uncertainty
-   Collect validated feedback
-   Use expert confirmation
-   Controlled model improvement
-   Track performance by crop/region

------------------------------------------------------------------------

## Flaw 7 --- Farmer May Not Follow Advice

### Problem

A recommendation does not guarantee action.

### Solution

-   Prioritized actions
-   Voice guidance
-   Reminders
-   Follow-up
-   Ask what action was taken
-   Treatment-response monitoring

------------------------------------------------------------------------

## Flaw 8 --- False Sense of Precision

### Problem

Scores such as 91% confidence or 82/100 health can look scientifically
exact.

### Solution

-   Label confidence appropriately
-   Explain what scores mean
-   Avoid unsupported claims
-   Use ranges/labels where more appropriate

------------------------------------------------------------------------

## Flaw 9 --- Treatment Response Is Not Causation

### Problem

Improvement after an intervention does not prove the intervention caused
improvement.

### Solution

Use: \> "Treatment response observed"

Do not use: \> "Treatment cured the disease."

------------------------------------------------------------------------

## Flaw 10 --- Privacy and Location Sensitivity

### Problem

Farm location, images and agricultural records can be sensitive.

### Solution

-   Authentication
-   Role-based access
-   Encryption
-   Secure image uploads
-   Privacy controls
-   Aggregated public/Government maps
-   Audit logs

------------------------------------------------------------------------

## Flaw 11 --- Language / Voice Accuracy

### Problem

Regional accents, dialects, agricultural vocabulary and noisy
environments can reduce speech recognition quality.

### Solution

-   Show transcription before final submission
-   Allow editing
-   Voice repeat
-   Simple follow-up questions
-   Start with Hindi, English and Punjabi
-   Expand language support gradually

------------------------------------------------------------------------

## Flaw 12 --- Connectivity

### Problem

Rural connectivity may be intermittent.

### Solution

-   PWA
-   Local storage
-   Cached advisory
-   Offline image capture
-   Pending sync queue
-   Sync status

------------------------------------------------------------------------

## Flaw 13 --- Data Drift

### Problem

Crop varieties, climate, disease patterns and field conditions can
change.

### Solution

-   Monitor model performance
-   Expert validation
-   Version models
-   Evaluate before deployment
-   Controlled retraining

------------------------------------------------------------------------

## Flaw 14 --- Too Much Information

### Problem

A farmer may not understand a complicated AI report.

### Solution

Use progressive disclosure:

``` text
Simple answer
   ↓
What should I do?
   ↓
Why?
   ↓
More details
   ↓
Expert information
```

------------------------------------------------------------------------

# 46. Safety Rules

The product should follow these principles:

1.  Never force a diagnosis when confidence is inadequate.
2.  Clearly distinguish diagnosis from risk forecasting.
3.  Prefer integrated pest management and safe agricultural guidance.
4.  Encourage expert/lab review for severe or uncertain cases.
5.  Keep a record of important recommendations and expert modifications.
6.  Do not claim scientific causation from observational
    treatment-response data.
7.  Protect farmer and farm data.
8.  Never expose private farmer locations unnecessarily.
9.  Do not automatically retrain models from unverified submissions.
10. Show the user what information influenced an important decision.

------------------------------------------------------------------------

# 47. Farmer UX Principles

## Language

Use simple everyday language.

Bad: \> "Multimodal contextual inference indicates elevated disease
probability."

Good: \> **"Your photos and current crop conditions suggest a high
risk."**

## Action First

Every diagnosis should answer:

> **What should I do today?**

## Voice First

Important results should have: - Listen button - Language selector -
Short spoken summary

## Visual First

Use: - Crop images - Highlighted affected areas - Simple icons -
Progress indicators - Before/after comparison

## Progressive Disclosure

Do not put all information on one screen.

``` text
Result
↓
Action
↓
Why
↓
Details
```

------------------------------------------------------------------------

# 48. Prototype Widgets Checklist

## Global Widgets

-   Logo
-   Navigation
-   Language selector
-   Voice button
-   Online/offline indicator
-   Notifications
-   Back button
-   Help

## Farmer Widgets

-   Farm selector
-   Crop selector
-   Farm health score
-   Crop health card
-   Weather card
-   Risk badge
-   Scan button
-   Multi-image uploader
-   Camera placeholder
-   Voice recorder
-   Symptom input
-   Diagnosis card
-   Confidence indicator
-   Explainability image
-   Advisory cards
-   "What Should I Do Today?" card
-   Follow-up reminder
-   Progress chart
-   Before/after comparison
-   Treatment response card
-   Farm timeline
-   Map
-   Expert request
-   Feedback form
-   Sync status

## Expert Widgets

-   Case queue
-   Priority filter
-   Case card
-   Image gallery
-   AI result
-   Confidence
-   Risk
-   Farm history
-   Expert validation
-   Advisory editor
-   Lab referral
-   Audit history

## Government Widgets

-   Hotspot map
-   Filters
-   Disease trends
-   Crop trends
-   District trends
-   Severity trends
-   Risk trends
-   Alerts
-   Extension metrics
-   Reports

------------------------------------------------------------------------

# 49. Prototype Demo Data

Use **clearly labeled demo data**.

### Example farmer

Name: \> Ramesh Kumar

### Farm

> Village: Demo Village\
> Crop: Tomato\
> Variety: Demo Variety\
> Stage: Flowering

### Example case

> **Likely Condition:** Tomato Early Blight\
> **Confidence:** 91%\
> **Risk:** High\
> **Farm Health:** 82/100

### Example explanation

> Characteristic leaf lesions were found across multiple submitted
> images. Current weather and crop conditions may increase the risk of
> progression.

### Example actions

**DO NOW** \> Inspect affected plants and remove severely affected
leaves.

**MONITOR** \> Check nearby plants for new spots.

**NEXT SCAN** \> Take another crop scan in 5 days.

### Follow-up demo

``` text
Initial severity: 40%
Follow-up severity: 25%

Status: Improved
```

Use this only as prototype/demo data, not as a validated real-world
performance claim.

------------------------------------------------------------------------

# 50. Prototype Scope --- What Must Actually Work

For an SIH-style prototype, prioritize a complete vertical slice over
implementing every backend feature.

## Must Be Clickable

1.  Language selection
2.  Farmer onboarding
3.  Farm creation
4.  Home dashboard
5.  Crop selection
6.  Multi-image upload UI
7.  Voice interaction UI
8.  Image quality feedback
9.  Analysis progress
10. Diagnosis result
11. Confidence / uncertainty state
12. Explainability
13. Risk view
14. "What Should I Do Today?"
15. Follow-up
16. Before/after comparison
17. Adaptive result
18. Expert escalation
19. Offline mode simulation
20. Farm timeline

## Can Be Simulated in Prototype

-   AI inference
-   Weather API
-   GIS data
-   RAG retrieval
-   Expert response
-   Lab response
-   Model improvement
-   Government analytics

The UI must clearly label simulated/demo information where necessary.

------------------------------------------------------------------------

# 51. Recommended Prototype Navigation

``` text
BOTTOM NAVIGATION

Home | My Crops | Scan | History | More
```

### Scan should be the central primary action.

------------------------------------------------------------------------

# 52. Recommended Home Layout

``` text
┌───────────────────────────────┐
│ Kisan Saathi        Online ●  │
│ Hello, Ramesh                 │
├───────────────────────────────┤
│                               │
│       FARM HEALTH             │
│          82/100               │
│          GOOD                 │
│                               │
├───────────────────────────────┤
│  [ Scan Crop ] [ Speak ]      │
├───────────────────────────────┤
│ Today's Advisory              │
│ Check your tomato crop today. │
├───────────────────────────────┤
│ Weather       Risk             │
│ 28°C          High             │
├───────────────────────────────┤
│ Next Follow-Up                │
│ Tomato • In 2 days            │
└───────────────────────────────┘
```

------------------------------------------------------------------------

# 53. Recommended Diagnosis Screen

``` text
┌───────────────────────────────┐
│ AI CROP CHECK                 │
├───────────────────────────────┤
│                               │
│ Tomato Early Blight           │
│                               │
│ Confidence        91%         │
│ Risk              HIGH        │
│                               │
│ [Crop Image]                  │
│                               │
│ Why this result?              │
│ • Leaf spots detected         │
│ • Multiple photos matched     │
│ • Local conditions increase   │
│   risk                        │
│                               │
│ [ What Should I Do Today? ]   │
│ [ Ask an Expert ]             │
└───────────────────────────────┘
```

------------------------------------------------------------------------

# 54. Recommended Action Screen

``` text
┌───────────────────────────────┐
│ WHAT SHOULD I DO TODAY?       │
├───────────────────────────────┤
│                               │
│ DO NOW                        │
│ Inspect affected plants.      │
│                               │
│ MONITOR                       │
│ Check nearby leaves.          │
│                               │
│ NEXT SCAN                     │
│ Scan again in 5 days.         │
│                               │
│ [ 🔊 Listen ]                 │
│ [ Start Follow-Up ]           │
└───────────────────────────────┘
```

------------------------------------------------------------------------

# 55. Recommended Follow-Up Screen

``` text
┌───────────────────────────────┐
│ CROP PROGRESS                 │
├───────────────────────────────┤
│                               │
│ Before             Now        │
│ 40%  ───────────→  25%        │
│                               │
│       IMPROVED                │
│                               │
│ Treatment Response            │
│ Positive response observed.   │
│                               │
│ NEXT STEP                     │
│ Continue monitoring.          │
│                               │
│ [ Scan Again ]                │
└───────────────────────────────┘
```

------------------------------------------------------------------------

# 56. Technical Architecture Behind the Product

## Frontend

-   Next.js
-   React
-   JavaScript
-   Tailwind CSS
-   PWA
-   Axios
-   IndexedDB
-   Leaflet

## Backend

-   Python
-   FastAPI
-   Pydantic
-   JWT/OAuth
-   REST APIs

## AI / ML

-   PyTorch
-   OpenCV
-   scikit-learn
-   XGBoost
-   LSTM/time-series where appropriate
-   Grad-CAM / explainability

## GenAI / Voice

-   LLM
-   RAG
-   Transformers
-   Speech-to-Text
-   Text-to-Speech
-   pgvector

## Data

-   PostgreSQL
-   PostGIS
-   Redis
-   Object storage / S3-compatible storage

## Streaming / Scale

-   Apache Kafka
-   Apache Spark only where large-scale distributed processing is
    justified

## Deployment

-   Docker
-   Cloud infrastructure
-   Kubernetes where required

## Monitoring

-   Prometheus
-   Grafana
-   Centralized logging

## CI/CD

-   GitHub
-   GitHub Actions

------------------------------------------------------------------------

# 57. Offline Architecture

## Online

``` text
Farmer
 ↓
Cloud AI
 ↓
Advanced Analysis
 ↓
Weather + GIS + Farm Memory + Trusted Knowledge
 ↓
Detailed Advisory
```

## Offline

``` text
Farmer
 ↓
Local Lightweight AI
 ↓
Basic Diagnosis
 ↓
Cached Advisory
 ↓
Local Data
```

## After Connection Returns

``` text
Internet Restored
 ↓
Automatic Sync
 ↓
Cloud Analysis
 ↓
Updated Recommendation
```

Offline capabilities should include: - Image capture - Basic diagnosis
where supported - Farmer data entry - Cached advisories - Local farm
history - Pending feedback - Synchronization

------------------------------------------------------------------------

# 58. Security & Privacy Requirements

## Authentication

-   JWT/OAuth-based authentication
-   Role-based access control

## Roles

-   Farmer
-   Extension Worker
-   Agricultural Expert
-   Lab
-   Government/Admin

## Security

-   HTTPS
-   Encryption at rest
-   Secure API authentication
-   Input validation
-   Rate limiting
-   Secure file uploads

## Privacy

Protect: - Farmer information - Farm location - Crop images -
Agricultural records

## Auditability

Record: - AI predictions - Advisory generated - Expert modifications -
Farmer feedback - System actions

## Reliability

Include: - Error handling - Retries - Backups - Disaster recovery -
Health checks

------------------------------------------------------------------------

# 59. Data Model --- High-Level

``` text
User
 ├── Farm
 │    ├── Crop
 │    │    ├── Scan
 │    │    │    ├── Images
 │    │    │    ├── Symptoms
 │    │    │    ├── Diagnosis
 │    │    │    ├── Risk
 │    │    │    └── Advisory
 │    │    │
 │    │    ├── Treatment
 │    │    ├── FollowUp
 │    │    └── HealthScore
 │    │
 │    └── FarmHistory
 │
 ├── Feedback
 └── ExpertCases
```

------------------------------------------------------------------------

# 60. System States

Every important process should have explicit states.

## Analysis

-   Waiting
-   Checking
-   Analyzing
-   Complete
-   Needs More Information
-   Failed

## Diagnosis

-   Likely
-   Uncertain
-   Not Identified
-   Expert Review Required

## Follow-Up

-   Due
-   Pending
-   Improved
-   Stable
-   Worsening
-   Escalated

## Sync

-   Synced
-   Pending
-   Syncing
-   Failed
-   Retry

This prevents the prototype from appearing artificially perfect.

------------------------------------------------------------------------

# 61. Error States

The prototype must include realistic failure states.

### No Internet

> **You're offline. Basic crop tools are still available.**

### Upload Failure

> **We couldn't upload this image. It has been saved and will sync
> later.**

### Poor Image

> **We need a clearer photo to make a reliable check.**

### Low Confidence

> **We're not confident enough to identify the problem yet.**

### No Diagnosis

> **We couldn't identify the condition from the available information.**

### Service Failure

> **We couldn't complete the advanced check right now. Please try
> again.**

### No Historical Data

> **This is your first scan. Future checks will become more personalized
> as your farm history grows.**

------------------------------------------------------------------------

# 62. Empty States

### No Farms

> **Add your first farm to start personalized crop-health tracking.**

### No Crops

> **Add a crop to begin monitoring its health.**

### No History

> **Your crop timeline will appear here after your first scan.**

### No Expert Cases

> **No expert reviews are pending.**

### No Notifications

> **You're all caught up.**

------------------------------------------------------------------------

# 63. Loading States

Never show a generic spinner for long AI operations.

Instead show progress:

``` text
Checking photos ✓
Understanding symptoms ✓
Checking crop conditions ●
Preparing your advice ○
```

This makes the intelligence visible without technical jargon.

------------------------------------------------------------------------

# 64. Accessibility

The product should support: - Large readable text - High contrast -
Large tap targets - Voice output - Voice input - Minimal text per
screen - Clear status colors plus text labels - Hindi/English/Punjabi -
Simple navigation - Screen-reader-friendly labels where applicable

Do not rely on color alone for: - Risk - Severity - Success/failure -
Improved/stable/worsening

------------------------------------------------------------------------

# 65. Product Metrics

Prototype metrics should focus on workflow quality.

## Farmer

-   Scan completion rate
-   Image resubmission rate
-   Advisory completion
-   Follow-up completion
-   Voice usage
-   Offline usage
-   Expert request rate

## AI

-   Diagnosis confidence distribution
-   Low-confidence rate
-   Expert disagreement rate
-   Model performance by crop/region
-   Image quality failure rate

## Advisory

-   Advice viewed
-   Advice listened to
-   Farmer feedback
-   Reported outcome

## Expert

-   Case response time
-   Validation rate
-   Lab referral rate

------------------------------------------------------------------------

# 66. Prototype Success Criteria

The prototype succeeds if a judge can understand this flow without
explanation:

> **A farmer opens one app → selects a crop → speaks or uploads multiple
> photos → the app checks the evidence → combines
> crop/weather/farm/location context → produces a diagnosis with
> confidence → explains why → gives today's actions → follows up later →
> compares crop progress → adapts the next recommendation → escalates
> difficult cases to an expert.**

The demo should also visibly prove: - Multimodal input -
Explainability - Confidence/uncertainty - Personalized advisory -
Offline-first behavior - Follow-up - Treatment response - Adaptive
decision - Farm memory - Expert escalation

------------------------------------------------------------------------

# 67. Recommended Demo Story

Use one consistent farmer case throughout the entire prototype.

### Step 1

Farmer selects **Tomato**.

### Step 2

Uploads: - Leaf front - Leaf back - Affected area

### Step 3

Speaks: \> "The leaves are developing dark spots."

### Step 4

App checks images and symptoms.

### Step 5

App identifies: \> **Likely Tomato Early Blight --- 91% confidence**

### Step 6

App explains: \> "We found a pattern consistent with leaf lesions across
multiple photos."

### Step 7

App checks: - Weather - Crop stage - Farm history - Location

### Step 8

App shows: \> **Risk: High**

### Step 9

App shows: \> **What Should I Do Today?**

### Step 10

Farmer acts.

### Step 11

App reminds: \> **Time for a follow-up scan.**

### Step 12

New scan: \> **Severity reduced from 40% to 25%.**

### Step 13

App says: \> **Crop condition appears improved. Continue monitoring.**

### Step 14

If the condition worsens in another demo branch: \> **The condition
appears to be worsening. We recommend expert review.**

This single story demonstrates the entire product.

------------------------------------------------------------------------

# 68. UI Design Direction

## Visual style

-   Clean
-   Agricultural
-   Friendly
-   Modern
-   Mobile-first
-   Trustworthy
-   Minimal

## Avoid

-   Overly futuristic AI graphics
-   Too many gradients
-   Excessive glassmorphism
-   Too many cards
-   Technical dashboards on farmer screens
-   Excessive animations
-   Fake precision
-   Stock-photo-heavy interfaces

## Suggested visual language

-   White/light backgrounds
-   Green as primary brand color
-   Blue for information
-   Amber for attention
-   Red for urgent risk
-   Large crop imagery
-   Rounded but not excessive cards
-   Strong typography
-   Simple icons

------------------------------------------------------------------------

# 69. Implementation Priority

## Phase 1 --- Core Demo

-   Authentication
-   Farm
-   Crop
-   Scan
-   Multi-image upload
-   Voice UI
-   Diagnosis
-   Confidence
-   Advisory
-   Home dashboard

## Phase 2 --- Intelligence

-   Weather
-   Farm memory
-   Risk
-   Explainability
-   RAG advisory
-   Farm Health Score

## Phase 3 --- Continuous Assistant

-   Follow-up
-   Progression
-   Treatment response
-   Adaptive decisions
-   Notifications

## Phase 4 --- Ecosystem

-   Expert dashboard
-   Lab referral
-   Government dashboard
-   Analytics
-   Controlled learning pipeline

------------------------------------------------------------------------

# 70. Final Product Principle

Kisan Saathi must not feel like:

> **"Upload a leaf photo and get a disease name."**

It must feel like:

> **"I have one crop-health companion that understands my farm, listens
> to me, looks at my crop, checks the conditions around it, explains
> what may be happening, tells me what to do today, remembers what
> happened, checks again later, and asks an expert for help when it is
> not confident."**

The product's strongest loop is:

**See → Understand → Decide → Act → Check → Adapt**

That loop is the heart of the Kisan Saathi prototype.
