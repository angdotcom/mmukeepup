# MMU KEEP UP — Google AI Studio & Full-Stack Development Guide

This guide outlines how to use **Google AI Studio** to scaffold, prototype, and scale **MMU KEEP UP**, the premier social media and announcement platform for Multimedia University (MMU) Cyberjaya and Melaka students, lecturers, and club committees.

---

## 1. Project Overview & Architecture
* **App Name:** MMU KEEP UP
* **Core Purpose:** Centralizing MMU student life, official club announcements, and campus event schedules while eliminating clutter, fake news, and outdated posts.
* **Brand Palette:**
  * Background: `#ebeaff` (Soft Lavender)
  * Secondary Accent: `#9694ff` (Periwinkle / Muted Indigo)
  * Primary Brand Color: `#3d3bf3` (Electric Indigo)
  * Action/Live Accent: `#ff2929` (Vibrant Coral-Red)

---

## 2. Setting Up in Google AI Studio

To rapidly prototype AI-powered features for content moderation, automated club post summarization, and smart event scheduling in AI Studio:

### Step 1: Create a Freeform or Structured Prompt in AI Studio
1. Navigate to [Google AI Studio](https://aistudio.google.com/).
2. Select **Create new prompt** -> **Chat prompt** or **Structured prompt**.
3. Set the **Model** to `gemini-2.5-flash` for high-throughput, low-latency feed processing.

### Step 2: Configure System Instructions
Paste the following system prompt into AI Studio to test content validation, club priority tiers, and calendar extraction:

```text
You are the core backend logic assistant for MMU KEEP UP, the official campus social media app for Multimedia University (MMU).

Your primary responsibilities:
1. ROLE VERIFICATION: Ensure user posts respect role limits.
   - 'student' / 'outsider': Max 2 media attachments, short text, thread format.
   - 'club' / 'lecturer': Up to 10 media attachments, official announcement badge, pinned post eligibility.
2. EVENT AUTO-SYNC: When a club post contains event details (date, venue, time), automatically parse and structure it into a JSON calendar object for student profiles.
3. CONTENT MODERATION: Filter out outdated, irrelevant, or spam posts from appearing on the main chronological feed. Keep the feed clean, factual, and focused on campus life.
```

### Step 3: Enforce JSON Schemas for Structured Outputs
To feed club announcements directly into the React frontend calendar and feed state, configure your AI Studio structured output schema as follows:

```json
{
  "type": "OBJECT",
  "properties": {
    "postId": { "type": "STRING" },
    "authorRole": { "type": "STRING", "enum": ["student", "lecturer", "club", "outsider"] },
    "isOfficialAnnouncement": { "type": "BOOLEAN" },
    "cleanContent": { "type": "STRING" },
    "mediaUrls": { 
      "type": "ARRAY", 
      "items": { "type": "STRING" } 
    },
    "eventDetails": {
      "type": "OBJECT",
      "properties": {
        "eventTitle": { "type": "STRING" },
        "eventDate": { "type": "STRING" },
        "venue": { "type": "STRING" }
      },
      "nullable": true
    }
  },
  "required": ["postId", "authorRole", "isOfficialAnnouncement", "cleanContent"]
}
```

---

## 3. Exporting Code from AI Studio to Production

Once your prompt behavior is verified in AI Studio, click **Get Code** in the top right corner to export your pipeline. Below is how to integrate the generated `google-genai` Python snippet into your backend API.

### Python Backend Integration (`server.py`)
```python
import os
from google import genai
from google.genai import types

def process_club_announcement(raw_post_text: str, author_role: str):
    client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))
    
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=f"Analyze and structure this post from a '{author_role}':\n\n{raw_post_text}",
        config=types.GenerateContentConfig(
            system_instruction="You are the MMU KEEP UP backend moderator. Extract event dates, validate media limits, and structure club announcements.",
            response_mime_type="application/json",
            temperature=0.2,
        ),
    )
    return response.text
```

---

## 4. Frontend Integration & Tailwind Styling

To replicate the exact brand aesthetics in your full-stack deployment, ensure your Tailwind configuration matches your brand palette:

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mmuLavender: '#ebeaff',
        mmuPeriwinkle: '#9694ff',
        mmuIndigo: '#3d3bf3',
        mmuRed: '#ff2929',
      },
    },
  },
  plugins: [],
};
```

---

## 5. Deployment Roadmap
1. **Frontend:** Deploy the React SPA (from the editor panel) to **Vercel** or **Firebase Hosting**.
2. **Backend & Database:** Set up **Firebase Firestore** with the role-based security rules outlined previously.
3. **AI Middleware:** Connect your Gemini API key via Google Cloud Secret Manager to power automated event extraction and content moderation.