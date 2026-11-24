# ECHO — Personal Relationship Intelligence
> **Track:** Know Thyself  
> **Mission:** Solving the modern disconnection crisis through privacy-first, on-device relationship metadata intelligence.

---

## ⚡ The 30-Second "Wow" Pitch Flow (Hackathon Presentation)

Follow this exact 5-step script during your judging presentation:

| Step | Section | What You Say to the Judges | Action on Screen |
| :--- | :--- | :--- | :--- |
| **1** | **The Problem** | *"We are more connected, yet more lonely than ever. This is a major health crisis."* | Point to the header & societal loneliness paradox. |
| **2** | **The Solution** | *"We built Echo, a privacy-first personal intelligence system that helps you nurture the relationships that matter."* | Introduce Echo's on-device personal intelligence engine. |
| **3** | **Show the UI** | *"Here is the Echo dashboard. As you can see, it has analyzed my data and realized I'm relying too much on text. It's also noticed I haven't spoken to my close friend Mark in a while."* | Highlight the **Core Insight Banner** (`87% text-based`), the **Mix Donut Chart**, and **Mark's 14-day Silent Drift**. |
| **4** | **Click the Button** | *"Now, Echo provides a gentle, actionable nudge to help me improve my social wellness."* | Click **`Suggest an Action`** to reveal: *"How about giving Mark a call this weekend? A 10-minute call can be more powerful than 50 texts."* Click *Simulate Call* to see the score live-update! |
| **5** | **The Magic** | *"The best part? All of this happens entirely on your device. We never see your data. We analyze metadata patterns, not content, to provide these insights."* | Point to the **100% On-Device Metadata** badge with zero cloud transmission. |

> 💡 **Built-in Presentation Feature:** Click the **`🎙️ 30s Pitch Walkthrough`** button in the top right of the UI to launch the interactive presenter overlay with speaker prompts directly on screen!

---

## 📂 File Architecture

```
ECHO/
├── mock_data.json         # Prompt 1: Simulated communication metadata (contacts & events)
├── insights_engine.js     # Prompt 2: Core JS Insights Engine (browser & Node.js)
├── insights_engine.py     # Prompt 2: Python counterpart for CLI evaluation
├── index.html             # Prompt 3: Main Dashboard UI & Action Nudge Interface
├── styles.css             # Prompt 3: High-impact dark theme, frosted glass & charts
├── app.js                 # UI controller, state management, live reactivity & pitch mode
└── README.md              # Documentation & pitch guide
```

---

## 🚀 How to Run the Demo

### Option 1: Instant Direct Open (Zero Setup)
Simply double-click or open **`index.html`** in any modern web browser (Chrome, Edge, Safari, Firefox).  
*(The app is built with embedded fallback state so it works immediately over the `file:///` protocol without needing local servers or CORS permissions).*

### Option 2: Local HTTP Server (Python)
```bash
python -m http.server 8000
```
Then visit: [http://localhost:8000](http://localhost:8000)

### Option 3: Test Core Engine in Python
```bash
python insights_engine.py
```
**Output:**
```
[Function 1: Communication Mix]
-> Your communication has been 87% text-based this month.

[Function 2: Neglected Contacts]
-> You haven't connected with Mark (Close Friend) in over a week.

[Function 3: Core Insight]
-> Echo has noticed your communication has been 87% text-based this month, and you haven't connected with Mark (Close Friend) in over a week.

[Nudge Action]
-> How about giving Mark a call this weekend? A 10-minute call can be more powerful than 50 texts.
```

### Option 4: Test Core Engine in Node.js
```bash
node -e "const e = require('./insights_engine.js'), d = require('./mock_data.json'); console.log(e.generateCoreInsight(d)); console.log(e.suggestAction(d).nudge);"
```

---

## 🧠 Core Functions Reference (Prompt 2 Requirements)

1. `generateCommunicationMix(data)`  
   Calculates ratio of voice calls vs text messages (sent + received). Identifies text overload.
2. `findNeglectedContacts(data)`  
   Finds inner-circle contacts (`close_friends`) with no communications within the last 7 days.
3. `generateCoreInsight(data)`  
   Synthesizes the primary hero headline combining communication ratio and relationship drift.
4. `suggestAction(data)`  
   Formulates the frictionless, science-backed behavioral nudge for the user.
5. `calculateSocialWellness(data)`  
   Holistic 0-100 social health index factoring vocal depth, frequency, and relationship retention.

---

## 🔒 Privacy & On-Device Security Model
- **Zero Content Inspection:** Echo never reads SMS/chat bodies or records call audio.
- **Metadata Only:** Analyzes purely timestamp, duration, event type, and contact ID.
- **Local Sandbox:** Insights computation runs 100% in client memory on the user's hardware.
