/**
 * ECHO: On-Device Personal Relationship Intelligence Engine
 * insights_engine.js
 *
 * Core mathematical and heuristic logic that transforms raw communication
 * metadata into private, actionable, human-centric wellness insights.
 */

// Helper to resolve reference timestamp (fallback to latest event or today)
function getReferenceDate(data) {
  if (data && data.reference_date) {
    return new Date(data.reference_date);
  }
  return new Date();
}

/**
 * Function 1: generateCommunicationMix(data)
 * Input: communications array or full data object
 * Logic: Count call events vs text events (sent + received).
 * Output: String e.g. "Your communication has been 85% text-based this month."
 */
function generateCommunicationMix(data) {
  const comms = Array.isArray(data) ? data : (data?.communications || []);
  
  let callCount = 0;
  let textCount = 0;

  comms.forEach(c => {
    if (c.type === 'call') {
      callCount++;
    } else if (c.type === 'text_sent' || c.type === 'text_received' || c.type === 'text') {
      textCount++;
    }
  });

  const totalInteractive = callCount + textCount;
  if (totalInteractive === 0) {
    return "No communication records found for this period.";
  }

  const textPercent = Math.round((textCount / totalInteractive) * 100);
  const callPercent = 100 - textPercent;

  return {
    summary: `Your communication has been ${textPercent}% text-based this month.`,
    textPercentage: textPercent,
    callPercentage: callPercent,
    textCount,
    callCount,
    total: totalInteractive
  };
}

/**
 * Function 2: findNeglectedContacts(data)
 * Input: Full data object or { communications, contacts }
 * Logic: Identify contacts in the "close_friends" group who have not had
 *        any communication in the last 7 days.
 * Output: Array of neglected contact objects and a primary human-readable string.
 */
function findNeglectedContacts(data) {
  const contacts = data?.contacts || [];
  const comms = data?.communications || [];
  const refDate = getReferenceDate(data);

  const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
  const neglected = [];

  // Filter for close_friends (or high-priority bonds)
  const closeContacts = contacts.filter(c => c.group === 'close_friends');

  closeContacts.forEach(contact => {
    // Find all communications involving this contact
    const contactComms = comms.filter(c => c.contact_id === contact.id);

    if (contactComms.length === 0) {
      neglected.push({
        contact,
        daysSilent: 30, // Default cap
        lastContactDate: null,
        message: `You haven't connected with ${contact.name} in over a month.`
      });
      return;
    }

    // Find the latest communication timestamp
    const timestamps = contactComms.map(c => new Date(c.timestamp).getTime());
    const latestTimestamp = Math.max(...timestamps);
    const diffMs = refDate.getTime() - latestTimestamp;
    const daysSilent = Math.floor(diffMs / (24 * 60 * 60 * 1000));

    if (diffMs > sevenDaysMs) {
      const timeDescription = daysSilent >= 14 ? "over two weeks" : "over a week";
      neglected.push({
        contact,
        daysSilent,
        lastContactDate: new Date(latestTimestamp).toISOString(),
        message: `You haven't connected with ${contact.name} in ${timeDescription}.`
      });
    }
  });

  // Sort by most neglected (highest days silent)
  neglected.sort((a, b) => b.daysSilent - a.daysSilent);

  const primaryMessage = neglected.length > 0
    ? neglected[0].message
    : "You're actively in touch with all your close friends this week!";

  return {
    summary: primaryMessage,
    neglectedList: neglected
  };
}

/**
 * Function 3: generateCoreInsight(data)
 * Input: The full dataset
 * Logic: Combine the outputs of the other functions to create the main hero insight.
 * Output: A single, powerful string for your main screen.
 */
function generateCoreInsight(data) {
  const mix = generateCommunicationMix(data);
  const neglected = findNeglectedContacts(data);

  const textPercent = typeof mix === 'object' ? mix.textPercentage : 85;
  const topNeglected = neglected.neglectedList?.[0];

  if (topNeglected) {
    return `Echo has noticed your communication has been ${textPercent}% text-based this month, and you haven't connected with ${topNeglected.contact.name} in ${topNeglected.daysSilent >= 14 ? 'over 14 days' : 'over a week'}.`;
  } else {
    return `Echo has noticed your communication has been ${textPercent}% text-based this month. Your close friendships are active, but would benefit from more voice connection.`;
  }
}

/**
 * Function 4: suggestAction(data)
 * Output: Contextual AI Nudge
 */
function suggestAction(data) {
  const neglected = findNeglectedContacts(data);
  const topNeglected = neglected.neglectedList?.[0];

  if (topNeglected) {
    const firstName = topNeglected.contact.name.split(' ')[0];
    return {
      contact: topNeglected.contact,
      nudge: `How about giving ${firstName} a call this weekend? A 10-minute call can be more powerful than 50 texts.`,
      recommendedType: "call",
      recommendedDurationMinutes: 10,
      reason: `No interactions in ${topNeglected.daysSilent} days with a close friend.`
    };
  }

  return {
    contact: null,
    nudge: "How about a 15-minute walk-and-talk phone call with a friend today?",
    recommendedType: "call",
    recommendedDurationMinutes: 15,
    reason: "Balance text fatigue with real-time vocal presence."
  };
}

/**
 * Function 5: calculateSocialWellness(data)
 * Computes a holistic 0-100 social health score based on depth vs surface contact
 */
function calculateSocialWellness(data) {
  const mix = generateCommunicationMix(data);
  const neglected = findNeglectedContacts(data);

  // Penalize extreme text overload (>80%), reward call depth and active close circles
  const textPct = mix.textPercentage || 85;
  const neglectedCount = neglected.neglectedList?.length || 0;

  let score = 100;
  if (textPct > 70) score -= (textPct - 70) * 1.2;
  score -= neglectedCount * 12;

  score = Math.max(20, Math.min(98, Math.round(score)));

  return {
    score,
    label: score >= 80 ? "Thriving" : score >= 60 ? "Attention Needed" : "Disconnection Risk",
    mix,
    neglectedCount
  };
}

// Module export for Node.js environments and Browser window attachment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateCommunicationMix,
    findNeglectedContacts,
    generateCoreInsight,
    suggestAction,
    calculateSocialWellness
  };
}

if (typeof window !== 'undefined') {
  window.InsightsEngine = {
    generateCommunicationMix,
    findNeglectedContacts,
    generateCoreInsight,
    suggestAction,
    calculateSocialWellness
  };
}
