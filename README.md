## NightWatch

**link:** https://night-watch-phi.vercel.app

Night watch checks your email for branches, ensuring that you can go to sleep without a worry about your data being leaked. Not only that, but it also scans your messages that you want to or have sent to an AI chat box, for sensitive information that you should never share with AI. Under those scanners there's also a cybersecure AI ranking.


### Features

**AI privacy ranking**: each major AI is ranked on a scale 0-100 of how secure it is. 
**Email branches scanner**: checks your email for any breaches that might have been leaked, using an API
**AI messages analyser**: the user can paste a message that they want or have already sent to an AI, and a different AI through an API checks it for any vulnerabilities.


### Tech Stack

**Frontend:** React + Vite, deployed on Vercel
**Backend:** Flask (Python), deployed on Render
**AI:** Groq API (Llama 3.3 70B)
**Data:** LeakCheck public API


### Running Locally

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
GROQ_API_KEY=apikey
```
