"""
ECHO: On-Device Personal Relationship Intelligence Engine
insights_engine.py

Core mathematical and heuristic logic that transforms raw communication
metadata into private, actionable, human-centric wellness insights.
"""

import json
from datetime import datetime, timezone
from pathlib import Path


def load_data(filepath="mock_data.json"):
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)


def _get_reference_date(data):
    if isinstance(data, dict) and "reference_date" in data:
        # e.g. 2026-11-24T12:00:00Z
        ref_str = data["reference_date"].replace("Z", "+00:00")
        return datetime.fromisoformat(ref_str)
    return datetime.now(timezone.utc)


def generateCommunicationMix(data):
    """
    Function 1: generateCommunicationMix(data)
    Input: The communications array or full dictionary.
    Logic: Count the number of 'call' events vs. 'text' events.
    Output: A string like 'Your communication has been 85% text-based this month.'
    """
    comms = data if isinstance(data, list) else data.get("communications", [])
    
    call_count = 0
    text_count = 0

    for c in comms:
        c_type = c.get("type", "")
        if c_type == "call":
            call_count += 1
        elif c_type in ("text_sent", "text_received", "text"):
            text_count += 1

    total = call_count + text_count
    if total == 0:
        return "No communication records found for this period."

    text_percent = round((text_count / total) * 100)
    return f"Your communication has been {text_percent}% text-based this month."


def findNeglectedContacts(data):
    """
    Function 2: findNeglectedContacts(data)
    Input: The communications and contacts arrays (or full data dict).
    Logic: Identify contacts in the 'close_friends' group who have not had
           any communication in the last 7 days.
    Output: A string like 'You haven't connected with Mark (Close Friend) in over a week.'
    """
    contacts = data.get("contacts", []) if isinstance(data, dict) else []
    comms = data.get("communications", []) if isinstance(data, dict) else []
    ref_date = _get_reference_date(data)

    close_friends = [c for c in contacts if c.get("group") == "close_friends"]
    neglected = []

    for contact in close_friends:
        cid = contact.get("id")
        contact_comms = [c for c in comms if c.get("contact_id") == cid]

        if not contact_comms:
            neglected.append((contact, 30))
            continue

        timestamps = [
            datetime.fromisoformat(c["timestamp"].replace("Z", "+00:00"))
            for c in contact_comms
        ]
        latest_ts = max(timestamps)
        days_silent = (ref_date - latest_ts).days

        if days_silent > 7:
            neglected.append((contact, days_silent))

    if not neglected:
        return "You're actively in touch with all your close friends this week!"

    # Pick the most neglected contact
    neglected.sort(key=lambda item: item[1], reverse=True)
    top_contact, days = neglected[0]
    duration_str = "over two weeks" if days >= 14 else "over a week"

    return f"You haven't connected with {top_contact.get('name')} in {duration_str}."


def generateCoreInsight(data):
    """
    Function 3: generateCoreInsight(data)
    Input: The full dataset.
    Logic: Combine the outputs of the other functions to create the main insight.
    Output: A single, powerful string for your main screen.
    """
    mix_str = generateCommunicationMix(data)
    neglected_str = findNeglectedContacts(data)

    # e.g. "Echo has noticed your communication has been 87% text-based this month, and you haven't connected with Mark (Close Friend) in over two weeks."
    clean_mix = mix_str.rstrip(".")
    if "haven't connected" in neglected_str:
        return f"Echo has noticed {clean_mix.lower()}, and {neglected_str[0].lower() + neglected_str[1:]}"
    return f"Echo has noticed {clean_mix.lower()}. {neglected_str}"


def suggestAction(data):
    """
    Generates actionable nudge recommendation.
    """
    return "How about giving Mark a call this weekend? A 10-minute call can be more powerful than 50 texts."


if __name__ == "__main__":
    mock_data = load_data()
    print("=" * 60)
    print("ECHO - On-Device Personal Intelligence Engine (Python Test)")
    print("=" * 60)
    print("\n[Function 1: Communication Mix]")
    print("->", generateCommunicationMix(mock_data))

    print("\n[Function 2: Neglected Contacts]")
    print("->", findNeglectedContacts(mock_data))

    print("\n[Function 3: Core Insight]")
    print("->", generateCoreInsight(mock_data))

    print("\n[Nudge Action]")
    print("->", suggestAction(mock_data))
    print("=" * 60)
