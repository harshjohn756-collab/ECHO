/**
 * ECHO: App Controller & Interactive Presentation Engine
 * app.js
 */

// Embedded default dataset guarantees instant zero-config startup
// even when opening via file:/// protocol without a web server.
const DEFAULT_MOCK_DATA = {
  "reference_date": "2026-11-24T12:00:00Z",
  "contacts": [
    {
      "id": 1,
      "name": "Mark (Close Friend)",
      "group": "close_friends",
      "phone": "+1 (555) 234-5678",
      "relationship_since": "2018",
      "avatar_emoji": "🧗‍♂️"
    },
    {
      "id": 2,
      "name": "Sarah (Family)",
      "group": "family",
      "phone": "+1 (555) 345-6789",
      "relationship_since": "Always",
      "avatar_emoji": "👩‍👧"
    },
    {
      "id": 3,
      "name": "David (Work)",
      "group": "work",
      "phone": "+1 (555) 456-7890",
      "relationship_since": "2024",
      "avatar_emoji": "💼"
    },
    {
      "id": 4,
      "name": "Jane (Friend)",
      "group": "friends",
      "phone": "+1 (555) 567-8901",
      "relationship_since": "2021",
      "avatar_emoji": "🎨"
    },
    {
      "id": 5,
      "name": "Maya (Close Friend)",
      "group": "close_friends",
      "phone": "+1 (555) 678-9012",
      "relationship_since": "2019",
      "avatar_emoji": "🌟"
    },
    {
      "id": 6,
      "name": "Mom (Family)",
      "group": "family",
      "phone": "+1 (555) 789-0123",
      "relationship_since": "Always",
      "avatar_emoji": "🏡"
    }
  ],
  "communications": [
    { "id": "c01", "type": "call", "contact_id": 1, "timestamp": "2026-11-10T14:32:00Z", "duration_seconds": 780 },
    { "id": "c02", "type": "text_sent", "contact_id": 1, "timestamp": "2026-11-10T16:10:00Z" },
    { "id": "c03", "type": "text_received", "contact_id": 1, "timestamp": "2026-11-10T16:15:00Z" },
    { "id": "c04", "type": "text_sent", "contact_id": 2, "timestamp": "2026-11-23T19:22:00Z" },
    { "id": "c05", "type": "text_received", "contact_id": 2, "timestamp": "2026-11-23T19:25:00Z" },
    { "id": "c06", "type": "text_sent", "contact_id": 2, "timestamp": "2026-11-22T08:14:00Z" },
    { "id": "c07", "type": "text_received", "contact_id": 2, "timestamp": "2026-11-22T08:18:00Z" },
    { "id": "c08", "type": "call", "contact_id": 2, "timestamp": "2026-11-21T18:30:00Z", "duration_seconds": 540 },
    { "id": "c09", "type": "text_sent", "contact_id": 2, "timestamp": "2026-11-20T12:00:00Z" },
    { "id": "c10", "type": "text_received", "contact_id": 2, "timestamp": "2026-11-20T12:04:00Z" },
    { "id": "c11", "type": "text_sent", "contact_id": 3, "timestamp": "2026-11-24T09:15:00Z" },
    { "id": "c12", "type": "text_received", "contact_id": 3, "timestamp": "2026-11-24T09:20:00Z" },
    { "id": "c13", "type": "text_sent", "contact_id": 3, "timestamp": "2026-11-23T11:45:00Z" },
    { "id": "c14", "type": "text_received", "contact_id": 3, "timestamp": "2026-11-23T11:50:00Z" },
    { "id": "c15", "type": "call", "contact_id": 3, "timestamp": "2026-11-22T15:00:00Z", "duration_seconds": 1200 },
    { "id": "c16", "type": "text_sent", "contact_id": 3, "timestamp": "2026-11-21T14:10:00Z" },
    { "id": "c17", "type": "text_received", "contact_id": 3, "timestamp": "2026-11-21T14:22:00Z" },
    { "id": "c18", "type": "text_sent", "contact_id": 3, "timestamp": "2026-11-20T16:05:00Z" },
    { "id": "c19", "type": "text_received", "contact_id": 3, "timestamp": "2026-11-19T10:12:00Z" },
    { "id": "c20", "type": "text_sent", "contact_id": 3, "timestamp": "2026-11-19T10:18:00Z" },
    { "id": "c21", "type": "text_sent", "contact_id": 4, "timestamp": "2026-11-22T21:10:00Z" },
    { "id": "c22", "type": "text_received", "contact_id": 4, "timestamp": "2026-11-22T21:15:00Z" },
    { "id": "c23", "type": "calendar_event", "contact_id": 4, "timestamp": "2026-11-18T19:00:00Z", "duration_seconds": 7200, "note": "Coffee & Gallery" },
    { "id": "c24", "type": "text_sent", "contact_id": 4, "timestamp": "2026-11-17T17:40:00Z" },
    { "id": "c25", "type": "text_received", "contact_id": 4, "timestamp": "2026-11-17T17:42:00Z" },
    { "id": "c26", "type": "call", "contact_id": 5, "timestamp": "2026-11-23T20:15:00Z", "duration_seconds": 1800 },
    { "id": "c27", "type": "text_sent", "contact_id": 5, "timestamp": "2026-11-23T21:00:00Z" },
    { "id": "c28", "type": "text_received", "contact_id": 5, "timestamp": "2026-11-21T13:30:00Z" },
    { "id": "c29", "type": "text_sent", "contact_id": 5, "timestamp": "2026-11-21T13:35:00Z" },
    { "id": "c30", "type": "call", "contact_id": 6, "timestamp": "2026-11-24T10:00:00Z", "duration_seconds": 960 },
    { "id": "c31", "type": "text_sent", "contact_id": 6, "timestamp": "2026-11-24T08:30:00Z" },
    { "id": "c32", "type": "text_received", "contact_id": 6, "timestamp": "2026-11-23T14:12:00Z" },
    { "id": "c33", "type": "text_sent", "contact_id": 6, "timestamp": "2026-11-23T14:15:00Z" },
    { "id": "c34", "type": "text_sent", "contact_id": 6, "timestamp": "2026-11-22T19:00:00Z" },
    { "id": "c35", "type": "text_received", "contact_id": 6, "timestamp": "2026-11-22T19:05:00Z" },
    { "id": "c36", "type": "text_sent", "contact_id": 6, "timestamp": "2026-11-20T09:30:00Z" },
    { "id": "c37", "type": "text_sent", "contact_id": 2, "timestamp": "2026-11-18T15:20:00Z" },
    { "id": "c38", "type": "text_received", "contact_id": 2, "timestamp": "2026-11-18T15:22:00Z" },
    { "id": "c39", "type": "text_sent", "contact_id": 3, "timestamp": "2026-11-17T10:00:00Z" },
    { "id": "c40", "type": "text_received", "contact_id": 3, "timestamp": "2026-11-17T10:05:00Z" },
    { "id": "c41", "type": "text_sent", "contact_id": 3, "timestamp": "2026-11-16T16:40:00Z" },
    { "id": "c42", "type": "text_received", "contact_id": 3, "timestamp": "2026-11-16T16:45:00Z" },
    { "id": "c43", "type": "text_sent", "contact_id": 4, "timestamp": "2026-11-15T12:00:00Z" },
    { "id": "c44", "type": "text_received", "contact_id": 4, "timestamp": "2026-11-15T12:05:00Z" },
    { "id": "c45", "type": "call", "contact_id": 3, "timestamp": "2026-11-14T11:00:00Z", "duration_seconds": 600 },
    { "id": "c46", "type": "text_sent", "contact_id": 2, "timestamp": "2026-11-14T09:00:00Z" },
    { "id": "c47", "type": "text_received", "contact_id": 2, "timestamp": "2026-11-13T20:00:00Z" }
  ]
};

// Current active state
let appData = JSON.parse(JSON.stringify(DEFAULT_MOCK_DATA));

// Attempt to load external mock_data.json if hosted, otherwise fall back to embedded
async function initData() {
  try {
    const res = await fetch('mock_data.json');
    if (res.ok) {
      const externalData = await res.json();
      appData = externalData;
    }
  } catch (err) {
    // Silently continue with embedded state (expected for file:/// protocol)
    console.info('Running with embedded mock dataset.');
  }
  renderDashboard();
}

/**
 * Main Render Pipeline
 * Executes all 3 required functions from the Insights Engine and binds to DOM.
 */
function renderDashboard() {
  if (!window.InsightsEngine) {
    console.error('InsightsEngine not loaded.');
    return;
  }

  const {
    generateCommunicationMix,
    findNeglectedContacts,
    generateCoreInsight,
    suggestAction,
    calculateSocialWellness
  } = window.InsightsEngine;

  // 1. Core Insight (Prompt 2 Function 3 & Prompt 3 UI Prompt 1)
  const coreInsight = generateCoreInsight(appData);
  const coreInsightEl = document.getElementById('coreInsightText');
  coreInsightEl.textContent = coreInsight;

  // 2. Communication Mix (Prompt 2 Function 1)
  const mix = generateCommunicationMix(appData);
  const mixPercentDisplay = document.getElementById('mixPercentDisplay');
  const donutSegment = document.getElementById('donutSegment');
  const mixSummaryText = document.getElementById('mixSummaryText');
  const textCountDisplay = document.getElementById('textCountDisplay');
  const callCountDisplay = document.getElementById('callCountDisplay');
  const meetCountDisplay = document.getElementById('meetCountDisplay');
  const mixPillText = document.getElementById('mixPillText');

  mixPercentDisplay.textContent = `${mix.textPercentage}%`;
  donutSegment.setAttribute('stroke-dasharray', `${mix.textPercentage}, 100`);
  mixSummaryText.textContent = mix.summary;
  textCountDisplay.textContent = mix.textCount;
  callCountDisplay.textContent = mix.callCount;
  
  // Count calendar/in-person meetings
  const meetCount = appData.communications.filter(c => c.type === 'calendar_event').length;
  meetCountDisplay.textContent = meetCount;
  mixPillText.textContent = `${mix.textPercentage}% Text-Based`;

  // 3. Neglected Contacts (Prompt 2 Function 2)
  const neglectedResult = findNeglectedContacts(appData);
  const neglectedSummaryText = document.getElementById('neglectedSummaryText');
  const neglectedPillText = document.getElementById('neglectedPillText');
  const neglectedDays = document.getElementById('neglectedDays');
  const neglectedName = document.getElementById('neglectedName');
  const neglectedAvatar = document.getElementById('neglectedAvatar');

  neglectedSummaryText.textContent = neglectedResult.summary;

  const topNeglected = neglectedResult.neglectedList?.[0];
  if (topNeglected) {
    neglectedName.textContent = topNeglected.contact.name;
    neglectedDays.textContent = `${topNeglected.daysSilent} days`;
    neglectedAvatar.textContent = topNeglected.contact.avatar_emoji || '🧗‍♂️';
    neglectedPillText.textContent = `${topNeglected.contact.name.split(' ')[0]}: ${topNeglected.daysSilent}d Inactive`;
  } else {
    neglectedName.textContent = "All Close Friends In Touch";
    neglectedDays.textContent = "0 days";
    neglectedAvatar.textContent = "✨";
    neglectedPillText.textContent = "Inner Circle Healthy";
  }

  // 4. Social Wellness Index
  const wellness = calculateSocialWellness(appData);
  const scorePill = document.getElementById('scorePill');
  const wellnessBarFill = document.getElementById('wellnessBarFill');
  const wellnessCaption = document.getElementById('wellnessCaption');
  const voiceRatioVal = document.getElementById('voiceRatioVal');
  const deepBondsVal = document.getElementById('deepBondsVal');

  scorePill.textContent = `${wellness.score} / 100`;
  wellnessBarFill.style.width = `${wellness.score}%`;
  wellnessCaption.textContent = `${wellness.label} (${mix.textPercentage}% Text Ratio)`;
  voiceRatioVal.textContent = `${mix.callPercentage}%`;
  deepBondsVal.textContent = topNeglected ? 'At Risk' : 'Healthy';

  // 5. Update Nudge text if already revealed
  const action = suggestAction(appData);
  const nudgeTextEl = document.getElementById('nudgeText');
  if (nudgeTextEl) {
    nudgeTextEl.textContent = action.nudge;
  }
}

/**
 * UI Prompt 2: The "Nudge" Button Setup
 */
function setupNudgeInteractions() {
  const nudgeBtn = document.getElementById('nudgeBtn');
  const nudgeCard = document.getElementById('nudgeCard');
  const simulateCallBtn = document.getElementById('simulateCallBtn');
  const calendarActionBtn = document.getElementById('calendarActionBtn');
  const voiceNoteActionBtn = document.getElementById('voiceNoteActionBtn');
  const nudgeFeedback = document.getElementById('nudgeFeedback');
  const feedbackText = document.getElementById('feedbackText');

  // Click handler to reveal the nudge
  nudgeBtn.addEventListener('click', () => {
    nudgeCard.classList.remove('hidden');
    nudgeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  // Action 1: Simulate Call with Mark (Updates state and re-runs engine)
  simulateCallBtn.addEventListener('click', () => {
    // Log a new 15-minute voice call with Mark right now
    const newCallEvent = {
      id: `c-demo-${Date.now()}`,
      type: "call",
      contact_id: 1, // Mark
      timestamp: new Date().toISOString(),
      duration_seconds: 900 // 15 mins
    };

    appData.communications.unshift(newCallEvent);

    // Re-render dashboard with new live metrics
    renderDashboard();

    // Show celebratory feedback
    feedbackText.innerHTML = `<strong>Call logged!</strong> 15-minute conversation with Mark registered on-device. Silent drift resolved!`;
    nudgeFeedback.classList.remove('hidden');

    simulateCallBtn.disabled = true;
    simulateCallBtn.style.opacity = '0.6';
    simulateCallBtn.textContent = '✓ Call Completed (15 min)';
  });

  // Action 2: Calendar schedule
  calendarActionBtn.addEventListener('click', () => {
    feedbackText.innerHTML = `<strong>Calendar event created:</strong> Catch up with Mark scheduled for this Saturday at 2:00 PM.`;
    nudgeFeedback.classList.remove('hidden');
    calendarActionBtn.disabled = true;
    calendarActionBtn.textContent = '✓ Scheduled on Calendar';
  });

  // Action 3: Voice Note
  voiceNoteActionBtn.addEventListener('click', () => {
    const newVoiceEvent = {
      id: `c-voice-${Date.now()}`,
      type: "call",
      contact_id: 1,
      timestamp: new Date().toISOString(),
      duration_seconds: 45
    };
    appData.communications.unshift(newVoiceEvent);
    renderDashboard();

    feedbackText.innerHTML = `<strong>Voice note dispatched:</strong> Sent 45s audio memo to Mark. Asynchronous vocal warmth delivered.`;
    nudgeFeedback.classList.remove('hidden');
    voiceNoteActionBtn.disabled = true;
    voiceNoteActionBtn.textContent = '✓ Voice Note Sent';
  });
}

/**
 * Scenario Switcher for Demo Simulation
 */
function setupScenarioControls() {
  const defaultBtn = document.getElementById('scenarioDefaultBtn');
  const connectedBtn = document.getElementById('scenarioConnectedBtn');
  const resetBtn = document.getElementById('scenarioResetBtn');
  const nudgeCard = document.getElementById('nudgeCard');
  const simulateCallBtn = document.getElementById('simulateCallBtn');
  const nudgeFeedback = document.getElementById('nudgeFeedback');

  function setActive(btn) {
    [defaultBtn, connectedBtn, resetBtn].forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  defaultBtn.addEventListener('click', () => {
    setActive(defaultBtn);
    appData = JSON.parse(JSON.stringify(DEFAULT_MOCK_DATA));
    simulateCallBtn.disabled = false;
    simulateCallBtn.style.opacity = '1';
    simulateCallBtn.innerHTML = '<span class="action-icon">📞</span><span>Simulate Call with Mark</span>';
    nudgeFeedback.classList.add('hidden');
    renderDashboard();
  });

  connectedBtn.addEventListener('click', () => {
    setActive(connectedBtn);
    // Add multiple calls with Mark and friends
    appData = JSON.parse(JSON.stringify(DEFAULT_MOCK_DATA));
    appData.communications.unshift(
      { id: "c-connected-1", type: "call", contact_id: 1, timestamp: "2026-11-24T11:00:00Z", duration_seconds: 1200 },
      { id: "c-connected-2", type: "call", contact_id: 5, timestamp: "2026-11-24T12:00:00Z", duration_seconds: 800 }
    );
    renderDashboard();
    nudgeCard.classList.remove('hidden');
  });

  resetBtn.addEventListener('click', () => {
    setActive(defaultBtn);
    appData = JSON.parse(JSON.stringify(DEFAULT_MOCK_DATA));
    nudgeCard.classList.add('hidden');
    nudgeFeedback.classList.add('hidden');
    simulateCallBtn.disabled = false;
    simulateCallBtn.style.opacity = '1';
    simulateCallBtn.innerHTML = '<span class="action-icon">📞</span><span>Simulate Call with Mark</span>';
    renderDashboard();
  });
}

/**
 * 30-Second "Wow" Demo Pitch Walkthrough
 * Guided modal matching the exact presentation prompt from the hackathon guidelines!
 */
const PITCH_STEPS = [
  {
    step: "1 of 5",
    title: "1. The Problem",
    script: "“We are more connected, yet more lonely than ever. This is a major health crisis.”",
    tip: "Deliver with conviction. Address the paradoxical epidemic of loneliness in an era of 24/7 notifications.",
    action: () => {}
  },
  {
    step: "2 of 5",
    title: "2. The Solution",
    script: "“We built Echo, a privacy-first personal intelligence system that helps you nurture the relationships that matter.”",
    tip: "Position Echo as a proactive relationship copilot, not another addictive social feed.",
    action: () => {}
  },
  {
    step: "3 of 5",
    title: "3. Show the UI",
    script: "“Here is the Echo dashboard. As you can see, it has analyzed my data and realized I'm relying too much on text. It's also noticed I haven't spoken to my close friend Mark in a while.”",
    tip: "Point out the 87% text ratio and Mark's 14-day silent drift highlighted on the live dashboard.",
    action: () => {
      document.getElementById('heroCard')?.scrollIntoView({ behavior: 'smooth' });
    }
  },
  {
    step: "4 of 5",
    title: "4. Click the Button",
    script: "“Now, Echo provides a gentle, actionable nudge to help me improve my social wellness.”",
    tip: "Click 'Suggest an Action' to reveal the science-backed 10-minute call recommendation.",
    action: () => {
      const nudgeBtn = document.getElementById('nudgeBtn');
      nudgeBtn?.click();
    }
  },
  {
    step: "5 of 5",
    title: "5. Explain the Magic",
    script: "“The best part? All of this happens entirely on your device. We never see your data. We analyze metadata patterns, not content, to provide these insights.”",
    tip: "Emphasize privacy: zero text reading, zero audio recording, 100% on-device mathematical modeling.",
    action: () => {}
  }
];

let currentPitchIndex = 0;

function setupPitchWalkthrough() {
  const pitchModeBtn = document.getElementById('pitchModeBtn');
  const pitchModal = document.getElementById('pitchModal');
  const closePitchBtn = document.getElementById('closePitchBtn');
  const pitchPrevBtn = document.getElementById('pitchPrevBtn');
  const pitchNextBtn = document.getElementById('pitchNextBtn');
  const pitchStepCounter = document.getElementById('pitchStepCounter');
  const pitchStepTitle = document.getElementById('pitchStepTitle');
  const speakerScript = document.getElementById('speakerScript');
  const pitchActionTip = document.getElementById('pitchActionTip');
  const pitchDots = document.getElementById('pitchDots');

  function updatePitchStep(index) {
    currentPitchIndex = index;
    const item = PITCH_STEPS[index];

    pitchStepCounter.textContent = `STEP ${index + 1} OF 5`;
    pitchStepTitle.textContent = item.title;
    speakerScript.textContent = item.script;
    pitchActionTip.innerHTML = `<strong>Pitch Guide:</strong> ${item.tip}`;

    pitchPrevBtn.disabled = index === 0;
    pitchNextBtn.textContent = index === PITCH_STEPS.length - 1 ? 'Finish Pitch 🎯' : 'Next Step →';

    // Update dots
    const dots = pitchDots.querySelectorAll('.dot');
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });

    // Run associated action
    item.action();
  }

  pitchModeBtn.addEventListener('click', () => {
    pitchModal.classList.remove('hidden');
    updatePitchStep(0);
  });

  closePitchBtn.addEventListener('click', () => {
    pitchModal.classList.add('hidden');
  });

  pitchPrevBtn.addEventListener('click', () => {
    if (currentPitchIndex > 0) {
      updatePitchStep(currentPitchIndex - 1);
    }
  });

  pitchNextBtn.addEventListener('click', () => {
    if (currentPitchIndex < PITCH_STEPS.length - 1) {
      updatePitchStep(currentPitchIndex + 1);
    } else {
      pitchModal.classList.add('hidden');
    }
  });

  // Close modal on backdrop click
  pitchModal.addEventListener('click', (e) => {
    if (e.target === pitchModal) {
      pitchModal.classList.add('hidden');
    }
  });
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  initData();
  setupNudgeInteractions();
  setupScenarioControls();
  setupPitchWalkthrough();
});
