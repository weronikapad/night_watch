# NightWatch
### The AI that audits the AIs watching you

**Live Demo:** https://night-watch-phi.vercel.app

Every night, your AI assistants are logging and training on your most personal conversations — and you have no idea. NightWatch is an AI privacy auditor that scans your email for data breaches, analyzes prompts you've sent to AI chatbots for exposed sensitive data, and scores every major AI platform on how safe they actually are with your information.

The guardian is watching the watchers.

---

## Features

-  **Email Breach Scanner** — checks if your email has been exposed in known data breaches using the LeakCheck API
-  **Prompt Exposure Analyzer** — paste any prompt you've sent to an AI and get an instant privacy risk analysis powered by Groq/Llama
-  **AI Privacy Scorecard** — see how ChatGPT, Gemini, Grok, DeepSeek, Meta AI, Ecosia and Claude score on privacy
-  **Chrome Extension** — real browser extension that detects when you're on an AI site and shows its privacy score instantly

---

## Tech Stack

- **Frontend:** React + Vite, deployed on Vercel
- **Backend:** Flask (Python), deployed on Render
- **AI:** Groq API (Llama 3.3 70B)
- **Data:** LeakCheck public API

---

## Running Locally

**Backend:**
```bash
cd nightwatch/server
pip install -r requirements.txt
python app.py
```

**Frontend:**
```bash
cd nightwatch/client
npm install
npm run dev
```

Add a `server/.env` file with:
```
GROQ_API_KEY=your_key_here
```
